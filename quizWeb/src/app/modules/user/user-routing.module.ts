import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { ViewMyTestResultsComponent } from './components/view-my-test-results/view-my-test-results.component';
import { TopicSelectionComponent } from './topic-selection/topic-selection.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  // ⭐ Updated route
  { path: 'topic-selection/:level', component: TopicSelectionComponent },

  { path: 'take-test/:id', component: TakeTestComponent },
  { path: 'view-test-results', component: ViewMyTestResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
