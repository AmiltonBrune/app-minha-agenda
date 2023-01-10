import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { Contact } from '@app/_models';
import { DeleteDialogStudentComponent } from '../delete-dialog-contact/delete-dialog-contact.component';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css'],
})
export class AllStudentsComponent implements OnInit {
  allContactsSource: Contact[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  loading = false;

  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.contactService
      .getAll()
      .pipe(first())
      .subscribe((data: any) => {
        this.loading = false;
        this.allContactsSource = data['contacts'];
      });
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogStudentComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.allContactsSource = this.allContactsSource.filter(
          (_) => _.id !== id
        );
      }
    });
  }
}
