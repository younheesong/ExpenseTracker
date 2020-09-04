const blanace = document.getElementById('balance');
const plus = document.getElementById('money-plus');
const minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/*const dummyTransactions = [
    { id: 1, text: "cash", amount: 500 },
    { id: 2, text: "computer", amount: -200 },
    { id: 3, text: "book", amount: -50 },
    { id: 4, text: "lotto", amount: 100 }
]*/
const localStroageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStroageTransactions : [];


function updateValue() {
    plus.innerText = transactions.filter(transaction => transaction.amount > 0)
        .reduce((acc, item) => acc += item.amount, 0).toFixed(2);
    minus.innerText = transactions.filter(transaction => transaction.amount < 0)
        .reduce((acc, item) => acc += item.amount, 0).toFixed(2);
    blanace.innerText = transactions.reduce((acc, item) => acc += item.amount, 0).toFixed(2);
}


function addTransactionsDom(transaction) {
    console.log(transaction);
    const item = document.createElement('li');
    const sign = transaction.amount > 0 ? 'plus' : 'minus';
    item.classList.add(sign);
    item.innerHTML = `${transaction.text} <span>${transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`}</span>
    <button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);

}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
    setLocalStorage(transactions);
}

function randomID() {
    return Math.round(Math.random() * 100000000);
}
function setLocalStorage(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransactions(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("please text or amount ")
    } else {
        transactions.push({ id: randomID(), text: text.value, amount: +amount.value });
        setLocalStorage(transactions);
        init();
        text.value = '';
        amount.value = ``;
    }
}

form.addEventListener('submit', addTransactions)

function init() {
    list.innerHTML = ``;
    console.log(transactions);
    transactions.forEach(addTransactionsDom);
    updateValue();
}

init();