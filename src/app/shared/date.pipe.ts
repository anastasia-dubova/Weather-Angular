import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
	name: 'date'
})
export class DatePipe implements PipeTransform {
	transform(dt: number): string {
		const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
		let currentDate = new Date((dt)*1000)
		let date = currentDate.getUTCDate()
		let month = currentDate.getUTCMonth()
		let year = currentDate.getUTCFullYear()
		return (date + ' ' + MONTHS[month] + ' ' + year)
	}
}