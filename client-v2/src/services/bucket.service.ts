import crud from "../crud";

const bucketService = crud('arcoslearning-production').bucket;

// 792d2a1c-80f3-447c-976e-5ee6ef64c56c

export default {
	getPublicUrl: (path: string) => {
		const response = bucketService.getPublicUrl(path);
		return response.data.publicUrl;
	},
	service: bucketService
};
