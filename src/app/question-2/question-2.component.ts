import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-2',
  templateUrl: './question-2.component.html',
  styleUrls: ['./question-2.component.css']
})
export class Question2Component {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    // Trigger validation check when password or confirmPassword changes
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Handle form submission
  onSubmit() {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.form.markAllAsTouched();
    } else {
      console.log('Form Submitted!', this.form.value);
    }
  }
}
