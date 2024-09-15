
 function webSite() {
    // Get input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    // Error elements
    var error = document.getElementById('error');
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var confirmError = document.getElementById('confirmError');
    
    // Reset errors
    error.style.display = 'none';
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmError.style.display = 'none';
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        error.style.display = 'block';
        return;
    }
    
    var nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name) ) {
        nameError.style.display = 'block';
        return;
    }
    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) ) {
        emailError.style.display = 'block';
        return;
    }
    
    if (password.length < 8) {
        passwordError.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        confirmError.style.display = 'block';
        return;
    }
    //make expire date
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 3 );
    
    // Save to cookies
    document.cookie = "username=" + name + ";expires="+expireDate;
    document.cookie = "email=" + email + ";expires="+expireDate;
    
    // Show website and set user name

    document.getElementById('login').style.display = 'none';
    document.getElementById('website').style.display = 'block';
    document.getElementById('userName').innerText = name;
    document.getElementById('navbar').style.display = 'flex'
    document.getElementById('footer').style.display = 'flex'
    
    
};

function logOut() {
    //old date to delete cookie
    var endDate = new Date();
    endDate.setTime(endDate.getTime() - 3 );
    
    //set cookie
    document.cookie =  "username= s;expires="+endDate;
    document.cookie =  "email= s;expires="+endDate;

    //hide webSite and return to login page
    document.getElementById('login').style.display = 'flex';
    document.getElementById('website').style.display = 'none';
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('footer').style.display = 'none'
};

var count = 0;



function addToCart(x) {
  //get product id
  var product = document.getElementById(x);

  //get the cart
  var cart = document.getElementById("cart");
  //insert product into cart
  
  cart.append(product);
var footer = document.getElementById("footer");

  //get number of chosen product
  var counter = document.getElementById("count");

  //increment number of chosen product
  count++;
  counter.innerText = "(" + count + ")";

  //insert quantity
  //make sure its not exist to create it just one time
  var quantity = product.querySelector(".quantity");
  if (!quantity) {
    quantity = document.createElement("p");
    quantity.className = "quantity";
    quantity.innerText = 1;
    product.appendChild(quantity);
  } else {
    quantity.innerText++;
  }

  //insert delete button
  //make sure its not exist to create it just one time
  var deleteButton = product.querySelector(".deleteButton");
  if (!deleteButton) {
    deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    product.append(deleteButton);
    deleteButton.innerHTML = "delete";

    deleteButton.onclick = function () {
      if (quantity.innerText == 0) {
        deleteButton.style.display='none';
        quantity.style.display = 'none';
        var main = document.getElementById("products");
        main.append(product);
        
      } else {
        quantity.innerText--;
        --count;
        counter.innerText = "(" + count + ")";
        updateTotalCost();
      }
    };
  }
  updateTotalCost();
}
function updateTotalCost() {
  var cart = document.getElementById("cart");
  var cartProducts = cart.getElementsByClassName("product");
  var totalCost = 0;

  for (var i = 0; i < cartProducts.length; i++)
 {
    var quantityElement = cartProducts[i].querySelector(".quantity");
    var quantity = Number(quantityElement.innerText);

    var priceElement = cartProducts[i].querySelector(".price");
    var price = parseInt(priceElement.innerText.split(":")[1]);

    totalCost += quantity * price;
  }
  var totalCostElement = document.getElementById("totalCost");
  totalCostElement.innerText = "Total Cost: " + totalCost + " LE";
}
function showChoosenProducts(){
    //hide website and login then show cart
    document.getElementById('login').style.display = 'none';
    document.getElementById('website').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    document.getElementById('about').style.display = 'none';
    document.getElementById('footer').style.display = 'none';

}
function backToMain() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('website').style.display = 'block';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('about').style.display = 'none';
}
function showProductsByCategory() {
    var category = document.getElementById('whichP').value;
    var products = document.getElementsByClassName('product');
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        if (category == 'all' || product.classList.contains(category)) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none'; 
        }
    }
}
var oImage = document.getElementById('image') ;
var currentImg = 0;
var sources = [
                './bs1.jpeg',
                './bs2 (1).jpeg',
                './bs2 (2).jpeg',
                './bs2 (3).jpeg'
];
var totalimages = sources.length;
function goBack () {
    currentImg = (currentImg-1+totalimages)%totalimages
oImage.src = sources[currentImg];

}
function goForward () {
    currentImg = (currentImg+1)%totalimages
    oImage.src= sources[currentImg];
}
function goToTop() {
    document.documentElement.scrollTop = 0; 
}
function goToAbout() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('website').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('about').style.display = 'flex';
}
