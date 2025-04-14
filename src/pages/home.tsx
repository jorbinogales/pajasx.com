import React, { useState } from 'react';
import { CVideo } from '../components/video';
import { Link } from 'react-router-dom';
import { CSkeletonLoader } from '../components/skeleton';
import { IVideo } from '../interface/video';
import { useVideo } from '../context/videoContext';
import { CPagination } from '../components/pagination';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
	const { pagenumber } = useParams();
	const page = Number(pagenumber || 1);

	const [videos, setVideos] = useState<IVideo[]>([]);
	const { results, loading } = useVideo(page);

	const SKELETONS_LOADERS = new Array(12)
		.fill(null)
		.map((_) => <CSkeletonLoader />);

	React.useEffect(() => {
		if (results) {
			setVideos(results);
		}
	}, [results]);

	React.useEffect(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://poweredby.jads.co/js/jads.js';
		script.async = true;
		script.setAttribute('data-cfasync', 'false');
		document.body.appendChild(script);

		const adScript = document.createElement('script');
		adScript.type = 'text/javascript';
		adScript.setAttribute('data-cfasync', 'false');
		adScript.async = true;
		adScript.innerHTML =
			"(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1088204});";
		document.body.appendChild(adScript);

		return () => {
			document.body.removeChild(script);
			document.body.removeChild(adScript);
		};
	}, []);

	return (
		<>
			<Helmet>
				<title>PajasX - Los mejores videos para adultos</title>
				<meta
					name="description"
					content="Explora PajasX, la mejor selección de videos XXX gratis y en HD. Disfruta contenido premium sin límites."
				/>
				<meta
					name="keywords"
					content="pajasx, porno, videos xxx, contenido adulto, gratis, hd"
				/>
				<meta name="robots" content="index, follow" />
				<meta property="og:title" content="PajasX - Videos XXX Gratis" />
				<meta
					property="og:description"
					content="Explora una variedad de videos porno gratis en PajasX."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.pajasx.com/" />
				<meta
					property="og:image"
					content="https://www.pajasx.com/og-image.jpg"
				/>
				<meta
					name="juicyads-site-verification"
					content="28cd7ccf22cf0e282316ae57d22bd233"
				/>
			</Helmet>
			{page > 1 ? (
				<div className="gap-5 p-5 mx-auto">
					<CPagination totalPages={99999} pageNumber={page}></CPagination>
				</div>
			) : (
				<></>
			)}
			<div
				className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 p-5 mx-auto"
				style={{ maxWidth: '1800px' }}
			>
				{loading
					? SKELETONS_LOADERS
					: videos.length === 0
					? SKELETONS_LOADERS
					: videos.map((video, index) => (
							<div key={index} className="cursor-pointer">
								{/* Usamos el embed_url como parte de la URL */}
								<Link
									to={`/video/${video.name.replace(/ /g, '_')}`}
									state={{ video }}
								>
									<CVideo video={video} />
								</Link>
							</div>
					  ))}
			</div>
			<div className="gap-5 p-5 mx-auto">
				<CPagination totalPages={99999} pageNumber={page}></CPagination>
			</div>
			<div
				className="juicy-ad-container justify-center"
				style={{ textAlign: 'center', margin: 'auto', maxWidth: '468px' }}
			>
				<ins id="1088204" data-width="468" data-height="60"></ins>
			</div>
		</>
	);
};

export default Home;
