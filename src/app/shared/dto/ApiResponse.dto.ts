export interface ApiResponse<Model> {
	code: string;
	data: Array<Model>;
}