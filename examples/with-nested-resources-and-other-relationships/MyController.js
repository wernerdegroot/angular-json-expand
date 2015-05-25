var MyController = function (blogPostRepository, rootObject) {
	
	var self = this;	
	
	this.myFirstBlogPost = null;
	
	var myFirstBlogPostPromise = blogPostRepository.getById('my-first-blog-post', rootObject);
	myFirstBlogPostPromise.then(function (myFirstBlogPost) {
		self.myFirstBlogPost = myFirstBlogPost;
	});
};

MyController.injectAs = 'MyController';