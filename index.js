const balance = document.getElementById('balance');
const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const btn = document.querySelector(".btn");
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// getting data from local Storage in array form
//console.log(localStorage.getItem("transactions"));
const getLocalStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

//intialising the transactions array object or assigning data from localStorage
let transactions = localStorage.getItem("transactions")!== null ? getLocalStorageTransactions : [];

//do all function 
function addTransaction(e){
    
    e.preventDefault();

    if(text.value.trim() === "" || amount.value.trim() === "")
     alert("Please add a text and amount");
     else{
          let transaction = {
               id: generateID(),
               text : text.value,
               amount : +amount.value,
          };
    
     transactions.push(transaction);

     addTransactionDOM(transaction);

     updateValues();

     updateLocalStorage();

     text.value = "";
     amount.value = "";
    }
}

function generateID(){
    return  Math.floor(Math.random()*1000000000);
}

// add new transaction to DOM
function  addTransactionDOM(transaction){
     const sign = transaction.amount<0 ? "-":"+";
     
     const li =document.createElement('li');
     li.classList.add(transaction.amount<0 ? 'minus':'plus');
      
     li.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount) } </span><button class="delete-btn" onclick="removeElement(${transaction.id})">x</button>`;
     
     list.appendChild(li);
}

// update balance, income and expense
function updateValues() {
      const amounts = transactions.map(transaction => transaction.amount);

      const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
      
      const income = amounts
                     .filter(item => item>0)
                     .reduce((acc,item) => (acc += item),0)
                     .toFixed(2);

      const expense = (amounts
                      .filter(item => item<0)
                      .reduce((acc,curr) => (acc+=curr),0)* -1)
                      .toFixed(2);

      balance.innerText = `$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
}

//remove the li from ul
function removeElement(id)
{
    transactions = transactions.filter(transaction => transaction.id!=id);

    updateLocalStorage();

    init();
}

//updating the localstorage

function updateLocalStorage(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}

//init app
function init() {
    list.innerHTML = '';
    
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
init();

//listening for click event on form
btn.addEventListener('click',addTransaction);
