import React from 'react'
import { LuTrash2 ,LuPlus} from 'react-icons/lu';
import Input from '../../../components/inputs/Input';
const Certifications = ({
	certifications,
	updateArrayItem,
	addArrayItem,
	removeArrayItem,
}) => {
    return (
			<div className="mt-5 px-5">
				<h2 className="text-lg font-semibold text-gray-900">certifications</h2>
				<div className="mt-4 flex flex-col gap-4 mb-3">
					{certifications.map((certificate, index) => (
						<div key={index} className="border p-2 border-gray-200/80 rounded-lg relative">
							
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Input
										label="Certificate Title"
										placeholder={"Fullstack Web Developer"}
										type="text"
										value={certificate.title || ""}
										onChange={({ target }) => {
											updateArrayItem(index, "title", target.value);
										}}></Input>
									<Input
										label="Issuer"
										placeholder={"Courses /Google /etc."}
										type="text"
										value={certificate.issuer || ""}
										onChange={({ target }) => {
											updateArrayItem(index, "issuer", target.value);
										}}></Input>
									<Input
										label="Year"
										placeholder={"2024"}
										type="text"
										value={certificate.year || ""}
										onChange={({ target }) => {
											updateArrayItem(index, "year", target.value);
										}}></Input>
							</div>
							{certifications.length > 1 && (
								<button
									type="button"
									className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
									onClick={() => {
										removeArrayItem(index);
									}}>
									<LuTrash2></LuTrash2>
								</button>
							)}
						</div>))}
					<button
						type="button"
						className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer "
						onClick={() => {
							addArrayItem({
								title: "",
								issuer: "",
								year: "",
							});
						}}>
						<LuPlus></LuPlus>
						Add Certificate
					</button>
				</div>
			</div>
		);
};

export default Certifications