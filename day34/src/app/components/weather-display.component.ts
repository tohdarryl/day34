import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit, OnDestroy{

  weather$!: Observable<Weather[]>
  weather: Weather[] = []
  weatherSub!: Subscription

  // WeatherService in constructor to make subscription available
  constructor(private weatherSvc: WeatherService) { }

  ngOnInit(): void {
    // set weather$ after getting value from onWeather() method in weatherSvc
    this.weather$ = this.weatherSvc.onWeather
    // subscribe, everytime .next() is executed, will pass us data and we'll set data as this.weather
    console.info(">> subscribing to weather")
    // this.weatherSub = this.weatherSvc.onWeather.subscribe(
    //   (data) => this.weather = data
    // )
      // this.weather$ = this.weatherSvc.onWeather.asObservable()
  }

   ngOnDestroy(): void {
       this.weatherSub.unsubscribe()
   }

}
