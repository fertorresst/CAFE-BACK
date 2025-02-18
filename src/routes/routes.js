const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUser,
  loginUser,
} = require("./../controller/userController")

const {
  getAllPeriods,
  createPeriod,
  deletePeriod
} = require("./../controller/periodController")

const authenticateToken = require("./../auth/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", (req, res) => { res.send("logout") })
router.put("/updateUser", authenticateToken, updateUser)

router.get("/get-all-periods", getAllPeriods)
router.post("/create-period", createPeriod)
router.delete("/delete-period/:id", deletePeriod)
module.exports = router
