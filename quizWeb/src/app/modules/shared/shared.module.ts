import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ng Zorro Antd Modules (UI components)
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';   // ✅ Import this

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Ng Zorro
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzDropDownModule,
    NzMenuModule,
    NzModalModule,
    NzFormModule,
    NzMessageModule,
    NzNotificationModule,
    NzCardModule   // ✅ Add here
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Ng Zorro
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzDropDownModule,
    NzMenuModule,
    NzModalModule,
    NzFormModule,
    NzMessageModule,
    NzNotificationModule,
    NzCardModule   // ✅ And export it too
  ]
})
export class SharedModule {}
