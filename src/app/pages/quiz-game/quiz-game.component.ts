import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {

  @ViewChild('response') inputResponse: ElementRef;

  sortedTone = "c"
  sortedQuestion: any = null

  configs = {
    onlyNaturalTones: true,
    requiredMinor: false,
    timeShowResp: 3
  } as any

  infos = {
    [1]: { termo: "Tônica" },
    [2]: { termo: "Segunda" },
    [3]: { termo: "Terça" },
    [4]: { termo: "Quarta" },
    [5]: { termo: "Quinta" },
    [6]: { termo: "Sexta" },
    [7]: { termo: "Sétima" },
  } as any

  campoHarmonicoMaior = {
    ['c']: [ 'c', 'dm', 'em', 'f', 'g', 'am', 'b' ],
    ['d']: [ 'd', 'em', 'f#m', 'g', 'a', 'bm', 'c#' ],
    ['e']: [ 'e', 'f#', 'g#', 'a', 'b', 'c#', 'd#' ],
    ['f']: [ 'f', 'gm', 'am', 'bb', 'c', 'dm', 'e' ],
    ['g']: [ 'g', 'am', 'bm', 'c', 'd', 'em', 'f#' ],
    ['a']: [ 'a', 'bm', 'c#m', 'd', 'e', 'f#m', 'g#' ],
    ['b']: [ 'b', 'c#m', 'd#m', 'e', 'f#', 'g#m', 'a#' ],
    ['c#']: [ 'c#', 'd#', 'e#', 'f#', 'g#', 'a#', 'b#' ],
    ['eb']: [ 'd#', 'f', 'g', 'ab', 'bb', 'c', 'd' ],
    ['f#']: [ 'f#', 'g#', 'a#', 'b', 'c#', 'd#', 'e#' ],
    ['ab']: [ 'g#', 'bb', 'c', 'db', 'eb', 'f', 'g' ],
    ['bb']: [ 'a#', 'c', 'd', 'eb', 'f', 'g', 'a' ],
  } as any
  
  constructor() { }

  ngOnInit() {
    this.sortedToneAndQuestion()
  }

  checkedConfig(val: any, config: string) {
    this.configs[config] = val
  }

  sortedToneAndQuestion() {
    this.sortedQuestion = this.getRandomArbitrary(2, 7)
    this.sortedTone = Object.keys(this.campoHarmonicoMaior)[this.getRandomArbitrary(0, this.configs.onlyNaturalTones ? 6 : 11)]

    setTimeout(() => {
      this.inputResponse.nativeElement.focus()
    }, 100)
  }

  getRandomArbitrary(min: number, max: number) {
    return parseInt((Math.random() * (max - min) + min) as any)
  }

  showResult = false
  resultInfo = {} as any

  checkResult(resp: string) {
    console.log(this.configs)

    var correctResp = this.campoHarmonicoMaior[this.sortedTone.toLowerCase()][this.sortedQuestion - 1]

    if(!this.configs.requiredMinor)
      correctResp = correctResp.replace("m", "")

    this.showResult = true
    this.resultInfo = {
      result: correctResp.trim().toLowerCase() == resp.trim().toLowerCase(),
      correctResp: correctResp.trim().toLowerCase()
    }

    setTimeout(() => {
      this.showResult = false
      this.sortedToneAndQuestion()
    }, this.configs.timeShowResp * 1000)


    this.inputResponse.nativeElement.value = ""
  }
}
