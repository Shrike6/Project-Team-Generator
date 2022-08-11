const Employee = require('../lib/Employee');
let newEmployee = new Employee('Bob', '541889', 'bob@work.com');

test('testing to see if Employee will update with given data', () => {
    expect(employee.name).toEqual('Bob');
    expect(employee.id).toEqual('541889');
    expect(employee.email).toEqual('bob@work.com');
});

test 