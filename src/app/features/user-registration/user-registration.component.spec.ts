import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [UserRegistrationComponent, FormsModule, ReactiveFormsModule]
    }).compileComponents()
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render two imputs', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#userForm')
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });
  it('should have the form empty when start the app', () => {
    const expectedInitalFormValue = {
      name: ''
    };
    expect(component.userForm.value).toEqual(expectedInitalFormValue);
  })
  it('should the form be invalid if no name is typed', () => {
    const userForm = fixture.debugElement.nativeElement.querySelector('#userForm');
    const {0: inputControl = undefined, 1:submitButton = undefined} = userForm.querySelectorAll('input') || [];
    // inputControl.value = 'prueba';
    // inputControl.dispatchEvent(new Event('input'));
    expect(component.userForm.valid).toBe(false);
  })
  it('should be a valid form is a name is typed', () => {
    const userForm = fixture.debugElement.nativeElement.querySelector('#userForm');
    const {0: inputControl = undefined, 1:submitButton = undefined} = userForm.querySelectorAll('input') || [];
    inputControl.value = 'prueba';
    inputControl.dispatchEvent(new Event('input'));
    expect(component.userForm.valid).toBe(true);
  })
  it('should emmit usser information when form is valid and is submitted', () => {
    const emitterSpy = spyOn(component.Emitter, 'emit');
    const userForm = fixture.debugElement.nativeElement.querySelector('#userForm');
    const {0: inputControl = undefined, 1:submitButton = undefined} = userForm.querySelectorAll('input') || [];
    inputControl.value = 'prueba';
    inputControl.dispatchEvent(new Event('input'));
    component.onSubmit();
    expect(emitterSpy).toHaveBeenCalledWith({action: 'user-registered', value: {name: 'prueba'}})});
});
