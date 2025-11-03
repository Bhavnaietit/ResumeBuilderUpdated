import React from 'react'
import Input from '../../../components/inputs/Input'

const ContactInfoForm = ({contactInfo,updateSection}) => {
  return (
		<div className="mt-5 px-5">
			<h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
			<div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
				<div className="md:col-span-2">
					<Input
						label={"Address"}
						placeholder={"Short Address"}
						type={"text"}
						value={contactInfo.location || ""}
						onChange={({ target }) =>
							updateSection("location", target.value)
						}></Input>
				</div>
				<Input
					label={"Email"}
					placeholder={"bhavnaietit@gmail.com"}
					type={"email"}
					value={contactInfo.email || ""}
					onChange={({ target }) =>
						updateSection("email", target.value)
					}></Input>
				<Input
					label={"Phone Number"}
					placeholder={"6269050170"}
					type={"phone"}
					value={contactInfo.phone || ""}
					onChange={({ target }) =>
						updateSection("phone", target.value)
					}></Input>
				<Input
					label={"Linkedin"}
					placeholder={"https://linkedin.com/in/username"}
					type={"text"}
					value={contactInfo.linkedin || ""}
					onChange={({ target }) =>
						updateSection("linkedin", target.value)
					}></Input>
				<Input
					label={"Github"}
					placeholder={"https://github.com/in/username"}
					type={"github"}
					value={contactInfo.github || ""}
					onChange={({ target }) =>
						updateSection("github", target.value)
					}></Input>
				<div className='md:col-span-2'>
					<Input
						label={"Portfolio / Website"}
						placeholder={"https://yourwebsite.com"}
						type={"text"}
						value={contactInfo.website || ""}
						onChange={({ target }) =>
							updateSection("website", target.value)
						}></Input>
				</div>
			</div>
		</div>
	);
}

export default ContactInfoForm