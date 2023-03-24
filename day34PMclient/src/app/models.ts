export interface Article {
    title: string
    author: string
    description: string
    url: string
    urlToImage: string
}

export interface Country {
	name: string
	code: string
	flag: string
}
// hard coded country code
export const COUNTRYCODE = ['sg','au','us','cn','jp']
// used countrycodes as requestParam for api call from RestCountries
export const COUNTRY_CODES = "ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za"

export const CATEGORY = ['business', 'entertainment', 'general', 'sports', 'technology']

export const COUNTRY_API = "https://restcountries.com/v3.1/alpha"

export interface SearchCriteria {
	code: string
	category: string
}

export interface Command { }
export interface GetNewsCommand extends Command {
  criteria: SearchCriteria
}