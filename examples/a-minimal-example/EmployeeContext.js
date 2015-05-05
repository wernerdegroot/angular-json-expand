var EmployeeContext = function (companyId, companyContext) {
    this.employeeUrl = companyContext.getSingleUrl(companyId) + '/employees';
};

EmployeeContext.prototype.getSingleUrl = function (id) {
    return this.employeeUrl + '/' + id;
};

EmployeeContext.prototype.getAllUrl = function () {
    return this.employeeUrl + '.json';
};