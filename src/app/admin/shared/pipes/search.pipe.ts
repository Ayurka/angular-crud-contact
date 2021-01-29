import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "../interfaces";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contacts: Contact[], search: string = ''): Contact[] {
    if (!search.trim()) {
      return contacts
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
