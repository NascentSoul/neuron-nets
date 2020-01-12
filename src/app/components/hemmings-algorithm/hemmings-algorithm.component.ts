import { Component, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
  }

  generateMatrixFromString(str: string) {    
    return str.replace(/\n/gi, '')
      .split('')
      .map(x => x == '-' ? -1 : 1);
  }

}
