import { Component, OnInit } from '@angular/core';
import { LoginEnrollAnimation } from './login-enroll.animation';
@Component({
  selector: 'app-login-enroll',
  templateUrl: './login-enroll.component.html',
  styleUrls: ['./login-enroll.component.scss'],
  animations: [LoginEnrollAnimation.animation]
})
export class LoginEnrollComponent implements OnInit {
  boxOneState = "right";
  boxTwoState = "left";
  loginState = true;
  enrollState = false;
  containerState = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSignUp() {
    this.boxTwoState == 'left' ? this.boxTwoState = 'right' : this.boxTwoState = "left";
    this.boxOneState == 'left' ? this.boxOneState = 'right' : this.boxOneState = "left";
    this.loginState == true ? this.loginState = false : this.loginState = true;
  }

  ngAfterViewInIt() {
    console.log('view in it');
  }

}
