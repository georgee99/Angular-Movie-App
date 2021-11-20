import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenPipe'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string) {
    if(value.length >= 350){
      return value.substr(0, 350) + '.....';
    }
    return value;
  }
}
