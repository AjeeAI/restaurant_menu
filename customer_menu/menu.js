const searchInput = document.getElementById("search");
const foodItems = document.querySelectorAll(".food-item");
const cartButton = document.querySelector("footer button");
let cart = [];

searchInput.addEventListener("input", function () {
    const value = searchInput.value.toLowerCase();
    foodItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        if (text.includes(value)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
});

document.querySelectorAll(".food-item-text button").forEach(button => {
    button.addEventListener("click", function () {
        const foodName = this.parentElement.querySelector("h3").innerText;
        cart.push(foodName);
        updateCartButton();
    });
});

function updateCartButton() {
    cartButton.innerHTML = `<img src="./assets/cart_icon.png"> View Cart (${cart.length})`;
}

cartButton.addEventListener("click", function () {
    openCartModal();
});

function openCartModal() {
    let modal = document.createElement("div");
    modal.classList.add("cart-modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("cart-modal-content");

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "&times;";

    let title = document.createElement("h2");
    title.innerText = "Your Cart";

    let list = document.createElement("ul");
    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(list);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    closeBtn.addEventListener("click", function () {
        modal.remove();
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
