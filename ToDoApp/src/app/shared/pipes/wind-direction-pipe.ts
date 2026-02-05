import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirection',
})
export class WindDirectionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
