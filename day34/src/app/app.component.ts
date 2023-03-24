import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Weather } from './models';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'day34';

  form!: FormGroup
  weather: Weather[] = []

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService){ }

  ngOnInit(): void {
      this.form = this.fb.group({
        city: this.fb.control("", [Validators.required])
      })
  }

  getWeather(){
    const city = this.form.value.city
    console.log(">>> city: ", city)
    // before observable and subscription
    // this.weatherSvc.getWeather(city)
    //   .then(result => {
    //       this.weather = result
    //     this.form.reset()
    //   })
    //   .catch(error => {
    //     console.info(">>> error", error)
    //   })

      this.weatherSvc.getWeather(city)
  }


}
