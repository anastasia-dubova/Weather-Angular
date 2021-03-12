import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { ApiKeyComponent } from './api-key/api-key.component';
import { WeatherComponent } from './weather/weather.component';
import { DatePipe } from './shared/date.pipe';
import { DayPipe } from './shared/day.pipe';
import { TimePipe } from './shared/time.pipe';
import { HpaToMmhg } from './shared/hpatommhg.pipe';
import { TodayComponent } from './today/today.component';
import { HourlyListComponent } from './hourly-list/hourly-list.component';
import { DailyListComponent } from './daily-list/daily-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiKeyComponent,
    WeatherComponent,
    DatePipe,
    DayPipe,
    TimePipe,
    HpaToMmhg,
    TodayComponent,
    HourlyListComponent,
    DailyListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
