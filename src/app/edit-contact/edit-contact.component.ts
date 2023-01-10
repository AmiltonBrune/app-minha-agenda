import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditStudentComponent implements OnInit {
  contactForm: Contact = {
    name: '',
    email: '',
    phone: '',
  };
  // @ts-ignore: Unreachable code error
  id: string;
  loading = false;
  error = '';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      // @ts-ignore: Unreachable code error
      this.id = param.get('id');
      // @ts-ignore: Unreachable code error
      this.getById(this.id);
    });
  }

  getById(id: string) {
    this.loading = true;
    this.contactService.getById(id).subscribe(
      (data: any) => {
        this.loading = false;
        this.contactForm = data;
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  update() {
    this.loading = true;
    this.contactService.edit(this.contactForm, this.id).subscribe(
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
