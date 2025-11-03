import React from "react";
import Progress from "../Progress";
// import Progress from "../Progress";

const SkillInfo = ({ skill, progress, accentColor, bgColor }) => {
	// console.log(<Progress progress={3} color={accentColor} bgColor={bgColor}></Progress>);
	return (
		<div className="flex items-center gap-3">
			<p className={`text-[12px] font-semibold text-gray-900`}>{skill}</p>
			{progress > 0 && (
				<Progress
					progress={(progress / 100) * 5}
					color={accentColor}
					bgColor={bgColor}></Progress>
			)}
		</div>
	);
};
const SkillSection = ({ skills, accentColor, bgColor }) => {
	return (
		<div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-5">
			{skills.map((skill, index) => {
				return (
					<SkillInfo
						key={index}
						skill={skill.name}
						progress={skill.progress}
						accentColor={accentColor}
						bgColor={bgColor}></SkillInfo>
				);
			})}
		</div>
	);
};

export default SkillSection;
