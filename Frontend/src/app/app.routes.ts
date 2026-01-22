import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Units } from './pages/units/units';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { AdminBookings } from './pages/admin-bookings/admin-bookings';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'units', component: Units },
    { path: 'my-bookings', component: MyBookings },
    { path: 'admin/bookings', component: AdminBookings },
];
