var CommentRepository = function (objectMapperFactory, dataService, converters, personRepository, rootObject) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.commentObjectMapper = objectMapperFactory.create(Comment.createEmpty)
        .defaultExchanger('text', 'text')
        .convertingExchanger('author-id', 'author', converters.idConverter(personRepository, rootObject));
};

CommentRepository.prototype = Object.create(repositories.DefaultRepository.prototype);
CommentRepository.prototype.constructor = CommentRepository;
CommentRepository.injectAs = 'commentRepository';

CommentRepository.prototype.getObjectMapper = function () {
    return this.commentObjectMapper;
};

CommentRepository.prototype.getSlug = function () {
    return 'comments';
};