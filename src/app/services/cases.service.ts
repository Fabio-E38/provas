import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountMock, ContactMock, MOCK_ACCOUNTS, MOCK_CONTACTS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  private accounts: AccountMock[] = [...MOCK_ACCOUNTS];
  private contacts: ContactMock[] = [...MOCK_CONTACTS];

  getAccountById(id: string): Observable<AccountMock | undefined> {
    return of(this.accounts.find(account => account.id === id));
  }

  getContactById(id: string): Observable<ContactMock | undefined> {
    return of(this.contacts.find(contact => contact.id === id));
  }
}