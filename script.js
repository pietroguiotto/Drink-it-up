// Variables declaration
const uri = 'sounds/drop.mp3'
const buttons = document.querySelectorAll('button')
const result = document.querySelector('#sumOfDrinks')
const amountLeftToReachGoal = document.querySelector('#amountLeftToReachGoal')
const waterLevel = document.querySelector('#waterLevel')
let waterPercentage = document.querySelector('#waterPercentage')
let clock = document.querySelector('#clock')
const winner = document.querySelector('#winnerSplashScreen')
let customValue = document.querySelector('#customValue')
const chart = document.querySelector('#chart')
let currentDate = new Date()
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

// on load

window.addEventListener('load', () => {
		loadAudio(uri)
		beverages.forEach(i => {
				const beverage = JSON.stringify(i.type)
				const li = document.createElement('li')
				li.style.paddingTop = '0px'
				li.className = "list-item";
				li.innerHTML = JSON.parse(beverage)
				chart.appendChild(li)
		})
})

// Functions

function loadAudio(uri) {
		let audio = new Audio()
		let isAppLoaded;
		audio.addEventListener('canplaythrough', isAppLoaded, false)
		audio.src = uri;
		return audio;
}

function playAudio() {
	const sound = loadAudio(uri)
	sound.play()
}

function increaseBeverage(currentBeverage) {
		const arrayOfDrinks = document.querySelectorAll('#chart li')
		arrayOfDrinks.forEach(i => {
				if (currentBeverage.type === i.textContent) {
						let drinkLevel = localStorage.getItem(`${currentBeverage.type} height`)
						if (!drinkLevel) {
								localStorage.setItem(`${currentBeverage.type} height`, i.style.paddingTop)
								let drinkLevel = localStorage.getItem(`${currentBeverage.type} height`)
						}
						let oldPadding = localStorage.getItem(`${currentBeverage.type} height`)
						let addPadding = currentBeverage.ml
						let result = parseInt(oldPadding, 10) + addPadding
						let currentPadding = `${result}px`
						const minifiedValue = parseInt(currentPadding,10) / 2
						localStorage.setItem(`${currentBeverage.type} height`, currentPadding)
						i.style.paddingTop = `${minifiedValue}px`
				}
		})
}

function addDrink() {
	playAudio()
	for (let i = 0; i < beverages.length; i++) {
		if (this.textContent == beverages[i].type) {
			sumOfDrinks += beverages[i].ml
		  const currentBeverage = beverages[i]
			increaseBeverage(currentBeverage)
			if (sumOfDrinks <= 0) {
				limitSubZero()
			}
			result.innerHTML = ` ${sumOfDrinks} ml`
			goal()
			localStorage.setItem('currentAmount', sumOfDrinks)
			if (sumOfDrinks <= 0) {
				result.innerHTML = `0 ml`
				amountLeftToReachGoal.innerHTML = `2000 ml`
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
			amountLeftToReachGoal.innerHTML = `2000 ml`
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
	chart.appendChild(listItem)
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

function applyHistory() {
	saveHistory()
}

function firstTimeCheckSavedHistoryLocalStorage() {
	let x = localStorage.getItem('historicalValues%')
	if (!x) {
		localStorage.setItem('historicalValues%', JSON.stringify(beverages))
	} else {
		return
	}
}

setInterval(timeLeft, 1000)
checkLocalStorage()
firstTimeCheckSavedHistoryLocalStorage()
setCurrentDate()
buttons.forEach(button => button.addEventListener('click', addDrink))
customValue.addEventListener('keypress', addCustomValue)
winner.addEventListener('click', hideWinner)
// beverages.forEach(createElements)
applyHistory()

// SCRAP METAL BELOW THIS POINT
