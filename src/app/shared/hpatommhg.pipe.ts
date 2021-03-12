import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
	name: 'hpatommhg',
	pure: false
})
export class HpaToMmhg implements PipeTransform {
	transform(hpa: number): number {
		return Math.round(hpa*0.75006375541921)
	}
}