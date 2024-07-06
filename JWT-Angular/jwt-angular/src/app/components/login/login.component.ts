import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/modal/modal.LoginResponse';
import { Register } from 'src/app/modal/modal.component';
import { JwtRegisterService } from 'src/app/service/jwt/jwt.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  l_objRegisterModal: Register = new Register();

  constructor(
    private g_objJwtRegisterService: JwtRegisterService,
    private fb: FormBuilder,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginClick(): void {
    if (!this.loginForm) {
      console.error("From Group Errro!")
      return
    }

    const l_email = this.loginForm.get('email');
    const l_password = this.loginForm.get('password');
    

    if (!l_email || l_email.invalid) {
      alert('Pleas Enter Email!');
    }

    if (!l_password || l_password.invalid) {
      alert('Pleas Enter Password!')
    }


     // Ensure all fields are valid before saving data
     if (this.loginForm.valid) {
      this.saveRegisterData();
    }
  }

  saveRegisterData() {
    if (this.loginForm.valid) {
      this.g_objJwtRegisterService.login(this.loginForm.value).subscribe(
        (response: LoginResponse) => {
          console.log('API Response:', response); // Log the entire response

          
          const jwtToken = response.jwtToken; 
          console.log('JWT Token:', jwtToken); 
  
          if (jwtToken) { 
            alert("Log In Successful");
            alert('JWT Token: ' + jwtToken); 
            
            // Set JWT Token in Local storage
            localStorage.setItem('jwt', jwtToken);
  
            // Redirect or Navigate to the dashboard
            this.router.navigateByUrl("/dashboard");
          } else {
            alert('JWT Token not found in response.');
          }
        },
        (error: any) => {
          console.error('Login failed', error);
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }

}
