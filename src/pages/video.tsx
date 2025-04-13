// Video.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { IVideo } from '../interface/video';
import { useVideo } from '../context/videoContext';
import { CSkeletonLoader } from '../components/skeleton';
import { CVideo } from '../components/video';

const VideoPage: React.FC = () => {
	const { name } = useParams<{ name: string }>(); 
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as { video?: IVideo };
	const video = state?.video;

	const [videos, setVideos] = useState<IVideo[]>([]);
	const { results, loading } = useVideo(1, video?.name);

	const SKELETONS_LOADERS = new Array(12)
		.fill(null)
		.map((_, i) => <CSkeletonLoader />);

	React.useEffect(() => {
		if (results) {
			setVideos(results);
		}
	}, [results]);

	useEffect(() => {
		window.scrollTo(0, 0); 
	  }, [location]);
	

	if (!name || !video) {
		return (
			<div className="text-center mt-10 text-gray-600">
				<p>Video no encontrado.</p>
				<button onClick={() => navigate('/')} className="text-blue-500">
					Regresar a la página principal
				</button>
			</div>
		);
	}

	return (
		<>
			<div
				className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 mx-auto"
				style={{ maxWidth: '1800px' }}
			>
				{/* Video - ocupa 3/4 en pantallas grandes */}
				<div className="md:col-span-3">
					<h2 className="text-2xl font-bold mb-4 text-white">{video.name}</h2>
					<iframe
						src={decodeURIComponent(video.embed_url)}
						className="w-full h-[70vh] rounded-lg shadow-md"
						allowFullScreen
					></iframe>
				</div>

				{/* Anuncios - ocupa 1/4 */}
				<div className="md:col-span-1"></div>
			</div>
			<div className='mx-auto gap-1 p-5' style={{ maxWidth: '1800px' }}>
				<p className="text-xl text-gray-900 dark:text-white">Videos relacionados</p>
				<div
					className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 m-3 mx-auto"
				>
					{loading
						? SKELETONS_LOADERS
						: videos.length === 0
						? SKELETONS_LOADERS
						: videos.map((video, index) => (
								<div key={index} className="cursor-pointer">
									{/* Usamos el embed_url como parte de la URL */}
									<Link to={`/video/${video.name.replace(/ /g, '_')}`} state={{ video }}>
										<CVideo video={video} />
									</Link>
								</div>
						  ))}
				</div>
			</div>
		</>
	);
};

export default VideoPage;
