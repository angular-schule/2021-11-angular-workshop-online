import { Customer } from "./customer";

const myCustomer = new Customer(10);
myCustomer.fooBar(5);


const bar = function (arg: number) {
    return arg + 1;
}

const bar2 = (arg: number) => arg + 1;
bar2(1);
bar2(23)

// geht nicht: Neuzuweisung
// bar2 = () => {}