import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { IVideo } from '../interface/video';
import xvideosInstance from '../services/xvideosInstance';
import { IResults } from '../interface/results';

interface VideoContextProps {
	results: IResults | undefined;
	search: (query: string, page?: number) => void;
	actualVideo: IVideo | undefined;
	loading: boolean;
	error: string | null;
	getVideos: (page?: number) => void;
	findBySlug: (slug: string) => void;
	getSimilarVideos: (slug: string, page?: number) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults] = useState<IResults>();
	const [actualVideo, setActualVideo] = useState<IVideo>();
	const [error, setError] = useState<string | null>(null);

	const search = useCallback(async (param: string, page: number = 1) => {
		setError(null);
		setLoading(true);
		try {
			const response = await xvideosInstance.get<IResults>(
				`video?search=${param}&page=${page}`
			);
			setResults(response.data);
		} catch {
			setError('Hubo un problema al realizar la búsqueda');
		} finally {
			setLoading(false);
		}
	}, []);

	const findBySlug = useCallback(async (slug: string) => {
		setError(null);
		setLoading(true);
		try {
			const response = await xvideosInstance.get<IVideo>(`video/${slug}`);
			setActualVideo(response.data);
		} catch {
			setError('Hubo un problema al realizar la búsqueda');
		} finally {
			setLoading(false);
		}
	}, []);

	const getSimilarVideos = useCallback(
		async (slug: string, page: number = 1) => {
			setError(null);
			setLoading(true);
			try {
				const response = await xvideosInstance.get<IResults>(
					`video/${slug}/similar?page=${page}`
				);
				setResults(response.data);
			} catch {
				setError('Hubo un problema al cargar los videos');
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const getVideos = useCallback(async (page: number = 1) => {
		setError(null);
		setLoading(true);
		try {
			const response = await xvideosInstance.get<IResults>(
				`video?page=${page}`
			);
			setResults(response.data);
		} catch {
			setError('Hubo un problema al cargar los videos');
		} finally {
			setLoading(false);
		}
	}, []);
	return (
		<VideoContext.Provider
			value={{
				results,
				search,
				actualVideo,
				error,
				loading,
				getVideos,
				findBySlug,
				getSimilarVideos,
			}}
		>
			{children}
		</VideoContext.Provider>
	);
};

interface UseVideoProps {
	page?: number;
	title?: string;
	slug?: string;
}

export function useVideo({ page, title, slug }: UseVideoProps) {
	const context = useContext(VideoContext);
	if (!context) {
		throw new Error('useVideo debe ser usado dentro de un VideoProvider');
	}
	const { getVideos, search, findBySlug, getSimilarVideos } = context;

	useEffect(() => {
		if (page !== undefined && slug === undefined) {
			getVideos(page);
		}

		if (title !== undefined) {
			search(title, page);
		}

		if (slug !== undefined) {
			findBySlug(slug);
			getSimilarVideos(slug, page);
		}
	}, [page]);

	return context;
}
