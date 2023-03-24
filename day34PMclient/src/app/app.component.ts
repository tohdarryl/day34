import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATEGORY, Country, COUNTRYCODE, GetNewsCommand, SearchCriteria, } from './models';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'day34PM';

  form!: FormGroup
  

  countries: Country[] = []
  // countries = COUNTRYCODE
  categories = CATEGORY
  flag: string | undefined = ""

  constructor(private fb: FormBuilder, private newsSvc: NewsService) { }

  ngOnInit(): void {
    // on init, get Countries
    this.newsSvc.getCountries()
    // equate result to this.countries
      .then(result => this.countries = result)

    console.log("this.countries:", this.countries)

    this.form = this.fb.group({
      country: this.fb.control<string>('', [Validators.required]),
      category: this.fb.control<string>('', [Validators.required])
    })
  }

  onCountryChange(selectElem: any) {
    // selectElem.target.value is retrieved from html as code
		const code = selectElem.target.value
    // country object is called by filtering for code selected in html in this.countries; retrieved from RestCountries
		const country = this.countries.find(c => c.code == code)
		this.flag = country?.flag
	}

	// performSearch() {
	// 	const criteria = this.form.value as SearchCriteria
	// 	console.info('>>> criteria: ', criteria)

  //   this.newsSvc.execute.next({ criteria } as GetNewsCommand )
	// }

  getNews() {
    const country = this.form.value.country
    console.log(">>> country: ", country)
    const category = this.form.value.category
    console.log(">>> category: ", category)
    this.newsSvc.getNews(country, category)
  }
}
