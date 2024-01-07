const router = require("express").Router();
const Notifiction = require("../models/notificationsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a notifications
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const newNotifiction = new Notifiction(req.body);
    await newNotifiction.save();
    res.send({
      success: true,
      message: "Notifiction added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all notifications for a user
router.post("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    const notifiction = await Notifiction.find({ user: req.body.userId }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      data: notifiction,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a notifications
router.delete(
  "/delete-a-notification/:id",
  authMiddleware,
  async (req, res) => {
    try {
      await Notifiction.findByIdAndDelete(req.params.id);
      res.send({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

// read all notifications by user
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
  try {
    await Notifiction.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
    res.send({
      success: true,
      data: "All notification marked as read",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
