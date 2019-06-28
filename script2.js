const daysOfMonth = []
const dailyAmount = []

function pushDays(){
    for(let i = 0; i<=30; i++){
       daysOfMonth.push(i) 
    }
}

function populateArrayAmounts(){
    for(let i = 0; i <= daysOfMonth.length; i++){
        let j = Math.random() * (100 - 0) + 0;
        let w = Math.floor(j)
        dailyAmount.push(w)
    }
}

function createElements(value){
    let listItem = document.createElement("LI");
    listItem.innerText = value;
    document.querySelector('#chart').appendChild(listItem);
}

// function setHeight(){
//     for(let i = 0; i < daysOfMonth.length; i++){
//         console.log(x.textContent)
//     }
// }

function test(){
    const x = document.querySelectorAll('#chart li')
    for(let i = 0; i <= daysOfMonth.length; i++){
        x[i].style.paddingTop = `${(dailyAmount[i])}vh`
            if(dailyAmount[i]<10){
                x[i].textContent = `0${dailyAmount[i]}%`
            } 
            else {
                x[i].textContent = `${dailyAmount[i]}%`
            }
    }
    return
}

pushDays()
populateArrayAmounts()
daysOfMonth.forEach(createElements)
test()