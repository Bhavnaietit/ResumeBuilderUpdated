import React from "react";

const Progress = ({ progress, color, bgColor }) => {
	const arr = [0, 0, 0, 0, 0];
	// console.log(progress)
	return (
		<div className="flex gap-1.5">
			
			{[
				arr.map((_, index) => {
					return <div
						key={index}
						className={`w-2 h-2 rounded transition-all ${index < progress ? "bg-cyan-500" : "bg-cyan-100"
							}`}
						style={{
							backgroundColor:
								index < progress
									? color || "rgba(1,1,1,1)"
									: bgColor || "rgba(1,1,1,0.1)",
						}}></div>
				}),
			]}
		</div>
	);
};

export default Progress;
