import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm!: FormGroup; 

  constructor(private fb: FormBuilder, private router: Router,private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      
      this.loginService.loginUser(this.loginForm.value).subscribe({
        next: (token) => {
          alert(token);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Login error:', err);
          // Optionally, display an error message to the user
          alert('Login failed. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
      // Optionally, you could provide user feedback here
    }
  }

}
