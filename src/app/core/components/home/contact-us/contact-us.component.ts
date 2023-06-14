import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';

import { Message } from './message';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required,Validators.email]
      ],
      name: [ '', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit(message: Message) {
    this.submitted = true;
    if(!message || this.contactForm.invalid) {
      return;
    }
  }

  get f() {
    return this.contactForm.controls;
  }

}
