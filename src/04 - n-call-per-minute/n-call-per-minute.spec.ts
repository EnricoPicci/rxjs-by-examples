
// import 'mocha';
import { expect } from 'chai';

import { take, map, skip, toArray, throttle, throttleTime } from 'rxjs/operators';

import {solution} from './n-call-per-minute';
import {DataService} from './data-service';

describe('test solution for "04 - n-call-per-minute"', () => {

  it(`calls the API at a specific interval set by apiThrottleTime - if the response takes longer then the interval
  to arrive, then the next call will be performed immediately`, done => {
    const apiThrottleTime = 100;
    // The following delays mean that
    // - the first to calls to the API will be very fast (delay of 1 ms)
    // - the third call will take 120 ms to complete, which is longer than the throttle time 
    // - then we have the next 2 calls that execute very fast
    // - then there is one call that takes 60 ms to execute, which leaves about 20 ms before the next call
    // - and so on ...
    // GIVEN THAT, WE CAN PREDICT THE ELAPSED TIME BETWEEN THE END OF THE EXUCUTION OF 2 SUBSEQUENT CALLS 
    // - time between end of 1st call and the end of 2nd call: equal about the throttle time
    // - time between end of 2nd call and the end of 3rd call: equal about the throttle time + the delay of 120ms
    // - time between end of 3rd call and the end of 4th call: very small since the 4th call is fired immediately after the 3rd call
    //      is completed and the 4th call execution is very fast
    // - time between end of 4th call and the end of 5th call: it is about 80 ms (i.e 200ms - 120ms) because the delay introduced by the
    //      execution of the 3rd call has eaten up about 20 ms of the interval between the 4th and the 5th call
    // - time between end of 5th call and the end of 6th call: it is about 160 ms which is equal to the throttle time + the delay 
    //      in the execution of the 6th call
    // - time between end of 6th call and the end of 7th call: it is about 40 ms (i.e 100ms - 60ms) because the delay introduced by the
    //      execution of the 6th call has eaten up about 40 ms of the interval between the 6th and the 7th call
    // - all subsequent calls execute very fast and therefore the interval between the end their exections is about the same as the 
    //      throttle time
    const delays = [1, 1, 120, 1, 1, 60, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const dataService = new DataService(delays);
    const slack = 20;

    let start;
    let end;
    solution(apiThrottleTime, dataService)
    .pipe(
        map(d => {
            end = Date.now();
            const timeFromLastCall = end - start;
            // count++;
            start = Date.now();
            return timeFromLastCall;
        }),
        skip(1),
        take(delays.length - 1),
        toArray()
    )
    .subscribe(
        timesElapsedForEachCall => {
            console.log('================', JSON.stringify(timesElapsedForEachCall));
            // see comment above to understand the reasons behind these checks
            if (timesElapsedForEachCall[0] > apiThrottleTime + slack) throw "wrong delay at position 0";
            if (timesElapsedForEachCall[1] > apiThrottleTime + 120 + slack) throw "wrong delay at position 1";
            if (timesElapsedForEachCall[2] > apiThrottleTime + slack) throw "wrong delay at position 2";
            if (timesElapsedForEachCall[3] > 2 * apiThrottleTime - 120 + slack) throw "wrong delay at position 3";
            if (timesElapsedForEachCall[4] > apiThrottleTime + 60 + slack) throw "wrong delay at position 4";
            if (timesElapsedForEachCall[5] > apiThrottleTime - 60 + slack) throw "wrong delay at position 5";
            if (timesElapsedForEachCall[6] > apiThrottleTime + slack) throw "wrong delay at position 6";
            if (timesElapsedForEachCall[7] > apiThrottleTime + slack) throw "wrong delay at position 7";
        },
        error => done(error),
        () => done()
    )
  });

});


