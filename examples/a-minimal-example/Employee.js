var Employee = function (id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
};

// Create an empty Employee (with the name John Doe).
Employee.createEmpty = function () {
    return new Employee(null, 'John', 'Doe');  
};

Employee.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};