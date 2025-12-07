import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-question-in-test',
  standalone: true,
  imports: [SharedModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-question-in-test.component.html',
  styleUrls: ['./add-question-in-test.component.scss']
})
export class AddQuestionInTestComponent implements OnInit {

  level: string = '';
  topic: string = '';
  questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // ✅ Read level and topic from route params
    this.level = this.activatedRoute.snapshot.params['level'] || '';
    this.topic = this.activatedRoute.snapshot.params['topic'] || '';

    this.questionForm = this.fb.group({
      questionText: [null, [Validators.required]],
      optionA: [null, Validators.required],
      optionB: [null, Validators.required],
      optionC: [null, Validators.required],
      optionD: [null, Validators.required],
      correctOption: [null, Validators.required],
    });

    console.log('AddQuestion for:', this.level, this.topic);
  }

  submitForm() {
    const questionDto = this.questionForm.value;

    // ✅ Attach level and topic to DTO
    questionDto.level = this.level;
    questionDto.topic = this.topic;

    this.adminService.addQuestionInTest(questionDto).subscribe({
      next: () => {
        this.notification.success(
          'SUCCESS',
          'Question created successfully',
          { nzDuration: 5000 }
        );
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (error) => {
        this.notification.error(
          'ERROR',
          `${error.error}`,
          { nzDuration: 5000 }
        );
      }
    });
  }
}
