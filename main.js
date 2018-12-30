var Calculator = /** @class */ (function () {
    function Calculator() {
        this.n1 = '';
        this.n2 = '';
        this.operator = '';
        this.result = 0;
        this.isOverdue = false;
        this.appendNumber();
        this.appendOperator();
        this.bindEvents();
    }
    Calculator.prototype.appendNumber = function () {
        var numberDiv = document.querySelector('.number');
        for (var i = 0; i < 11; i++) {
            numberDiv.append(this.createDiv(i));
        }
    };
    Calculator.prototype.createDiv = function (n) {
        var div = document.createElement('div');
        if (n < 9) {
            div.textContent = String(n + 1);
        }
        else if (n === 9) {
            div.className = 'zero';
            div.textContent = '0';
        }
        else {
            div.textContent = '.';
        }
        return div;
    };
    Calculator.prototype.appendOperator = function () {
        var operatorDiv = document.querySelector('.operator');
        var operators = ['+', '-', '*', '÷', '='];
        for (var i = 0; i < operators.length; i++) {
            var div = document.createElement('div');
            div.textContent = operators[i];
            operatorDiv.append(div);
        }
    };
    Calculator.prototype.bindEvents = function () {
        var numberDiv = document.querySelector('.number');
        numberDiv.addEventListener('click', this.handleClickNumber.bind(this));
        var operatorDiv = document.querySelector('.operator');
        operatorDiv.addEventListener('click', this.handleClickOperator.bind(this));
    };
    Calculator.prototype.handleClickNumber = function (e) {
        var text = e.target.innerText;
        if (text === 'Clear') {
            this.reset();
        }
        else {
            this.isOverdue ? this.reset() : '';
            this.operator
                ? (this.n2 = this.removeZero(this.n2 + text))
                : (this.n1 = this.removeZero(this.n1 + text));
        }
        this.render();
    };
    Calculator.prototype.reset = function () {
        this.n1 = '';
        this.n2 = '';
        this.operator = '';
        this.result = 0;
        this.isOverdue = false;
    };
    Calculator.prototype.removeZero = function (str) {
        var pattern = /^0[^\.]$/g;
        if (pattern.test(str)) {
            return str.replace('0', '');
        }
        else {
            return str;
        }
    };
    Calculator.prototype.handleClickOperator = function (e) {
        var operator = e.target.innerText;
        if (operator === '=') {
            this.calculate();
            this.isOverdue = true;
        }
        else {
            this.operator = e.target.innerText;
        }
        this.render();
    };
    Calculator.prototype.calculate = function () {
        if (!this.n1) {
            return;
        }
        else if (!this.operator || !this.n2) {
            this.result = Number(this.n1);
        }
        else {
            var n1 = Number(this.n1);
            var n2 = Number(this.n2);
            switch (this.operator) {
                case '+':
                    this.result = n1 + n2;
                    break;
                case '-':
                    this.result = n1 - n2;
                    break;
                case '*':
                    this.result = n1 * n2;
                    break;
                case '÷':
                    this.result = n1 / n2;
                    break;
                default:
                    this.result = NaN;
            }
        }
        this.render();
    };
    Calculator.prototype.render = function () {
        var inputDiv = document.querySelector('.input');
        var resultDiv = document.querySelector('.result');
        inputDiv.innerText = this.n1 + this.operator + this.n2;
        resultDiv.innerText = String(this.result);
    };
    return Calculator;
}());
new Calculator();
