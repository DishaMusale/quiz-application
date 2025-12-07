import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TopicSelectionComponent } from './topic-selection/topic-selection.component';

@NgModule({
  declarations: [TopicSelectionComponent],  
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
