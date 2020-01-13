import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { LinkedNeuron } from 'src/app/models/LinkedNeuron';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-hopfield-net',
  templateUrl: './hopfield-net.component.html',
  styleUrls: ['./hopfield-net.component.css']
})
export class HopfieldNetComponent implements OnInit {
  patterns = { 
    '0' : `-------
           -ooooo-
           -o---o-
           -o---o-
           -o---o-
           -o---o-
           -o---o-
           -ooooo-
           -------`.replace(/ /gi, ''),
    '1' : `-------
           ---o---
           --oo---
           ---o---
           ---o---
           ---o---
           ---o---
           -ooooo-
           -------`.replace(/ /gi, ''),
    '2' : `-------
           -ooooo-
           -----o-
           -----o-
           -ooooo-
           -o-----
           -o-----
           -ooooo-
           -------`.replace(/ /gi, ''),
  };
  net: Array<LinkedNeuron>;
  previousOutputs: Array<number>;
  outputs: Array<number>;
  weightsMatrix: string;
  showRawMatrix: boolean;
  count: number;
  netShouldPause: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscriptions: Array<Subscription>;
  displayString: string;
  constructor(private subscriptionsService: SubscriptionsService) { }

  ngOnInit() {
    this.count = 0;
    // this.task2_2();
    // this.task2_4();
    // this.task2_6();
    this.task2_8();
    // this.task2_9();
  }
  
  task2_2() {
    this.showRawMatrix = true;
    const vector = [1, -1, 1, 1];
    const vector1 = [1, 1, 1, -1];
    this.outputs = [];
    this.previousOutputs = new Array(vector.length).fill(0);
    this.constructNet(vector);
    this.setWeights(vector);
    // this.setWeights(vector1);
    this.generateWeightMatrix();
    this.applySignals(vector1);
    // this.applySignals(vector1);
    // this.applySignals(vector2);
  }
  
  task2_4() {
    this.showRawMatrix = true;
    const vector = [1, 1, 1, -1];
    const vector1 = [-1, -1, 1, -1];
    this.outputs = [];
    this.previousOutputs = new Array(vector.length).fill(0);
    this.constructNet(vector);
    this.setWeights(vector);
    // this.setWeights(vector1);
    this.generateWeightMatrix();
    this.applySignals(vector1);
    // this.applySignals(vector1);
    // this.applySignals(vector2);
  }
  
  task2_6() {
    this.showRawMatrix = true;
    const vector = [-1, 1, -1, -1, 1, -1, -1, -1];
    const vector1 = [-1, -1, 1, -1, -1, -1, 1, -1];
    const vector2 = [-1, 1, -1, -1, 1, -1, -1, -1];
    const vector3 = [-1, 1, 1, -1, 1, -1, -1, -1];
    // const vector3 = [1, 1, 1, 1, 1, 1, 1, 1];
    this.outputs = [];
    this.previousOutputs = new Array(vector.length).fill(0);
    this.constructNet(vector);
    this.setWeights(vector);
    this.setWeights(vector1);
    this.generateWeightMatrix();
    // this.applySignals(vector);
    // this.applySignals(vector1);
    // this.applySignals(vector2);
    this.applySignals(vector3);
  }

  task2_8() {
    const vector = this.generateVectorFromString(this.patterns['0']);
    const vector1 = this.generateVectorFromString(this.patterns['1']);
    const vector2 = this.generateVectorFromString(this.patterns['2']);
    // const vector = [1, -1, 1];
    this.outputs = [];
    this.previousOutputs = new Array(vector.length).fill(0);
    this.constructNet(vector);
    this.setWeights(vector);
    this.setWeights(vector1);
    this.setWeights(vector2);
    this.generateWeightMatrix();
    this.applySignals(vector2);
  }
  
  task2_9() {
    const vector = this.generateVectorFromString(this.patterns['0']);
    const vector1 = this.generateVectorFromString(this.patterns['1']);
    const vector2 = this.generateVectorFromString(this.patterns['2']);
    const vector3 = this.generateVectorFromString(`-------
                      ---o---
                      ---o---
                      ---oo--
                      --oo---
                      ---o---
                      ---oo--
                      -ooooo-
                      -------`.replace(/ /gi, ''));
    this.outputs = [];
    this.previousOutputs = new Array(vector.length).fill(0);
    this.constructNet(vector);
    this.setWeights(vector);
    this.setWeights(vector1);
    this.setWeights(vector2);
    this.generateWeightMatrix();
    this.applySignals(vector3);
  }

  generateWeightMatrix() {
    this.weightsMatrix = "";
    for (const n of this.net) {
      let str = "";
      n.weights.forEach(el => el < 0 ? str += el : str += " " + el);
      this.weightsMatrix += str + "\n";
    }
  }

  applySignals(vector: number[]) {
    this.outputs = [];
    for (let i = 0; i < this.net.length; i++) {
      const neuron = this.net[i];
      this.outputs.push(neuron.recieveSignals(vector));
    }
    this.compareOutputs();
  }

  compareOutputs() {
    this.count++;
    if (this.count > 1000) {
      return;
    }
    if (this.outputs.every((el, i) => el == this.previousOutputs[i])) {
      this.displayString = this.generateStringFromVector(this.outputs);
      return;
    } else {
      this.previousOutputs = this.outputs;
      this.applySignals(this.previousOutputs);
    }
  }

  constructNet(vector: Array<number>) {
    this.net = [];
    for (let i = 0; i < vector.length; i++) {
      this.net.push(new LinkedNeuron());
    }
    this.constructLinksForNet();
  }

  constructLinksForNet() {
    for (let i = 0; i < this.net.length; i++) {
      const neuron = this.net[i];
      let linkedNeurons = [];
      for (let j = 0; j < this.net.length; j++) {
        if (i == j) {
          continue;
        }
        linkedNeurons.push(this.net[j]);        
      }
      neuron.setLinkedNeurons(linkedNeurons);
    }
  }

  setWeights(vector: Array<number>) {
    for (let i = 0; i < vector.length; i++) {
      const neuron = this.net[i];
      const x_i = vector[i];
      let weights = [];
      for (let j = 0; j < vector.length; j++) {
        const x_j = vector[j];
        if (i == j) {
          weights.push(0);        
        } else {
          weights.push(x_i * x_j);        
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
