import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    this.spielWrapperState = this.spielWrapperState === 'left' ? 'right' : 'left';
    this.formWrapperState = this.formWrapperState === 'left' ? 'right' : 'left';
    this.loginState = !this.loginState;
  }

}
