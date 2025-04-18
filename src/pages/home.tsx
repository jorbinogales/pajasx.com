import React, { useState } from 'react';
import { CVideo } from '../components/video';
import { Link } from 'react-router-dom';
import { CSkeletonLoader } from '../components/skeleton';
import { useVideo } from '../context/videoContext';
import { CPagination } from '../components/pagination';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { IResults } from '../interface/results';
import CAdBanner from '../components/juicyAd/adBanner';

const Home: React.FC = () => {
	const { search } = useParams();
	const { pagenumber } = useParams();
	const page = Number(pagenumber || 1);

	const [response, setResponse] = useState<IResults>();
	const { results, loading } = useVideo({
		page: page,
		title: search,
	});

	const SKELETONS_LOADERS = new Array(12)
		.fill(null)
		.map((_) => <CSkeletonLoader />);

	React.useEffect(() => {
		if (results) {
			setResponse(results);
		}
	}, [results]);

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
			<div className="block md:hidden" style={{ transform: 'scale(0.7)' }}>
				<CAdBanner />
			</div>
			<div className="hidden md:block">
				<CAdBanner />
			</div>
			{page > 1 || search ? (
				<div className="gap-5 p-5 mx-auto">
					<CPagination
						totalPages={response?.totalPages ? response.totalPages : 1}
						pageNumber={response?.currentPage ? response.currentPage : 1}
						search={search}
					></CPagination>
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
					: response?.videos.length === 0
					? SKELETONS_LOADERS
					: response?.videos.map((video, index) => (
							<div key={index} className="cursor-pointer">
								{/* Usamos el embed_url como parte de la URL */}
								<Link to={`/${video.slug}`}>
									<CVideo video={video} />
								</Link>
							</div>
					  ))}
			</div>
			<div className="gap-5 p-5 mx-auto">
				<CPagination
					totalPages={response?.totalPages ? response.totalPages : 1}
					pageNumber={response?.currentPage ? response.currentPage : 1}
					search={search}
				></CPagination>
			</div>
			<div className="block md:hidden" style={{ transform: 'scale(0.7)' }}>
				<CAdBanner />
			</div>
			<div className="hidden md:block">
				<CAdBanner />
			</div>
		</>
	);
};

export default Home;
