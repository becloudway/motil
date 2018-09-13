const {ValidationEngine} = require("./dist/index");

const engine = new ValidationEngine({test: "4" }, {test: "equal:4"}, {equal: (value, p) => value == p});

let result = engine.processRules();
console.log(result);