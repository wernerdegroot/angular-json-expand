/// <reference path="../src/dependencies.ts" />
/// <reference path="../src/dataservices/DataService.ts" />
/// <reference path="../src/templates/TemplateFactory.ts" />

import IModule = angular.IModule;
import DataService = dataservices.DataService;
import TemplateFactory = templates.TemplateFactory;

var module: IModule = angular.module('angularJsonExpand', [])

	.service(DataService.injectAs, DataService)
	
	.service(TemplateFactory.injectAs, TemplateFactory);