import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactService} from "../shared/services/contact.service";
import {Contact} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  contacts: Contact[] = []
  searchName = ''
  gSub: Subscription
  dSub: Subscription

  constructor(
    private contactService: ContactService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.gSub = this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts
    })
  }

  delete(id: number) {
    this.dSub = this.contactService.delete(id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => +contact.id !== id)
      this.alertService.success('Контакт успешно удален')
    })
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
