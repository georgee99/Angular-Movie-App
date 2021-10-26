import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products:any[], filter: Object): any[] {
    // return products.filter((product:any) => {
    //   return product.id < 58041;
    // });
    // Change this up to filter for emotions
    if(!products || filter){
      return products.filter((item:any) => item.id > 550988);
    }

    return products
  }

}
