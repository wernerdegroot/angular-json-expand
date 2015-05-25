var BlogPostRepository = function (objectMapperFactory, dataService, commentRepository, converters, personRepository, rootObject) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.blogPostObjectMapper = objectMapperFactory.create(BlogPost.createEmpty)
        .defaultExchanger('title', 'title')
        .defaultExchanger('full-text', 'fullText')
        .childResourceExchanger('comments', commentRepository)
        .convertingExchanger('author-id', 'author', converters.idConverter(personRepository, rootObject));
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