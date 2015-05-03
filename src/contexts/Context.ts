module contexts {
	
	export interface Context<ID_TYPE> {
		
		getSingleUrl(id: ID_TYPE): string;
		
		getAllUrl(): string;
		
	}
	
}