import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.css']
})

export class SlotMachineComponent {
  symbols: any[] = [];
  symbolGroups: any[][] = [];
  spinning: boolean = false;
  resultMessage: string = '';
  totalWin: number = 0;
  playerBalance: number = 1550; // Inicialize com um valor padrão, por exemplo, 1000
  roundPoints: number = 15;
  creditsToAdd: number = 0;


  addCredits() {
    // Verifique se creditsToAdd é um número positivo antes de adicionar ao saldo do jogador
    if (this.creditsToAdd > 0) {
      this.playerBalance += this.creditsToAdd;
      this.creditsToAdd = 0; // Limpe o campo de entrada após a adição de créditos
    }
  }

  spinDuration = 500; // Tempo de rotação mais curto

  constructor() {
    this.initializeSymbols();
    this.initializeSymbolGroups();
  }



  initializeSymbols() {
    const symbols = [
      { name: 'Pingente', image: 'assets/pingente.png', value: 100 },
      { name: 'Cartas', image: 'assets/cartas.png', value: 50 },
      { name: 'Tigre', image: 'assets/tigre.png', value: 500 },
      { name: 'Bomba', image: 'assets/bomba.png', value: 15 },
      { name: 'Laranja', image: 'assets/laranja.png', value: 5 },
      { name: 'Chapeu', image: 'assets/chapeu.png', value: 150 },
      { name: 'Saco', image: 'assets/saco.png', value: 90 },
      // Adicione mais símbolos conforme necessário
    ];

    this.symbols = symbols;
  }

  initializeSymbolGroups() {
    for (let i = 0; i < 3; i++) {
      const group = [];
      for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * this.symbols.length);
        group.push(this.symbols[randomIndex]);
      }
      this.symbolGroups.push(group);
    }
  }

  reset() {
    this.resultMessage = '';
  }

  spin() {
    if (!this.spinning) {
      this.spinning = true;
      this.reset();

      setTimeout(() => {
        this.spinning = false;
        const result = this.spinReels();
        const winAmount = this.checkResults(result);
        this.playerBalance -= this.roundPoints;
      }, this.spinDuration);
    }
  }

  spinReels() {
    // Embaralhe os símbolos em cada coluna
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * this.symbols.length);
        this.symbolGroups[j][i] = this.symbols[randomIndex];
      }
    }

    return this.symbolGroups;
  }



  checkResults(result: any[]) {
    let winAmount = 0;

    // Verifique se há 3 símbolos iguais em qualquer coluna vertical
    for (let i = 0; i < 3; i++) {
      if (
        result[0][i].name === result[1][i].name &&
        result[1][i].name === result[2][i].name
      ) {
        const symbol = result[0][i];
        winAmount += symbol.value;
      }
    }

    // Verifique se há 3 símbolos iguais na diagonal da esquerda para a direita
    if (
      result[0][0].name === result[1][1].name &&
      result[1][1].name === result[2][2].name
    ) {
      const symbol = result[0][0];
      winAmount += symbol.value;
    }

    // Verifique se há 3 símbolos iguais na diagonal da direita para a esquerda
    if (
      result[0][2].name === result[1][1].name &&
      result[1][1].name === result[2][0].name
    ) {
      const symbol = result[0][2];
      winAmount += symbol.value;
    }

    if (winAmount > 0) {
      this.resultMessage = `Você ganhou ${winAmount} pontos!`;
      this.playerBalance += winAmount;
      this.totalWin += winAmount;
    } else {
      this.resultMessage = 'Tente novamente.';
    }

    return winAmount;
  }



}
