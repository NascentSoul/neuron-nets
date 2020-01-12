import { Component, OnInit } from '@angular/core';
import { Neuron } from 'src/app/models/Neuron';

@Component({
  selector: 'app-associative-memory',
  templateUrl: './associative-memory.component.html',
  styleUrls: ['./associative-memory.component.css']
})
export class AssociativeMemoryComponent implements OnInit {
  patterns = { 
    '1' : `-o-
           oo-
           -o-
           -o-
           ooo`.replace(/ /gi, ''),
    '2' : `ooo
           --o
           ooo
           o--
           ooo`.replace(/ /gi, ''),
    '3' : `ooo
           --o
           -oo
           --o
           ooo`.replace(/ /gi, ''),     
  };
  net: Array<Neuron>;
  constructor() { }

  ngOnInit() {
    this.calculateWeights();
    this.generateVectorFromString(this.patterns['1']);

  }

  calculateWeights() {

  }

  generateVectorFromString(str: string): Array<number> {    
    return str.replace(/\n/gi, '')
      .split('')
      .map(x => x == '-' ? -1 : 1);
  }

}
