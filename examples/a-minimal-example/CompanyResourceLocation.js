var CompanyResourceLocation = function (resourceRoot) {
    this.companyUrl = resourceRoot.getAllUrl() + '/companies';
};

CompanyResourceLocation.prototype.getSingleUrl = function (id) {
    return this.companyUrl + '/' + id;
};

CompanyResourceLocation.prototype.getAllUrl = function () {
    return this.companyUrl;
};