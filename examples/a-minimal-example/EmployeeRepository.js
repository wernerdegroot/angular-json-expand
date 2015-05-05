var EmployeeRepository = function (objectMapperFactory, dataService) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.employeeObjectMapper = objectMapperFactory.create(Employee.createEmpty)
        .defaultExchanger('id', 'id')
        .defaultExchanger('first-name', 'firstName')
        .defaultExchanger('last-name', 'lastName');
};

EmployeeRepository.prototype = Object.create(repositories.DefaultRepository.prototype);
EmployeeRepository.prototype.constructor = EmployeeRepository;
EmployeeRepository.injectAs = 'employeeRepository';

EmployeeRepository.prototype.getObjectMapper = function () {
    return this.employeeObjectMapper;
};