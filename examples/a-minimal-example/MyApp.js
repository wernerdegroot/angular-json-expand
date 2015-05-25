angular.module('myApp', ['angularJsonExpand'])

	.constant(domainobjects.RootObject.injectAs, new domainobjects.RootObject("http://localhost:8000/api"))

	.controller(MyController.injectAs, MyController)
	
	.service(BlogPostRepository.injectAs, BlogPostRepository);