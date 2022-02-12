import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(movies: any[], filterText: string): any {
    return movies ? movies.filter((item) => item.title.search(new RegExp(filterText, 'i')) > -1): movies;;
  }
}
