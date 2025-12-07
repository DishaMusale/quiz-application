import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, RouterModule], // ✅ include ReactiveFormsModule
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  testForm!: FormGroup;
  level: string = '';
  topic: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService, // ✅ renamed for clarity
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Read level and topic from route params
    this.level = this.route.snapshot.paramMap.get('level') || '';
    this.topic = this.route.snapshot.paramMap.get('topic') || '';

    // ✅ Build form with level + topic included
    this.testForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      time: [null, [Validators.required, Validators.min(1)]],
      level: [this.level, Validators.required],
      topic: [this.topic, Validators.required]
    });
  }

  submitForm(): void {
    if (this.testForm.invalid) {
      this.notification.error('ERROR', 'Please fill all required fields', { nzDuration: 5000 });
      return;
    }

    const testDto = this.testForm.value;
    console.log('Creating test:', testDto); // ✅ debug log

    this.adminService.createTest(testDto).subscribe({
      next: () => {
        this.notification.success('SUCCESS', 'Test Created Successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (error) => {
        this.notification.error('ERROR', error.error || 'Something went wrong', { nzDuration: 5000 });
      }
    });
  }
}
