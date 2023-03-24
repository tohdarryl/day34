import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { count, firstValueFrom, map, Observable, Subject, tap } from "rxjs";
import { Article, COUNTRYCODE, Country, COUNTRY_API, COUNTRY_CODES, GetNewsCommand } from "./models";

// const NEWS_URL="https://newsapi.org/v2/top-headlines"
const APPID="take API from website"
export const NEWS_URL= "http://localhost:8080/api/news"
// export const NEWS_URL = "https://deft-collar-production.up.railway.app/api/news"

@Injectable()
export class NewsService{

    onNews = new Subject <Article[]>

    constructor(private http: HttpClient){ }

    getNewsAsObservable(country: string, category: string): Observable<Article[]>{
        // Set params
        const params = new HttpParams()
            // .set('country', country)
            // .set('category', category)
            .set('pageSize', 10)
            // .set('apiKey', APPID)

        return ( // Returns Observable, 1 value
        // Make Http call, since const param is the same as variable name in argument {params: params}, can do { params} 
        // this.http.get<Article[]>(NEWS_URL, {params: params})
        this.http.get<Article[]>(`${NEWS_URL}/${country}/${category}`, { params })
        .pipe(
            map((data: any) => {
                console.info(">>> in map")
                // return data and to send out in tap()
                return data['articles'] as Article[]
            }),
            tap(data => {
                // fire event with .next() so that news-display/ interested components can subscribe to our data
                // go to news-display.component.ts
                console.info(">>> data", data)
                this.onNews.next(data)
            })
        )
        )

    }
   
    getNews(country: string, category: string): Promise<Article[]> {
        // firstValueFrom returns a Promise
        return firstValueFrom(
            this.getNewsAsObservable(country, category)
        )
    
}

countries: Country[] = []
// execute = new Subject<GetNewsCommand>()
getCountries(): Promise<Country[]> {

    if (!!this.countries.length)
        return Promise.resolve(this.countries)

    const params = new HttpParams()
                .set('codes', COUNTRY_CODES)

    return firstValueFrom(
        this.http.get<Country[]>(COUNTRY_API, { params })
    ).then(result => {
        this.countries = result.map(
            (c: any) => (
                {
                    name: c.name.official,
                    code: c.cca2.toLowerCase(),
                    flag: c.flags.png
                } as Country
            )
        )
        this.countries.sort((a, b) => a.name > b.name? 1: -1)
        return this.countries
    })
}

}