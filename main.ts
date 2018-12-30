class Calculator {
  public n1: string = ''
  public n2: string = ''
  public operator: string = ''
  public result: number = 0
  public isOverdue: boolean = false

  constructor() {
    this.appendNumber()
    this.appendOperator()
    this.bindEvents()
  }

  appendNumber(): void {
    let numberDiv: HTMLDivElement = document.querySelector('.number')
    for (let i: number = 0; i < 11; i++) {
      numberDiv.append(this.createDiv(i))
    }
  }

  createDiv(n: number): HTMLDivElement {
    let div: HTMLDivElement = document.createElement('div')
    if (n < 9) {
      div.textContent = String(n + 1)
    } else if (n === 9) {
      div.className = 'zero'
      div.textContent = '0'
    } else {
      div.textContent = '.'
    }
    return div
  }

  appendOperator(): void {
    let operatorDiv: HTMLDivElement = document.querySelector('.operator')
    let operators: string[] = ['+', '-', '*', '÷', '=']
    for (let i: number = 0; i < operators.length; i++) {
      let div: HTMLDivElement = document.createElement('div')
      div.textContent = operators[i]
      operatorDiv.append(div)
    }
  }

  bindEvents(): void {
    let numberDiv: HTMLDivElement = document.querySelector('.number')
    numberDiv.addEventListener('click', this.handleClickNumber.bind(this))
    let operatorDiv: HTMLDivElement = document.querySelector('.operator')
    operatorDiv.addEventListener('click', this.handleClickOperator.bind(this))
  }

  handleClickNumber(e): void {
    let text: string = e.target.innerText
    if (text === 'Clear') {
      this.reset()
    } else {
      this.isOverdue ? this.reset() : ''
      this.operator
        ? (this.n2 = this.removeZero(this.n2 + text))
        : (this.n1 = this.removeZero(this.n1 + text))
    }
    this.render()
  }

  reset(): void {
    this.n1 = ''
    this.n2 = ''
    this.operator = ''
    this.result = 0
    this.isOverdue = false
  }

  removeZero(str: string): string {
    let pattern: RegExp = /^0[^\.]$/g
    if (pattern.test(str)) {
      return str.replace('0', '')
    } else {
      return str
    }
  }

  handleClickOperator(e): void {
    let operator: string = e.target.innerText
    if (operator === '=') {
      this.calculate()
      this.isOverdue = true
    } else {
      this.operator = e.target.innerText
    }
    this.render()
  }

  calculate(): void {
    if (!this.n1) {
      return
    } else if (!this.operator || !this.n2) {
      this.result = Number(this.n1)
    } else {
      let n1 = Number(this.n1)
      let n2 = Number(this.n2)
      switch (this.operator) {
        case '+':
          this.result = n1 + n2
          break
        case '-':
          this.result = n1 - n2
          break
        case '*':
          this.result = n1 * n2
          break
        case '÷':
          this.result = n1 / n2
          break
        default:
          this.result = NaN
      }
    }
    this.render()
  }

  render(): void {
    let inputDiv: HTMLDivElement = document.querySelector('.input')
    let resultDiv: HTMLDivElement = document.querySelector('.result')
    inputDiv.innerText = this.n1 + this.operator + this.n2
    resultDiv.innerText = String(this.result)
  }
}

new Calculator()
