//dashboard items
var items = 0;
let products = 0;
let groups = 0;
let stocks = 0;

//this will set the dashboard counts to 0 for the first time
document.getElementById("all-items").children[0].innerHTML = items;
document.getElementById("all-products").children[0].innerHTML = products;
document.getElementById("all-groups").children[0].innerHTML = groups;
document.getElementById("total-stocks").children[0].innerHTML = stocks;

function saveData(){
    localStorage.setItem("listData", document.getElementById("list").innerHTML);
}
function retrieveData(){
    document.getElementById("list").innerHTML = localStorage.getItem("listData");
}
function clearBrowserData(){
    window.localStorage.clear();
}

function updateDashboard(){
    //this will update the dashboard count every time a new item is added
    document.getElementById("all-items").children[0].innerHTML = items;
    document.getElementById("all-products").children[0].innerHTML = products;
    document.getElementById("all-groups").children[0].innerHTML = groups;
    document.getElementById("total-stocks").children[0].innerHTML = stocks;
}

//assign variables to get the value of input boxes
var i = 1;
var itemName = document.getElementById("item-name");
var itemQty = document.getElementById("item-quantity");
var basePrice = document.getElementById("base-price");
var wholesalePrice = document.getElementById("wholesale-price");
var retailPrice = document.getElementById("retail-price");

