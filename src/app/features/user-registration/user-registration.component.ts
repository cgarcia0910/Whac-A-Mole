import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class UserRegistrationComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('',[Validators.required])
  });
  @Output() Emitter: EventEmitter<{ action: string; value: any; }> = new EventEmitter();
  ngOnInit(): void {
  }
  onSubmit() {
    this.Emitter.emit({action: 'user-registered', value: this.userForm.value});
  }
}
