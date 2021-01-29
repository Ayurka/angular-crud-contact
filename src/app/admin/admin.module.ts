import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page/login-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {RouterModule} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./shared/services/auth.guard";
import { AlertComponent } from './shared/components/alert/alert.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import {ContactService} from "./shared/services/contact.service";
import {HttpClientModule} from "@angular/common/http";
import {AlertService} from "./shared/services/alert.service";
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    AlertComponent,
    AdminLayoutComponent,
    SearchPipe
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: '/admin/login',
            pathMatch: 'full'
          },
          {
            path: 'login',
            component: LoginPageComponent
          },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'create',
            component: CreatePageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'contact/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ]),
    ReactiveFormsModule
  ], exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ContactService,
    AlertService
  ]
})
export class AdminModule { }