function searchItem(){
    var searchInput = document.getElementById("search-input");
    var filter = searchInput.value.toUpperCase();   //Converting the inputed value on textbox to uppercase
    let list = document.getElementById("list").children;    //access all the "tr" elements 

    for(let i = 0; i < list.length; i++){   //loop to all "tr" elements
        searchNameOfItem = list[i].getElementsByTagName("td")[1]; // access the index 1(item-name) of "td" on the "tr" elements and store it to a new variable
        if(searchNameOfItem.innerHTML.toUpperCase().indexOf(filter) > -1){ //converts the innerhtml of td[1] to uppercase and begin search using indexOf method passing "filter" and starts to index 0
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }
}

function getItemValue() {
    //add item to the list
    if(itemName.value == "" || itemQty.value == "" || basePrice.value == "" || wholesalePrice.value == "" || retailPrice.value == ""){
        alert("Please fill all fields");
    } else {
        let a = document.createElement('tr');
        a.innerHTML = ` <td>${i}</td>
                        <td>${itemName.value}</td>
                        <td>${itemQty.value}</td>
                        <td>${basePrice.value}</td>
                        <td>${wholesalePrice.value}</td>
                        <td>${retailPrice.value}</td>
                        <td><div class="list-button-container">
                            <button id="edit-item-button" class="edit-button">Edit</button>
                            <button id="delete-item-button" class="delete-button">Delete</button>
                        </div></td>`

        document.getElementById("list").appendChild(a);

        i += 1; //every time a new item is added, item # is incremented 
        items = items + 1; //every time a new item is added, this will add to the dashboard count
        products = products + 1; //every time a new item is added, this will add to the dashboard count
        stocks = stocks + Number(itemQty.value); //every time a new item is added, this will add to the dashboard count
    }
}

function clearInput(){
    //will reset the input box after executing add item
    itemName.value = "";
    itemQty.value = "";
    basePrice.value = "";
    wholesalePrice.value = "";
    retailPrice.value = "";
}

function editButton(event){
    if(event.target.className === "edit-button"){
        //showing modal and replacing text from add to update
        document.getElementById("modal-overlay").style.display = "block";
        document.getElementById("modal-container").children[0].innerHTML = "Update Item";
        //displaying the update button
        document.getElementById("modal-container").children[8].style.display = "block";
        //displaying off the add item button
        document.getElementById("modal-container").children[9].style.display = "none";
        
        //pulling datas from list and showing it to input boxes of modal
        itemName.value = event.target.parentElement.parentElement.parentElement.children[1].innerHTML;
        itemQty.value = event.target.parentElement.parentElement.parentElement.children[2].innerHTML;
        basePrice.value = event.target.parentElement.parentElement.parentElement.children[3].innerHTML;
        wholesalePrice.value = event.target.parentElement.parentElement.parentElement.children[4].innerHTML;
        retailPrice.value = event.target.parentElement.parentElement.parentElement.children[5].innerHTML;

        // when edit button is clicked, subtract the current value of item quantity to stocks
        // hold the value to a new variable until updateBtn is clicked
        let holdQtyValue = stocks - Number(itemQty.value);

        const updateBtn = document.getElementById("update-button").addEventListener("click", (e) => {

            //first, removes the previous value of itemQty
            stocks = holdQtyValue;

            //next, inputed value will be the new value of the selected item 
            event.target.parentElement.parentElement.parentElement.children[1].innerHTML = itemName.value;
            event.target.parentElement.parentElement.parentElement.children[2].innerHTML = itemQty.value;
            event.target.parentElement.parentElement.parentElement.children[3].innerHTML = basePrice.value;
            event.target.parentElement.parentElement.parentElement.children[4].innerHTML = wholesalePrice.value;
            event.target.parentElement.parentElement.parentElement.children[5].innerHTML = retailPrice.value;
            document.getElementById("modal-overlay").style.display = "none";

            //lastly, store the new value of item quantity to a new variable and parse it to a Number type 
            let newItemQty = event.target.parentElement.parentElement.parentElement.children[2].innerHTML;
            //add the new value to the stocks
            stocks = stocks + Number(newItemQty);
            updateDashboard();
        });
    }
}
//delete item
function deleteButton(event){
    if(event.target.className === "delete-button"){
        event.target.parentElement.parentElement.parentElement.remove();
        i -= 1; //every time an item is deleted, item # is decremented 
        items = items - 1; //every time an item is deleted, this will subtract 1 to the dashboard count
        products = products - 1; //every time an item is deleted, this will subtract 1 to the dashboard count

        //get the value from the innerhtml of the target and parsing it to number in order to subtract it to stocks count
        itemQty.value = event.target.parentElement.parentElement.parentElement.children[2].innerHTML;
        stocks = stocks - Number(itemQty.value); 
        //then update it to dashboard
        updateDashboard();
    }
}
function addNewGroup(){
    var groupNameInput = document.getElementById("group-name");

    if (groupNameInput == ""){
        alert("Please fill name field");
    } else {
        let b = document.createElement("button");
        b.innerHTML = `${groupNameInput.value}`;
        b.classList = "group-buttons";
        document.getElementById("groups-container").appendChild(b);
    }
}

//hide unhide add new item modal
const addBtn = document.getElementById("add-item-button").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("modal-container").children[0].innerHTML = "Add New Item";
    //displaying off the update button
    document.getElementById("modal-container").children[8].style.display = "none";
     //displaying the add item button
    document.getElementById("modal-container").children[9].style.display = "block";
    clearInput();

    document.getElementById("modal-container").addEventListener("click", (e) => {
        if (e.target.className === "cancel-button"){
            document.getElementById("modal-overlay").style.display = "none";
        }
    });
});

//add item button
const addItem = document.getElementById("add-button").addEventListener("click", (e) => {
    getItemValue();
    updateDashboard();
    clearInput();
    saveData();
});

//edit/delete item button selector
const tableButtons = document.getElementById("list").addEventListener("click", (e) => {
    e.preventDefault();
    editButton(e);
    deleteButton(e);
    saveData();
});

//search item input box
const search = document.getElementById("search-input").addEventListener("keyup", (e) => {
    searchItem();
});
//show/hide group modal
const showGroupModal = document.getElementById("add-new-group").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("group-modal-overlay").style.display = "block";

    document.getElementById("group-modal-container").addEventListener("click", (e) => {
        if (e.target.className === "cancel-button"){
            document.getElementById("group-modal-overlay").style.display = "none";
        }
    })
});

//append new group when clicked
const addGroupBtn = document.getElementById("add-group-button").addEventListener("click", (e) => {
    addNewGroup()
    groupNameInput.value = "";
});

//retrieve local storage
retrieveData();
//clearBrowserData();
