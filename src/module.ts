/// <reference path="../src/dependencies.ts" />
/// <reference path="../src/dataservices/DataService.ts" />
/// <reference path="../src/objectmappers/ObjectMapperFactory.ts" />

import IModule = angular.IModule;
import DataService = dataservices.DataService;
import ObjectMapperFactory = objectmappers.ObjectMapperFactory;

var module: IModule = angular.module('angularJsonExpand', [])

	.service(DataService.injectAs, DataService)
	
	.service(ObjectMapperFactory.injectAs, ObjectMapperFactory);