var Employee = function (id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
};

Employee.createEmpty = function () {
    return new Employee(null, 'John', 'Doe');  
};

Employee.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};