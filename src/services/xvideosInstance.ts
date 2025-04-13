import axios, {
	InternalAxiosRequestConfig,
	AxiosError,
	AxiosHeaders,
} from 'axios';

const xvideosApiUrl = 'https://api.adultdatalink.com/xvideos';

const xvideosInstance = axios.create({
	baseURL: xvideosApiUrl,
});

xvideosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = new AxiosHeaders({
				Authorization: `Bearer ${token}`,
				...config.headers,
			});
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

xvideosInstance.interceptors.response.use(
	(response: any) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			window.location.href = '/sign-in';
		}
		return Promise.reject(error);
	}
);

export default xvideosInstance;
