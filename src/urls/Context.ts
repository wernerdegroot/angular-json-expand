module urls {
	
	export interface Context<ID_TYPE> {
		
		getUrl(id: ID_TYPE): string;
		
	}
	
}