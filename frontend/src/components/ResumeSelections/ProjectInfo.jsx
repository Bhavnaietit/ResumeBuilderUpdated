import React from 'react'
import { LuExternalLink, LuGithub } from 'react-icons/lu';
import ActionLink from './ActionLink';

const ProjectInfo = ({title,githubLink,liveDemoUrl,bgColor,description,isPreview}) => {
  return (
		<div className="mb-5">
			<h3
				className={`${
					isPreview ? "text-xs" : "text-base"
				} font-semibold text-gray-900`}>
				{title}
			</h3>
			<p className="text-sm text-gray-700 font-medium mt-1">{description}</p>
			<div className="flex items-center gap-3 mt-2">
				{githubLink && (
					<ActionLink
						icon={<LuGithub />}
						link={githubLink}
						bgColor={bgColor}></ActionLink>
				)}
				{githubLink && (
					<ActionLink
						icon={<LuExternalLink />}
						link={liveDemoUrl}
						bgColor={bgColor}></ActionLink>
				)}
			</div>
		</div>
	);
}

export default ProjectInfo