
// import 'mocha';
import { expect } from 'chai';

import { take, map, skip } from 'rxjs/operators';

import {solution} from './repeat-calls-with-delay';
import {expiries} from './data-service';

describe('test solution for "03 - repeat-calls-with-delay"', () => {

  it('calls the API after a delay established by the results of the preious call', done => {
    let start = Date.now();
    let end;
    let count = 0;
    solution()
    .pipe(
        skip(1),
        map(d => {
            end = Date.now();
            const timeFromLastCall = end - start;
            count++;
            start = Date.now();
            return timeFromLastCall;
        }),
        take(expiries.length)
    )
    .subscribe(
        timeFromLastCall => {
            const expectedDelay = expiries[count - 1];
            expect(timeFromLastCall - expectedDelay).to.lessThan(20);
        },
        error => done(error),
        () => done()
    )
  });

});


