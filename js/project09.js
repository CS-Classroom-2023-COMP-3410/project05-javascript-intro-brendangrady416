/* script */

let array = [];
let sortingInProgress = false;
let delay = 500;  // Default speed

// Function to update speed based on slider
document.getElementById('speed').addEventListener('input', function() {
    delay = 1000 - this.value;
});

function generateArray() {
    sortingInProgress = false;
    array = [];
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 10;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    }
    updateCommentary("New array generated. Select an algorithm to begin sorting.");
}

function startSorting() {
    if (sortingInProgress) return; 
    sortingInProgress = true;
    const algorithm = document.getElementById('algorithm').value;
    updateCommentary(`Starting ${algorithm === 'bubble' ? 'Bubble Sort' : 'Insertion Sort'}...`);
    if (algorithm === 'bubble') {
        bubbleSort();
    } else if (algorithm === 'insertion') {
        insertionSort();
    }
}

function cancelSorting() {
    sortingInProgress = false;
    updateCommentary("Sorting cancelled. You can generate a new array or start again.");
}

async function bubbleSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (!sortingInProgress) return;
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            updateCommentary(`Comparing elements ${array[j]} and ${array[j + 1]}`);
            
            if (array[j] > array[j + 1]) {
                updateCommentary(`Swapping ${array[j]} and ${array[j + 1]}`);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await new Promise(resolve => setTimeout(resolve, delay));
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }
            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
    }
    updateCommentary("Bubble Sort completed.");
    sortingInProgress = false;
}

async function insertionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        if (!sortingInProgress) return;
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'green';
        updateCommentary(`Inserting element ${key}`);
        
        while (j >= 0 && array[j] > key) {
            if (!sortingInProgress) return;
            bars[j].style.backgroundColor = 'red';
            updateCommentary(`Moving element ${array[j]} to the right`);
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            j--;
            await new Promise(resolve => setTimeout(resolve, delay));
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[i].style.backgroundColor = 'steelblue';
    }
    updateCommentary("Insertion Sort completed.");
    sortingInProgress = false;
}

function updateCommentary(message) {
    document.getElementById('commentary').innerText = message;
}

generateArray();
