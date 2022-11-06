import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserMockedData } from './user-mock-data';
import { User } from './user.interface';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dateOfBirth', 'edit', 'delete'];
  public dataSource = UserMockedData;
  constructor(private dialog: MatDialog, private userService: UserService){
  }

  ngOnInit(): void {
    // this.userService.findAll().subscribe({
    //   next: (response: User[]) => {
    //     console.log(response)
    //   },
    //   error: (err: Error) => {
    //     console.log(err);
    //   }
    // })
  }

  public openAddDialog(): void {
    this.dialog.open(AddUserComponent,
      {
        data: {
          dialogTitle: `Add new user`,
        }
    });

  }

  public openEditDialog(user: User): void {
    this.dialog.open(EditUserComponent,
      {
        data: {
          dialogTitle: `Edit user`,
          dialogElementValue: user.firstName,
          dialogElementObject: user,
        }
    });
  }

  public openDeleteDialog(username: string, id: string): void {
    this.dialog.open(DeleteUserComponent,
      {
        data: {
          dialogTitle: `Are you sure you want to delete ${username}`,
          dialogElementValue: id,
        }
    });
  }

}
