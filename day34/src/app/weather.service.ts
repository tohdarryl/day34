import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable, Subject, tap } from "rxjs";
import { Weather } from "./models";


const WEATHER_URL ="https://api.openweathermap.org/data/2.5/weather"
const APPID = "take API from website"

@Injectable()
export class WeatherService{

    // fire to child (for subscription)
    onWeather = new Subject <Weather[]>

    // HttpClient comdes from HttpClientModule in app.module.ts
    constructor(private http: HttpClient){ }
    /*
    Before Observable and Subscription
    getWeather(city: string){
        // Set params
        const params = new HttpParams()
            .set('q', city)
            .set('units', 'metric')
            .set('appid', APPID)

        // firstValueFrom returns a 'Promise'
        return firstValueFrom(
        // Make Http call, since const param is the same as variable name in argument {params: params}, can do { params} 
        this.http.get<Weather[]>(WEATHER_URL, {params: params})
        .pipe(
            map((data: any) => {
                return data['weather'] as Weather[]
            })
        )
        )

    }
    */
    getWeatherAsObservable(city: string): Observable<Weather[]>{
        // Set params
        const params = new HttpParams()
            .set('q', city)
            .set('units', 'metric')
            .set('appid', APPID)

        return ( // Returns Observable, 1 value
        // Make Http call, since const param is the same as variable name in argument {params: params}, can do { params} 
        this.http.get<Weather[]>(WEATHER_URL, {params: params})
        .pipe(
            map((data: any) => {
                console.info(">>> in map")
                // return data and to send out in tap()
                return data['weather'] as Weather[]
            }),
            tap(data => {
                // fire event with .next() so that weather-display/ interested components can subscribe to our data
                // go to weather-display.component.ts
                console.info(">>> data", data)
                this.onWeather.next(data)
            })
        )
        )

    }
   
    getWeather(city: string): Promise<Weather[]> {
        // firstValueFrom returns a Promise
        return firstValueFrom(
            this.getWeatherAsObservable(city)
        )
        /*
        .then((data: any) => {
            //map()
            return data['weather'] as Weather[]
        })
        .then(data => {
            //tap()
            this.onWeather.next(data)
            return data
        })
        
        .then((data: any) => {
            //map() and tap()
            const w = data['weather] as Weather[]
            this.onWeather.next(w)
            return w
        */
        
    }
}