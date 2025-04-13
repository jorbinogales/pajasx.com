import React, { useEffect, useState } from 'react';
import { CNavbar } from '../components/navbar';
import { VideoProvider } from '../context/videoContext';
import { Helmet } from 'react-helmet';
import { CAgeConfirmation } from '../components/ageConfirmation.tsx';
const Layout: React.FC<any> = ({ children }) => {
	const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);

  useEffect(() => {
    const isConfirmed = localStorage.getItem('isAdultConfirmed');
    if (!isConfirmed) {
      setIsAgeModalOpen(true); 
    }
  }, []);

	const closeModal = () => {
		setIsAgeModalOpen(false);
	};

	return (
		<VideoProvider>
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
        <meta name="google-adsense-account" content="ca-pub-9301893608040741"></meta>
			</Helmet>
			<div className="flex flex-col min-h-screen bg-stone-900">
				{/* Navbar fijo */}
				<CNavbar />

				{/* Modal de confirmación de edad */}
				<CAgeConfirmation isOpen={isAgeModalOpen} onClose={closeModal} />

				{/* Contenido principal */}
				{!isAgeModalOpen && (
					<main className="flex-grow mt-5">
						{' '}
						{/* mt-16 para evitar que el contenido se solape con el navbar fijo */}
						{children}
					</main>
				)}

				{/* Footer (Opcional) */}
				<footer className="bg-gray-800 text-white p-4 mt-8">
					<div className="container mx-auto text-center">
						<p>&copy; 2025 Video Platform. Todos los derechos reservados.</p>
					</div>
				</footer>
			</div>
		</VideoProvider>
	);
};

export default Layout;
