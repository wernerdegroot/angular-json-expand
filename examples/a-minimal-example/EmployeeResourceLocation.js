var EmployeeResourceLocation = function (companyId, companyResourceLocation) {
    this.employeeUrl = companyResourceLocation.getSingleUrl(companyId) + '/employees';
};

EmployeeResourceLocation.prototype.getSingleUrl = function (id) {
    return this.employeeUrl + '/' + id;
};

EmployeeResourceLocation.prototype.getAllUrl = function () {
    return this.employeeUrl;
};