import { User } from "./user.interface";

export interface DialogProperties {
    dialogTitle: string;
    dialogElementValue: string;
    dialogElementObject?: User;
}