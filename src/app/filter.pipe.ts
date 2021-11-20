import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(products:any[], filter: Object, filterSad: Object, filterMeh: Object): any[] {

    if(!products || filter){
      let certainMovies = [];
      for(let i =0; i<products.length; i++){
        let m:any = localStorage.getItem(products[i]["id"] + "emotion")
        m = JSON.parse(m)
        if(m !== null && m["emotion"] == "happy"){
          certainMovies.push(products[i])
        }
      }
      return certainMovies;
    }

    if(!products || filterSad){
      let sadMovies = [];
      for(let i =0; i<products.length; i++){
        let s:any = localStorage.getItem(products[i]["id"] + "emotion")
        s = JSON.parse(s)
        if(s !== null && s["emotion"]=="sad"){
          sadMovies.push(products[i])
        }
      }
      return sadMovies;
    }

    if(!products || filterMeh){
      let mehMovies = [];
      for(let i =0; i<products.length; i++){
        let meh:any = localStorage.getItem(products[i]["id"] + "emotion")
        meh = JSON.parse(meh)
        if(meh !== null && meh["emotion"]=="meh"){
          mehMovies.push(products[i])
        }
      }
      return mehMovies;
    }

    return products
  }

}
