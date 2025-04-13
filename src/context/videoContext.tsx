import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { IVideo } from '../interface/video';
import xvideosInstance from '../services/xvideosInstance';

interface VideoContextProps {
	results: IVideo[];
	search: (query: string) => void;
    loading: boolean;
	error: string | null;
	getVideos:(page?: number) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults] = useState<IVideo[]>([]);
	const [error, setError] = useState<string | null>(null);

	const search = useCallback(async (param: string) => {
		setError(null);
        setLoading(true);
		try {
			const response = await xvideosInstance.get<IVideo[]>(
				`/search?search_query=${param}`
			);
			setResults(response.data);
		} catch {
			setError('Hubo un problema al realizar la búsqueda');
		} finally {
            setLoading(false)
        }
	}, []);

	const getVideos = useCallback(async (page: number = 1) => {
		setError(null);
		setLoading(true);
		try {
			const response = await xvideosInstance.get<IVideo[]>(`/feed?page=${page}`);
			setResults(response.data);
		} catch {
			setError('Hubo un problema al cargar los videos');
		} finally {
			setLoading(false);
		}
	}, []);


	return (
		<VideoContext.Provider value={{ results, search, error, loading, getVideos }}>
			{children}
		</VideoContext.Provider>
	);
};

export const useVideo = (page?:number, title?: string) => {
	const context = useContext(VideoContext);
	if (!context) {
		throw new Error('useVideo debe ser usado dentro de un VideoProvider');
	}
	const { getVideos, search } = context;

	useEffect(() => {
		if (page !== undefined) {
			getVideos(page);
		}

		if(title !== undefined){
			search(title)
		}
	}, [page]);

	return context;
};
