import { Component, OnInit } from '@angular/core';
import {CountryService} from '../country.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder, private countryService: CountryService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      abbr: ['', Validators.required],
      population: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.countryService.addCountry(this.form.value).subscribe(
        (success) => console.log(success),
        (error ) => console.error(error)
      );
    }
  }



}
