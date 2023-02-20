const nameInput = document.getElementById("cardholder_name");
const cardNumberInput = document.getElementById("card_number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");

const cardName = document.getElementById("card_name");
const cardNumbers = document.querySelectorAll(".quartet");
const cardMonth = document.getElementById("card_month");
const cardYear = document.getElementById("card_year");
const cardCvc = document.getElementById("card_cvc");

nameInput.addEventListener("input", () => {
    cardName.innerText = nameInput.value;

    if(nameInput.value.trim() == "" || nameInput.value.trim() == null)
        cardName.innerText = "Jane Applessed";
})

cardNumberInput.addEventListener("input", () => {
    cardNumberInput.value = formatNumberInput(cardNumberInput.value.replaceAll(" ", ""));

    let index = parseInt((cardNumberInput.value.replaceAll(" ", "").length - 1) / 4);
    let startSub = index + 1;

    setQuartetToZero(cardNumbers, index);
    formatElements(cardNumbers[index], cardNumberInput.value.replaceAll(" ", "").substr((startSub * 4) - 4, (startSub * 4)), 4);

    if(cardNumberInput.value.replaceAll(" ", "") == "" || cardNumberInput.value.replaceAll(" ", "") == null)
        cardNumbers.forEach(e => {
            e.innerText = "0000";
        });
})

const formatNumberInput = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
}, "");

function setQuartetToZero(cardNumbers, index){
    cardNumbers.forEach((e, i) => {
        if(i > index)
            e.innerText = "0000";
    });
}

monthInput.addEventListener("input", () => {
    if(monthInput.value.length > 2)
        monthInput.value = monthInput.value.slice(0, 2);
      
    formatElements(cardMonth, monthInput.value, 2);

    if(monthInput.value.trim() == "" || monthInput.value.trim() == null)
        cardMonth.innerText = "00";
})

yearInput.addEventListener("input", () => {
    if(yearInput.value.length > 2)
        yearInput.value = yearInput.value.slice(0, 2);
      
    formatElements(cardYear, yearInput.value, 2);

    if(yearInput.value.trim() == "" || yearInput.value.trim() == null)
        cardYear.innerText = "00";
})

cvcInput.addEventListener("input", () => {
    if(cvcInput.value.length > 3)
        cvcInput.value = cvcInput.value.slice(0, 3);
    
    formatElements(cardCvc, cvcInput.value, 3);

    if(cvcInput.value.trim() == "" || cvcInput.value.trim() == null)
        cardCvc.innerText = "000";
})

const formatElements = (element, value, max) => {
    element.innerText = value;
    for(let i = 0; i < (max - value.length); element.innerText += 0, i++);
}

const btnConfirm = document.querySelector(".btn");
const rowForm = document.querySelectorAll("form .row");

btnConfirm.addEventListener("click", () => {
    if(document.querySelector("form.hidden"))
        resetEverything();
    else{
        removeElements(".error-message");
        removeClassess("wrong");

        let flag = !(checkName()) && !(checkNumber()) && !(checkMonth()) && !(checkMonth()) && !(checkYear()) && !(checkCvc());

        if(!flag){
            document.querySelector("form").classList.add("hidden");

            addComplete();
        }
    }
})

function checkName(){
    const regexName = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;

    if(!regexName.test(cardName.value)){
        errorInput(rowForm[0], nameInput, "Wrong name format!");
        return false;
    }

    if(nameInput.value.trim() == "" || nameInput.value.trim() == null){
        errorInput(rowForm[0], nameInput, "Name can't be blank!");
        return false;
    }

    return true;
}

function checkNumber(){
    const regexNumber = /^[0-9]+$/

    if(cardNumberInput.value.trim() == "" || cardNumberInput.value.trim() == null){
        errorInput(rowForm[1], cardNumberInput, "Can't be blank!");
        return false;
    }

    if(cardNumberInput.value.replaceAll(" ", "").length < 16){
        errorInput(rowForm[1], cardNumberInput, "We need 16 digits!");
        return false;
    }
    
    if(!regexNumber.test(cardNumberInput.value.replaceAll(" ", ""))){
        errorInput(rowForm[1], cardNumberInput, "Wrong format, numbers only!");
        return false;
    }

    return true;
}

function checkMonth(){
    if(monthInput.value.trim() == "" || monthInput.value.trim() == null){
        errorInput(rowForm[2].querySelector(".col:nth-child(1)"), monthInput, "Month can't be blank!");
        return false;
    }

    if(!(monthInput.value > 0 && monthInput.value < 13)){
        errorInput(rowForm[2].querySelector(".col:nth-child(1)"), monthInput, "Insert a valid Month");
        return false;
    }

    return true;
}

function checkYear(){
    if(yearInput.value.trim() == "" || yearInput.value.trim() == null){
        errorInput(rowForm[2].querySelector(".col:nth-child(1)"), yearInput, "Year can't be blank!");
        return false;
    }

    if(!(yearInput.value > 22 && yearInput.value < 30)){
        errorInput(rowForm[2].querySelector(".col:nth-child(1)"), yearInput, "Insert a valid year");
        return false;
    }

    return true;
}

function checkCvc(){
    if(yearInput.value.trim() == "" || yearInput.value.trim() == null){
        errorInput(rowForm[2].querySelector(".col:nth-child(2)"), cvcInput, "Cvc can't be blank!");
        return false;
    }

    return true;
}

function errorInput(row, input, message){
    const p = document.createElement("p");
    p.classList.add("error-message");
    p.innerText = message;
    
    row.appendChild(p);

    input.classList.add("wrong");
}

function removeElements(name){
    const errors = document.querySelectorAll(name);

    errors.forEach(e => {
        e.remove();
    })
}

function removeClassess(className){
    const errors = document.querySelectorAll("input");

    errors.forEach(e => {
        e.classList.remove(className);
    })
}

function addComplete(){
    const div = document.createElement("div");
    div.classList.add("complete");

    const img = document.createElement("img");
    img.classList.add("complete-logo");
    img.setAttribute("src", "./images/icon-complete.svg");

    const h2 = document.createElement("h2");
    h2.innerText = "thank you!";

    const p = document.createElement("p");
    p.innerText = "We've added your card details";

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);

    document.querySelector(".data-form").prepend(div);

    document.querySelector(".btn").innerText = "Reset";
}

function resetEverything(){
    nameInput.value = ""; 
    cardNumberInput.value = ""; 
    monthInput.value = ""; 
    yearInput.value = ""; 
    cvcInput.value = ""; 

    cardName.innerText = "JANE APPLESSED";
    cardNumbers.forEach(e => {
        e.innerText = "0000";
    });
    cardMonth.innerText = "00";
    cardYear.innerText = "00";
    cardCvc.innerText = "000";

    document.querySelector("form").classList.remove("hidden");
    document.querySelector(".complete").remove();

    document.querySelector(".btn").innerText = "Confirm";
}