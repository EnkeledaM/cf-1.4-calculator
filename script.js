/**
 * 1) Funksionet bazë të ushtrimit
 */
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return '∞'; // ose kthe një error sipas kërkesës
  return a / b;
}

/**
 * 2) Lidhja me UI
 */
const display = document.getElementById('display');

let current = '0';       // numri që po shkruan përdoruesi
let previous = null;     // numri i mëparshëm
let operator = null;     // 'add' | 'subtract' | 'multiply' | 'divide'

function updateDisplay(value) {
  display.textContent = value;
}

function inputDigit(d) {
  if (d === '.' && current.includes('.')) return; // vetëm një pikë dhjetore
  if (current === '0' && d !== '.') {
    current = d;
  } else {
    current += d;
  }
  updateDisplay(current);
}

function setOperator(op) {
  if (operator && previous !== null) {
    compute(); // llogaritje e ndërmjetme nëse përdoruesi vazhdon me operatorë
  } else {
    previous = parseFloat(current);
  }
  operator = op;
  current = '0';
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  updateDisplay(current);
}

function delLast() {
  if (current.length <= 1) current = '0';
  else current = current.slice(0, -1);
  updateDisplay(current);
}

function compute() {
  const a = previous;
  const b = parseFloat(current);

  let result;
  switch (operator) {
    case 'add':      result = add(a, b); break;
    case 'subtract': result = subtract(a, b); break;
    case 'multiply': result = multiply(a, b); break;
    case 'divide':   result = divide(a, b); break;
    default:         result = b;
  }

  previous = null;
  operator = null;
  current = String(result);
  updateDisplay(current);
}

/**
 * 3) Event listeners
 */
document.querySelectorAll('[data-number]').forEach(btn => {
  btn.addEventListener('click', () => inputDigit(btn.getAttribute('data-number')));
});

document.querySelectorAll('[data-operator]').forEach(btn => {
  btn.addEventListener('click', () => setOperator(btn.getAttribute('data-operator')));
});

document.querySelector('[data-action="equals"]').addEventListener('click', compute);
document.querySelector('[data-action="clear"]').addEventListener('click', clearAll);
document.querySelector('[data-action="del"]').addEventListener('click', delLast);

/**
 * 4) (Opsionale) Mbështetje për tastierë
 */
window.addEventListener('keydown', (e) => {
  if (/\d/.test(e.key)) inputDigit(e.key);
  if (e.key === '.') inputDigit('.');
  if (e.key === 'Backspace') delLast();
  if (e.key === 'Escape') clearAll();
  if (e.key === 'Enter' || e.key === '=') compute();
  if (['+', '-', '*', '/'].includes(e.key)) {
    const map = { '+':'add', '-':'subtract', '*':'multiply', '/':'divide' };
    setOperator(map[e.key]);
  }
});
