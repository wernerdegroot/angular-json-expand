/// <reference path="../../src/domainobjects/DomainObject.ts" />

module dataservices {
	
	import DomainObject = domainobjects.DomainObject;
	
	export class MyDomainObject implements DomainObject<number> {
		id: number = 14;
	}
	
}