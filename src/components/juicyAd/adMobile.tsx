import React, { useEffect, useRef } from 'react';

const CAdMobile: React.FC = () => {
	const adRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Insertar <ins> dinámicamente solo si no existe
		if (adRef.current && !adRef.current.querySelector('ins')) {
			const ins = document.createElement('ins');
			ins.id = '1088640';
			ins.setAttribute('data-width', '300');
			ins.setAttribute('data-height', '262');
			adRef.current.appendChild(ins);
		}

		// Verificar si el script ya existe
		const isScriptLoaded = document.querySelector(
			'script[src="https://poweredby.jads.co/js/jads.js"]'
		);

		const loadAd = () => {
			if (typeof (window as any).adsbyjuicy === 'undefined') {
				(window as any).adsbyjuicy = [];
			}
			(window as any).adsbyjuicy.push({ adzone: 1088640 });
		};

		if (!isScriptLoaded) {
			const scriptMain = document.createElement('script');
			scriptMain.type = 'text/javascript';
			scriptMain.async = true;
			scriptMain.setAttribute('data-cfasync', 'false');
			scriptMain.src = 'https://poweredby.jads.co/js/jads.js';

			scriptMain.onload = loadAd;
			document.body.appendChild(scriptMain);
		} else {
			loadAd();
		}

		// No eliminamos el script al salir porque podría estar en uso por otros componentes

		// Solo limpiamos el contenido del div (por si se desmonta)
		return () => {
			if (adRef.current) {
				adRef.current.innerHTML = '';
			}
		};
	}, []);

	return <div ref={adRef} className="flex justify-center my-4" />;
};

export default CAdMobile;
