import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-delete-dialog-contact',
  templateUrl: './delete-dialog-contact.component.html',
  styleUrls: [],
})
export class DeleteDialogStudentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService
  ) {}
  loading = false;
  error = '';

  ngOnInit(): void {}

  confirmDelete() {
    this.loading = true;
    this.contactService.delete(this.data.id).subscribe(
      () => {
        this.loading = false;
        this.dialogRef.close(this.data.id);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
