import {Routes} from '@angular/router';
import {CountriesComponent} from './countries/countries.component';



export const routes: Routes = [
  { path: 'countries', component: CountriesComponent },
  /*Main route*/
  { path: '', redirectTo: '/countries', pathMatch: 'full' }
];
