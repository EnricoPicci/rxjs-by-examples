
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

const events = [
    { day: 1, title: 'Event 1' },
    { day: 2, title: 'Event 3' },
    { day: 'both', title: 'Sandbox 1' },
    { day: 1, title: 'Event 2' },
    { day: 2, title: 'Event 4' },
    { day: 'both', title: 'Sandbox 2' },
];

from(events)
.pipe(
    groupBy(event => event.day),
    mergeMap(group => group)
)
.subscribe(d => console.log(JSON.stringify(d)))

