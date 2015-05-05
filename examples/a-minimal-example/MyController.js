var MyController = function (employeeRepository) {
	
	var self = this;	
	
	var rootContext = new RootContext();
	var companyContext = new CompanyContext(rootContext);
	var acmeEmployeeContext = new EmployeeContext('acme', companyContext);
	
	// Obtain Rudolph.
	var rudolphPromise = employeeRepository.getById('rudolph', acmeEmployeeContext);
	rudolphPromise.then(function (rudolph) {
		console.info('Hello, ' + rudolph.getFullName() + '!');
	});
	
	// Try to obtain a non-existing employee (which, of course, will fail).
	var nonExistingEmployeePromise = employeeRepository.getById('does-not-exist', acmeEmployeeContext);
	nonExistingEmployeePromise.catch(function () {
		console.error('An error occurred when fetching a non-existing employee!')
	});
};

MyController.injectAs = 'MyController';