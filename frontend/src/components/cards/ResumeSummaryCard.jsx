import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
    const { bgColor, setBgColor } = useState("#ffffffff");
    useEffect(() => {
        if (imgUrl) {
            getLightColorFromImage(imgUrl).then((color) => {
                setBgColor(color);
            }).catch(() => {
                setBgColor("#ffffffff");
            });
        }
    }, [imgUrl]);
    return (
		<div
			className="h-[300px] flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer"
            onClick={onSelect}
        style={{backgroundColor:bgColor}}>
			<div className="p-4">
				{imgUrl ? (
					<img src={imgUrl} alt="" className="w-[100%] h-[200px] rounded"></img>
				) : (
					<div></div>
				)}
			</div>
			<div>
				<h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
					{title}
				</h5>
				<p className="text-xs font-medium text-gray-500 mt-0.5">
					Last Updtaed:{lastUpdated}
				</p>
			</div>
		</div>
	);
};

export default ResumeSummaryCard;
