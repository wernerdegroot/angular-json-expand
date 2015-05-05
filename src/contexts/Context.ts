module contexts {
	
	// A Context to a certain subject (which should have a type that extends
	// IdSubject<ID_TYPE>) will provide the library with the URL associated 
	// with this subject.
	export interface Context<ID_TYPE> {
		
		getSingleUrl(id: ID_TYPE): string;
		
		getAllUrl(): string;
		
	}
	
}