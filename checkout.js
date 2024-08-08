//Getting References
const txtTotal = document.getElementById("total");
const tblBody = document.getElementById("tableBody");

const checkoutForm = document.getElementById("checkout-form");

const optCardPayment = document.getElementById("card");

const txtCardName = document.getElementById("card-name");
const txtCardNumber = document.getElementById("card-number");
const txtExpiryDate = document.getElementById("date");
const txtCVV = document.getElementById("cvv");

const btnPay = document.getElementById("pay");


//Disable payment details
txtCardName.disabled = true;
txtCardNumber.disabled = true;
txtExpiryDate.disabled = true;
txtCVV.disabled = true;

//Listening to events
window.addEventListener("load", getData);
optCardPayment.addEventListener("click", paymentDetails);
btnPay.addEventListener("click", message);

//getData Function
function getData(){
    let buyNow = JSON.parse(localStorage.getItem('buyOrder'));
    if (buyNow) {
        displayOrder(buyNow);
    }
}

//displayOrder function
function displayOrder(orderItems){
    
    let total = 0;

    orderItems.forEach(item => {
        let name = item.name;
        let unitPrice = parseFloat(item.unitPrice);
        let quantity = parseFloat(item.quantity);
        let price = unitPrice * quantity;
        total += price;

        // Create a new row in the cart table
        let row = tblBody.insertRow();
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = quantity;
        row.insertCell(2).innerText = price.toFixed(2);
    });

    // Update total
    txtTotal.innerText = total.toFixed(2);
}

//payment Function
function paymentDetails(){

    //Enabling payment details
    txtCardName.disabled = false;
    txtCardNumber.disabled = false;
    txtExpiryDate.disabled = false;
    txtCVV.disabled = false;

}

//message Function
function message(event){
    if(checkoutForm.checkValidity()){
        event.preventDefault();

        //Display a thank you message with the delivery date
        alert(`Thank you for your purchase! Your order will be delivered on ${new Date().toLocaleDateString()}`)

    }
    else {

        //Display a message about incomplete form fields
        alert('Please fill out all fields correctly.');

    }
}
