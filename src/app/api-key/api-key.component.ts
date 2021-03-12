import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
	selector: 'app-api-key',
	templateUrl: './api-key.component.html',
	styleUrls: ['./api-key.component.scss']
})
export class ApiKeyComponent implements OnInit {
	public key: string
	public errorMessage: string = ''

	constructor(public dataService: DataService) { }

	ngOnInit(): void {
		if(this.dataService.apiKey) {
			this.dataService.fetchDataFromOnecallByGeographicCoordinates().subscribe()
		}
	}

	submitApiKey() {
		if(this.key) {
			this.dataService.fetchDataFromOnecallByGeographicCoordinates(this.key).subscribe( 
				(data) => {
					this.errorMessage = ''
					sessionStorage.setItem('api-key', this.key)
				},
				(data) => {
					if(data.error.cod) {
						this.errorMessage = `${data.error.cod} ${data.error.message}`
					} else {
						this.errorMessage = data.statusText
					}
				}
			)
		} else {
			this.errorMessage = 'Введите ключ API!'
		}
	}

	changeHandler() {
		this.errorMessage = ''
	}
}