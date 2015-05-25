var PersonRepository = function (objectMapperFactory, dataService) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.personObjectMapper = objectMapperFactory.create(Person.createEmpty)
        .defaultExchanger('first-name', 'firstName')
        .defaultExchanger('last-name', 'lastName')
        .defaultExchanger('email-address', 'emailAddress');
};

PersonRepository.prototype = Object.create(repositories.DefaultRepository.prototype);
PersonRepository.prototype.constructor = PersonRepository;
PersonRepository.injectAs = 'personRepository';

PersonRepository.prototype.getObjectMapper = function () {
    return this.personObjectMapper;
};

PersonRepository.prototype.getSlug = function () {
    return 'persons';
};