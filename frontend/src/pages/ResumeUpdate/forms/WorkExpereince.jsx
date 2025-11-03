import React from 'react'
import Input from '../../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu';

const WorkExpereince = ({
	workExperience,
	updateArrayItem,
	addArrayItem,
	removeArrayItem,
}) => {
	
	return (
		<div className="px-5 pt-5">
			<h2 className="text-lg font-medium text-gray-900">WorkExpereince</h2>

			<div className="mt-4 gap-4 flex flex-col mb-3">
				{workExperience.map((experience, index) => (
					<div
						key={index}
						className="border border-gray-200/80 p-4 rounded-lg relative">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label={"Company"}
								placeholder={"ABC Corp"}
								type="text"
								value={experience.company || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "company", target.value);
								}}></Input>

							<Input
								label={"Role"}
								placeholder={"Frontend Developer"}
								type="text"
								value={experience.role || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "role", target.value);
								}}></Input>

							<Input
								label={"Start Date"}
								type="month"
								value={experience.startDate || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "startDate", target.value);
								}}></Input>

							<Input
								label={"End Date"}
								type="month"
								value={experience.endDate || ""}
								onChange={({ target }) => {
									updateArrayItem(index, "endDate", target.value);
								}}></Input>
						</div>
						<div className="mt-4">
							<label className="text-xs font-medium text-slate-600">
								Description
							</label>
							<textarea
								placeholder="what did you do in this role"
								className="form-input w-full mt-1"
								rows={3}
								value={experience.description || ""}
								onChange={({ target }) =>
									updateArrayItem(index, "description", target.value)
								}></textarea>
						</div>
						{workExperience.length > 1 && (
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
							company: "",
							role: "",
							startDate: "",
							endStart: "",
							description: "",
						})
					}>
					<LuPlus></LuPlus>
					Add WorkExpereince
				</button>
			</div>
		</div>
	);
};

export default WorkExpereince