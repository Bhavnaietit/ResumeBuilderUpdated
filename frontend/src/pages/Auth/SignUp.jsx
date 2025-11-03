import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
	   const {updateUser } =useContext(UserContext)
	const [profilePic, setProfilePic] = useState(null);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const handleSignUp = async (e) => {
		e.preventDefault();

		if (!fullName) {
			setError("Please enter full name.");
			return;
		}
		if (!validateEmail(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (!password) {
			setError("please enter the password");
			return;
		}
		setError("");

		//   signup api call
		try {
			// upload image if response
			
			let profileImageUrl="";
			if (profilePic) {
				const imgUploadRes = await uploadImage(profilePic);
				profileImageUrl = imgUploadRes.imageUrl || "";

			}
			const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
				email,
				password,
				name: fullName,
				profileImageUrl,
			});

			const { token } = response.data;
			if (token) {
				localStorage.setItem("token", token);
				updateUser(response.data);
				navigate("/dashboard");
			}
		} catch (err) {
		
			if (err.response && err.response.data.message) {
				setError(err.response.data.message);
			} else {
				setError("Something went wrong. Please try again!");
			}
		}
	};

	return (
		<div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
			<h3 className="text-lg font-semibold text-black">Create An Account</h3>
			<p className="text-xs text-slate-700 mt-[5px] mb-6">
				Join us today by enetering your details below.
			</p>

			<form onSubmit={handleSignUp}>
				<ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
				<div className="grid grid-cols-1 md:grid-cols-1 gap-2">
					
					<Input
						value={fullName}
						onChange={({ target }) => setFullName(target.value)}
						label="Full Name"
						placeholder="john"
						type="text"></Input>

					<Input
						value={email}
						onChange={({ target }) => setEmail(target.value)}
						label="Email Address"
						placeholder="john@example.com"
						type="text"></Input>

					<Input
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						label="Password"
						placeholder="min 8 Characters"
						type="password"></Input>
				</div>

				{error && <p className="text-red-500 text-center text-xs pb-2.5">{error}</p>}
				<button
					type="submit"
					className="btn-primary">
					SIGN UP
				</button>
				<p className="text-[13px] text-slate-800 mt-3">
					Already have an account?{" "}
					<button
						className="font-medium text-primary underline cursor-pointer"
						onClick={() => {
							setCurrentPage("login");
						}}>
						Login
					</button>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
