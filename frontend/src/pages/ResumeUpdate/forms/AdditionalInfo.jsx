import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import RatingInput from '../../../components/ResumeSelections/RatingInput';
const AdditionalInfo = ({langauges,interests,updateArrayItem,addArrayItem,removeArrayItem}) => {
  return (
		<div className="mt-5 px-5">
			<h2 className="text-lg text-gray-900 font-medium">Additional Info</h2>
			{/* {langauges Section} */}
			<div className="mt-6">
				<h3 className="text-sm font-semibold text-gray-700 mb-2">langauges</h3>
				<div className="flex flex-col gap-4">
					{langauges?.map((language, index) => (
						<div
							key={index}
							className="border border-gray-200 p-4 rounded-lg relative">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
								<Input
									label="language"
									placeholder={"e.g. English"}
									value={language.name || ""}
									onChange={({ target }) => {
										updateArrayItem("langauges", index, "name", target.value);
									}}></Input>
								<div>
									<label className="text-xs font-medium text-slate-600 mb-7 block">
										Proficiency
									</label>
									<RatingInput
										value={language.progress}
										onChange={(value) => {
											updateArrayItem("langauges", index, "progress", value);
										}}
										total={5}
										activeColor="#0ea5e9"
										inactiveColor="#e0f2fe"></RatingInput>
								</div>
							</div>
							{langauges.length > 1 && (
								<button
									type="button"
									className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
									onClick={() => removeArrayItem("langauges", index)}>
									<LuTrash2></LuTrash2>
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						className="self-start flex items-center gap-2 px-4 py-2 rounded bg-pink-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
						onClick={() =>
							addArrayItem("langauges", { name: "", progress: 0 })
						}>
						<LuPlus></LuPlus>
						Add Language
					</button>
				</div>
			</div>
			
			{/* interests */}
			<div className="mt-8 mb-4">
				<h3 className="text-sm font-semibold text-gray-700">Interests</h3>
				<div className="flex flex-col">
					{interests?.map((interest, index) => (
						<div
							key={index}
							className="relative rounded-lg">
							<Input
								placeholder={"eg. Reading"}
								value={interest || ""}
								onChange={({ target }) => {
									updateArrayItem("interests", index, null, target.value);
								}}></Input>
							{interests.length > 1 && (
								<button
									type="button"
									className="absolute top-6.5 right-3 text-sm text-red-600 hover:underline cursor-pointer"
									onClick={() => {
										removeArrayItem("interests", index);
									}}>
									<LuTrash2></LuTrash2>
								</button>
							)}
						</div>
					))}
					<button
					  type="button"
					  
						className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-200 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
						onClick={() => {
							addArrayItem("interests", "");
						}}>
						<LuPlus></LuPlus>
						Add Interests
					</button>
				</div>
			</div>
		</div>
	);
}

export default AdditionalInfo