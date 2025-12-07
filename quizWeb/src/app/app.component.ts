import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { UserStorageService } from './modules/auth/services/user-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']     
})
export class AppComponent {
  title = 'quizWeb';

  isUserLoggedIn:boolean=UserStorageService.isUserLoggedIn();
  isAdminLoggedIn:boolean=UserStorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isUserLoggedIn=UserStorageService.isUserLoggedIn();
      this.isAdminLoggedIn=UserStorageService.isAdminLoggedIn();
    })
  }

  logOut(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}

