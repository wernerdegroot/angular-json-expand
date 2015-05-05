# angular-json-expand

*angular-json-expand* is a small AngularJS module that helps you to automatically convert between JSON objects and domain objects when accessing the server. When you find yourself writing a lot of boilerplate code to transform the JSON objects your server returns to something your front-end code can actually use *angular-json-expand* might be for you. 

## A minimal example

Suppose we have a JSON object representing a employee working at Acme Corporation which can be found at `/api/companies/acme/employees/rudolph`. The JSON object looks like this:

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

First, let's configure the URL hierarchy. We create a corresponding hierarchy of context objects for this. Given **RootContext.js**

```javascript
// Determine the root of the server.
var RootContext = function () {
    this.rootUrl = '/api';    
};

RootContext.prototype.getSingleUrl = function () {
    return this.rootUrl;
};

RootContext.prototype.getAllUrl = function () {
    return this.rootUrl;
};
```

and **CompanyContext.js**

```javascript

// Determine the URL of the resource containing companies.
// Use a RootContext to build on.
var CompanyContext = function (rootContext) {
    this.companyUrl = this.rootContext.getAllUrl() + '/companies';
};

CompanyContext.prototype.getSingleUrl = function (id) {
    return this.companyUrl + '/' + id;
};

CompanyContext.prototype.getAllUrl = function () {
    return this.companyUrl;
};
```

and **EmployeeContext.js**

```javascript

// Determine the URL of the resource containing employees.
// Use a CompanyContext to build on.
var EmployeeContext = function (companyId, companyContext) {
    this.employeeUrl = this.companyContext.getSingleUrl(companyId) + '/employees';
};

EmployeeContext.prototype.getSingleUrl = function (id) {
    return this.employeeUrl + '/' + id;
};

EmployeeContext.prototype.getAllUrl = function () {
    return this.employeeUrl;
};
```

we can determine the URL at which the JSON representation of Rudolph lives:

```javascript
var rootContext = new RootContext();
var companyContext = new CompanyContext(rootContext);
var rudolphContext = new EmployeeContext('acme', companyContext);
var rudolphUrl = rudolphContext.getSingleUrl('rudolph');
```

A context object should have at least the following two methods:

 1. `getSingleUrl` which takes an `id` and produces the URL where the JSON object with the given id lives
 2. `getAllUrl` which produces the URL at which all JSON objects of this type can be found

### JSON definition

A template object defines what the JSON object looks like and how it should be converted to a full-fledged domain object. The following service is defined in **EmployeeRepository.js**:

```javascript

var EmployeeRepository = function (templateFactory) {
    this.employeeTemplate = templateFactory.create(Employee)
        .defaultConverter('id', 'id')
        .defaultConverter('first-name', 'firstName')
        .defaultConverter('last-name', 'lastName');
};

EmployeeRepository.prototype = Object.create(Repository.prototype);
EmployeeRepository.prototype.constructor = EmployeeRepository;

EmployeeRepository.prototype.getTemplate = function () {
    return this.employeeTemplate;
};

var myModule = angular.module('myModule', ['angularJsonExpand']);
```
Using an injected `templateFactory` we create a new template object which contains three default converters. As you can probably guess, these default converters are used to transform JSON objects to domain objects and vice versa. We'll encounter several more converters in subsequent examples.

The `EmployeeRepository` service is based on a more general `Repository` which will allow us to retrieve a fully functioning `Employee` from the server. In order to provide this repository with a means to access our template object, the method `getTemplate` (which, of course, should return a template) is mandatory.

### Using our repository

Getting a `Employee` from the server is laughably simple. Simply create Rudolph's context, as before, and invoke our repository!

```javascript
var rootContext = new RootContext();
var companyContext = new CompanyContext(rootContext);
var rudolphContext = new EmployeeContext('acme', companyContext);
var rudolph = employeeRepository.getById('rudolph', rudolphContext);
console.log('Hello, ' + rudolph.getFullName() + '!'); // Hello, Rudolph le Grand!
```

In this example, we assume that a `EmployeeRepository` can be injected as `employeeRepository`.  This example can be found in the examples directory.

## A more interesting example

We had to do a lot of work to obtain a relatively simple representation of Rudolph. Let's make the previous example a little bit more complex to show how we'll reap the benefits of these efforts.