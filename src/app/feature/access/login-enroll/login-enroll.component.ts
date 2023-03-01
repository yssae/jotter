import { Component, OnInit } from '@angular/core';
import { LoginEnrollAnimation } from './login-enroll.animation';
@Component({
  selector: 'app-login-enroll',
  templateUrl: './login-enroll.component.html',
  styleUrls: ['./login-enroll.component.scss'],
  animations: [LoginEnrollAnimation.animation]
})
export class LoginEnrollComponent implements OnInit {
  formWrapperState = "right";
  spielWrapperState = "left";

  loginState = true;
  enrollState = false;
  wrapperState = false;
  containerState = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSignUp() {
    this.spielWrapperState == 'left' ? this.spielWrapperState = 'right' : this.spielWrapperState = "left";
    this.formWrapperState == 'left' ? this.formWrapperState = 'right' : this.formWrapperState = "left";
    this.loginState == true ? this.loginState = false : this.loginState = true;
  }

}
