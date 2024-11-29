const Enquiry = require("../models/Enquiry");

//?                      DONE                      //
exports.addEnquiry = async (req, res) => {
  const { name, phone, email, message } = req.body;
  console.log(req.body);
  const nameRegex = /^[a-zA-Z\s]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !phone || !message) {
    return res
      .status(400)
      .json({ msg: "Name, Phone Number, and Message are required!" });
  }
  if (!nameRegex.test(name)) {
    return res.status(400).json({
      msg: "Invalid name format. Only letters and spaces are allowed.",
    });
  }
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ msg: "Invalid phone number format." });
  }
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format." });
  }
  if (message.length > 250) {
    return res.status(400).json({ msg: "Meaasge can be max 250 characters." });
  }

  const enquiry = new Enquiry({
    name,
    phone,
    email,
    message,
  });
  await enquiry.save();
  return res.status(200).json({ msg: "Enquiry submitted successfully." });
};

exports.getEnquires = async (req, res) => {
  try {
    const enquires = await Enquiry.find().sort({ date_submitted: -1 }).lean();
    const unreadCount = await Enquiry.countDocuments({ read: false });
    if (!enquires) {
      return res.status(404).json({ msg: "There are no Enquiries." });
    }
    return res.status(200).json({ enquires, unreadCount });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error." });
  }
};

exports.updateEnquries = async (req, res) => {
  try {
    const updatedEnquries = await Enquiry.updateMany(
      { read: false },
      { read: true }
    );
    return res.status(200).json({
      msg: "Successfully Updated Enquries",
      updatedCount: updatedEnquries.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

//?                      Pending                      //

exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Enquiry.countDocuments({ read: false });
    return res.status(200).json({
      message: "Unread enquiries count fetched successfully.",
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching unread enquiries count:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
