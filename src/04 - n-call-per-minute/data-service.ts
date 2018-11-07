import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';


export class DataService {
    private delays: Array<number>;
    private counter = 0;

    constructor(delays: Array<number>) {
        this.delays = delays;
    }

    public callAPI(inputFromPreviousCall: number) {
        const resp = of(this.counter).pipe(
            delay(this.delays[this.counter])
        );
        this.counter++;
        return resp;
    }
};
