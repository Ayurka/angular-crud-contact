import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../shared/services/contact.service";
import {Contact} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  form: FormGroup
  createSub: Subscription
  submitted: boolean = false

  constructor(
    private contactService: ContactService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const contact: Contact = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone
    }

    this.createSub = this.contactService.create(contact).subscribe(() => {
      this.form.reset()
      this.submitted = false
      this.alertService.success('Контакт успешно создан')
    },() => {
      this.submitted = false
    })
  }

  ngOnDestroy() {
    if (this.createSub) {
      this.createSub.unsubscribe()
    }
  }

}
