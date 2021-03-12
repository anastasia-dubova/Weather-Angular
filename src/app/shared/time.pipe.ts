import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
	name: 'time'
})
export class TimePipe implements PipeTransform {
	transform(dt: number): string {
		let currentDate = new Date((dt)*1000)
		let hours = currentDate.getUTCHours()
		let minutes = currentDate.getUTCMinutes()
		return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
	}
}