
import { expand, delay } from 'rxjs/operators';

import {dataService} from './data-service';

export const solution = () => {
    return dataService.getDataAndExpiry().pipe(
        expand(dataAndExpiry => dataService.getDataAndExpiry().pipe(
            delay(dataAndExpiry.expiry)
        ))
    )
}
