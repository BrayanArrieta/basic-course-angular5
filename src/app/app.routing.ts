import {Routes} from '@angular/router';
import {CountriesComponent} from './countries/countries.component';
import {CountryAddComponent} from './country-add/country-add.component';



export const routes: Routes = [
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/create', component: CountryAddComponent },
  // Main route
  { path: '', redirectTo: '/countries', pathMatch: 'full' }
];
