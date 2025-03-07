import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0';

    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + 't';
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'b';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'm';
    }

    return num.toFixed(2);
  }
}
