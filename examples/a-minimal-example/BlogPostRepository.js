var BlogPostRepository = function (objectMapperFactory, dataService) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.blogPostObjectMapper = objectMapperFactory.create(BlogPost.createEmpty)
        .defaultExchanger('title', 'title')
        .defaultExchanger('full-text', 'fullText');
};

BlogPostRepository.prototype = Object.create(repositories.DefaultRepository.prototype);
BlogPostRepository.prototype.constructor = BlogPostRepository;
BlogPostRepository.injectAs = 'blogPostRepository';

BlogPostRepository.prototype.getObjectMapper = function () {
    return this.blogPostObjectMapper;
};

BlogPostRepository.prototype.getSlug = function () {
    return 'blog-posts';
};