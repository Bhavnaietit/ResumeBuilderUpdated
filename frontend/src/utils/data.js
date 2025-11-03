import TEMPLATE_ONE_IMG from "../assets/TEMPLATE_ONE_IMG.png";
import TEMPLATE_TWO_IMG from "../assets/TEMPLATE_TWO_IMG.png";
import TEMPLATE_THREE_IMG from "../assets/TEMPLATE_THREE_IMG.png";

export const resumeTemplates = [
	{ id: "01", thumbnailImg: TEMPLATE_ONE_IMG, colorPaletteCode: "themeOne" },
	{ id: "02", thumbnailImg: TEMPLATE_TWO_IMG, colorPaletteCode: "themeTwo" },
	{ id: "03", thumbnailImg: TEMPLATE_THREE_IMG, colorPaletteCode: "themeThree" },
];
export const themeColorPalette = {
	themeOne: [
		["#E8FDFF", "#A1F4FD", "#CEF4FE", "#80BDDB", "#4A5565"],
		["#F5FAFF", "#D9E2FA", "#93E2DA", "#72AC9A", "#3D4C3A"],
		["#FFF7FD", "#EFC8FF", "#C9C5ED", "#8759FD", "#3A55A1"],
		["#FFF7FD", "#E4E7EB", "#C8D5EF", "#7F95C5", "#2B374A"],
		["#FFF7FD", "#D3FD7F", "#B0ED94", "#34C79D", "#38C448"],
		["#FFF7FD", "#F6E09F", "#F9E0DE", "#F49C6E", "#A74C47"],
		["#FFF7FD", "#FEC6DC", "#FAE6FF", "#C39EFF", "#57354E"],
		["#EFFCFF", "#C8F8FF", "#99FEF7", "#80D7A7", "#2B342A"],
		["#F7F7FF", "#E4E4E4", "#CFCFDF", "#444444", "#222222"],
		["#E3F2FD", "#90CAF9", "#8D82F4", "#1E88E5", "#0D47A1"],
	],
};

export const DUMMY_RESUME_DATA ={
  profileInfo: {
    fullName: "John Doe",
    designation: "Java Developer Intern",
    summary:
      "Passionate Java developer with hands-on experience in building RESTful APIs, microservices, and web applications using Spring Boot and Hibernate. Eager to learn new technologies and contribute to impactful software solutions.",
    profileImg: null,
    profilePreviewUrl: "",
  },

  contactInfo: {
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    location: "Pune, India",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
  },

  workExperience: [
    {
      company: "Barclays Technology Centre",
      role: "Java Developer Intern",
      startDate: "May 2025",
      endDate: "July 2025",
      designation: "Software Intern",
    },
    {
      company: "Codeverse Labs",
      role: "Backend Developer Intern",
      startDate: "Jan 2025",
      endDate: "Apr 2025",
      designation: "Backend Intern",
    },
  ],

  educations: [
    {
      degree: "B.E. in Information Technology",
      institution: "Savitribai Phule Pune University",
      startDate: "2021",
      endDate: "2025",
    },
  ],

  skills: [
    { name: "Java", progress: 90 },
    { name: "Spring Boot", progress: 85 },
    { name: "Hibernate", progress: 80 },
    { name: "MySQL", progress: 75 },
    { name: "HTML / CSS / JavaScript", progress: 70 },
    { name: "Git & GitHub", progress: 80 },
  ],

  projects: [
    {
      title: "Online Resume Builder",
      description:
        "A React and Node.js web app that allows users to create, edit, and export professional resumes with multiple themes and live previews.",
      github: "https://github.com/johndoe/resume-builder",
      liveDemo: "https://resume-builder-demo.vercel.app",
    },
    {
      title: "Student Management System",
      description:
        "A Spring Boot application to manage student records, authentication, and results using RESTful APIs and MySQL.",
      github: "https://github.com/johndoe/student-management-system",
      liveDemo: "",
    },
  ],

  certifications: [
    {
      title: "Java Programming Masterclass",
      issuer: "Udemy",
      year: "2024",
    },
    {
      title: "Spring Boot & Microservices",
      issuer: "Coursera",
      year: "2024",
    },
  ],

  languages: [
    { name: "English", progress: 95 },
    { name: "Hindi", progress: 90 },
    { name: "Marathi", progress: 70 },
  ],

  interests: ["Coding", "Open Source", "Gaming", "UI Design", "Music"],
};
