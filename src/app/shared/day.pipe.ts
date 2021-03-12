import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
	name: 'day'
})
export class DayPipe implements PipeTransform {
	transform(dt: number): string {
		const DaysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
		let currentDate = new Date((dt)*1000)
		let day = currentDate.getUTCDay()
		return DaysOfWeek[day]
	}
}