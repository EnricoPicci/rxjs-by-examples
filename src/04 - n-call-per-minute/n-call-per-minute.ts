
import { interval } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import {DataService} from './data-service';

export const solution = (apiThrottleTime: number, dataService: DataService) => {
    let inputFromPreviousCall;
    return interval(apiThrottleTime).pipe(
        mergeMap(i => {
            console.log('Call counter: ' + i, 'Input from previous call: ' + inputFromPreviousCall);
            return dataService.callAPI(inputFromPreviousCall)
        }, 1),
        tap(result => inputFromPreviousCall = result),
    );
}
