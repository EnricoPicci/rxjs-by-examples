
import { mergeMap } from 'rxjs/operators';

import {solution} from './groupby-with-multidimensional-arrays';

describe('test solution for "3.1 - groupby-with-multidimensional-arrays"', () => {

    it(`groups the events by their dates and then creates an array of arrays, where each array contains
       all events which share the same day`, done => {

        const events = [
            { day: 1, title: 'Event 1' },
            { day: 2, title: 'Event 3' },
            { day: 'both', title: 'Sandbox 1' },
            { day: 1, title: 'Event 2' },
            { day: 2, title: 'Event 4' },
            { day: 'both', title: 'Sandbox 2' },
        ];
        
        solution(events)
        .pipe(
            // the higher level array 'events' is flattened with mergeMap to emit each array contained in it as a separate event
            mergeMap(eventsPerDay => eventsPerDay)
        )
        .subscribe(
            eventsPerDay => {
                // each event group has 2 elements given the input we have created
                console.log(JSON.stringify(eventsPerDay));
                if (eventsPerDay.length !== 2) throw "wrong number of events";
            },
            error => done(error),
            () => done()
        )
    });
  
  });
  
  