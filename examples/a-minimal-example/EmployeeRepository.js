var EmployeeRepository = function (templateFactory, dataService) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.employeeTemplate = templateFactory.create(Employee.createEmpty)
        .defaultExchanger('id', 'id')
        .defaultExchanger('first-name', 'firstName')
        .defaultExchanger('last-name', 'lastName');
};

EmployeeRepository.prototype = Object.create(repositories.DefaultRepository.prototype);
EmployeeRepository.prototype.constructor = EmployeeRepository;
EmployeeRepository.injectAs = 'employeeRepository';

EmployeeRepository.prototype.getTemplate = function () {
    return this.employeeTemplate;
};