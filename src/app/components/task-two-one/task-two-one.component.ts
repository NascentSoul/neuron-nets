import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TrainingData } from 'src/app/models/TrainingData';
import { Neuron } from 'src/app/models/Neuron';
import { Months } from 'src/app/models/Months';
import { of } from 'rxjs';

@Component({
  selector: 'task-two-one',
  templateUrl: './task-two-one.component.html',
  styleUrls: ['./task-two-one.component.css']
})
export class TaskTwoOneComponent implements OnInit, AfterViewInit {
  rawTrainingData: string
  neuron: Neuron
  context: CanvasRenderingContext2D;
  a: number;
  b: number;
  _signalX: number;

  get signalX() {
      return this._signalX ? this._signalX.toString() : '';
  }
  
  set signalX(value: string) {
      this._signalX = value === "" ? undefined : +value;
      this.output = (this.a * this._signalX + this.b).toString();
  }
  output: string;

  constructor() { 
    this.rawTrainingData = 'Январь 534, Февраль 465, Март 586, ' + 
    'Апрель 570, Май 654, Июнь 618';
  }
  
  ngOnInit(): void {
    this.neuron = new Neuron([Math.random(), Math.random()]);
    this.signalX.as
  }
  
  ngAfterViewInit(): void {  
  }

  private teachNeuron(trainingData: TrainingData): void {
    this.a = 0;
    this.b = 0;
    let expr1 = 0;
    let expr2 = 0;
    let expr3 = 0;
    let expr4 = 0;
    for (const item of trainingData) {
      let x = Months[item[0]];
      let y = +item[1];
      expr1 += x * y;
      expr2 += x;
      expr3 += y;
      expr4 += x * x;
    }
    this.a = (trainingData.length * expr1 - expr2 * expr3) 
      / (trainingData.length * expr4 - expr2 * expr2);
    this.b = (expr4 * expr3 - expr2 * expr1) 
      / (trainingData.length * expr4 - expr2 * expr2);
    this.neuron.setWeights([this.b, this.a]);
  }

  do(): void {
    const trainingData: TrainingData = this.rawTrainingData
      .split(',')
      .map(el => el.trim().split(' '));
    this.teachNeuron(trainingData);
  }

}
