/// <reference path="../../src/domainobjects/DomainObject.ts" />

module dataservices {
	
	import DomainObject = domainobjects.DomainObject;
	
	export class MyDomainObject implements DomainObject {
		
		getId(): number|string {
			return 14;
		}
	}
	
}