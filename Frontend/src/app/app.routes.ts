import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Units } from './pages/units/units';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'units', component: Units }
];
