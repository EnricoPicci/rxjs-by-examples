
import { map, switchMap } from 'rxjs/operators';

import {dataService, Employee} from './data-service';

const closureF = (employee: Employee) => {
    return dataService.getDepartment(employee.departmentId).pipe(
        switchMap(department => dataService.getOfficeVenue(department.officeVenueId)),
        switchMap(office => dataService.getDistance(employee.address, office.address))
    );
}

export const solution = (employeeId: string) => {
    return dataService.getEmployee(employeeId).pipe(
        switchMap(closureF)
    )
}


//******************************************************************* */
//********************* CUMBERSOME SOLUTION ************************* */
//******************************************************************* */
export const cumbersomeSolution = (empId: string) => dataService.getEmployee(empId).pipe(
    switchMap(
        employee => dataService.getDepartment(employee.departmentId).pipe(
            map(department => ({employee, department}))
        )
    ),
    switchMap(
        empAndDep => dataService.getOfficeVenue(empAndDep.department.officeVenueId).pipe(
            map(officeVenue => ({employee: empAndDep.employee, officeVenue}))
        )
    ),
    switchMap(
        empAndOff => dataService.getDistance(
            empAndOff.employee.address,
            empAndOff.officeVenue.address
            )
    )
)
