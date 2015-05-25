var MyController = function (blogPostRepository, rootObject) {
	
	var self = this;	
	
	this.myFirstBlogPost = null;
	
	var myFirstBlogPostPromise = blogPostRepository.getById('my-first-blog-post', rootObject);
	myFirstBlogPostPromise.then(function (myFirstBlogPost) {
		self.myFirstBlogPost = myFirstBlogPost;
	});
	
	// Try to obtain a non-existing blog post (which, of course, will fail).
	var nonExistingBlogPostPromise = blogPostRepository.getById('does-not-exist', rootObject);
	nonExistingBlogPostPromise.catch(function () {
		console.error('An error occurred when fetching a non-existing blog post!')
	});
};

MyController.injectAs = 'MyController';