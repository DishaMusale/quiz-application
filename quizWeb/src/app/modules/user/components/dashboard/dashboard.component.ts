import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TestService } from '../../services/test.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminRoutingModule } from "../../../admin/admin-routing.module";
import { Router } from '@angular/router';   // <-- ADDED

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, AdminRoutingModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tests = [];

  constructor(
    private notification: NzNotificationService,
    private testService: TestService,
    private router: Router                    // <-- ADDED
  ) {}

  ngOnInit(): void {
    this.getAllTests();
  }

  getAllTests(): void {
    this.testService.getAllTest().subscribe({
      next: (res) => {
        this.tests = res;
      },
      error: () => {
        this.notification.error(
          'ERROR',
          'Something went wrong, Try Again',
          { nzDuration: 5000 }
        );
      }
    });
  }

  getFormattedTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }

  goToTopics(testId: number) {               // <-- ADDED
    this.router.navigate(['/user/topic-selection', testId]);
  }
}
