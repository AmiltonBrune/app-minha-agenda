import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddStudentComponent implements OnInit {
  contactForm: Contact = {
    name: '',
    email: '',
    phone: '',
  };
  loading = false;
  error = '';

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    this.loading = true;
    this.contactService.create(this.contactForm).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
