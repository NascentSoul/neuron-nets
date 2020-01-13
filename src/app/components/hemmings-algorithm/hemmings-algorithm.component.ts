import { Component, OnInit, EventEmitter } from '@angular/core';
import { LinkedNeuron } from 'src/app/models/LinkedNeuron';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hemmings-algorithm',
  templateUrl: './hemmings-algorithm.component.html',
  styleUrls: ['./hemmings-algorithm.component.css']
})
export class HemmingsAlgorithmComponent implements OnInit {
  patterns = { 
    '1' : `---o-  
           --oo-
           -o-o-
           o--o-
           ---o-
           ---o-
           ---o-`.replace(/ /gi, ''),
    '2' : `-oo--  
           o--o-
           ---o-
           --o--
           -o---
           o----
           oooo-`.replace(/ /gi, ''),      
    '3' : `-oo--  
           o--o-
           ---o-
           -oo--
           ---o-
           o--o-
           -oo--`.replace(/ /gi, ''),      
    '4' : `o----  
           o----
           o--o-
           o--o-
           oooo-
           ---o-
           ---o-`.replace(/ /gi, ''),     
  };
  
  distortedPatterns = [
    `--oo-  
     ---o-
     o----
     --o--
     -----
     -----
     --ooo`
     .replace(/ /gi, ''),
    `---o-  
     --o--
     ---o-
     o----
     ---o-
     -----
     -----`     
     .replace(/ /gi, ''),      
    `--o--
     -o---
     -o-o-
     o--o-
     -oo--
     --o--
     --o--`
     .replace(/ /gi, ''),      
    `-----
     o-o--
     ---o-
     -o--o
     -----
     ---o-
     -oo--`
     .replace(/ /gi, ''),     
  ];
  
  net: Array<Array<LinkedNeuron>>;
  previousOutputs: Array<number>;
  outputs: Array<number>;
  weightsMatrix: string;
  showRawMatrix: boolean;
  count: number;
  netShouldPause: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscriptions: Array<Subscription>;  
  winners: number[];
  displayString: string;
  constructor() { }

  ngOnInit() {
    this.count = 0;
    this.task2_8();
  }

  task2_8() {
    const vector1 = this.generateVectorFromString(this.patterns['1']);
    const vector2 = this.generateVectorFromString(this.patterns['2']);
    const vector3 = this.generateVectorFromString(this.patterns['3']);
    const vector4 = this.generateVectorFromString(this.patterns['4']);
    // const vector = [1, -1, 1];
    this.outputs = [];
    this.previousOutputs = new Array(vector1.length).fill(0);
    this.constructNet(4);
    this.setWeights([vector1, vector2, vector3, vector4]);
    // this.generateWeightMatrix();
    this.applySignals(vector4);
    // this.applySignals(this.generateVectorFromString(this.distortedPatterns[2]));
  }
  // generateWeightMatrix() {
  //   this.weightsMatrix = "";
  //   for (const n of this.net) {
  //     let str = "";
  //     n.weights.forEach(el => el < 0 ? str += el : str += " " + el);
  //     this.weightsMatrix += str + "\n";
  //   }
  // }

  applySignals(vector: number[]) {
    this.outputs = [];
    for (let i = 0; i < this.net[0].length; i++) {
      const neuron = this.net[0][i];
      this.outputs.push(neuron.recieveSignals3(vector));
    }
    this.applySignals2(this.outputs);
  }

  applySignals2(vector: number[]) {
    this.outputs = [];
    for (let i = 0; i < this.net[1].length; i++) {
      const neuron = this.net[1][i];
      // this.outputs.push(neuron.recieveSignals2(vector, i));
      this.outputs.push(neuron.recieveSignals3(vector));
    }
    this.compareOutputs();
  }

  compareOutputs() {
    this.count++;
    if (this.count > 1000) {
      return;
    }
    const sorted = this.outputs.map((el, i) => [el, i]).sort((a, b) => b[0] - a[0]);
    const first = sorted[0][0];
    const maxElems = sorted.filter(el => el[0] == first);
    this.winners = maxElems.map(el => el[1] + 1);
  }
  constructNet(num: number) {
    this.net = [[], []];
    for (let i = 0; i < num; i++) {
      const n = new LinkedNeuron();
      n.activationFn = null;
      this.net[0].push(n);
      this.net[1].push(new LinkedNeuron());
    }
  }

  setWeights(vectors: Array<Array<number>>) {
    for (let i = 0; i < this.net[0].length; i++) {
      const neuron = this.net[0][i];
      neuron.T = vectors[i].length / 2;
      let weights = [];
      for (let j = 0; j < vectors[i].length; j++) {
        const x_i = vectors[i][j];
        weights.push(x_i * 0.5);        
        // if (i == j) {
        //   this.net[1][i].addToWeights([x_i * 0.5]);  
        // } 
      }
      neuron.addToWeights(weights);
    }
    for (let i = 0; i < this.net[1].length; i++) {
      const neuron = this.net[1][i];
      neuron.T = vectors[i].length / 2;
      let weights = [];
      for (let j = 0; j < this.net[1].length; j++) {
        if (i == j) {
          weights.push(1);  
        } else {
          weights.push(0.24);
        }
      }
      neuron.addToWeights(weights);
    }
  }

  generateVectorFromString(str: string): Array<number> {    
    return str.replace(/\n/gi, '')
      .split('')
      .map(x => x == '-' ? -1 : 1);
  }

  generateStringFromVector(arr: Array<number>): string  {    
    return arr.map(x => x == 1 ? 'o' : '-').join('');
  }

}
