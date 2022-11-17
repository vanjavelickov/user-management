import { User } from "./user.interface";

export interface Result {
    content: Array<User>,
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: null,
    first: boolean,
    numberOfElements: number
}
  