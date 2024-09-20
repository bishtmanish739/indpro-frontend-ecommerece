import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, LoginService } from '../login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.matchPassword.bind(this)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get confirmPassword() {
    return this.loginForm.get('confirmPassword');
  }

  matchPassword(control: any): { [key: string]: boolean } | null {
    if (this.loginForm && control.value !== this.loginForm.get('password')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  registerNew(): void {
    this.router.navigate(['/register'],{ replaceUrl: true });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      this.loginService.loginUser(this.loginForm.value).subscribe({
        next: (res:LoginResponse) => {
          console.log(res.token);
          localStorage.setItem('authToken', res.token);
          this.router.navigate(['/products'],{ replaceUrl: true });
        },
        error: (err) => {
          console.error('Login error:', err);
          alert(err.error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
