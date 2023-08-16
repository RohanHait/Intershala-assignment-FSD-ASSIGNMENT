const express = require("express");
const router = express.Router();
const User = require("../userModel");
const auth = require("../middleware/auth");

//add Profile Pic
router.put("/update/profilePic", auth, async (req, res) => {
  const { profilePic } = req.body;
  User.findByIdAndUpdate(
    req.user,
    { $set: { profilePic: profilePic } },
    { new: true },
    (err, doc) => {
      if (err) {
        res
          .status(500)
          .json({ errorMessage: "Something wrong when updating data!" });
        console.log("Something wrong when updating data!");
      }
      res.status(200).send(doc);
    }
  );
});

//update user name
router.put("/update/name", auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(req.user, { name: name }, { new: true }).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//update user phone number
router.put("/update/phoneNumber", auth, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(req.user, { phoneNumber: phoneNumber }, { new: true }).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//update user about
router.put("/update/about", auth, async (req, res) => {
  try {
    const { about } = req.body;
    if (!about) {
      return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(req.user, { aboutMe: about }, { new: true }).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//add user certification
router.put("/update/certification", auth, async (req, res) => {
  try {
    const { certification } = req.body;
    if (!certification) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { $push: { certifications: certification} },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
//delete user certification
router.delete("/update/certification/", auth, async (req, res) => {
  try {
    const { certification } = req.body;
    if (!certification) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { $pull: { certifications: certification } },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//add user skills
router.put("/update/skills/", auth, async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
       { skills: skills },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


//add user education
router.put("/update/education/", auth, async (req, res) => {
  try {
    const { education } = req.body;
    if (!education) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { $push: { education: education } },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
//delete user education
router.delete("/update/education/", auth, async (req, res) => {
  try {
    const { education } = req.body;
    if (!education) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { $pull: { education: education } },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//add user experience
router.put("/update/experience/", auth, async (req, res) => {
  try {
    const { experience } = req.body;
    if (!experience) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { $push: { experience: experience } },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
//delete user experience
router.delete("/update/experience/", auth, async (req, res) => {
  try {
    const { experience } = req.body;
    if (!experience) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { $pull: { experience: experience } },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
// edit user headline
router.put("/update/headline/", auth, async (req, res) => {
  try {
    const { headline } = req.body;
    if (!headline) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      { headline: headline },
      { new: true }
    ).select("-password").populate("connections", "-password -connection");
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// add connection
router.put("/update/connections/", auth, async (req, res) => {
    try {
        const { connections } = req.body;
        if (!connections) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }
        const user = await User.findByIdAndUpdate(req.user, { $push: { connections: connections } }, { new: true }).select("-password").populate("connections", "-password -connection") ;
        if (!user) {
          await User.findByIdAndUpdate(connections._id ,{$push : {connections : req.user}}).catch(err =>{ console.log(err)
          res.status(500).send();}) ;
            return res.status(400).json({ errorMessage: "User not found." });
        }
        res.status(200).send(user);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
// delete connection
router.delete("/update/connections/", auth, async (req, res) => {
    try {
        const { connections } = req.body;
        if (!connections) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }
        User.findByIdAndUpdate(connections._id ,{$pull : {connections : req.user}}).catch(err =>{ console.log(err)
        res.status(500).send();}) ;
        const user = await User.findByIdAndUpdate(req.user, { $pull: { connections: connections._id } }, { new: true }).select("-password").populate("connections", "-password -connection") ;

        if (!user) {
            return res.status(400).json({ errorMessage: "User not found." });
        }
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});



module.exports = router;
