
const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");


const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        
        const defaultResumeData = {
                profileInfo: {
                    profileImg: null,
                    profileUrl:"",
                    fullName: "",
                    designation: "",
                    summary: "",
                },
                contactInfo: {
                    email: "",
                    phone: "",
                    location: "",
                    linkedin: "",
                    github: "",
                    website: "",
                },
                workExperience: [
                    {
                        company: "",
                        role: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                    },
                ],
                education: [
                    {
                        degree: "",
                        institution: "",
                        startDate: "",
                        endDate: "",
                    },
                ],
                skills: [
                    {
                        name: "",
                        progress: 0,
                    },
                ],
                projects: [
                    {
                        title: "",
                        description: "",
                        github: "",
                        liveDemo: "",
                    },
                ],
                certifications: [
                    {
                        title: "",
                        issuer: "",
                        year: "",
                    },
                ],
                languages: [
                    {
                        name: "",
                        progress: 0,
                    },
                ],
                interests: [""]}
        
        const newReusme = await Resume.create({
					userId:req.user._id,
					title,
					...defaultResumeData
        });
        res.status(200).json(newReusme);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
const getUserResume = async (req, res) => {
    try {
        const resumes = (await Resume.find({ userId: req.user._id }));
    // console.log(resumes)
        return res.status(200).json(resumes);
	} catch (error) {
		res.status(500).json({ message:"falied to create resume",error: error.message });
	}
};

const getResumeById = async (req, res) => {
	  
		try {
			const resume = await Resume.findOne({ _id:req.params.id, userId:req.user._id });
            if (!resume) {
                return res.status(404).json({ message:"Resume Not Found!" });
            }
         return   res.status(200).json(resume );
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
};
const updateResume= async (req, res) => {
    try {
        const resume = await Resume.findOne({
					_id: req.params.id,
					userId: req.user._id,
        });
        // console.log("update",resume);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or authorized" });
        }
        Object.assign(resume, req.body);
        const savedResume = await resume.save();
		return res.json( savedResume );
    } catch (error) {
        console.log(error);
			res.status(500).json({ message:"not found",error: error.message });
		}
};
const deleteResume = async (req, res) => {
    try {
            const resume = await Resume.findOne({
							_id: req.params.id,
							userId: req.user._id,
            });
        // console.log(resume);
        if (!resume) {
            return res.status(404).json({ message: "Resume NOT Found! or unauthorized" });
        }
        // delete thumbnailLink and profilePreviewUrl
        const uploadFolder = path.join(__dirname, '..', 'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail)
            }
        }
         if (resume.profileInfo?.profilePreviewUrl) {
						const oldProfile = path.join(
							uploadFolder,
							path.basename(resume.profileInfo.profilePreviewUrl)
						);
						if (fs.existsSync(oldProfile)) {
							fs.unlinkSync(oldProfile);
						}
					}

			const deleteResume = await Resume.findByIdAndDelete({
				_id: req.params.id,
				userId: req.user._id,
            });
        if (!deleteResume) {
             return res.status(404)
								.json({ message: "Resume NOT Found! or unauthorized" });
        }
			return res.status(200).json({ message:"Resume deleted Successfully!"});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
};

module.exports={createResume,getUserResume,updateResume,getResumeById, deleteResume}