const result = document.querySelector('#sumOfDrinks')
const amountLeftToReachGoal = document.querySelector('#amountLeftToReachGoal')
const waterLevel = document.querySelector('#waterLevel')
let waterPercentage = document.querySelector('#waterPercentage')
let clock = document.querySelector('#clock')
const winner = document.querySelector('#winnerSplashScreen')
let currentDate = new Date()
let currentMonth = currentDate.getMonth() +1
let currentYear = currentDate.getFullYear()
const numberOfDays = daysInMonth(currentMonth, currentYear)
let numberOfDaysInCurrentMonth = new Array(numberOfDays).fill(0)
let savedHistory = []
let sumOfDrinks = 0
let targetGoal = 2000
const beverages = [
	{
		type: 'Water 200ml',
		ml: 200
	},
	{
		type: 'Water 500ml',
		ml: 500
	},
	{
		type: 'Coffee 200ml',
		ml: 200
	},
	{
		type: 'Tea 200ml',
		ml: 200
	},
	{
		type: 'Beer 200ml',
		ml: 200
	},
	{
		type: 'Beer 500ml',
		ml: 500
	}
]

// Functions
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

const appendButtons = () => {
	beverages.map(drink => {
		const beveragesUl = document.querySelector('#beverages')
		const beverageLi = document.createElement('li')
		const beverageButton = document.createElement('button')
		const buttonText = document.createTextNode(drink.type)
		beverageButton.setAttribute('value', drink.ml)
		beverageButton.classList.add('beverage-button')
		beverageButton.appendChild(buttonText)
		beveragesUl.append(beverageLi)
		beverageLi.append(beverageButton) 
	}
		)
}

function isGoalReached() {
	if(sumOfDrinks <= 0) {
		limitSubZero()
		result.innerHTML = `0 ml`
		amountLeftToReachGoal.innerHTML = `2000 ml`
	} else if (sumOfDrinks >= 2000) {
		raisingWater()
		winner.style.visibility = 'visible'

	}
}

function addCustomDrink(buttonClicked) {
	const amount = buttonClicked.target.value
	if (amount >= 0) {
		sumOfDrinks += parseInt(amount)
		isGoalReached()
		result.innerHTML = ` ${sumOfDrinks} ml`
		goal()
		localStorage.setItem('currentAmount', sumOfDrinks)

		raisingWater()
		setTodaysValue()
		applyHistory()
		return sumOfDrinks
	}
}

function timeLeft() {
	let now = new Date()
	let diffHours = 23 - parseInt(now.getHours())
	let diffMin = 59 - parseInt(now.getMinutes())
	let diffSec = 59 - parseInt(now.getSeconds())

	if (diffHours === 0 && diffMin === 0 && diffSec === 1) {
		resetWater()
	}
	clock.innerHTML = `${diffHours}h ${diffMin}m ${diffSec}s`
}

function goal() {
	let diff = targetGoal - sumOfDrinks
	if (diff <= 0) {
		amountLeftToReachGoal.innerHTML = '0 ml'
	} else {
		amountLeftToReachGoal.innerHTML = ` ${diff} ml`
	}
}

function raisingWater() {
	let valueWater = sumOfDrinks / 20
	if (sumOfDrinks <= 0) {
		waterLevel.style.height = 0
		waterPercentage.style.visibility = 'hidden'
		waterPercentage.innerHTML = `0/100%`
	} else {
		waterPercentage.style.visibility = 'visible'
		waterLevel.style.position = 'absolute'
		waterLevel.style.height = `${Math.floor(valueWater + 2)}%`
		document.querySelector('#waterPercentage').innerHTML = `${Math.floor(
			valueWater
		)}/100%`
	}
}

function locallyStoredAmount(value) {
	sumOfDrinks = parseInt(value)
	amountLeftToReachGoal.innerHTML = `${2000 - sumOfDrinks} ml`
	result.innerHTML = `${parseInt(value)} ml`
	raisingWater()
	return
}

function checkLocalStorage() {
	let localStorageAmountValue = localStorage.getItem('currentAmount')
	if (!localStorageAmountValue) {
		return
	}
	return locallyStoredAmount(localStorageAmountValue)
}

function setCurrentDate() {
	if (localStorage.getItem('currentDate') == currentDate.getDate()) {
		return
	} else {
		localStorage.setItem('currentDate', currentDate.getDate())
		resetWater()
	}
}

function resetWater() {
	waterPercentage.style.visibility = 'hidden'
	sumOfDrinks = 0
	targetGoal = 2000
	result.innerHTML = '0 ml'
	amountLeftToReachGoal.innerHTML = '2000 ml'
	localStorage.removeItem('currentAmount')
	waterLevel.style.height = 0
}

function hideWinner() {
	winner.style.visibility = 'hidden'
	resetWater()
}

function limitSubZero() {
	localStorage.setItem('currentAmount', 0)
	sumOfDrinks = 0
}

function createBars() {
	let listItem = document.createElement('li')
	listItem.innerText = 'val'
	document.querySelector('#chart').appendChild(listItem)
}

function setTodaysValue() {
	const currentValueOfWater = localStorage.getItem('currentAmount')
	let index = parseInt(localStorage.getItem('currentDate') - 1)
	let savedHistoryLocalStorage = JSON.parse(localStorage.getItem('savedHistory'))
	savedHistoryLocalStorage.splice(index, 1, parseInt(currentValueOfWater) / 20)
	localStorage.setItem('historicalValues%', JSON.stringify(savedHistoryLocalStorage))
}

function saveHistory() {
	savedHistory = JSON.parse(localStorage.getItem('historicalValues%'))
	localStorage.setItem('savedHistory', JSON.stringify(savedHistory))
}

function applyValuesToBars() {
	const allBars = document.querySelectorAll('#chart li')
	allBars.forEach((bar, index)=> {
		bar.style.paddingTop = `${Math.floor(savedHistory[index])}vh`
		if (savedHistory[index] < 10) {
			bar.textContent = ` ${Math.floor(savedHistory[index])}%`
		} else {
			bar.textContent = `${Math.floor(savedHistory[index])}%`
		}
	})
}
	
function applyHistory() {
	saveHistory()
	applyValuesToBars()
}

function firstTimeCheckSavedHistoryLocalStorage() {
	let x = localStorage.getItem('historicalValues%')
	if (!x) {
		localStorage.setItem('historicalValues%', JSON.stringify(numberOfDaysInCurrentMonth))
	} else {
		return
	}
}

setInterval(timeLeft, 1000)
appendButtons()
checkLocalStorage()
firstTimeCheckSavedHistoryLocalStorage()
setCurrentDate()
document.querySelectorAll('.beverage-button').forEach(button => button.addEventListener('click', addCustomDrink))
winner.addEventListener('click', hideWinner)
numberOfDaysInCurrentMonth.map(() => createBars())
applyHistory()