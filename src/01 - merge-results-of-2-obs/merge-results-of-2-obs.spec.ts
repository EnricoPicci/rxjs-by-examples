
import 'mocha';
import { expect } from 'chai';

import {solution} from './merge-results-of-2-obs';
import {employeeName, departmentName} from './data-service';

describe('test solution for "01 - merge-results-of-2-obs"', () => {

  it('retrieves both Employee and Department starting from Employee id', done => {
    const employeeId = '123';
    solution(employeeId)
    .subscribe(
      employeeAndDepartment => {
        expect(employeeAndDepartment.employee.name).to.equal(employeeName);
        expect(employeeAndDepartment.department.name).to.equal(departmentName);
      },
      error => done(error),
      () => done()
    )
  });

});

