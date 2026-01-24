import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Units } from './pages/units/units';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { AdminBookings } from './pages/admin-bookings/admin-bookings';
import { AdminUnits } from './pages/admin-units/admin-units';
import { AdminAmenities } from './pages/admin-amenities/admin-amenities';
import { AdminTowers } from './pages/admin-towers/admin-towers';
import { adminGuard } from './auth/admin-guard';
import { AdminTenants } from './pages/admin-tenants/admin-tenants';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'units', component: Units },
    { path: 'my-bookings', component: MyBookings },
    { path: 'admin/dashboard', component: AdminDashboard, canActivate: [adminGuard] },
    { path: 'admin/bookings', component: AdminBookings, canActivate: [adminGuard] },
    { path: 'admin/amenities', component: AdminAmenities, canActivate: [adminGuard] },
    { path: 'admin/units', component: AdminUnits, canActivate: [adminGuard] },
    { path: 'admin/towers', component: AdminTowers, canActivate: [adminGuard] },
    { path: 'admin/tenants', component: AdminTenants, canActivate: [adminGuard] }
];