import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/inputs/TitleInput";
import {
	LuSave,
	LuArrowLeft,
	LuCircleAlert,
	LuDownload,
	LuPalette,
	LuTrash2,
	LuArrowRight,
} from "react-icons/lu";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SetProgress from "../../components/SetProgress";
import ProfileInfoCard from "../../components/cards/ProfileInfoCard";
import ProfileInfoForm from "./forms/ProfileInfoForm";
import ContactInfoForm from "./forms/ContactInfoForm";
import WorkExpereince from "./forms/WorkExpereince";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Projects from "./forms/Projects";
import Certifications from "./forms/Certifications";
import AdditionalInfo from "./forms/AdditionalInfo";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import toast from "react-hot-toast";
import Modal from '../../components/Modal'
import {
	captureElementImage,
	dataURLtoFile,
	fixTailwindColors,
} from "../../utils/helper";
import ThemeSelector from "./ThemeSelector";
const pages = [
	"profile-info",
	"contact-info",
	"work-experience",
	"educations",
	"skills",
	"projects",
	"certifications",
	"additionalInfo",
];

const EditResume = () => {
	const { resumeId } = useParams();
	const navigate = useNavigate();
	const resumeRef = useRef(null);
	const resumeDownloadRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [baseWidth, setBaseWidth] = useState(800);
	const [openThemeSelector, setOpenThemeSelector] = useState(false);
	const [openPreviewModal, setOpenPreviewModal] = useState(false);
	const [currentPage, setCurrentPage] = useState("profile-info");
	const [progress, setProgress] = useState(0);
	const [resumeData, setResumeData] = useState({
		title: "",
		thumbnailLink: "",
		profileInfo: {
			fullName: "",
			designation: "",
			summary: "",
			profileImg: null,
			profilePreviewUrl: "",
		},
		template: {
			theme: "01",
			colorPalette: "",
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
			{ company: "", role: "", startDate: "", endDate: "", designation: "" },
		],
		educations: [
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
		langauges: [
			{
				name: "",
				progress: 0,
			},
		],
		interests: [""],
	});

	const [isLoading, setIsLoading] = useState(false);

	// validate inputs
	const validateAndNext = (e) => {
		let errors = false;
		switch (currentPage) {
			case "profile-info":
				const { fullName, designation, summary } = resumeData.profileInfo;
				if (!fullName.trim()) {
					toast.error("Full Name is required");
				}
				if (!designation.trim()) {
					toast.error("Designation is required");
				}
				if (!summary.trim()) {
					toast.error("Summary is required");
				}
				break;
			case "contact-info":
				const { email, phone, linkedin, github } = resumeData.contactInfo;

				if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
					toast.error("valid email is required");
				}
				if (!phone.trim() || phone.length < 10 || phone.length > 10) {
					toast.error("valid 10-digit phone number is required");
				}
				if (!linkedin.trim()) {
					toast.error("linkedin is required");
				}
				if (!github.trim()) {
					toast.error("github is required");
				}
				break;
			case "work-experience":
				resumeData.workExperience.forEach(
					({ company, role, startDate, endDate }) => {
						if (!company.trim()) {
							toast.error(`Company is required in experience`);
						}
						if (!role.trim()) {
							toast.error(`Role is required in experience `);
						}
						if (!startDate.trim() || !endDate.trim()) {
							toast.error(`Start and End is required in experience`);
						}
					}
				);
				break;

			case "educations":
				resumeData.educations.forEach(
					({ degree, institution, startDate, endDate }) => {
						if (!degree.trim()) {
							toast.error(`Degree is required in educations`);
						}
						if (!institution.trim()) {
							toast.error(`institution is required in educations`);
						}
						if (!startDate.trim() || !endDate.trim()) {
							toast.error(`Start and End is required in educations`);
						}
					}
				);
				break;

			case "skills":
				resumeData.skills.forEach(({ name, progress }, index) => {
					if (!name.trim()) {
						toast.error(`Skill name is required in skill`);
					}
					// console
					if (progress < 1 || progress > 100) {
						toast.error(`Skill progress must be between 1 and 100  in skill`);
					}
				});
				break;
			case "projects":
				resumeData.projects.forEach(({ title, description }) => {
					if (!title) {
						toast.error(`Project title is required in project`);
					}
					if (!description.trim()) {
						toast.error(`Project description is required in project`);
					}
				});
				break;
			case "certifications":
				resumeData.certifications.forEach(({ title, issuer }) => {
					if (!title.trim()) {
						toast.error(`Certification title is required in certifications `);
					}
					if (!issuer.trim()) {
						toast.error(`Certification issuer is required in certifications `);
					}
				});
				break;
			case "additionalInfo":
				if (
					resumeData.langauges.length === 0 ||
					!resumeData.langauges[0].name?.trim()
				) {
					toast.error("At least one language is required");
				}
				if (
					resumeData.interests.length === 0 ||
					!resumeData.interests[0]?.trim()
				) {
					toast.error("At least one interest is required");
				}
				break;
			default:
				break;
		}

		// move to next step

		if (errors) {
			return;
		} else {
			goToNextStep();
		}
	};

	// go to next page
	const goToNextStep = () => {
		if (pages === "additionalInfo") {
			setOpenPreviewModal(true);
		};
		if (currentIndex !== -1 && currentIndex < pages.length - 1) {
			const nextIndex = currentIndex + 1;
			console.log(nextIndex);
			setCurrentPage(pages[nextIndex]);
			setCurrentIndex((prev) => nextIndex);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// render form
	const renderForm = () => {
		switch (currentPage) {
			case "profile-info":
				return (
					<ProfileInfoForm
						profileData={resumeData?.profileInfo}
						updateSection={(key, value) => {
							updateSection("profileInfo", key, value);
						}}
						onNext={validateAndNext}></ProfileInfoForm>
				);
			case "contact-info":
				return (
					<ContactInfoForm
						contactInfo={resumeData?.contactInfo}
						updateSection={(key, value) => {
							updateSection("contactInfo", key, value);
						}}
						onNext={validateAndNext}></ContactInfoForm>
				);
			case "work-experience":
				return (
					<WorkExpereince
						workExperience={resumeData?.workExperience}
						updateArrayItem={(index, key, value) => {
							updateArrayItem("workExperience", index, key, value);
						}}
						addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
						removeArrayItem={(index) =>
							removeArrayItem("workExperience", index)
						}></WorkExpereince>
				);
			case "educations":
				return (
					<Education
						educations={resumeData?.educations}
						updateArrayItem={(index, key, value) => {
							updateArrayItem("educations", index, key, value);
						}}
						addArrayItem={(newItem) => addArrayItem("educations", newItem)}
						removeArrayItem={(index) =>
							removeArrayItem("educations", index)
						}></Education>
				);
			case "skills":
				return (
					<Skills
						skills={resumeData?.skills}
						updateArrayItem={(index, key, value) => {
							updateArrayItem("skills", index, key, value);
						}}
						addArrayItem={(newItem) => addArrayItem("skills", newItem)}
						removeArrayItem={(index) =>
							removeArrayItem("skills", index)
						}></Skills>
				);
			case "projects":
				return (
					<Projects
						projects={resumeData?.projects}
						updateArrayItem={(index, key, value) => {
							updateArrayItem("projects", index, key, value);
						}}
						addArrayItem={(newItem) => addArrayItem("projects", newItem)}
						removeArrayItem={(index) =>
							removeArrayItem("projects", index)
						}></Projects>
				);
			case "certifications":
				return (
					<Certifications
						certifications={resumeData?.certifications}
						updateArrayItem={(index, key, value) => {
							updateArrayItem("certifications", index, key, value);
						}}
						addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
						removeArrayItem={(index) =>
							removeArrayItem("certifications", index)
						}></Certifications>
				);

			case "additionalInfo":
				return (
					<AdditionalInfo
						langauges={resumeData?.langauges}
						interests={resumeData?.interests}
						updateArrayItem={(section, index, key, value) => {
							updateArrayItem(section, index, key, value);
						}}
						addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
						removeArrayItem={(section, index) =>
							removeArrayItem(section, index)
						}></AdditionalInfo>
				);

			default:
				return null;
		}
	};

	// function go  back
	const goBack = () => {
		if (currentPage === "profile-info") {
			navigate("/dashboard");
		}
		const currentIndex = pages.indexOf(currentPage);
		if (currentIndex > 0) {
			const prevIndex = currentIndex - 1;
			setCurrentPage(pages[prevIndex]);
			setCurrentIndex((prev) => prevIndex);

			// update progress
			const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
			setProgress(percent);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// update simple nested object
	const updateSection = (section, key, value) => {
		setResumeData((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				[key]: value,
			},
		}));
	};

	// update array items
	const updateArrayItem = (section, index, key, value) => {
		setResumeData((prev) => {
			const updatedArray = [...prev[section]];
			console.log(prev[section]);

			if (key === null) {
				updatedArray[index] = value;
			} else {
				updatedArray[index] = { ...updatedArray[index], [key]: value };
			}
			return {
				...prev,
				[section]: updatedArray,
			};
		});
	};

	// add item to array
	const addArrayItem = (section, newItem) => {
		setResumeData((prev) => {
			const newResume = {
				...prev,
				[section]: [...prev[section], newItem],
			};

			return newResume;
		});
	};

	// remove item
	const removeArrayItem = (section, index) => {
		setResumeData((prev) => {
			const updatedArray = [...prev[section]];
			updatedArray.splice(index, 1);
			return {
				...prev,
				[section]: updatedArray,
			};
		});
	};

	// fetch resume info by id
	const fetchResumeDetailById = async () => {
		try {
			const response = await axiosInstance.get(
				API_PATHS.RESUME.GET_BY_ID(resumeId)
			);
			console.log(response.data);
			
			if (response.data && response.data.profileInfo) {
				const resumeInfo = response.data;
				setResumeData((prevState) => ({
					...prevState,
					title: resumeInfo?.title,
					template: resumeInfo?.template || prevState?.template,
					profileInfo: resumeInfo?.profileInfo || prevState.profileInfo,
					contactInfo: resumeInfo?.contactInfo || prevState.contactInfo,
					workExperience:
						resumeInfo?.workExperience || prevState.workExperience,
					educations: resumeInfo?.educations || prevState.educations,
					skills: resumeInfo?.skills || prevState.skills,
					projects: resumeInfo?.projects || prevState.projects,
					certifications:
						resumeInfo?.certifications || prevState.certifications,
					langauges: resumeInfo?.langauges || prevState.langauges,
					interests: resumeInfo?.interests || prevState.interests,
				}));
			}
		} catch (err) {
			console.log("Error fetching resume", err);
		}
	};

	// upload  profile img
	const uploadResumeImages = async () => {
		try {
			setIsLoading(true);

			fixTailwindColors(resumeRef.current);

			const ImageDataUrl = await captureElementImage(resumeRef.current);
		
			// convert base64 to file
			const thumbnailFile = dataURLtoFile(
				ImageDataUrl,
				`resume-${resumeId}.png`
			);
				

			const profileImageFile = resumeData?.profileInfo?.profileImg || null;
			
			const formData = new FormData();
			
			if (profileImageFile) {
				formData.append("profileImage", profileImageFile);
			}
			if (thumbnailFile) {
				formData.append("thumbnail", thumbnailFile);
			}
			console.log(formData);

			const uploadResponse = await axiosInstance.put(
				API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
		
			const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
			
			// call the second api
			await updateResumeDetails(thumbnailLink, profilePreviewUrl);
			toast.success("Resume Upload Successfully");
			navigate("/dashboard");
		} catch (err) {
			toast.error("Erorr uploading images:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// upload thumbnail
	const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.put(
				API_PATHS.RESUME.UPDATE(resumeId),
				{
					...resumeData,
					thumbnailLink: thumbnailLink || "",
					profileInfo: {
						...resumeData.profileInfo,
						profilePreviewUrl: profilePreviewUrl || "",
					},
				}
			);
			if (response.data) {
				setResumeData(response.data);
			}
			console.log(response.data);
			
		} catch (err) {
			toast.error("error capturing img",err);
		} finally {
			setIsLoading(false);
		}
	};
	const errorMsgs = () => {
		if (errorMsg) {
			toast.error(errorMsg);
		}
	};

	// delete Resume
	const handleDeleteResume = async () => {
		try {
			setIsLoading(true);
			console.log(resumeId)
			const response = await axiosInstance.delete(
				API_PATHS.RESUME.DELETE(resumeId),
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			
				console.log(response);
			

			toast.success("Resume deleted!");
			navigate("/dashboard");
		} catch (err) {
			toast.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });
	const updateBaseWidth = () => {
		if (resumeRef.current) {
			setBaseWidth(resumeRef.current.offsetWidth);
		}
	};
	useEffect(() => {
		updateBaseWidth();
		window.addEventListener("resize", updateBaseWidth);
		if (resumeId) {
			fetchResumeDetailById();
		}
		return () => {
			window.removeEventListener("resize", updateBaseWidth);
		};
	}, []);


	return (
		<DashboardLayout>
			<Modal
				isOpen={openPreviewModal}
				onClose={() => setOpenPreviewModal(false)}
				title={resumeData.title}
				showActionBtn
				actionBtnText={"Download"}
				actionBtnIcon={<LuDownload className="text-[16px]"></LuDownload>}
				onActionClick={() => reactToPrintFn()}>
				<div ref={resumeDownloadRef} className="w-[90vw] h-[90vh]">
					<RenderResume
						templateId={resumeData?.template?.theme || ""}
						resumeData={resumeData}
						colorPalette={
							resumeData?.template.colorPalette || []
						}></RenderResume>
				</div>
			</Modal>
			<Modal
				isOpen={openThemeSelector}
				onClose={() => setOpenThemeSelector(false)}
				title="Change Theme">
				<div className="">
					<ThemeSelector
						selectTheme={resumeData?.template}
						setSelectedTheme={(value) => {
							setResumeData((prevState) => ({
								...prevState,
								template: value || prevState.template,
							}));
						}}
						resumeData={resumeData}
						onClose={() => setOpenThemeSelector(false)}></ThemeSelector>
				</div>
			</Modal>

			<div className="container mx-auto">
				<div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4 ">
					<TitleInput
						title={resumeData.title}
						setTitle={(value) =>
							setResumeData((prevData) => ({ ...prevData, title: value }))
						}></TitleInput>
					<div className="flex items-center gap-4">
						<button
							className="btn-small-light"
							onClick={() => setOpenThemeSelector(true)}>
							<LuPalette className="text-[16px]"></LuPalette>
							<span className="hidden md:block"> Change Theme</span>
						</button>

						<button className="btn-small-light" onClick={handleDeleteResume}>
							<LuTrash2 className="text-[16px]"></LuTrash2>
							<span className="hidden md:block">Delete</span>
						</button>

						<button
							className="btn-small-light"
							onClick={() => setOpenPreviewModal(true)}
							download>
							<LuDownload className="text-[16px]"></LuDownload>
							<span className="hidden md:block"> Preview and Download</span>
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 h-[100vh] md:grid-cols-2 gap-5">
					<div className="bg-white h-[100vh] rounded-lg border border-purple-100 overflow-hidden">
						<SetProgress progress={progress}></SetProgress>
						{renderForm()}
						<div className="flex items-end justify-end gap-3 p-3">
							<button
								className="btn-small-light"
								onClick={goBack}
								disabled={isLoading}>
								<LuArrowLeft className="text-[16px]"></LuArrowLeft>
								Back
							</button>
							<button
								className="btn-small-light"
								onClick={uploadResumeImages}
								disabled={isLoading}>
								<LuSave className="text-[16px]"></LuSave>
								{isLoading ? "Updating..." : "Save & Exit"}
							</button>
							<button
								className="btn-small"
								onClick={validateAndNext}
								disabled={isLoading}>
								{currentPage === "additionalInfo" && (
									<LuDownload className="text-[16px]"></LuDownload>
								)}
								{currentPage === "additionalInfo"
									? "Preview & Download"
									: "Next"}
								{currentPage !== "additionalInfo" && (
									<LuArrowRight className="text-[16px]"></LuArrowRight>
								)}
							</button>
						</div>
					</div>
					<div ref={resumeRef} className="h-[100vh]">
						{/* {"Resume Template"} */}
						<RenderResume
							templateId={resumeData.template?.theme || ""}
							resumeData={resumeData}
							colorPalette={resumeData?.template?.colorPalette || []}
							containerWidth={baseWidth}></RenderResume>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default EditResume;
