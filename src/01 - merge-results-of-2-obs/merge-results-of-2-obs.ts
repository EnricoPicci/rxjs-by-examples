
import { map, switchMap } from 'rxjs/operators';

import {dataService} from './data-service';

export const solution = (employeeId: string) => {
    return dataService.getEmployee(employeeId).pipe(
        switchMap(employee => dataService.getDepartment(employee.departmentId).pipe(
            map(department => {
                return {employee, department};
            })
        ))
    )
}
