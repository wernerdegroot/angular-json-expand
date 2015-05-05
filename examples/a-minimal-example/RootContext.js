var RootContext = function () {
    this.rootUrl = 'http://localhost:8000/api';    
};

RootContext.prototype.getSingleUrl = function () {
    return this.rootUrl;
};

RootContext.prototype.getAllUrl = function () {
    return this.rootUrl;
};