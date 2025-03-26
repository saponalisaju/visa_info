const Application = require("../models/applicationModel");
const moment = require("moment");
const { uploadApplicationFile } = require("../helpers/uploadCloudFile");
const {
  publicIdFromUrl,
  deleteFileFromCloudinary,
} = require("../helpers/deleteFileCloudinary");
const {
  sendEmailJobLetter,
  sendEmailLmiAs,
  sendEmailVisa,
  sendEmailApplicationApproved,
  sendEmailWorkPermits,
} = require("../helpers/mail");

exports.fetchApplication = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const app = await Application.find({});
    const applications = await Application.find({
      passport: { $regex: search, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    console.log(app);

    const count = await Application.countDocuments({
      passport: { $regex: search, $options: "i" },
    });

    res.json({
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalApplication: count,
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.fetchApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findById(id);
    console.log(application);
    res.json(application);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.fetchApplicationEnquiry = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    search1 = "",
    search2 = "",
  } = req.query;
  try {
    const applications = await Application.find({
      passport: { $regex: search, $options: "i" },
      currentN: { $regex: search1, $options: "i" },
      dob: { $regex: search2, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Application.countDocuments({
      passport: { $regex: search, $options: "i" },
      currentN: { $regex: search1, $options: "i" },
      dob: { $regex: search2, $options: "i" },
    });

    res.json({
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.addApplication = async (req, res) => {
  try {
    const existingUser = await Application.findOne({
      $or: [{ email: req.body.email }, { passport: req.body.passport }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or passport already exists." });
    }
    if (!req.file || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Both file and email are required." });
    }
    const image = req.file?.path;
    let secure_url = "default.png";
    let public_id = "";
    if (image) {
      ({ secure_url, public_id } = await uploadApplicationFile(
        image,
        "visaInfo/application"
      ));
    }
    const newApplication = new Application({
      ...req.body,
      image: secure_url,
      imagePublicId: public_id,
    });
    await newApplication.save();
    console.log(newApplication);
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error adding application:", error);
    res.status(500).json({
      message: "Error adding application. Please try again.",
      error: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await Application.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Application not found" });
    }
    const image = req.file?.path;
    const updateField = {};
    if (image) {
      const { secure_url, public_id } = await uploadApplicationFile(
        image,
        "visaInfo/application"
      );
      updateField.image = secure_url;
      updateField.imagePublicId = public_id;

      if (existingUser.image) {
        const publicId = publicIdFromUrl(existingUser.image);
        await deleteFileFromCloudinary(publicId);
      }
    }
    const updatedUser = await Application.findByIdAndUpdate(
      id,
      { ...req.body, ...updateField },
      {
        new: true,
      }
    );
    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationAdd = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await Application.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Application not found" });
    }
    const files = req.files;
    const updateFields = {};
    for (const fileField in files) {
      const filePath = files[fileField][0].path;
      const { secure_url, public_id } = await uploadApplicationFile(
        filePath,
        `visaInfo/${fileField}`
      );
      updateFields[fileField] = secure_url;
      updateFields[`${fileField}PublicId`] = public_id;
      if (existingUser[fileField]) {
        const oldPublicId = publicIdFromUrl(existingUser[fileField]);
        await deleteFileFromCloudinary(oldPublicId);
      }
    }
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { ...req.body, ...updateFields },
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (existingUser.file1) {
      await sendEmailJobLetter(existingUser.email, existingUser.surname);
    }
    if (existingUser.file2) {
      await sendEmailLmiAs(existingUser.email, existingUser.surname);
    }

    if (existingUser.file3 || existingUser.file4) {
      await sendEmailVisa(existingUser.email, existingUser.surname);
    }
    if (existingUser.file5) {
      await sendEmailWorkPermits(existingUser.email, existingUser.surname);
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send(`Server Error: ${error.message}`);
  }
};

exports.updateApplicationApprove = async (req, res) => {
  try {
    const { id } = req.params;
    const appUser = await Application.findById(id);
    if (appUser) {
      const updatedUser = await Application.findByIdAndUpdate(
        id,

        { approve: moment().format("YYYY-MM-DD"), isStatus: "approved" },
        { new: true }
      );

      await sendEmailApplicationApproved(appUser.email, appUser.surname);

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationPending = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Application.findByIdAndUpdate(
      id,
      req.body,
      { isStatus: "pending" }, // Ensure the status is set correctly if needed
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send(error.message);
  }
};

exports.updateApplicationReject = async (req, res) => {
  try {
    const { id } = req.params;
    const appUser = await Application.findById(id);
    if (appUser) {
      const updatedUser = await Application.findByIdAndUpdate(
        id,
        { isStatus: "rejected" },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByIdAndDelete({ _id: id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const filePublicIds = [
      application.imagePublicId,
      application.file1PublicId,
      application.file2PublicId,
      application.file3PublicId,
      application.file4PublicId,
      application.file5PublicId,
      application.file6PublicId,
    ].filter(Boolean); // Filter out any undefined values

    if (filePublicIds.length > 0) {
      await Promise.all(
        filePublicIds.map((publicId) =>
          deleteFileFromCloudinary(publicId).catch((error) => {
            console.error(
              `Error deleting file with public_id ${publicId}:`,
              error
            );
          })
        )
      );
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationUser = async (req, res) => {
  try {
    const { passport } = req.params;
    const applications = await Application.findOne({ passport });
    if (applications) {
      res.json(applications);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
