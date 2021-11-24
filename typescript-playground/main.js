"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_1 = require("./customer");
var myCustomer = new customer_1.Customer(10);
myCustomer.fooBar(5);
var bar = function (arg) {
    return arg + 1;
};
var bar2 = function (arg) { return arg + 1; };
bar2(1);
bar2(23);
// geht nicht: Neuzuweisung
// bar2 = () => {}
