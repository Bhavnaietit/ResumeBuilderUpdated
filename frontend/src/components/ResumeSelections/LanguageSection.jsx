import React from 'react'
import Progress from '../Progress';

const LanguageInfo = ({ language, progress, color, bgColor }) => {
	// console.log(progress)
	return (
		<div className="flex items-center justify-between gap-3">
			<p className={`text-[12px] font-semibold text-gray-900`}>{language}</p>
			{progress > 0 && (
				<Progress
					progress={(progress/100)*5}
					color={color}
					bgColor={bgColor}
				>
				</Progress>
			)}
		</div>
	);
};
const LanguageSection = ({ langauges, accentColor, bgColor }) => {
    return (
			<div className="flex items-center justify-between flex-col gap-2">
			{langauges?.map((language, index) => {
				// console.log(language)
				return (
					<LanguageInfo
						key={index}
						language={language.name}
						progress={language.progress}
						color={accentColor}
						bgColor={bgColor}></LanguageInfo>
				);
			})}
			</div>
		);
};


export default LanguageSection