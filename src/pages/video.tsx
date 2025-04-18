// Video.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { IVideo } from '../interface/video';
import { useVideo } from '../context/videoContext';
import { CSkeletonLoader } from '../components/skeleton';
import { CVideo } from '../components/video';
import { IResults } from '../interface/results';
import { Helmet } from 'react-helmet';
import CAd from '../components/ad/CAd';

const VideoPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();

	const navigate = useNavigate();
	const location = useLocation();
	const [video, setVideo] = useState<IVideo>();
	const [videoList, setVideoList] = useState<IResults>();

	const { actualVideo } = useVideo({
		slug: slug,
	});
	const { results, loading } = useVideo({
		title: actualVideo?.name,
	});

	React.useEffect(() => {
		if (actualVideo) {
			setVideo(actualVideo);
		}
	}, [actualVideo]);

	React.useEffect(() => {
		if (results) {
			setVideoList(results);
		}
	}, [results]);

	const SKELETONS_LOADERS = new Array(12)
		.fill(null)
		.map((_) => <CSkeletonLoader />);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	if (!actualVideo) {
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
			{video?.name && (
				<Helmet>
					<title>{video.name} - Pajasx</title>
					<meta name="description" content={video.name} />
					<meta property="og:title" content={video.name} />
					<meta property="og:description" content={video.name} />
					<meta property="og:image" content={video.thumbnailUrl} />
					<meta property="og:type" content="video" />
				</Helmet>
			)}
			<div
				className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-4 mx-auto"
				style={{ maxWidth: '1800px' }}
			>
				{/* Video - ocupa 3/4 en pantallas grandes */}
				<div className="xl:col-span-10">
					<h2 className="text-xl font-bold mb-4 text-white">{video?.name}</h2>
					<p className="text-xs text-white mt-2">
						{video?.views} Views |
						<span className="m-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">
							{video?.time}
						</span>
					</p>
					<iframe
						style={{ marginTop: '35px' }}
						src={decodeURIComponent(video?.embedUrl ?? '')}
						className="w-full h-[30vh] md:h-[70vh] rounded-lg shadow-md"
						allowFullScreen
					/>
				</div>

				{/* Anuncios - ocupa 1/4 */}
				<div className="hidden xl:block xl:col-span-2">
					<h2 className="text-2xl font-bold mb-4 text-white">Anuncios</h2>
					<div
						className="justify-center"
						style={{ maxWidth: '300px', margin: 'auto', marginTop: '70px' }}
					>
						<CAd
							width="300"
							height="250"
							src="//a.adtng.com/get/10002799?ata=jorbinogales001"
							name="spot_id_10002799"
						/>
					</div>
					<div
						className="justify-center"
						style={{ maxWidth: '300px', margin: 'auto', marginTop: '70px' }}
					>
						<CAd
							width="300"
							height="300"
							src="//a.adtng.com/get/10002798?ata=jorbinogales001"
							name="spot_id_10002798"
						/>
					</div>
				</div>
			</div>
			<div
				className="hidden md:block justify-center"
				style={{ maxWidth: '900px', margin: 'auto', marginTop: '70px' }}
			>
				<CAd
					width="900"
					height="250"
					src="//a.adtng.com/get/10002800?ata=jorbinogales001"
					name="spot_id_10002800"
				/>
			</div>
			<div className="mx-auto gap-1 p-5" style={{ maxWidth: '1800px' }}>
				<p className="text-xl text-gray-900 dark:text-white font-bold">
					Videos relacionados
				</p>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 m-3 mx-auto">
					{loading
						? SKELETONS_LOADERS
						: videoList?.videos.length === 0
						? SKELETONS_LOADERS
						: videoList?.videos.map((video, index) => (
								<div key={index} className="cursor-pointer">
									<Link reloadDocument to={`/${video.slug}`}>
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
