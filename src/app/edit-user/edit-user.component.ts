import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProperties } from '../dialog-properties.interface';
import { User } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  public user!: User;

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogProperties,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.data.dialogElementObject) {
      this.initEditForm(this.data.dialogElementObject);
      this.user = this.data.dialogElementObject;
    }
  }

  private initEditForm(user: User): void {
    this.form = this.formBuilder.group({
      firstName: [
        user.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        user.lastName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [user.email, [Validators.required, Validators.email]],
      dateOfBirth: [user.dateOfBirth? user.dateOfBirth : ''],
    });
  }

  public edit(): void {
    this.userService
      .updateUser({
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        id: this.user.id,
        email: this.form.value.email,
        dateOfBirth: this.form.value.dateOfBirth,
      })
      .subscribe({
        next: () => {
          alert('User is updated')
          this.dialogRef.close();
        },
        error: (err: HttpErrorResponse) => {
          alert(this.userService.handleError(err));
          this.dialogRef.close();
        },
      });
    }
}
