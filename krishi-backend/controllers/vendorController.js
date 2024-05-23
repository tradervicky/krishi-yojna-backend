const Vendor = require("../models/Vendor");
const Upload = require("../helpers/upload");

// Create new vendor with file uploads
const createVendor = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      dateOfBirth,
      vendorCode,
      gstIn,
      address,
      password,
      panCard,
      aadharCard,
      businessDoc,
    } = req.body;

    // Check if the email is already registered
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Upload files to Cloudinary
    // console.log("pathName",req.files['panCard'][0].path)
    const panCardFile = await Upload.uploadFile(req.files["panCard"][0].path);
    const aadharCardFile = await Upload.uploadFile(
      req.files["aadharCard"][0].path
    );
    const businessDocFile = await Upload.uploadFile(
      req.files["businessDoc"][0].path
    );

    // Create a new vendor with Cloudinary file URLs
    const newVendor = new Vendor({
      name,
      email,
      mobile,
      dateOfBirth,
      vendorCode,
      gstIn,
      address,
      password,
      panCard: panCardFile.secure_url,
      aadharCard: aadharCardFile.secure_url,
      businessDoc: businessDocFile.secure_url,
    });
    await newVendor.save();

    res.status(201).json({ message: "Vendor created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all vendors list

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get vendor by id

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update vendor by ID
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let fileUpdates = {};

    // Check if files are present and upload them if they are
    if (req.files && req.files["panCard"] && req.files["panCard"][0]) {
      const panCardFile = await Upload.uploadFile(req.files["panCard"][0].path);
      fileUpdates.panCard = panCardFile.secure_url;
    }

    if (req.files && req.files["aadharCard"] && req.files["aadharCard"][0]) {
      const aadharCardFile = await Upload.uploadFile(req.files["aadharCard"][0].path);
      fileUpdates.aadharCard = aadharCardFile.secure_url;
    }

    if (req.files && req.files["businessDoc"] && req.files["businessDoc"][0]) {
      const businessDocFile = await Upload.uploadFile(req.files["businessDoc"][0].path);
      fileUpdates.businessDoc = businessDocFile.secure_url;
    }

    // Merge file updates with other updates
    const updateData = {
      ...updates,
      ...fileUpdates
    };

    // Find and update the vendor
    const updatedResult = await Vendor.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    console.log(updatedResult);
    res.status(200).json({ message: "Vendor updated successfully", vendor: updatedResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// delete vendor by id

const deleteVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendorById,
};
