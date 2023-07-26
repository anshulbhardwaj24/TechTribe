import express from "express";
import {
  register,
  login,
  logout,
  resumeData,
  getMyData,
  getUserData,
  experienceData,
  educationData,
  projectData,
  UserData
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = new express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

// routes to create data 
router.post("/newData", resumeData);

//saving User Data at once
router.post("/userData", UserData);


router.post("/expData", experienceData);
router.post("/eduData", educationData);
router.post("/projData", projectData);

// route to get all data
router.get("/getData", isAuthenticated,getMyData);
router.post("/getUserData", getUserData);




export default router;