import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProperties } from '../dialog-properties.interface';
import { UserService } from '../user.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogProperties, private userService: UserService
  ) {}

  ngOnInit() {
    this.initDeleteForm();
  }

  get confirmElementValue() {
    return this.form.get('confirmElementValue');
  }

  private initDeleteForm(): void {
    this.form = this.formBuilder.group({});
  }

  public delete(): void {
    this.userService.deleteUser(this.data.dialogElementValue).subscribe(
      {
        next: () => {
          alert('User is deleted');
          this.dialogRef.close();
        },
        error: (err: HttpErrorResponse) => {
          alert(this.userService.handleError(err));
          this.dialogRef.close();
        }
      }
    )
  }

}
