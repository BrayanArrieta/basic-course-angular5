import { Component, OnInit } from '@angular/core';
import {CountryService} from '../country.service';
import {Country} from '../country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  public countries: Country[];

  constructor(private countryService: CountryService ) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(
      (countries) => this.countries = countries,
      (error) => console.error(error)
    );
  }

}
