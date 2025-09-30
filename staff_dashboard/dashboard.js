const modal = document.getElementById("popupModal");
const addBtn = document.getElementById("Add");
const closeBtn = document.querySelector(".close");
const saveBtn = document.getElementById("save");
const tdata = document.getElementById("tContain");

let editingIndex = null; // Track row being edited

// Open popup for new item
addBtn.onclick = () => {
  editingIndex = null; // reset editing
  modal.style.display = "flex";
  resetForm();
};

// Close popup
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Close when clicking outside modal
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Save button click
saveBtn.onclick = () => {
  if (editingIndex === null) {
    saveItem();
  } else {
    saveEdit();
  }
};

function saveItem() {
  const nameValue = document.getElementById("name").value.trim();
  const priceValue = document.getElementById("price").value.trim();
  const categoryValue = document.getElementById("category").value.trim();
  const desValue = document.getElementById("description").value.trim();

  if (!nameValue || !priceValue) {
    alert("Please fill in all required fields");
    return;
  }

  const newItem = {
    name: nameValue,
    price: priceValue,
    category: categoryValue,
    description: desValue,
    status: "Available"
  };

  // Save to localStorage
  const savedItems = JSON.parse(localStorage.getItem("menuItems")) || [];
  savedItems.push(newItem);
  localStorage.setItem("menuItems", JSON.stringify(savedItems));

  renderTable();

  // Close and reset form
  modal.style.display = "none";
  resetForm();
}

function addRowToTable(item, index) {
  const newRow = document.createElement("tr");

  const nameData = document.createElement("td");
  nameData.textContent = item.name;

  const categoryData = document.createElement("td");
  categoryData.textContent = item.category;

  const priceData = document.createElement("td");
  priceData.textContent = `$${item.price}`;

  const statusData = document.createElement("td");
  statusData.innerHTML = `<button onclick="toggleStatus(${index})">${item.status || "Available"}</button>`;

  const actionsData = document.createElement("td");
  actionsData.innerHTML = `<button onclick="editItem(${index})">Edit</button>`;

  newRow.append(nameData, categoryData, priceData, statusData, actionsData);

  tdata.append(newRow);
}

function toggleStatus(index) {
  let savedItems = JSON.parse(localStorage.getItem("menuItems")) || [];
  if (!savedItems[index]) return;

  // Flip between Available and Unavailable
  savedItems[index].status =
    savedItems[index].status === "Available" ? "Unavailable" : "Available";

  // Save back
  localStorage.setItem("menuItems", JSON.stringify(savedItems));

  // Refresh table to reflect change
  renderTable();
}

function editItem(index) {
  const savedItems = JSON.parse(localStorage.getItem("menuItems")) || [];
  const item = savedItems[index];
  if (!item) return;

  // Pre-fill form
  document.getElementById("name").value = item.name;
  document.getElementById("price").value = item.price;
  document.getElementById("category").value = item.category;
  document.getElementById("description").value = item.description;

  // Open popup
  modal.style.display = "flex";

  // Set editing mode
  editingIndex = index;
}

function saveEdit() {
  if (editingIndex === null) return;

  const nameValue = document.getElementById("name").value.trim();
  const priceValue = document.getElementById("price").value.trim();
  const categoryValue = document.getElementById("category").value.trim();
  const desValue = document.getElementById("description").value.trim();

  const savedItems = JSON.parse(localStorage.getItem("menuItems")) || [];
  savedItems[editingIndex] = {
    ...savedItems[editingIndex], // keep status
    name: nameValue,
    price: priceValue,
    category: categoryValue,
    description: desValue
  };

  localStorage.setItem("menuItems", JSON.stringify(savedItems));

  renderTable();

  modal.style.display = "none";
  editingIndex = null;
  resetForm();
}

function renderTable() {
  tdata.innerHTML = "";
  const savedItems = JSON.parse(localStorage.getItem("menuItems")) || [];
  savedItems.forEach((item, index) => addRowToTable(item, index));
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "main course";
  document.getElementById("description").value = "";
}

// Load table when page loads
window.onload = () => {
  renderTable();
};
