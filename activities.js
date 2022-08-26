//***********************assigning variables********************


let typeCost = [[5000,2500,1500],[1000,500,4500]]
let durationCost = [[0,500,1000,2000],[0,250,500,1000]]
let region = 0;
let type = 0;
let num = 0;
let duration = "";
let extras = "";
let currenttotal = 0;
let totLoyalty = 0;
let thisOrderPoints = 0;
let totNumOfTickets =0;





//***********************loyalty function********************
function calcLoyalty() {
    if (totNumOfTickets > 3){
        thisOrderPoints = 20 * totNumOfTickets;
        if (localStorage.getItem("loyaltyP")) {
            totLoyalty = parseInt(localStorage.getItem("loyaltyP"));
        } else {
            totLoyalty = 0;
            localStorage.setItem("loyaltyp", 0);
        }
        totLoyalty += thisOrderPoints;
        localStorage.setItem("loyaltyp", totLoyalty);
    }
}


const checkloyaltyBtn = document.querySelector("#checkloyaltybtn");
checkloyaltyBtn.addEventListener("click", checkloyalty);
function checkloyalty() {
    if (localStorage.getItem("loyaltyp")) {
        points = parseInt(localStorage.getItem("loyaltyp"));
        alert(`You have ${points} loyalty points`);
        }
       else {alert("you dont have loyalty points");}
}


placeorderBtn = document.getElementById("placeorder");
placeorderBtn.addEventListener("click", () => { 
    calcLoyalty();
    outputordertable.innerHTML = "";
    totNumOfTickets = 0;
    
    outputOverallTotal.innerHTML=0;
    alert(`Order Placed successfully! You have earned total of ${totLoyalty} points for this order`)
    thisOrderPoints = 0;
});





//***********************Getting elements********************
const outputCurrentTotal = document.getElementById("currenttotal");
const outputOverallTotal =document.getElementById("totaloverall");
const outputordertable = document.getElementById("ordertableoutput");

const activityForm = document.querySelector(".activitiesform");
const regionSelect = document.getElementById("region");
const typeSelect = document.getElementById("pass-type");
const numinput = document.getElementById("num");
const durationSelect = document.getElementsByName("duration-select");
const foodToken = document.getElementById("foodtoken");

regionSelect.addEventListener("change", calcCurrentTotal);
typeSelect.addEventListener("change", calcCurrentTotal);

numinput.addEventListener("change", calcCurrentTotal);
durationSelect.forEach(option => {
    option.addEventListener("change", calcCurrentTotal);
});
foodToken.addEventListener("change", calcCurrentTotal);


const orderFavoriteButton = document.getElementById("orderfavorite");
const addtofavoritebutton = document.getElementById("addtofavorite");
const addtoorderbutton = document.getElementById("addtoorder");

orderFavoriteButton.addEventListener("click", orderfavorite);
addtofavoritebutton.addEventListener("click", addtofavorite);
addtoorderbutton.addEventListener("click", addtoorder);






//***********************Getdata form********************

function getDataFromForm() {
    region = regionSelect.selectedIndex; 
    type = typeSelect.selectedIndex; 
    num = numinput.value;
    durationSelect.forEach(option => {
        option.selected
    })

    durationSelect.forEach(option => {
        if(option.checked){
        duration = option.id;
        }
    });

    if (foodToken.checked == true) {
        extras = "foodtoken";
// 
        
    } else {
        extras = "";
    }
}


//***********************current cost********************
function calcCurrentTotal() {
    getDataFromForm();
    if (type === 3) {
        durationSelect.forEach(choice => choice.disabled = true);
        foodToken.disabled = true;

    } else {
        durationSelect.forEach(choice => choice.disabled = false);
        foodToken.disabled = false;
    }

    let totalCost = 0;
    if  ((region !== 0) && (type !== 0)) {   
    totalCost += typeCost[region - 1][type - 1];

    switch (duration) {
        case "3h":
            totalCost += durationCost[region - 1][0];
            break;
        case "halfday":
            totalCost += durationCost[region - 1][1];
            break;
        case "fullday":
            totalCost += durationCost[region - 1][2];
            break;
        case "twodays":
            totalCost += durationCost[region - 1][3];
            break;
    
        default:
            break;
    }

    if (extras === "foodtoken") {
        totalCost += 500;
    }

    totalCost = totalCost * num;
    currenttotal = totalCost;
    
    outputCurrentTotal.innerText = `${totalCost}`;
} }

function resetOrderCurrent() {





    //***********************resetting data********************
                          
    region = "";
    type = "";
    num = 0;
    duration = "";
    extras = "";
    currenttotal = 0;
   
    

    //***********************resetting form********************
    outputCurrentTotal.innerText = 0;    
    regionSelect.selectedIndex = 0;
    typeSelect.selectedIndex = 0;
    numinput.value =0;

    for(let i=0;i<durationSelect.length;i++) {
    durationSelect[i].checked = false;
    }
    foodToken.checked = false;
}

function addtoorder(evnt) {
    evnt.preventDefault();
    if (activityForm.checkValidity() === true) {
        let regionTxt = "";
        let typeTxt = "";
        switch (region) {   
            case 1:
                regionTxt = "Foreign";
                break;
            case 2:
                regionTxt = "Local";
                break;
    
            default:
                break;
        }
    
        switch (type) {   
            case 1:
                typeTxt = "Adult";
                break;
            case 2:
                typeTxt = "Child";
                break;
            case 3:
                typeTxt = "Annual";
                break;
    
            default:
                break;
        }
        outputordertable.innerHTML += `<tr>
                                            <td>${regionTxt}</td>
                                            <td>${typeTxt}</td>
                                            <td>${num}</td>
                                            <td>${duration}</td>
                                            <td>${extras}</td>
                                            <td>${currenttotal}</td>
                                        </tr>`;
        overallOrderTotalNum = parseFloat(outputOverallTotal.innerText);
        overallOrderTotalNum += currenttotal;
        outputOverallTotal.innerText = overallOrderTotalNum;
        totNumOfTickets = totNumOfTickets + num;
        resetOrderCurrent();
    } else {
        alert("Please Fill all details!");
    }
}

//***********************Assigning local storage********************

function addtofavorite(evt) {
    evt.preventDefault();
    if (activityForm.checkValidity() === true) {         
        order = {
            region: 0,
            type: 0,
            num: 0,
            duration: "",
            extras: "" 
        }

        order.region = region;
        order.type = type;
        order.num = num;
        order.duration = duration;
        order.extras = extras;
        localStorage.setItem("favoriteorder", JSON.stringify(order));

    } else {
        alert("Please! Recheck the form again")
    }

}

function orderfavorite(evt) {
    evt.preventDefault();
    if (localStorage.getItem("favoriteorder")){        
        order = JSON.parse(localStorage.getItem("favoriteorder"));
      

        duration = order.duration;
        region = order.region;
        type = order.type;
        num = order.num;
        extras = order.extras;

        formDataChange();
       
    } else {
        alert("favourite order is empty");
    }
}

function formDataChange() {
    regionSelect.selectedIndex = region;
    typeSelect.selectedIndex = type;
    numinput.value =num;

    for(let i=0;i<durationSelect.length;i++) {
        if (durationSelect[i].id === duration) {
            durationSelect[i].checked = true;
        }
    }
    foodToken.checked = foodToken;
    calcCurrentTotal();
}

