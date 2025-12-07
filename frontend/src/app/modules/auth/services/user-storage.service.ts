import { Injectable } from '@angular/core';

const User = 'q_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  static saveUser(user: any): void {
    window.localStorage.removeItem(User);
    window.localStorage.setItem(User, JSON.stringify(user));
  }

  static getUser(): any {
    const user = localStorage.getItem(User);
    return user ? JSON.parse(user) : null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.id;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.role ? user.role.toUpperCase() : '';
  }

  static isAdminLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isUserLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return role === 'USER';
  }

  static signOut(): void {
    window.localStorage.removeItem(User);
  }
}
