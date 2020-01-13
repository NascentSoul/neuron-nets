import { EventEmitter } from '@angular/core';

export class LinkedNeuron {   
    public weights: Array<number>;
    private previousResult: number = 0;
    public T: number = 0;
    private linkedNeurons: Array<LinkedNeuron>;
    private signals: Array<number>;
    public signalChanged: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
    
    constructor() { 
      this.signals = [];
      this.previousResult = 0;
    }

    public activationFn(x: number): number {
      let F = 7.6;
      if (x >= this.T && this.T > 0) {
        return F;
      } 
      if (x >= 0 && x <= this.T) {
        return (F * x) / this.T;
      }
      return 0;
    }
  
    setWeights(weights: Array<number>) {
      this.weights = weights;
    }
  
    addToWeights(weights: Array<number>) {
      if (!this.weights) {
        this.weights = new Array(weights.length).fill(0);
      }
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] += weights[i];            
      }
    }
  
    setLinkedNeurons(neurons: Array<LinkedNeuron>) {
      this.linkedNeurons = neurons;
    }
  
    recieveSignal(signal: number)
    {
      this.signals.push(signal);
      if (this.signals.length == this.weights.length) {
        let outputSignal = 0;
        for (let i = 0; i < this.weights.length; i++)
        {
          outputSignal += this.signals[i] * this.weights[i];
        }
        outputSignal = outputSignal >= 0 ? 1 : -1;
        //this.signalChanged.emit([this.previousResult, outputSignal]);
        //this.previousResult = outputSignal;
        this.signals = [];
      }
      //this.notifyLinkedNerons(outputSignal);
    }
  
    recieveSignals(signals: Array<number>): number
    {
      let outputSignal = 0;
      for (let i = 0; i < this.weights.length; i++)
      {
        outputSignal += signals[i] * this.weights[i];
      }
      outputSignal = outputSignal >= 0 ? 1 : -1;
      return outputSignal;
    }
  
    recieveSignals1(signals: Array<number>): number
    {
      let outputSignal = 0;
      for (let i = 0; i < this.weights.length; i++)
      {
        outputSignal += signals[i] * this.weights[i] + this.T;
      }
      return outputSignal;
    }
  
    recieveSignals2(signals: Array<number>, ind: number): number
    {
      let outputSignal = 0;
      for (let i = 0; i < this.weights.length; i++)
      {
        outputSignal += signals[i] * this.weights[i];
      }
      outputSignal = this.activationFn(signals[ind] - outputSignal);
      return outputSignal;
    }

    notifyLinkedNerons(signal: number) {
      for (let i = 0; i < this.linkedNeurons.length; i++) {
        const neuron = this.linkedNeurons[i];
        neuron.recieveSignal(signal);
      }
    }
  }