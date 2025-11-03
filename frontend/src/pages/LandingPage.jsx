import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HERO_IMG from '../assets/hero_img.png';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Modal from '../components/Modal'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import ProfilePhotoSelector from '../components/inputs/ProfilePhotoSelector';
import ProfileInfoCard from '../components/cards/ProfileInfoCard';

const LandingPage = () => {
	const { user } = useContext(UserContext);
    const navigate = useNavigate();
	
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

	const handleCTA = () => {
		navigate("/dashboard");
	 };
	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-6">
				<Modal
					isOpen={openAuthModal}
					onClose={() => {
						setOpenAuthModal(false);
						setCurrentPage("login");
					}}
					hideHeader>
					<div>
						{currentPage=="login" ? (
							<Login setCurrentPage={setCurrentPage}></Login>
						) : (
							<SignUp setCurrentPage={setCurrentPage}></SignUp>
						)}
					</div>
				</Modal>
				<header className="flex justify-between items-center mb-16">
					<div className="text-xl font-bold">Resume Builder</div>
					{user ? (<ProfileInfoCard  />):(<button
						className="bg-purple-100 text-sm font-semibold text-black hover:text-white px-7 py-2.5  hover:bg-gray-800 transition-colors cursor-pointer rounded-lg"
						onClick={() => setOpenAuthModal(true)}>
						Login / Sign up
					</button>)}
				</header>

				<div className="flex flex-col md:flex-row items-center">
					<div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
						<h1 className="text-5xl font-bold mb-6 leading-tight ">
							Build Your{""}
							<span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-spin">
								Resume Effortlessly
							</span>
						</h1>
						<p className="text-lg text-gray-700 mb-8">
							Craft a student resume in mintues with our smart and intutive
							resume builder.
						</p>
						<button
							className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
							onClick={handleCTA}>
							Get Started
						</button>
					</div>
					<div className="w-full md:w-1/2">
						<img
							src={HERO_IMG}
							alt="hero image"
							className="w-full rounded-lg"></img>
					</div>
				</div>

				<section className="mt-5">
					<h2 className="text-2xl font-bold text-center mb-12">
						Features That Make You Shine
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
							<h3 className="text-lg font-semibold mb-3"> Easy Editing</h3>
							<p className="text-gray-600">
								Update your resume with live preview and instant formating.
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
							<h3 className="text-lg font-semibold mb-3">
								{" "}
								Beautiful Templates
							</h3>
							<p className="text-gray-600">
								Choose from mordern, professional templates that are easy to
								customize.
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
							<h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
							<p className="text-gray-600">
								Download your resume instantly as a high-quality PDF with one
								click.
							</p>
						</div>
					</div>
				</section>
			</div>
		

			<div className="text-sm b-gray-50 text-secondary text-center p-5 mt-5">
				Made with 🧡... Happy Coding
			</div>
		</div>
	);
}


export default LandingPage