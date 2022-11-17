import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Result } from './result.interface';
import { User } from './user.interface';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dateOfBirth', 'edit', 'delete'];
  public dataSource: MatTableDataSource<User>;
  public pagination: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(private dialog: MatDialog, private userService: UserService){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.userService.findAll().subscribe({
      next: (response: Result) => {
        this.dataSource = new MatTableDataSource(response.content)
        this.dataSource.paginator = this.paginatorPageSize;
        this.empTbSort.disableClear = true;
        this.dataSource.sort = this.empTbSort;
      },
      error: (error: HttpErrorResponse) => {
        alert(this.userService.handleError(error));
      }
    })
  }

  public openAddDialog(): void {
    const addDialog = this.dialog.open(AddUserComponent,
      {
        data: {
          dialogTitle: `Add new user`,
        }
    });
    addDialog.afterClosed().subscribe(() => {
      this.getAllUsers();
    })
  }

  public openEditDialog(user: User): void {
    const editDialog = this.dialog.open(EditUserComponent,
      {
        data: {
          dialogTitle: `Edit user`,
          dialogElementValue: user.firstName,
          dialogElementObject: user,
        }
    });
    editDialog.afterClosed().subscribe(()=> {
      this.getAllUsers();
    })
  }

  public openDeleteDialog(username: string, id: string): void {
    const deleteDialog = this.dialog.open(DeleteUserComponent,
      {
        data: {
          dialogTitle: `Are you sure you want to delete ${username}`,
          dialogElementValue: id,
        }
    });
    deleteDialog.afterClosed().subscribe(() => {
      this.getAllUsers();
    })
  }

}
