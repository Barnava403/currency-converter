const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector('.msg');
const button = document.querySelector("button");

for(let select of dropdowns){
    for(currCode in countryList)
    {
        const newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==='from' && currCode==='USD'){
            newOption.selected = "selected";
        }else if(select.name==='to' && currCode==='INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        newFlag(evt.target);
    });
}
const newFlag = (el) => {
    let img =el.parentElement.querySelector("img");
    img.src= `https://flagsapi.com/${countryList[el.value]}/flat/64.png`;
}




button.addEventListener('click',(evt)=>{
    evt.preventDefault();
    update();
});

const update = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === '' || amtVal < 1){
        amtVal = 1;
        amount.value = '1';
    }
    const fromVal = document.querySelector('.from select').value;
    const toVal = document.querySelector('.to select').value;
    const Url = `${BASE_URL}${fromVal.toLowerCase()}.json`;
    let response = await fetch(Url);
    let data = await response.json();
    let rate = data[fromVal.toLowerCase()][toVal.toLowerCase()];
    const result = amtVal * rate;
    msg.innerText = `${amtVal} ${fromVal} = ${result} ${toVal}`;
}

window.addEventListener("load",()=>{
    update();
});






