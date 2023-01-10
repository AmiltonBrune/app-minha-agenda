import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Contact } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contacts`);
  }
  getById(id: string) {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contacts/${id}`);
  }

  create(data: any) {
    return this.http.post<Contact>(`${environment.apiUrl}/contacts`, {
      ...data,
    });
  }

  edit(data: any, id: string) {
    return this.http.put<Contact>(`${environment.apiUrl}/contacts/${id}`, {
      ...data,
    });
  }
  delete(id: string) {
    return this.http.delete<Contact>(`${environment.apiUrl}/contacts/${id}`);
  }
}
