var BillInput = document.getElementsByClassName("Bill")[0];
var PeopleInput = document.getElementsByClassName("NoP")[0];
var TipInput = document.querySelectorAll(".TipAmount");
var CustomTipInput = document.getElementsByClassName("TipCust")[0];
var ResetButton = document.getElementsByClassName("ResetButton")[0];

var BillAmount = 0;
var PeopleAmount = 1;
var TipPercent = 0;

var FinalTotal = 0;
var TipTotal = 0;
var finalTipPerson = 0;
var finalBillPerson = 0;

var FormattedFinalTotal = 0;
var FormattedfinalTipPerson = 0;
var FormattedfinalBillPerson = 0;

var x = window.matchMedia("(min-width: 850px)")

BillInput.addEventListener("input", () => {
    BillAmount = Number(BillInput.value);
    if (BillAmount < 0) {
        BillInput.value = 0;
        BillAmount = 0
        document.getElementsByClassName("BillError")[0].style.visibility = "visible";
        BillInput.style.border = "1px solid red";
        } else {
        document.getElementsByClassName("BillError")[0].style.visibility = "hidden";
        BillInput.style.border = "none";
    }
    finalValues()
    }
)

PeopleInput.addEventListener("input", () => {
    PeopleAmount = Number(PeopleInput.value);
    if (PeopleAmount <= 0) {
        PeopleInput.value = 1;
        document.getElementsByClassName("PeopleError")[0].style.visibility = "visible";
        PeopleInput.style.border = "1px solid red";
        } else {
        document.getElementsByClassName("PeopleError")[0].style.visibility = "hidden";
        PeopleInput.style.border = "none";
    }
    finalValues()
});

CustomTipInput.addEventListener("input", () => {
    TipPercent = (Number(CustomTipInput.value) / 100);
    if (TipPercent <= 0) {
        CustomTipInput.style.border = "1px solid red";
        } else {
            CustomTipInput.style.border = "none";
    }
    finalValues()
});

TipInput.forEach(item => {
    item.addEventListener("click", () => {
    TipPercent = Number(item.value);
    finalValues()
})
});

function finalValues() {
    TipTotal = (BillAmount * TipPercent);
    FinalTotal = (BillAmount + TipTotal);
    finalTipPerson = (TipTotal / PeopleAmount);
    finalBillPerson = (FinalTotal / PeopleAmount);

    if (isNaN(finalBillPerson) || isNaN(finalTipPerson)) {
        finalBillPerson = 0;
        finalTipPerson = 0;
    } else {
        ResetButton.disabled = false;
        FormattedFinalTotal = FinalTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        FormattedfinalTipPerson = finalTipPerson.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        FormattedfinalBillPerson = finalBillPerson.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        console.log(FormattedFinalTotal.length)

        if (x.matches) { 
            if (FormattedFinalTotal.length > 8) {
                document.getElementsByClassName("screenQuantityTot")[0].style.fontSize = "1.5rem"
                document.getElementsByClassName("screenQuantityTip")[0].style.fontSize = "1.5rem"
                document.getElementsByClassName("screenQuantityTotal")[0].style.fontSize = "1.5rem"
            }
            if (FormattedFinalTotal.length > 13) {
                document.getElementsByClassName("screenQuantityTot")[0].style.fontSize = "1rem"
                document.getElementsByClassName("screenQuantityTip")[0].style.fontSize = "1rem"
                document.getElementsByClassName("screenQuantityTotal")[0].style.fontSize = "1rem"
            } if (FormattedFinalTotal.length <= 8) {
                document.getElementsByClassName("screenQuantityTot")[0].style.fontSize = "2.5rem"
                document.getElementsByClassName("screenQuantityTip")[0].style.fontSize = "2.5rem"
                document.getElementsByClassName("screenQuantityTotal")[0].style.fontSize = "2.5rem"
            }
       
            

        }

        document.getElementsByClassName("screenQuantityTot")[0].innerText = `\$${FormattedFinalTotal}`;
        document.getElementsByClassName("screenQuantityTip")[0].innerText = `\$${FormattedfinalTipPerson}`;
        document.getElementsByClassName("screenQuantityTotal")[0].innerText = `\$${FormattedfinalBillPerson}`;
} }

ResetButton.addEventListener("click", () => {
    BillAmount = 0;
    TipPercent = 0;
    PeopleAmount = 1;

    BillInput.value = "";
    PeopleInput.value = 1;
    CustomTipInput.value = "";

    finalValues()

    ResetButton.disabled = true;
    document.getElementsByClassName("PeopleError")[0].style.visibility = "hidden"
    document.getElementsByClassName("BillError")[0].style.visibility = "hidden";
    PeopleInput.style.border = "none";
    BillInput.style.border = "none";

})
