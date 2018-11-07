
import 'mocha';
import { expect } from 'chai';

import {solution, cumbersomeSolution} from './pass-values-along-pipe';
import {homeOfficeDistance} from './data-service';

describe('test solution for "02 - pass-values-along-pipe"', () => {

  it('calculates the distance from home to office for an employee', done => {
    const employeeId = '123';
    solution(employeeId)
    .subscribe(
      distance => {
        expect(distance).to.equal(homeOfficeDistance);
      },
      error => done(error),
      () => done()
    )
  });

});



describe('test CUMBERSOME solution', () => {

    it('calculates the distance from home to office for an employee', done => {
      const employeeId = '123';
      cumbersomeSolution(employeeId)
      .subscribe(
        distance => {
          expect(distance).to.equal(homeOfficeDistance);
        },
        error => done(error),
        () => done()
      )
    });
  
});

