import React, { useState } from 'react';
import NotFound from '../../assets/notfound.jpg';
import { IVideo } from '../../interface/video';

const CVideo: React.FC<{ video: IVideo }> = ({ video }) => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<div className="overflow-hidden hover:scale-105 transition-transform cursor-pointer">
			<img
				src={imageError ? NotFound : NotFound}
				alt={`Video de pajasx  - ${video.name}`}
				loading="lazy"
				className="w-full h-40 object-cover"
				onError={handleImageError}
			/>

			<div className="p-2">
				<h3 className="text-sm font-semibold text-white no-underline">
					{video.name}
				</h3>
				<p className="text-xs text-gray-500 mt-2">
					{video.views} Views |
					<span className="m-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">
						{video.duration}
					</span>
				</p>
			</div>
		</div>
	);
};

export default CVideo;
