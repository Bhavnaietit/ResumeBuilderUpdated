import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuTrash2, LuPlus } from "react-icons/lu";

const Education = ({
	educations,
	updateArrayItem,
	addArrayItem,
	removeArrayItem,
}) => {
	console.log(educations)
  return (
		<div className="px-5 pt-5">
			<h2 className="text-lg font-medium text-gray-900">Educations</h2>

			<div className="mt-4 gap-4 flex flex-col mb-3">
				{educations.map((education, index) => (
					<div
						key={index}
						className="border border-gray-200/80 p-4 rounded-lg relative">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label={"Degree"}
								placeholder={"B.tech"}
								type="text"
								value={education.degree || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "degree", target.value);
								}}></Input>

							<Input
								label={"Institution"}
								placeholder={"IET DAVV"}
								type="text"
								value={education.institution || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "institution", target.value);
								}}></Input>

							<Input
								label={"Start Date"}
								type="month"
								value={education.startDate || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "startDate", target.value);
								}}></Input>

							<Input
								label={"End Date"}
								type="month"
								value={education.endDate || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "endDate", target.value);
								}}></Input>
						</div>
						
						{educations.length > 1 && (
							<button
								type="button"
								className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer "
								onClick={() => removeArrayItem(index)}>
								<LuTrash2></LuTrash2>
							</button>
						)}
					</div>
				))}

				<button
					type="button"
					className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
					onClick={() =>
						addArrayItem({
							degree: "",
							institution: "",
							startDate: "",
							endStart: "",
							
						})
					}>
					<LuPlus></LuPlus>
					Add Education
				</button>
			</div>
		</div>
	);
}

export default Education