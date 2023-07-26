import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  company: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  startDate: {
    type: String, // We're using a string for dates since the given JSON has dates in string format
    required: false,
  },
  endDate: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const educationSchema = mongoose.Schema({
  course: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  startYear: {
    type: String, // We're using a string for years since the given JSON has years in string format
    required: false,
  },
  endYear: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const projectSchema = mongoose.Schema({
  projName: {
    type: String,
    required: false,
  },
  projTech: {
    type: String,
    required: false,
  },
  projDesc: {
    type: String,
    required: false,
  },
});

const cvInfoSchema = mongoose.Schema({
  personalDetails: {
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      unique:true,
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
  },
  description: {
    type: String,
    required: false,
  },
  experience: [experienceSchema],
  education: [educationSchema],
  projects: [projectSchema],
});

export const ResumeData = mongoose.model("resumeInfo", cvInfoSchema);
