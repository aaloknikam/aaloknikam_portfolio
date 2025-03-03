// Simulate data
const userName = "John Doe"; // Replace with dynamic data in production

// Sidebar Navigation
const navLinks = document.querySelectorAll(".sidebar .menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLinks.forEach((lnk) => lnk.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// Load the sidebar dynamically
fetch('sidebar.html')
.then(response => response.text())
.then(data => {
  document.getElementById('sidebar').innerHTML = data;
})
.catch(error => console.error('Error loading sidebar:', error));



// functional clock
function updateClock() {
  const clockElement = document.getElementById("liveClock");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${amPm}`;

  clockElement.textContent = formattedTime;
}

// Update the clock every second
setInterval(updateClock, 1000);
// updateClock();



// Dashboard Greetings
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.querySelector(".dashboard .greeting");
  const currentHour = new Date().getHours();
  let message = "ss";

  if (currentHour < 12) {
    message = "Good Morning";
  } else if (currentHour < 18) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }

  greeting.innerText = `${message}, ${userName}!`;
});















// Menu Search
document.querySelector("#menuSearch").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll(".menu-card");

    items.forEach((item) => {
        const itemName = item.querySelector(".item-name").innerText.toLowerCase();
        const itemId = item.querySelector(".item-id").innerText.toLowerCase();
        if (itemName.includes(query) || itemId.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

// Edit Item Functionality
document.querySelectorAll(".menu-card").forEach((card) => {
    const editButton = card.querySelector(".edit-item");
    const saveButton = card.querySelector(".save-item");
    const itemName = card.querySelector(".item-name");
    const itemPrice = card.querySelector(".item-price");
    const editNameInput = card.querySelector(".edit-name");
    const editPriceInput = card.querySelector(".edit-price");

    // Enable edit mode
    editButton.addEventListener("click", () => {
        itemName.style.display = "none";
        itemPrice.parentNode.style.display = "none";
        editNameInput.style.display = "block";
        editPriceInput.style.display = "block";
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    });

    // Save changes and exit edit mode
    saveButton.addEventListener("click", () => {
        const newName = editNameInput.value.trim();
        const newPrice = parseFloat(editPriceInput.value.trim());

        if (newName && !isNaN(newPrice)) {
            itemName.innerText = newName;
            itemPrice.innerText = `$${newPrice.toFixed(2)}`;
        }

        itemName.style.display = "block";
        itemPrice.parentNode.style.display = "block";
        editNameInput.style.display = "none";
        editPriceInput.style.display = "none";
        editButton.style.display = "inline-block";
        saveButton.style.display = "none";
    });
});

// Add New Item Functionality
document.getElementById("addItem").addEventListener("click", () => {
    const menuItems = document.querySelector(".menu-items");

    // Create a new menu card with editable fields
    const newCard = document.createElement("div");
    newCard.classList.add("menu-card");

    // Add input fields and the Save button
    newCard.innerHTML = `
      <input type="text" class="item-name-input" placeholder="Enter Item Name" />
      <input type="number" class="item-price-input" placeholder="Enter Price" />
      <input type="text" class="item-id-input" placeholder="Enter Item Number" />
      <button class="save-item">Save</button>
    `;
    
    menuItems.appendChild(newCard);

    // Add event listener to save the item
    newCard.querySelector(".save-item").addEventListener("click", () => {
        const nameInput = newCard.querySelector(".item-name-input");
        const priceInput = newCard.querySelector(".item-price-input");
        const idInput = newCard.querySelector(".item-id-input");

        if (nameInput.value && priceInput.value && idInput.value) {
            // Update card with the entered values
            const itemName = nameInput.value;
            const itemPrice = parseFloat(priceInput.value).toFixed(2);
            const itemId = idInput.value;

            // Update card content directly
            newCard.innerHTML = `
              <span class="item-id">${itemId}</span>
              <h3 class="item-name">${itemName}</h3>
              <p>Price: <span class="item-price">$${itemPrice}</span></p>
              <button class="edit-item">Edit</button>
            `;

            // Re-attach the edit functionality
            attachEditFunctionality(newCard);
        } else {
            alert("Please fill out all fields before saving.");
        }
    });
});

// Attach Edit Functionality to Existing Cards
function attachEditFunctionality(card) {
    card.querySelector(".edit-item").addEventListener("click", () => {
        const name = card.querySelector(".item-name").innerText;
        const price = card.querySelector(".item-price").innerText.replace("Price: $", "");
        const id = card.querySelector(".item-id").innerText;

        // Replace fields with editable inputs
        card.innerHTML = `
            <input type="text" class="item-name-input" value="${name}" />
            <input type="number" class="item-price-input" value="${price}" />
            <input type="text" class="item-id-input" value="${id}" />
            <button class="save-item">Save</button>
        `;

        // Re-attach save functionality
        card.querySelector(".save-item").addEventListener("click", () => {
            const nameInput = card.querySelector(".item-name-input");
            const priceInput = card.querySelector(".item-price-input");
            const idInput = card.querySelector(".item-id-input");

            if (nameInput.value && priceInput.value && idInput.value) {
                // Update card with the entered values
                const updatedName = nameInput.value;
                const updatedPrice = parseFloat(priceInput.value).toFixed(2);
                const updatedId = idInput.value;

                card.innerHTML = `
                    <span class="item-id">${updatedId}</span>
                    <h3 class="item-name">${updatedName}</h3>
                    <p>Price: <span class="item-price">$${updatedPrice}</span></p>
                    <button class="edit-item">Edit</button>
                `;

                // Re-attach edit functionality
                attachEditFunctionality(card);
            } else {
                alert("Please fill out all fields before saving.");
            }
        });
    });
}


  




// try
document.addEventListener('DOMContentLoaded', () => {
  // Load menu items into the order page
  loadMenuItems();

  // Handle Add Item button click
  document.querySelectorAll('.add-item').forEach(button => {
      button.addEventListener('click', (e) => {
          const card = e.target.closest('.order-card');
          const itemSelect = card.querySelector('.item-select');
          const selectedItemId = itemSelect.value;

          if (selectedItemId) {
              const selectedItem = menuItems.find(item => item.id === parseInt(selectedItemId));
              const orderItemsContainer = card.querySelector('.order-items');
              const newItem = document.createElement('div');
              newItem.classList.add('ordered-item');
              newItem.innerHTML = `
                  <span>${selectedItem.name}</span> - ₹${selectedItem.price.toFixed(2)}
              `;
              orderItemsContainer.appendChild(newItem);

              // Update total price
              updateTotal(card);
          }
      });
  });

  // Handle Mark Paid button click
  document.querySelectorAll('.mark-paid').forEach(button => {
      button.addEventListener('click', (e) => {
          const card = e.target.closest('.order-card');
          card.querySelector('.mark-paid').textContent = 'Paid';
          card.querySelector('.mark-paid').disabled = true;
          updateTotal(card); // Optional: show the total when paid
      });
  });

  // Handle Delete Table button click
  document.querySelectorAll('.delete-table').forEach(button => {
      button.addEventListener('click', (e) => {
          const card = e.target.closest('.order-card');
          const confirmDelete = confirm("Are you sure you want to delete this table?");
          if (confirmDelete) {
              card.remove();
          }
      });
  });

  // Function to update the total price
  function updateTotal(card) {
      const orderItems = card.querySelectorAll('.ordered-item');
      let total = 0;

      orderItems.forEach(item => {
          const itemPrice = parseFloat(item.textContent.split('₹')[1]);
          total += itemPrice;
      });

      card.querySelector('p:nth-of-type(2)').textContent = `Total: ₹${total.toFixed(2)}`;
  }
});

// try




// // Orders Page
// document.addEventListener('DOMContentLoaded', () => {
//   const orderTables = document.getElementById('orderTables');
//   const addTableButton = document.getElementById('addTable');

//   // Function to add a new table
//   addTableButton.addEventListener('click', () => {
//       const tableNumber = orderTables.children.length + 1; // Dynamic table number
//       const newTable = document.createElement('div');
//       newTable.className = 'order-card';
//       newTable.innerHTML = `
//           <h3>Table ${tableNumber}</h3>
//           <p>Customer: [New Customer]</p>
//           <ul>
//               <li>Item - $0.00</li>
//           </ul>
//           <p>Total: $0.00</p>
//           <div class="table-actions">
//               <button class="edit-order">Edit Orders</button>
//               <button class="mark-paid">Mark Paid</button>
//               <button class="delete-table">Delete Table</button>
//           </div>
//       `;
//       orderTables.appendChild(newTable);
//       attachTableActions(newTable);
//   });

//   // Function to handle table actions
//   function attachTableActions(tableCard) {
//       const markPaidButton = tableCard.querySelector('.mark-paid');
//       const editOrderButton = tableCard.querySelector('.edit-order');
//       const deleteTableButton = tableCard.querySelector('.delete-table');

//       // Mark Paid functionality
//       markPaidButton.addEventListener('click', () => {
//           markPaidButton.textContent = 'Paid';
//           markPaidButton.disabled = true;
//           markPaidButton.style.backgroundColor = '#6c757d'; // Disabled color
//       });

//       // Edit Orders functionality
//       editOrderButton.addEventListener('click', () => {
//           const customerName = prompt('Enter Customer Name:', 'New Customer');
//           const items = prompt(
//               'Enter items (format: Item1 - $Price1, Item2 - $Price2):',
//               'Item - $0.00'
//           );
//           const total = prompt('Enter Total Amount:', '$0.00');

//           if (customerName) {
//               tableCard.querySelector('p').textContent = `Customer: ${customerName}`;
//           }
//           if (items) {
//               const itemList = tableCard.querySelector('ul');
//               itemList.innerHTML = ''; // Clear existing items
//               items.split(',').forEach(item => {
//                   const listItem = document.createElement('li');
//                   listItem.textContent = item.trim();
//                   itemList.appendChild(listItem);
//               });
//           }
//           if (total) {
//               tableCard.querySelector('p:nth-of-type(2)').textContent = `Total: ${total}`;
//           }
//       });

//       // Delete Table functionality
//       deleteTableButton.addEventListener('click', () => {
//           const confirmDelete = confirm('Are you sure you want to delete this table?');
//           if (confirmDelete) {
//               tableCard.remove();
//           }
//       });
//   }

//   // Attach actions to existing tables
//   document.querySelectorAll('.order-card').forEach(attachTableActions);
// });


// new






// Feedback Page - Submit
document.querySelector(".feedback form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.querySelector("[name='title']").value;
  const feedback = e.target.querySelector("[name='feedback']").value;

  console.log(`Feedback submitted: ${title} - ${feedback}`);
  alert("Your feedback has been submitted. Thank you!");
});
