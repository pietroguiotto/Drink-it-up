const h2Text = document.querySelector('h2')
const buttons = document.querySelectorAll('button')
const result = document.querySelector('#sumOfDrinks')
const targetLeft = document.querySelector('#targetLeft')
const waterLevel = document.querySelector('#waterLevel')
let clock = document.querySelector('#clock')
const winner = document.querySelector('#winner')
let currentDate = new Date()

let sumOfDrinks = 0
let targetGoal = 2000

let localStorageAmountValue = localStorage.getItem('currentAmount')

const beverages = [
    {
        type: 'Water glass',
        ml: 200
    },
    {
        type: 'Water large glass',
        ml: 330
    },
    {
        type: 'Water custom',
        ml: 0
    },
    {
        type: 'Coffee',
        ml: 200
    },
    {
        type: 'Tea',
        ml: 200
    },
    {
        type: 'Soda glass',
        ml: -200
    },
    {
        type: 'Soda large glass',
        ml: -330
    },
    {
        type: 'Beer glass',
        ml: 200
    },
    {
        type: 'Beer bottle',
        ml: 500
    }
]

function addDrink(){
    for (let i = 0; i < beverages.length; i++){
        if (this.textContent == beverages[i].type){
            sumOfDrinks += beverages[i].ml
            result.innerHTML = ` ${sumOfDrinks} ml`
            goal()
            localStorage.setItem('currentAmount', sumOfDrinks)
            if(sumOfDrinks >= 2000){
                raisingWater()
                goalReached()
            }
            raisingWater()
            return sumOfDrinks
        }
    }
    console.log("no such drink")
}

function timeLeft() {
    let now = new Date()
    //let hours = now.getHours()
    //let minutes = now.getMinutes()
    //let seconds = now.getSeconds()
    let diffHours = 23 - parseInt(now.getHours())
    let diffMin = 59 - parseInt(now.getMinutes())
    let diffSec = 59 - parseInt(now.getSeconds())

    if(diffHours === 0 && diffMin === 0 && diffSec === 1 ){
        resetWater()
    }
    clock.innerHTML = ` ${diffHours} hours ${diffMin} minutes and ${diffSec} seconds`
}

function goal() {
    let diff = targetGoal - sumOfDrinks
    if (diff <= 0){
        targetLeft.innerHTML = " Goal reached!!"
    } else {
        targetLeft.innerHTML = ` ${diff} ml` 
    }
}

function raisingWater() {
    let valueWater = sumOfDrinks / 20
    if(sumOfDrinks < 0 ){
        waterLevel.style.height = 0
    } else {
    waterLevel.style.height = `${valueWater}%`
    document.querySelector('#waterPercentage').innerHTML = `${valueWater}/100%`
    }
}

function locallyStoredAmount(){
    sumOfDrinks = parseInt(localStorageAmountValue)
    targetLeft.innerHTML = `${(2000 - sumOfDrinks)} ml`
    result.innerHTML = `${parseInt(localStorageAmountValue)} ml`
    raisingWater()
    return
}

function checkLocalStorage() {
    if(!localStorageAmountValue){
        return
    } locallyStoredAmount()
}

function setCurrentDate(){
    if(localStorage.getItem('currentDate') == currentDate.getDate()){
    } else {
    localStorage.setItem('currentDate', currentDate.getDate())
    resetWater()
    }
}

function resetWater() {
    sumOfDrinks = 0
    let valueWater = sumOfDrinks / 20
    targetGoal = 2000
    result.innerHTML = "0 ml"
    targetLeft.innerHTML = "2000 ml"
    localStorage.removeItem('currentAmount')
    waterLevel.style.height = 0
    document.querySelector('#waterPercentage').innerHTML = `${valueWater}/100%`
}

function goalReached(){
    winner.style.visibility = 'visible'
}

// showWinner(){
//     winner.style.visibility = 'visible'
// }

function hideWinner(){
    console.log('fired')
    winner.style.visibility = 'hidden'
    resetWater()
}

checkLocalStorage()
setCurrentDate()
setInterval(timeLeft, 1000)
buttons.forEach(button => button.addEventListener('click', addDrink))
winner.addEventListener('click', hideWinner)
// SCRAP METAL GAS PEDAL
/* 



*/