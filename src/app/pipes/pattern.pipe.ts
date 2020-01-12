import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pattern'
})
export class PatternPipe implements PipeTransform {

  transform(value: any, charNum: number): any {    
    return value.match(new RegExp(`.{${charNum}}`, 'g')).join("\n");
  }

}
