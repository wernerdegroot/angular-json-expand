var RootContext = function () {
    this.rootUrl = 'http://localhost:8000/examples/a-minimal-example/api';    
};

RootContext.prototype.getSingleUrl = function () {
    return this.rootUrl;
};

RootContext.prototype.getAllUrl = function () {
    return this.rootUrl;
};