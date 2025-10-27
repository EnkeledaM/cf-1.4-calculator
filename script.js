/**
 * Exercise 1.4 — JavaScript Functions
 * Funksionet bazë të llogaritjes
 */
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b)   { return b === 0 ? 'Error' : a / b; }

/**
 * Lidhja me UI
 */
const displayEl = document.getElementById('display');

let current  = '0';   // numri që po shkruhet
let previous = null;  // numri i ruajtur
let operator = null;  // 'add' | 'subtract' | 'multiply' | 'divide'

function updateDisplay(value) {
  displayEl.textContent = value;
}

function inputDigit(d) {
  // vetëm një pikë dhjetore
  if (d === '.' && current.includes('.')) return;

  // hiq 0-n fillestare
  if (current === '0' && d !== '.') current = d;
  else current += d;

  updateDisplay(current);
}

function setOperator(op) {
  // nëse ka operator aktiv dhe jemi duke shkruar numrin e dytë, bëj llogaritje të ndërmjetme
  if (operator && previous !== null) {
    compute();
  } else {
    previous = parseFloat(current);
  }
  operator = op;       // ruaj operatorin e ri
  current  = '0';      // nis numrin e radhës
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  updateDisplay(current);
}

function delLast() {
  current = (current.length <= 1) ? '0' : current.slice(0, -1);
  updateDisplay(current);
}

function compute() {
  // nëse s’ka operator, thjesht rifresko ekranin
  if (!operator) { updateDisplay(current); return; }

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
  current  = String(result);
  updateDisplay(current);
}

/* Event listeners për butonat */
document.querySelectorAll('[data-number]').forEach(btn => {
  btn.addEventListener('click', () => inputDigit(btn.getAttribute('data-number')));
});

document.querySelectorAll('[data-operator]').forEach(btn => {
  btn.addEventListener('click', () => setOperator(btn.getAttribute('data-operator')));
});

document.querySelector('[data-action="equals"]').addEventListener('click', compute);
document.querySelector('[data-action="clear"]').addEventListener('click', clearAll);
document.querySelector('[data-action="del"]').addEventListener('click', delLast);

/* (Opsionale) Mbështetje për tastierë */
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

