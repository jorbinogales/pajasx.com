import { IVideo } from './video';

export interface IResults {
	currentPage: number;
	total: number;
	totalPages: number;
	videos: IVideo[];
}
