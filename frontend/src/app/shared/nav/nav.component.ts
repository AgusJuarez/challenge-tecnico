import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  //ngOnDestroy(): void {
  //this.loginService.currentUserLoginOn.unsubscribe();
  //}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}
