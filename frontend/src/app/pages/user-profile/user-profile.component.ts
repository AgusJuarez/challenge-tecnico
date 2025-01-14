import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../services/auth/User';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  userLoginOn: boolean = false;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }
}
