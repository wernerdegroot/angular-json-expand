# angular-json-expand

*angular-json-expand* is a small AngularJS module that helps you to automatically convert between JSON objects and domain objects when accessing the server. When you find yourself writing a lot of boilerplate code to transform the JSON objects your server returns to something your front-end code can actually use *angular-json-expand* might be for you. 

## A minimal example

Suppose we have a JSON object representing a employee working at Acme Corporation which can be found at `http://localhost:8000/api/companies/acme/employees/rudolph`. The JSON object looks like this:

```json
{
    "id": "rudolph",
    "first-name": "Rudolph",
    "last-name": "le Grand"
}
```

Of course, what we really want is a JavaScript domain object that looks like this:

```javascript
var Employee = function (id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
};

Employee.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
};

var rudolph = new Employee('rudolph', 'Rudolph', 'le Grand');
```

This way, we can access all Rudolph's attributes and even retrieve his full name! Instead of manually building such a `Employee` each time we receive a employee from the server let us use *angular-json-expand*. 

### URL hierarchy

First, let's configure the URL hierarchy. We create a corresponding hierarchy of resource location objects for this. Given **ResourceRoot.js**

```javascript
// Determine the root of the server.
var ResourceRoot = function () {
    this.rootUrl = 'http://localhost:8000/api';    
};

ResourceRoot.prototype.getSingleUrl = function () {
    return this.rootUrl;
};

ResourceRoot.prototype.getAllUrl = function () {
    return this.rootUrl;
};
```

and **CompanyResourceLocation.js**

```javascript
// Determine the URL of the resource containing companies.
// Use a ResourceRoot to build on.
var ResourceRoot = function () {
    this.rootUrl = 'http://localhost:8000/api';    
};

ResourceRoot.prototype.getSingleUrl = function () {
    return this.rootUrl;
};

ResourceRoot.prototype.getAllUrl = function () {
    return this.rootUrl;
};
```

and **EmployeeResourceLocation.js**

```javascript
// Determine the URL of the resource containing employees.
// Use a CompanyResourceLocation to build on.
var EmployeeResourceLocation = function (companyId, companyResourceLocation) {
    this.employeeUrl = companyResourceLocation.getSingleUrl(companyId) + '/employees';
};

EmployeeResourceLocation.prototype.getSingleUrl = function (id) {
    return this.employeeUrl + '/' + id;
};

EmployeeResourceLocation.prototype.getAllUrl = function () {
    return this.employeeUrl;
};
```

we can determine the URL at which the JSON representation of Rudolph lives:

```javascript
var resourceRoot = new ResourceRoot();
var companyResourceLocation = new CompanyResourceLocation(resourceRoot);
var acmeEmployeeResourceLocation = new EmployeeResourceLocation('acme', companyResourceLocation);
var rudolphUrl = acmeEmployeeResourceLocation.getSingleUrl('rudolph');
```

In order for *angular-json-expand* to be able to use a resource location object, a resource location object must have at least the following two methods:

 1. `getSingleUrl` which takes an `id` and produces the URL where the JSON object with the given id lives
 2. `getAllUrl` which produces the URL at which all JSON objects of this type can be found

### JSON definition

Just like a resource location object defines where a certain JSON object lives, an object mapper defines what the JSON object looks like and how it should be converted to a full-fledged domain object. The following service is defined in **EmployeeRepository.js**:

```javascript
var EmployeeRepository = function (objectMapperFactory, dataService) {
    
    repositories.DefaultRepository.call(this, dataService);
    
    this.employeeObjectMapper = objectMapperFactory.create(Employee.createEmpty)
        .defaultExchanger('id', 'id')
        .defaultExchanger('first-name', 'firstName')
        .defaultExchanger('last-name', 'lastName');
};

EmployeeRepository.prototype = Object.create(repositories.DefaultRepository.prototype);
EmployeeRepository.prototype.constructor = EmployeeRepository;

EmployeeRepository.prototype.getObjectMapper = function () {
    return this.employeeObjectMapper;
};
```
Using an injected `objectMapperFactory` we create a new object mapper by passing it a means to construct an empty `Employee` object. The function `Employee.createEmpty` is defined as follows

```javascript
// Create an empty Employee (with the name John Doe).
Employee.createEmpty = function () {
    return new Employee(null, 'John', 'Doe');  
};
```

We also configure three default exchangers which, as you can probably guess, are used to transform JSON objects to domain objects and vice versa. We'll encounter several more exchangers in subsequent examples.

The `EmployeeRepository` service is based on a more general `Repository` which will allow us to retrieve a fully functioning `Employee` from the server. In order to provide this repository with a means to access our object mapper, the method `getObjectMapper` (which, of course, should return an object mapper) is mandatory.

### Using our repository

Getting a `Employee` from the server is laughably simple. Simply create Rudolph's resource location object, as before, and invoke our repository!

```javascript
var resourceRoot = new ResourceRoot();
var companyResourceLocation = new CompanyResourceLocation(resourceRoot);
var acmeEmployeeResourceLocation = new EmployeeResourceLocation('acme', companyResourceLocation);

// Obtain Rudolph.
var rudolphPromise = employeeRepository.getById('rudolph', acmeEmployeeResourceLocation);
rudolphPromise.then(function (rudolph) {
	console.info('Hello, ' + rudolph.getFullName() + '!');
});

// Try to obtain a non-existing employee (which, of course, will fail).
var nonExistingEmployeePromise = employeeRepository.getById('does-not-exist', acmeEmployeeResourceLocation);
nonExistingEmployeePromise.catch(function () {
	console.error('An error occurred when fetching a non-existing employee!')
});
```

In this example, we assume that a `EmployeeRepository` can be injected as `employeeRepository`.  This example can also be found in the examples directory.

## A more interesting example

We had to do a lot of work to obtain a relatively simple representation of Rudolph. Let's make the previous example a little bit more complex to show how we'll reap the benefits of these efforts.