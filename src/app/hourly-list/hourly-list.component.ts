import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-hourly-list',
  templateUrl: './hourly-list.component.html',
  styleUrls: ['./hourly-list.component.scss']
})
export class HourlyListComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
