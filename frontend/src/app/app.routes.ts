import { Routes } from '@angular/router';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { TopicSelectionComponent } from './modules/user/topic-selection/topic-selection.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
    { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  
    // ✅ Dynamic route for topic selection by level
    { path: 'user/topic-selection/:level', component: TopicSelectionComponent }
  ];
  