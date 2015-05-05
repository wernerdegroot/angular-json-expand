module resourcelocations {
	
	// A ResourceLocation for a certain DomainObject will provide the 
	// library with the URL associated with this DomainObject.
	export interface ResourceLocation<ID_TYPE> {
		
		getSingleUrl(id: ID_TYPE): string;
		
		getAllUrl(): string;
		
	}
	
}