import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initAddUserForm();
  }

  private initAddUserForm(): void {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', []],
    });
  }

  public create(): void {
    this.userService
      .addUser(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.dateOfBirth
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          alert('User added');
          this.dialogRef.close();
        },
        error: (err: Error) => {
          console.log(err);
          this.dialogRef.close();
        },
      });
  }
}
