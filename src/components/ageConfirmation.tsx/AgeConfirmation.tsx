import React from 'react';
import Logo from './../../assets/logo.png';

interface AgeConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CAgeConfirmation: React.FC<AgeConfirmationModalProps> = ({
	isOpen,
	onClose,
}) => {

	const handleConfirm = () => {
        localStorage.setItem('isAdultConfirmed', 'true')
		onClose();
	};

	const handleDecline = () => {
		window.location.href = 'https://www.google.com'
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-stone-950 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-stone-800 p-7 rounded-lg max-w-xl">
                <div className='flex justify-center'>
                    <img src={Logo} width={50} height={50}/>
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-extrabold ">
						Pajas<span className="dark:text-yellow-600">X</span>
					</span>
                </div>
               
				<h2 className="text-3xl text-white text-center mb-5 mt-4 font-black">Este es un Sitio Web para ADULTOS</h2>
				<p className='text-white text-center mb-5'>
					Este sitio web contiene material restringido a menores de edad, que
					incluye desnudez y representaciones explícitas de actividad sexual. Al
					entrar, afirma que tiene por lo menos 18 años de edad o la mayoría de
					edad en la jurisdicción desde que está accediendo el sitio web y que
					da consentimiento en ver contenido sexualmente explícito.
				</p>
				<div className="flex justify-around gap-2 mt-5">
					<button
						onClick={handleDecline}
						className="px-4 py-2 dark:bg-stone-500 text-white rounded hover:bg-red-700 w-full "
					>
						Soy menor de 18 años - Salir
					</button>
					<button
						onClick={handleConfirm}
						className="px-4 py-2 dark:bg-yellow-900 text-white rounded hover:bg-green-700 w-full"
					>
						Soy mayor de 18 años - Entrar
					</button>
				</div>
			</div>
		</div>
	);
};

export default CAgeConfirmation;
