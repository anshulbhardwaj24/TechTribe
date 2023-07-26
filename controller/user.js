// All The Details will be their, all the apis including the all the pages of website
import bcrypt from "bcrypt";
import { User } from "../models/user.js ";
import { sendCookie } from "../utils/features.js";
import { ResumeData } from "../models/personDetail.js";
import ErrorHandler from "../middleware/error.js";

//Login API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    //Handling error using Error hander class
    if (!user) return NextAuth(new ErrorHandler("Invalid Email or Password"));

    const isMatch = await bcrypt.compare(password, user.password);

    //Handling error using Error hander class
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, `Welcome Back",${user.firstName}`, 200);
  } catch (error) {
    console.log(error);
  }
};

// REGISTER API
export const register = async (req, res, next) => {
  console.log(res.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = await User.findOne({ email });

    // if (user)
    //   // if user exist than
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Alredy Exist",
    //   });

    //above using error handler class
    if (user) return next(new ErrorHandler("User Alredy Exist", 400));

    //hasing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //else create one
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //Features
    sendCookie(email, res, "Registered Successfully", 200);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const UserData = async (req, res) => {
  try {
    const { personalDetails, experience, education, projects, description } =
      req.body;

    const userID = personalDetails.email;
    console.log(userID)
    const user = await ResumeData.find({ "personalDetails.email": userID });
    console.log(user);

    const jsonData = {
      personalDetails,
      experience,
      education,
      projects,
      description,
    };

    if (user.length===0) {
      const createdCvInfo = await ResumeData.create(jsonData); // Add 'await' here to wait for the database operation

      res.status(201).json({
        success: true,
        message: "User Personal Information Added Successfully",
      });
    } else {
      const updatedCvInfo = await ResumeData.updateOne(
        { "personalDetails.email": userID },
        jsonData
      );

      res.status(201).json({
        success: true,
        message: "User Personal Information updated Successfully",
      });
    }
  } catch (error) {
    console.error(error); // Log the error to see what went wrong
    res.status(400).json({
      success: false,
      message: "Something Went wrong, contact system admin",
    });
  }
};

//API to to create Personal Details

export const resumeData = async (req, res) => {
  try {
    const { fullName, role, phoneNumber, email, country, about } = req.body;

    let UserData = await ResumeData.create({
      fullName,
      role,
      phoneNumber,
      email,
      country,
      about,
    });

    //New WAY
    let result;
    async () => {
      result = await UserData.save();
    };

    res.status(201).json({
      success: true,
      messsage: "User Personal Infomation Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//API to to create Experience Details
export const experienceData = async (req, res) => {
  const { companyName, position, startDate, endDate, description, email } =
    req.body;

  let expData = await ResumeData.create({
    companyName,
    position,
    startDate,
    endDate,
    email,
    description,
  });
  let result;
  async () => {
    result = await expData.save();
  };

  res.status(201).json({
    success: true,
    messsage: "Experience Infomation Added Successfully",
  });
};

// API to to create Education Details
export const educationData = async (req, res) => {
  const { eName, degreeType, eStartDate, eEndDate, eDescription, email } =
    req.body;

  let eduData = await ResumeData.create({
    eName,
    degreeType,
    eStartDate,
    eEndDate,
    email,
    eDescription,
  });
  let result;
  async () => {
    result = await eduData.save();
  };

  res.status(201).json({
    success: true,
    messsage: "Education Infomation Added Successfully",
  });
};

// API to to create Project Details
export const projectData = async (req, res) => {
  const { pTitle, pSkills, pDescription, email } = req.body;

  const projData = await ResumeData.create({
    pTitle,
    pSkills,
    pDescription,
    email,
  });
  let result;
  async () => {
    result = await projData.save();
  };

  res.status(201).json({
    success: true,
    messsage: "Project Infomation Added Successfully",
  });
};

// to get All Data
export const getMyData = async (req, res) => {
  try {
    const Data = await ResumeData.find({});
    Data.forEach(function () {
      // console.log(data);
      res.status(200).json({
        success: true,
        Data,
      });
    });

    if (!ResumeData) return next(new ErrorHandler("Data Not found", 404));
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    console.log(req.body);
    const userid = req.body.email;

    const Data = await ResumeData.find({ "personalDetails.email": userid });

    res.json({
      success: true,
      Data,
    });
  } catch (error) {
    next(error);
  }
};
