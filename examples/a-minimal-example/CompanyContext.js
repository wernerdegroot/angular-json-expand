var CompanyContext = function (rootContext) {
    this.companyUrl = rootContext.getAllUrl() + '/companies';
};

CompanyContext.prototype.getSingleUrl = function (id) {
    return this.companyUrl + '/' + id;
};

CompanyContext.prototype.getAllUrl = function () {
    return this.companyUrl;
};