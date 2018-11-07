
import { of, Observable } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';


import isEqual from 'lodash/isEqual';

import {solution1, solution2, solution3} from './mergeMap-with-arrays';

describe('test solution1 for "3.2 - mergeMap-with-arrays"', () => {

    it(`the number of notification should be equal to the number of items in the input array`, done => {

        const inputArray = [1, 2, 3, 4, 5];
        let counter = 0;
        
        solution1(inputArray)
        .subscribe(
            () => counter++,
            error => done(error),
            () => {
                if (counter !== inputArray.length) throw "wrong number of input items";
                done()
            }
        )
    });

    it(`input array is an array of Observables`, done => {

        const inputArray = [of(1), of(2), of(3), of(4), of(5)];
        let counter = 0;
        
        solution1(inputArray)
        .pipe(
            mergeMap(inputArray => inputArray),
            tap(console.log)
        )
        .subscribe(
            data => {
                if (data instanceof Observable) throw "it should not be an Observable";
                counter++;
            },
            error => done(error),
            () => {
                if (counter !== inputArray.length) throw "wrong number of input items";
                done()
            }
        )
    });
  
  });
  
  
describe('test solution2 for "3.2 - mergeMap-with-arrays"', () => {

    it(`the array returned should be equivalent to the array input`, done => {

        const inputArray = [10, 20, 30, 40, 50];
        
        solution2(inputArray)
        .subscribe(
            outputArray => {
                if (!isEqual(inputArray, outputArray)) throw "wrong number of input items";
            },
            error => done(error),
            () => done()
        )
    });
  
});
  
  
describe('test solution3 for "3.2 - mergeMap-with-arrays"', () => {

    it(`the array returned should be equivalent to the source array`, done => {

        const sourceArray = [100, 200, 300, 400, 500];
        const inputArray = sourceArray.map(data => of(data));
        
        solution3(inputArray)
        .subscribe(
            outputArray => {
                if (!isEqual(sourceArray, outputArray)) throw "the 2 arrays are not equal";
            },
            error => done(error),
            () => done()
        )
    });
  
});
