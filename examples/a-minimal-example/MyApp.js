angular.module('myApp', ['angularJsonExpand'])

	.controller(MyController.injectAs, MyController)
	
	.service(EmployeeRepository.injectAs, EmployeeRepository);