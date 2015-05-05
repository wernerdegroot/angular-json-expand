var MyController = function (employeeRepository) {
	
	var self = this;	
	
	var rootContext = new RootContext();
	var companyContext = new CompanyContext(rootContext);
	var rudolphContext = new EmployeeContext('acme', companyContext);
	var rudolphPromise = employeeRepository.getById('rudolph', rudolphContext);
	rudolphPromise.then(function (rudolph) {
		self.rudolph = rudolph;
	});
};

MyController.injectAs = 'MyController';