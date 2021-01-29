import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getAuth() {
    return this.authService
  }

  logout($event: MouseEvent) {
    $event.preventDefault()
    this.authService.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
