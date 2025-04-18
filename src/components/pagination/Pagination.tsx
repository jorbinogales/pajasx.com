import React from 'react';

interface PaginationProps {
	totalPages: number;
	pageNumber: number;
	search?: string;
}

const CPagination: React.FC<PaginationProps> = ({
	totalPages,
	pageNumber,
	search,
}) => {
	const currentPage = Number(pageNumber || 1);

	const handlePageClick = (pageNumber: number) => {
		if (search) {
			window.location.href = `/page/${search}/${pageNumber}`;
		} else {
			window.location.href = `/page/${pageNumber}`;
		}
	};

	const generatePages = () => {
		const pages: (number | string)[] = [];
		if (totalPages <= 10) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 4) {
				pages.push(1, 2, 3, 4, 5, '...', totalPages);
			} else if (currentPage >= totalPages - 3) {
				pages.push(
					1,
					'...',
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages
				);
			} else {
				pages.push(
					1,
					'...',
					currentPage - 1,
					currentPage,
					currentPage + 1,
					'...',
					totalPages
				);
			}
		}
		return pages;
	};

	return (
		<nav className="flex justify-center mt-4">
			<ul className="flex items-center -space-x-px h-10 text-base">
				{generatePages().map((page, index) => {
					const isHiddenOnMobile =
						page === 1 || page === '...' || page === totalPages;

					return page === '...' ? (
						<li
							key={index}
							className={`${isHiddenOnMobile ? 'hidden md:block' : ''}`}
						>
							<span className="px-4 text-gray-500">...</span>
						</li>
					) : (
						<li
							key={index}
							className={`${isHiddenOnMobile ? 'hidden md:block' : ''}`}
						>
							<button
								onClick={() => handlePageClick(page as number)}
								className={`flex items-center justify-center px-4 h-10 m-2 cursor-pointer ${
									page === currentPage
										? 'dark:bg-yellow-900 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-100'
								}`}
							>
								{page}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default CPagination;
