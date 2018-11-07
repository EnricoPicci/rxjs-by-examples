
import { of, forkJoin, Observable } from 'rxjs';
import { mergeMap, toArray, } from 'rxjs/operators';

// flatten the data of the array
export const solution1 = (arrayOfData: Array<any>) => {
    return of(arrayOfData)
    .pipe(
        mergeMap(arrayOfData => arrayOfData),
    )
}

// flatten the data of the array just to create again an array
export const solution2 = (arrayOfData: Array<any>) => {
    return solution1(arrayOfData)
    .pipe(
        toArray(),
    )
}

// flatten the data of the array just to create again an array
export const solution3 = (arrayOfObservable: Array<Observable<any>>) => {
    return forkJoin(arrayOfObservable)
}
