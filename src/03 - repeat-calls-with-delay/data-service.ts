
import {of} from 'rxjs';

let count = 0;
export const expiries = [100, 200, 300, 200, 100];

export const dataService = {
    getDataAndExpiry: () => {
        const resp = of({ data: count, expiry: expiries[count] });
        count++;
        return resp;
    },
}
