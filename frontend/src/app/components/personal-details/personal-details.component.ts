import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/auth/User';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';
import { Location, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-personal-details',
  standalone: false,
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit {
  private formBuilder: FormBuilder = new FormBuilder();
  errorMessage: String = '';
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;

  registerForm = this.formBuilder.group({
    id: [''],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserByUsername(this.loginService.userUsername)
      .subscribe({
        next: (userData) => {
          console.log(userData);
          this.user = userData;
          this.registerForm.controls.id.setValue(userData.id.toString());
          this.registerForm.controls.firstname.setValue(userData.firstname);
          this.registerForm.controls.lastname.setValue(userData.lastname);
          this.registerForm.controls.country.setValue(userData.country);
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          console.info('User Data ok');
        },
      });

    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService
        .updateUser(this.registerForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.registerForm.value as unknown as User;
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }
  goBack(): void {
    this.location.back();
  }
}
