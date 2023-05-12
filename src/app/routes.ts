import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAdsActionComponent } from './admin-ads-action/admin-ads-action.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin Panel'
  },
  {
    path: 'admin/ads/:action/:id',
    component: AdminAdsActionComponent,
    title: 'Edit Iklan'
  },
  {
    path: 'admin/ads/:action',
    component: AdminAdsActionComponent,
    title: 'Tambah Iklan'
  },
];

export default routes;