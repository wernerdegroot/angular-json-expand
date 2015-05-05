var ResourceRoot = function () {
    this.rootUrl = 'http://localhost:8000/api';    
};

ResourceRoot.prototype.getSingleUrl = function () {
    return this.rootUrl;
};

ResourceRoot.prototype.getAllUrl = function () {
    return this.rootUrl;
};