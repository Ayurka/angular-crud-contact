import {Component, OnDestroy, OnInit} from '@angular/core';
import UIkit from 'uikit';
import {Subscription} from "rxjs";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  alertSub: Subscription

  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      if (alert.text) {
        UIkit.notification({
          message: '<span data-uk-icon="icon: check;" class="uk-notification-message-success-icon"></span> ' + alert.text,
          status: alert.type,
          pos: 'top-right',
          timeout: 2000
        })
      }
    })
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }

}
