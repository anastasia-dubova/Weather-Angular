import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

	public cityName: string

	map: Map;
	mapOptions: MapOptions;

	marker: Marker;

	constructor(public dataService: DataService) { }

	ngOnInit(): void {
		this.initializeMapOptions();
	}

	submitCity(e) {

		this.cityName = this.cityName.trim()

		if(this.cityName) {
			this.dataService.fetchDataFromWeatherByCityName(this.cityName).subscribe(
				(data) => {
					this.marker.setLatLng([data.coord.lat, data.coord.lon])
					.bindPopup(`${data.coord.lat}&#176;, ${data.coord.lon}&#176;`)

					this.map.setView(latLng(data.coord.lat, data.coord.lon))
				})
		} else {
			this.dataService.setError('Введите название города!')
		}
		
	}

	private initializeMapOptions() {
		this.mapOptions = {
			center: latLng(this.dataService.lat, this.dataService.lon),
			zoom: 6,
			doubleClickZoom: false,
			layers: [
				tileLayer(
					'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						maxZoom: 18
					}
				)
			]
		}
	}

	onMapReady(map: Map) {
		this.map = map;
		this.addMarker();
	}

	private addMarker() {
		this.marker = new Marker([this.dataService.lat, this.dataService.lon])
			.setIcon(
				icon({

					iconUrl: 'assets/marker-icon.png',
					iconRetinaUrl: 'assets/marker-icon-2x.png',
					shadowUrl: 'assets/marker-shadow.png',
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					tooltipAnchor: [16, -28],
					shadowSize: [41, 41],
					shadowAnchor: [8, 41]
			}))
			.bindPopup(`${this.dataService.lat}&#176;, ${this.dataService.lon}&#176;`)
		this.marker.addTo(this.map)
	}

	dblClickMap(e) {
		this.dataService.selectNewPlace(e.latlng.lat, e.latlng.lng);
		//this.marker.setLatLng([e.latlng.lat, e.latlng.lng])
		this.marker.setLatLng([this.dataService.lat, this.dataService.lon])
					  .bindPopup(`${this.dataService.lat}&#176;, ${this.dataService.lon}&#176;`)
	}
}
