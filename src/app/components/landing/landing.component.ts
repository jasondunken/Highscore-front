import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService
  ) {}

  nameForm: FormGroup;
  wordForm: FormGroup;

  name: boolean;

  ngOnInit(): void {
    this.name = false;
    this.nameForm = this.fb.group({
      name: ['', Validators.required],
    })
    this.wordForm = this.fb.group({
      word: ['', Validators.required]
    })
  }

  next(): void {
    if (this.nameForm.valid) {
      this.name = true;
    }
  }

  nextnext(): void { 
    if (this.wordForm.valid) {
      this.auth.login(this.nameForm.value, this.wordForm.value).subscribe();
    }
  }
}
