import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ContactService} from "../shared/services/contact.service";
import {switchMap} from "rxjs/operators";
import {Contact} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  contact: Contact
  updateSub: Subscription
  submitted: boolean = false

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((param: Params) => {
          return this.contactService.getById(param['id'])
        })
      ).subscribe((contact: Contact) => {
        this.contact = contact
        this.form = new FormGroup({
          name: new FormControl(contact.name, Validators.required),
          email: new FormControl(contact.email, [
            Validators.required,
            Validators.email
          ]),
          phone: new FormControl(contact.phone, Validators.required)
        })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const contact: Contact = {
      id: this.contact.id,
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone
    }

    this.updateSub = this.contactService.update(contact).subscribe(() => {
      this.alertService.success('Контакт успешно обновлен')
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe()
    }
  }
}
