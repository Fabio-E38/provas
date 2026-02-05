import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherDescription',
})
export class WeatherDescriptionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
