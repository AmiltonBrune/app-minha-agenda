import { Routes, RouterModule } from '@angular/router';

import { AddStudentComponent } from './add-contact/add-contact.component';
import { AllStudentsComponent } from './all-contacts/all-contacts.component';
import { EditStudentComponent } from './edit-contact/edit-contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: '',
    component: AllStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-contact',
    component: AddStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-contact/:id',
    component: EditStudentComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
