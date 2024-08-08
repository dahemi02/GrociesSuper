// Checking whether the Script has been linked properly
console.log("Linking Successful!");

// Getting References
const theForm = document.getElementById("orderForm");  // Order Form

const btnAddToCart = document.getElementById("cart");  // Add to Cart button

const tblBody = document.getElementById("tableBody");  // Body of the Cart table
const txtTotal = document.getElementById("total");  // Total at the Cart Table Footer

const btnBuyNow = document.getElementById("buy");  // Buy Now Button
const btnAddToFavorites = document.getElementById("addFav");  // Add to Favorites Button
const btnApplyFavorites = document.getElementById("applyFav");  // Apply Favorites Button


// Listeing to events
btnAddToCart.addEventListener("click", addToCart);
btnAddToFavorites.addEventListener("click", addToFavorites);
btnApplyFavorites.addEventListener("click", applyFavorites);
btnBuyNow.addEventListener("click", buyNow);



// addToCart Function
function addToCart(event){

    if(theForm.checkValidity()){
        event.preventDefault();

        // Defining the total
        let total = 0;

        // Clear previous cart entries
        tblBody.innerHTML = '';

       // Iterate through each product item
        document.querySelectorAll('.items').forEach(itemSection => {

            // Fetching name, unit price, and quantity from the respective sections
            let name = itemSection.querySelector(".name").innerText.trim();
            let unitPrice = parseFloat(itemSection.querySelector(".unitPrice").innerText.replace('Rs. ', '').trim());
            let quantity = parseFloat(itemSection.querySelector(".quantity").value.trim());
 
            if (quantity > 0) {
                let price = quantity * unitPrice;
                total += price;

                // Create a new row in the cart table
                let row = tblBody.insertRow();
                row.insertCell(0).innerText = name;
                row.insertCell(1).innerText = quantity;
                row.insertCell(2).innerText = unitPrice.toFixed(2);
                row.insertCell(3).innerText = price.toFixed(2);
            }
        });

        // Update total
        txtTotal.innerText = total.toFixed(2);

    }
}

//addToFavorites Function
function addToFavorites(){

    //Clearing out the localstorage
    localStorage.clear();
    
    let favorites = [];

    // Collect the current cart items
    document.querySelectorAll('.items').forEach(itemSection => {
        let name = itemSection.querySelector(".name").innerText.trim();
        let unitPrice = parseFloat(itemSection.querySelector(".unitPrice").innerText.replace('Rs. ', '').trim());
        let quantity = parseFloat(itemSection.querySelector(".quantity").value.trim());

        if (quantity > 0) {
            favorites.push({ name, unitPrice, quantity });
        }
    });

    // Save to local storage
    localStorage.setItem('favoriteOrder', JSON.stringify(favorites));
    alert('Favorites saved successfully!');
}

//applyFavorites Function
function applyFavorites(){

    let favorites = JSON.parse(localStorage.getItem('favoriteOrder'));
    if (favorites) {
        favorites.forEach(favorite => {
            document.querySelectorAll('.items').forEach(itemSection => {
                let name = itemSection.querySelector(".name").innerText.trim();
                if (name === favorite.name) {
                    itemSection.querySelector(".quantity").value = favorite.quantity;
                }
            });
        });

        // Update the cart with favorite items
        addToCart(new Event('submit'));
        alert('Favorites applied to the cart!');
    } 
    else {
        alert('No favorites found!');
    }
}

//buyNow Function
function buyNow(){

    let buyNow = [];

    // Collect the current cart items
    document.querySelectorAll('.items').forEach(itemSection => {
        let name = itemSection.querySelector(".name").innerText.trim();
        let unitPrice = parseFloat(itemSection.querySelector(".unitPrice").innerText.replace('Rs. ', '').trim());
        let quantity = parseFloat(itemSection.querySelector(".quantity").value.trim());

        if (quantity > 0) {
            buyNow.push({ name, unitPrice, quantity });
        }
    });

    // Save the order to local storage
    localStorage.setItem('buyOrder', JSON.stringify(buyNow));

    // Linking the Checkout page
    window.location.href = 'Checkout.html';
}

