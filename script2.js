let objectForTest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let storedHistoricalValues = localStorage.getItem('historicalValues%')
const currentValueOfWater = localStorage.getItem('currentAmount')
let savedHistory = []

function createElements(value){
    let listItem = document.createElement("LI");
    listItem.innerText = value;
    document.querySelector('#chart').appendChild(listItem);
}

function plusOne(){
    let currentDatePlus = parseInt(localStorage.getItem('currentDate'))+1
    localStorage.setItem('currentDate', currentDatePlus )
}

function minusOne(){
    let currentDateMinus = parseInt(localStorage.getItem('currentDate'))-1  
    localStorage.setItem('currentDate', currentDateMinus )
}

function setTodaysValue(){
    const currentValueOfWater = localStorage.getItem('currentAmount')
    let index = parseInt(localStorage.getItem('currentDate')-1)
    savedHistory.splice(index, 1, (parseInt(currentValueOfWater) / 20))
    localStorage.setItem('historicalValues%', JSON.stringify(savedHistory))
}

function saveHistory(){
    savedHistory = JSON.parse(localStorage.getItem('historicalValues%'))
    localStorage.setItem('savedHistory',JSON.stringify(savedHistory))
    console.log(savedHistory.length)
}

function attivaHistory(){
    console.log('attivaHistory empty function')
}

function test(){
    const x = document.querySelectorAll('#chart li')
    for(let i = 0; i <= savedHistory.length; i++){
        x[i].style.paddingTop = `${(savedHistory[i])}vh`
            if(savedHistory[i]<10){
                x[i].textContent = `0${savedHistory[i]}%`
            } 
            else {
                x[i].textContent = `${savedHistory[i]}%`
            }
    }
    return
}

function applyHistory(){
    saveHistory()
    test()
}

objectForTest.forEach(createElements)

applyHistory()




// GAS PEDAL SCRAP METAL, testing area start

// function setHeight(){
//     for(let i = 0; i < daysOfMonth.length; i++){
//         console.log(x.textContent)
//     }
// }

// const daysOfMonth = []
// const dailyAmount = []

// function pushDays(){
//     for(let i = 0; i<=30; i++){
//        daysOfMonth.push(i) 
//     }
// }

// function populateArrayAmounts(){
//     for(let i = 0; i <= daysOfMonth.length; i++){
//         let j = Math.random() * (100 - 0) + 0;
//         let w = Math.floor(j)
//         dailyAmount.push(w)
//     }
// }

// pushDays()
// populateArrayAmounts()

// GAS PEDAL SCRAP METAL, testing area end