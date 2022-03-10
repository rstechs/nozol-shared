interface ISearchResponse {
	enums: any;
	data: any;
	paging: {
		count: number;
		page: number;
		rowsPerPage: number;
	};
	config: any;
}

export default abstract class Controller {
	static searchResponse(data, enums, count: number, page: number = 1, limit: number = 20, config = {}): ISearchResponse {
		return {
			data,
			enums,
			paging: {
				count,
				page,
				rowsPerPage: limit,
			},
			config,
		};
	}
}
