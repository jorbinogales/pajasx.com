import React from 'react';
interface CAdBannerProps {
	name: string;
	src: string;
	width: string;
	height: string;
}
const CAd: React.FC<CAdBannerProps> = ({ name, src, width, height }) => {
	return (
		<iframe
			width={width}
			height={height}
			scrolling="no"
			name={name}
			src={src}
		></iframe>
	);
};

export default CAd;
