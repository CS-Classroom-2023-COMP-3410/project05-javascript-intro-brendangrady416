/* script */
let memory = 0;
function appendValue(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        let result = eval(document.getElementById('display').value);
        if (!isFinite(result)) throw new Error("Math Error");
        document.getElementById('display').value = result;
        memory = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function calculateSquareRoot() {
    try {
        let value = parseFloat(document.getElementById('display').value);
        if (value < 0) throw new Error("Invalid Input");
        document.getElementById('display').value = Math.sqrt(value);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function memoryRecall() {
    document.getElementById('display').value = memory;
}
