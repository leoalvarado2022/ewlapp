export interface ApiResponse<Model> {
	code: string;
	data: Array<Model>;
}

export interface ApiResponseV1<Model> {
	response: {
		code: string;
		data: Array<Model>;
	}
}