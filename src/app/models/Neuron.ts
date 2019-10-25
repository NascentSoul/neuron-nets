export class Neuron {    
  private ownWeight: number;
  private threshold: number;
  // private label: string;
  private weights: Array<number>;
  
  constructor(weights: Array<number>, ownWeight: number = 0, threshold: number = 0)
  {
    this.weights = [];
    for (const weight of weights)
    {
      this.weights.push(weight);
    }

    this.ownWeight = ownWeight;
    this.threshold = threshold;
    //this.label = label;
  }

  setWeights(weights: Array<number>) {
    this.weights = weights;
  }

  recieveSignals(signals: Array<number>, withOwnWeight: boolean = false): number
  {
    let outputSignal = 0;
    for (let i = 0; i < this.weights.length; i++)
    {
      outputSignal += signals[i] * this.weights[i];
    }
    outputSignal = withOwnWeight ? outputSignal + this.ownWeight : outputSignal;
    return outputSignal;
    //return outputSignal >= this.threshold ? 1 : -1;
  }
}