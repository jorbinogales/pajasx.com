import React, { useEffect, useRef } from 'react';

const CAdBanner: React.FC = () => {
	const adRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Inserta el <ins> dinámicamente
		if (adRef.current) {
			const ins = document.createElement('ins');
			ins.id = '1088204';
			ins.setAttribute('data-width', '468');
			ins.setAttribute('data-height', '60');
			adRef.current.appendChild(ins);
		}

		// Carga el script jads.js
		const scriptMain = document.createElement('script');
		scriptMain.type = 'text/javascript';
		scriptMain.async = true;
		scriptMain.setAttribute('data-cfasync', 'false');
		scriptMain.src = 'https://poweredby.jads.co/js/jads.js';

		document.body.appendChild(scriptMain);

		// Push del adzone después de que cargue el script
		scriptMain.onload = () => {
			if (typeof (window as any).adsbyjuicy === 'undefined') {
				(window as any).adsbyjuicy = [];
			}
			(window as any).adsbyjuicy.push({ adzone: 1088204 });
		};

		// Limpieza
		return () => {
			document.body.removeChild(scriptMain);
			if (adRef.current) {
				adRef.current.innerHTML = '';
			}
		};
	}, []);

	return (
		<div
			ref={adRef}
			className="flex justify-center my-4"
			style={{ textAlign: 'center', maxWidth: '468px', margin: '0 auto' }}
		/>
	);
};

export default CAdBanner;
