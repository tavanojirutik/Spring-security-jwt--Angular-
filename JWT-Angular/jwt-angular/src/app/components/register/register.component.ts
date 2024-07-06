import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/modal/modal.component';
import { JwtRegisterService } from 'src/app/service/jwt/jwt.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  l_objRegisterModal: Register = new Register();

  constructor(
    private g_objJwtRegisterService: JwtRegisterService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  registerClick(): void {
    if (!this.registerForm) {
      console.error("From Group Errro!")
      return
    }

    const l_name = this.registerForm.get('name');
    const l_email = this.registerForm.get('email');
    const l_password = this.registerForm.get('password');

    if (!l_name || l_name.invalid) {
      alert('Pleas Enter Name!');
    }

    if (!l_email || l_email.invalid) {
      alert('Pleas Enter Email!');
    }

    if (!l_password || l_password.invalid) {
      alert('Pleas Enter Password!')
    }


     // Ensure all fields are valid before saving data
     if (this.registerForm.valid) {
      this.saveRegisterData(this.registerForm.value);
    }
  }

  saveRegisterData(l_objNewRegister: Register) {
    this.g_objJwtRegisterService.register(l_objNewRegister).subscribe({
      next: (data: any) => {
        console.log('Register response:', data);
        alert(data); // Display the success message
      },
      error: (error: any) => {
        console.error('Register error:', error);
        alert('Register failed. Please try again.');
      }
    });
  }
  
  
  
  
}
