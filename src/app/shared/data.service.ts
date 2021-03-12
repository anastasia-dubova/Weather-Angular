import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface OnecallData {
	[key: string]: any
}
interface WeatherData {
	[key: string]: any
}

@Injectable({
	providedIn: 'root'
})
export class DataService {

	public apiKey = sessionStorage.getItem('api-key') //'a3cc488aa673730c8354dd39912b5cde'
	public lat = 55.15
	public lon = 61.43
	public currentHour = 0
	public errorMessage = ''

	public countHoursDisplayed = 3
	public countDaysDisplayed = 5
	public maxHours = 3
	public pageSelection: number[]

	public onecallData: OnecallData
	public weatherData: WeatherData

	constructor(private http: HttpClient) {}

	enterKey(key: string) {
		this.apiKey = key
	}


	fetchDataFromOnecallByGeographicCoordinates(key: string = this.apiKey): Observable<OnecallData> {
		return this.http.get<OnecallData>(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely&units=metric&lang=ru&appid=${key}`)
			.pipe(tap( data => {
				this.apiKey = key
				this.maxHours = data.hourly.length
				this.pageSelection = new Array(this.maxHours / (this.countHoursDisplayed == 0 ? 1 : this.countHoursDisplayed)).fill(0).map((_,i) => i)
				this.onecallData = data;
				this.onecallData.hourly = data.hourly.filter((_, i) => i >= this.currentHour && i < this.currentHour + this.countHoursDisplayed)
				this.onecallData.daily = data.daily.filter((_, i) => i > 0 && i < this.countDaysDisplayed)

				this.fetchDataFromWeatherByGeographicCoordinates().subscribe()

				this.setError('')

			},
			data => {
				this.apiKey = null; 
				this.setError(`${data.error.cod} ${data.error.message}`)
			}
		))
	}

	fetchDataFromWeatherByGeographicCoordinates(): Observable<WeatherData> {
		return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`)
			.pipe(tap( data => {
				this.weatherData = data;
			},
			data => {
				this.setError(`${data.error.cod} ${data.error.message}`)
			}
			))
	}

	fetchDataFromWeatherByCityName(cityName): Observable<WeatherData> {
		return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=${cityName}&appid=${this.apiKey}`)
			.pipe(tap( data => {
					this.weatherData = data

					this.lat = data.coord.lat
					this.lon = data.coord.lon
					this.fetchDataFromOnecallByGeographicCoordinates().subscribe()
				},
				data => {
					this.setError(`${data.error.cod} ${data.error.message}`)
				}))
	}

	increaseCurrentValue(inc: number) {
		const nextHour = this.currentHour + inc * this.countHoursDisplayed
		this.currentHour = nextHour
		
		if(nextHour < this.countHoursDisplayed) {
			this.currentHour = 0
		} else if(nextHour + this.countHoursDisplayed > this.maxHours - 1) {
			this.currentHour = this.maxHours - this.countHoursDisplayed
		} else {
			this.currentHour = nextHour
		}

		this.fetchDataFromOnecallByGeographicCoordinates().subscribe()
	}

	changeCurrentValue(i: number){
		this.currentHour = i * this.countHoursDisplayed
		this.fetchDataFromOnecallByGeographicCoordinates().subscribe()
	}

	selectNewPlace(lat: number, lon: number) {
		this.lat = lat
		this.lon = lon
		this.fetchDataFromOnecallByGeographicCoordinates().subscribe()
	}

	setError(message: string) {
		this.errorMessage = message
	}
}