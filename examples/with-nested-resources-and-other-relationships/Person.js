var Person = function (firstName, lastName, emailAddress) {
	this.firstName = firstName;	
	this.lastName = lastName;
	this.emailAddress = emailAddress;
};

Person.createEmpty = function () {
	return new Person(null, null, null);
};

Person.prototype.getFullName = function () {
	return this.firstName + ' ' + this.lastName;
}