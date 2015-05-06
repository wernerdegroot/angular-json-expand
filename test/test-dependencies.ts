/// <reference path="../node_modules/DefinitelyTyped/mocha/mocha.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/chai/chai.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/sinon/sinon.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/chai-as-promised/chai-as-promised.d.ts" />

var expect = chai.expect;

// Polyfills for bind method (see https://github.com/kmiyashiro/grunt-mocha/issues/95).
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}
		
		var aArgs   = Array.prototype.slice.call(arguments, 1);
		var fToBind = this;
		var fNOP    = function() {};
		var fBound  = function() {
			return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
		};
		
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		
		return fBound;
	};
}
