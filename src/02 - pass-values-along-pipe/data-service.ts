
import {of} from 'rxjs';

const employeeAddress = 'First Street 1';
const officeVenueAddress = 'Second Street 2';
export const homeOfficeDistance = 100;

export type Employee = {
    id: string,
    departmentId: string,
    address: string,
};
type OfficeVenue = {
    id: string,
    address: string,
};

export const dataService = {
    getEmployee: (empId: string) => of({
        id: empId,
        departmentId: 'Abc',
        address: employeeAddress,
    } as Employee),
    getDepartment: (depId: string) => of({
        id: depId,
        officeVenueId: '123'
    }),
    getOfficeVenue: (offId: string) => of({
        id: offId,
        address: officeVenueAddress,
    } as OfficeVenue),
    getDistance: (addr1, addr2) => {
        let distance: number;
        if (addr1 === employeeAddress && addr2 === officeVenueAddress) {
            distance = homeOfficeDistance;
        }
        return of(distance)
    }
}
