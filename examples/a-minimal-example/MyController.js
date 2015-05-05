var MyController = function (employeeRepository) {
	
	var self = this;	
	
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
};

MyController.injectAs = 'MyController';