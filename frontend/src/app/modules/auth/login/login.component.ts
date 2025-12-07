import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorageService } from '../services/user-storage.service';  // ✅ Make sure path is correct

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  SubmitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form submitted:', this.validateForm.value);

      this.authService.login(this.validateForm.value).subscribe({
        next: (res) => {
          // ✅ Save user
          const user = {
            id: res.id,
            role: res.role
          };
          UserStorageService.saveUser(user);

          
          this.message.success('Login successful!');
          
          if(UserStorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('/admin/dashboard')
          }else if(UserStorageService.isUserLoggedIn()){
            this.router.navigateByUrl('/user/dashboard')
          }
          console.log(res);
        },
        error: () => {
          this.message.error('Invalid credentials');
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
}
