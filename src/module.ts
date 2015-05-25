/// <reference path="../src/dependencies.ts" />
/// <reference path="../src/dataservices/DataService.ts" />
/// <reference path="../src/dataservices/UrlBuilder.ts" />
/// <reference path="../src/objectmappers/ObjectMapperFactory.ts" />
/// <reference path="../src/converters/Converters.ts" />

import IModule = angular.IModule;
import DataService = dataservices.DataService;
import UrlBuilder = dataservices.UrlBuilder;
import ObjectMapperFactory = objectmappers.ObjectMapperFactory;
import Converters = converters.Converters;

var module: IModule = angular.module('angularJsonExpand', [])

	.service(UrlBuilder.injectAs, UrlBuilder)

	.service(DataService.injectAs, DataService)
	
	.service(ObjectMapperFactory.injectAs, ObjectMapperFactory)
	
	.service(Converters.injectAs, Converters);