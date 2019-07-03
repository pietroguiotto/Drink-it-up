// Variables declaration

const h2Text = document.querySelector('h2')
const buttons = document.querySelectorAll('button')
const result = document.querySelector('#sumOfDrinks')
const targetLeft = document.querySelector('#targetLeft')
const waterLevel = document.querySelector('#waterLevel')
let waterPercentage = document.querySelector('#waterPercentage')
let clock = document.querySelector('#clock')
const winner = document.querySelector('#winner')
const individualBar = document.querySelectorAll('#chart')
let customValue = document.querySelector('#customValue')
let currentDate = new Date()
let objectForTest = [
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
]
let storedHistoricalValues = localStorage.getItem('historicalValues%')
const currentValueOfWater = localStorage.getItem('currentAmount')
let firstTimeSavedHistoryLocalStorage = localStorage.getItem('savedHistory')
let savedHistory = []
let sumOfDrinks = 0
let targetGoal = 2000
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

// Functions

function addDrink() {
	for (let i = 0; i < beverages.length; i++) {
		if (this.textContent == beverages[i].type) {
			sumOfDrinks += beverages[i].ml
			if (sumOfDrinks <= 0) {
				limitSubZero()
			}
			result.innerHTML = ` ${sumOfDrinks} ml`
			goal()
			localStorage.setItem('currentAmount', sumOfDrinks)
			if (sumOfDrinks <= 0) {
				result.innerHTML = `0 ml`
				targetLeft.innerHTML = `2000 ml`
			} else if (sumOfDrinks >= 2000) {
				raisingWater()
				goalReached()
			}
			raisingWater()
			setTodaysValue()
			applyHistory()
			return sumOfDrinks
		}
	}
}

function addCustomDrink(customA) {
	customValue.value = ''
	if (customA >= 0) {
		sumOfDrinks += parseInt(customA)
		if (sumOfDrinks <= 0) {
			limitSubZero()
		}
		result.innerHTML = ` ${sumOfDrinks} ml`
		goal()
		localStorage.setItem('currentAmount', sumOfDrinks)
		if (sumOfDrinks <= 0) {
			result.innerHTML = `0 ml`
			targetLeft.innerHTML = `2000 ml`
		} else if (sumOfDrinks >= 2000) {
			raisingWater()
			goalReached()
		}
		raisingWater()
		setTodaysValue()
		applyHistory()
		return sumOfDrinks
	}
	alert('Not a valid input')
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
		targetLeft.innerHTML = ' Goal reached!!'
	} else {
		targetLeft.innerHTML = ` ${diff} ml`
	}
}

function raisingWater() {
	let valueWater = (sumOfDrinks / 20)
	if (sumOfDrinks <= 0) {
		waterLevel.style.height = 0
		waterPercentage.style.visibility = 'hidden'
		waterPercentage.innerHTML = `0/100%`
	} else {
		waterPercentage.style.visibility = 'visible'
		waterLevel.style.position = 'absolute'
		waterLevel.style.height = `${Math.floor(valueWater+2)}%`
		document.querySelector('#waterPercentage').innerHTML = `${Math.floor(
			valueWater
		)}/100%`
	}
}

function locallyStoredAmount(value) {
	sumOfDrinks = parseInt(value)
	targetLeft.innerHTML = `${2000 - sumOfDrinks} ml`
	result.innerHTML = `${parseInt(value)} ml`
	if (sumOfDrinks >= 2000) {
		goalReached()
	}
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
	} else {
		localStorage.setItem('currentDate', currentDate.getDate())
		resetWater()
	}
}

function resetWater() {
	waterPercentage.style.visibility = 'hidden'
	sumOfDrinks = 0
	let valueWater = sumOfDrinks / 20
	targetGoal = 2000
	result.innerHTML = '0 ml'
	targetLeft.innerHTML = '2000 ml'
	localStorage.removeItem('currentAmount')
	waterLevel.style.height = 0
}

function goalReached() {
	winner.style.visibility = 'visible'
	customValue.disabled = true
}

function hideWinner() {
	winner.style.visibility = 'hidden'
	resetWater()
	customValue.disabled = false
}

function limitSubZero() {
	localStorage.setItem('currentAmount', 0)
	sumOfDrinks = 0
}

function addCustomValue(e) {
	const key = e.which || e.keyCode
	if (key === 13) {
		addCustomDrink(customValue.value)
		return
	}
	return
}

function createElements(value) {
	let listItem = document.createElement('LI')
	listItem.innerText = value
	document.querySelector('#chart').appendChild(listItem)
}

function setTodaysValue() {
	const currentValueOfWater = localStorage.getItem('currentAmount')
	let index = parseInt(localStorage.getItem('currentDate') - 1)
	let abcd = JSON.parse(localStorage.getItem('savedHistory'))
	abcd.splice(index, 1, parseInt(currentValueOfWater) / 20)
	localStorage.setItem('historicalValues%', JSON.stringify(abcd))
}

function saveHistory() {
	savedHistory = JSON.parse(localStorage.getItem('historicalValues%'))
	localStorage.setItem('savedHistory', JSON.stringify(savedHistory))
}

function test() {
    const individualBar = document.querySelectorAll('#chart li')
	for (let i = 0; i <= savedHistory.length; i++) {
		individualBar[i].style.paddingTop = `${Math.floor(savedHistory[i])}vh`
		if (savedHistory[i] < 10) {
			individualBar[i].textContent = `0${Math.floor(savedHistory[i])}%`
		} else {
			individualBar[i].textContent = `${Math.floor(savedHistory[i])}%`
		}
	}
	return
}

function applyHistory() {
	saveHistory()
	test()
}

function firstTimeCheckSavedHistoryLocalStorage() {
	let x = localStorage.getItem('historicalValues%')
	if (!x) {
		localStorage.setItem('historicalValues%', JSON.stringify(objectForTest))
	} else {
		return
	}
}

checkLocalStorage()

firstTimeCheckSavedHistoryLocalStorage()

setCurrentDate()
setInterval(timeLeft, 1000)
buttons.forEach(button => button.addEventListener('click', addDrink))
customValue.addEventListener('keypress', addCustomValue)
winner.addEventListener('click', hideWinner)
objectForTest.forEach(createElements)
applyHistory()

// SCRAP METAL BELOW THIS POINT

// function plusOne() {
// 	let currentDatePlus = parseInt(localStorage.getItem('currentDate')) + 1
// 	localStorage.setItem('currentDate', currentDatePlus)
// }

// function minusOne() {
// 	let currentDateMinus = parseInt(localStorage.getItem('currentDate')) - 1
// 	localStorage.setItem('currentDate', currentDateMinus)
// }
