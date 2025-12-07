// src/app/DemoNgZorroAntdModule.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Ng Zorro Modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  exports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,

    // Ng Zorro
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzDropDownModule,
    NzSelectModule,
    NzModalModule,
    NzMessageModule,
    NzNotificationModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzTabsModule
  ]
})
export class DemoNgZorroAntdModule {}
