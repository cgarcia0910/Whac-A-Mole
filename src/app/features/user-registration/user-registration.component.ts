import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class UserRegistrationComponent implements OnInit {
  @Output() Emitter: EventEmitter<{ action: string; value: any; }> = new EventEmitter();
  userForm = new FormGroup({
    name: new FormControl('',[Validators.required])
  });
  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  onSubmit() {
    this.Emitter.emit({action: 'user-registered', value: this.userForm.value});
    this.router.navigate(['game', this.userForm.value]);
  }
}
