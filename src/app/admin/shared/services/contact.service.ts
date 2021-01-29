import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.url}`, contact)
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${environment.url}/${contact.id}`, contact)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/${id}`)
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.url}/${id}`)
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.url}`)
  }
}
