import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tests: any[] = [];

  constructor(
    private notification: NzNotificationService,
    private testService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTests();
  }

  getAllTests(): void {
    this.testService.getAllTest().subscribe({
      next: (res) => {
        console.log('Fetched tests:', res); // ✅ log response to confirm level exists
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

  openLevel(level: string | null | undefined): void {
    if (!level) {
      this.notification.error(
        'ERROR',
        'No level found for this test',
        { nzDuration: 5000 }
      );
      console.error('No level found for test:', level);
      return;
    }
    this.router.navigate(['/admin/select-topic', level.toLowerCase()]);
  }
}
