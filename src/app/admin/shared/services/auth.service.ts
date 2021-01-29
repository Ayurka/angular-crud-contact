import { Injectable } from '@angular/core';
import {User} from "../interfaces";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {

  private email = 'admin@admin.com'
  private password = 'password'
  private token = 'token'
  public error$: Subject<string> = new Subject<string>()

  constructor() { }

  login(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      if (user.email === this.email && user.password === this.password) {
        this.setToken(this.token)
        resolve()
      }
      this.error$.next('Логин или пароль неверны')
      reject()
    })
  }

  logout(): void {
    this.setToken(null)
  }

  getToken(): string {
    return localStorage.getItem('token')
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.clear()
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}
