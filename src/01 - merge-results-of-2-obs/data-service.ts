
import {of} from 'rxjs';

export const employeeName = 'The only employee of this company';
export const departmentName = 'The only department in this company';

export const dataService = {
    getEmployee: (empId: string) => of({
        id: empId,
        name: employeeName,
        departmentId: 'Abc'
    }),
    getDepartment: (depId: string) => of({
        id: depId,
        name: departmentName
    })
}
