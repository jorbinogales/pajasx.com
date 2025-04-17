import React, { useState } from 'react';
import Logo from './../../assets/logo.png';

const CNavbar: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		window.location.href = `/page/${searchQuery}/1`;
	};

	const handlePageClick = () => {
		window.location.href = `/`;
	};

	return (
		<nav className="bg-stone-900 border-gray-200 dark:bg-stone-900">
			<div
				className="flex flex-wrap items-center justify-between mx-auto p-4"
				style={{ maxWidth: '1800px' }}
			>
				<h1
					onClick={() => handlePageClick()}
					className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
				>
					<img src={Logo} className="h-8" alt="pajasx Logo" />
					<span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-extrabold ">
						Pajas<span className="dark:text-yellow-600">X</span>
					</span>
				</h1>
				<div className="flex md:order-2">
					<div className="relative block">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
							<span className="sr-only">Search icon</span>
						</div>
						<form onSubmit={handleSearchSubmit} className="w-full">
							<input
								type="text"
								id="search-navbar"
								className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</form>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default CNavbar;
