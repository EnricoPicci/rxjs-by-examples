
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray, } from 'rxjs/operators';

export interface Event { 
    day: any,
    title: string
}

export const solution = (events: Array<Event>) => {
    return from(events)
    .pipe(
        groupBy(event => event.day),
        mergeMap(group => group.pipe(toArray())),
        toArray(),
    )
}
