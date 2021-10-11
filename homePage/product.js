let homepage = document.getElementById("home")
let productContainer = document.getElementById("product_contaier")
let productDetails = document.getElementById("productDetails")
let mostPopular = document.getElementById("mostPopular")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
let unorderlist = document.getElementById("productItemsContainer")
let iconsIdjs = document.getElementById("iconsId")
let productAdd = document.getElementById("productAdd")


function onClickProduct() {

    let productInputJs = document.getElementById("inputCreate");
    let productInputType = document.getElementById("inputCreate2");
    let productInputInventory = document.getElementById("inputCreate3");
    let productInputPrice = document.getElementById("inputCreate4");

    let inputValue = productInputJs.value;
    let typeValue = productInputType.value;
    let inventoryValue = productInputInventory.value;
    let priceValue = productInputPrice.value;

    if (inputValue === "" || typeValue === "" || inventoryValue === "" || priceValue === "") {
        alert("Enter Valid Text");
        return;
    }


    productCount = productCount + 1;

    let newProduct = {
        text: inputValue,
        type: typeValue,
        inventory: inventoryValue,
        price: priceValue,
        uniqueNo: productCount
    };

    productList.push(newProduct);
    onclickInputFunciont(newProduct);

    productInputJs.value = "";
    productInputType.value = "";
    productInputInventory.value = "";
    productInputPrice.value = "";
}

productAdd.onclick = function() {
    onClickProduct();
};

function onclickAllproducts() {
    mostPopular.classList.remove("icons1")
    btn1.classList.remove("button-class2")
    btn1.classList.add("button-class1")
    btn2.classList.remove("button-class1")
    btn2.classList.add("button-class2")
    productDetails.classList.add("product-list3")
}

function onclickMostpopular() {
    mostPopular.classList.add("icons1")
    btn2.classList.remove("button-class2")
    btn2.classList.add("button-class1")
    btn1.classList.remove("button-class1")
    btn1.classList.add("button-class2")
    productDetails.classList.add("product-class2")
}

function onclickProductItems() {
    let localStoragegetItems = localStorage.getItem("productLists");
    let parseItems = JSON.parse(localStoragegetItems);
    if (parseItems === null) {
        return [];
    } else {
        return parseItems;
    }
}

let productList = onclickProductItems();

function onClickProductSave() {
    localStorage.setItem("productLists", JSON.stringify(productList));
}

let productCount = productList.length;

function inputCheckBoxOnClick(checkIdJs, labelIdJs) {
    let checkinputJs = document.getElementById(checkIdJs);
    let labelOnJs = document.getElementById(labelIdJs);
    labelOnJs.classList.toggle('checked');
}

function deleteIconId(productId) {
    let productDoc = document.getElementById(productId);
    unorderlist.removeChild(productDoc);
    let deleteItems = productList.findIndex(function(eachTodo) {
        let productUnique = "productId" + eachTodo.uniqueNo;
        if (eachTodo === productId) {
            return true;
        } else {
            return false;
        }

    });
    productList.splice(deleteItems, 1);


}

function onclickInputFunciont(checkBoxResult) {
    let productId = 'checkBoxResult' + checkBoxResult.uniqueNo;
    let checkIdJs = 'checkbox' + checkBoxResult.uniqueNo;
    let labelIdJs = 'label' + checkBoxResult.uniqueNo;



    let createLiElement = document.createElement("li");
    createLiElement.classList.add("product-item-container", "d-flex", "flex-row");
    createLiElement.id = productId;
    unorderlist.appendChild(createLiElement);

    let inputCheckBoxElement = document.createElement("input");
    inputCheckBoxElement.type = "checkbox";
    inputCheckBoxElement.id = checkIdJs;
    inputCheckBoxElement.onclick = function() {
        inputCheckBoxOnClick(checkIdJs, labelIdJs);
    }
    inputCheckBoxElement.classList.add("checkbox-input");
    createLiElement.appendChild(inputCheckBoxElement);

    let inputCheckBoxContainerTextElement = document.createElement("div");
    inputCheckBoxContainerTextElement.classList.add("label-container", "d-flex", "flex-row");
    createLiElement.appendChild(inputCheckBoxContainerTextElement);


    let labelContainerElement = document.createElement("label");
    labelContainerElement.id = labelIdJs;
    labelContainerElement.setAttribute("for", checkIdJs);
    labelContainerElement.classList.add("checkbox-label");
    labelContainerElement.textContent = checkBoxResult.text;
    inputCheckBoxContainerTextElement.appendChild(labelContainerElement);



    let pragraphCreate = document.createElement("p");
    pragraphCreate.classList.add("paragraph-heading")
    pragraphCreate.textContent = checkBoxResult.type;
    inputCheckBoxContainerTextElement.appendChild(pragraphCreate)

    let pragraphCreateInd = document.createElement("p");
    pragraphCreateInd.classList.add("paragraph-heading2");
    pragraphCreateInd.textContent = checkBoxResult.inventory;
    inputCheckBoxContainerTextElement.appendChild(pragraphCreateInd)

    let pragraphCreatePrice = document.createElement("p");
    pragraphCreatePrice.classList.add("paragraph-heading3");
    pragraphCreatePrice.textContent = "$" + checkBoxResult.price;
    inputCheckBoxContainerTextElement.appendChild(pragraphCreatePrice)

    let edit = document.createElement("button");
    edit.onclick = "editButton()"
    edit.classList.add("bi", "bi-pencil-square", "editbutton");
    inputCheckBoxContainerTextElement.appendChild(edit)


    let deleteContainerElement = document.createElement("div");
    deleteContainerElement.classList.add("delete-icon-container");
    inputCheckBoxContainerTextElement.appendChild(deleteContainerElement);


    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainerElement.appendChild(deleteIconElement);
    deleteIconElement.onclick = function() {
        deleteIconId(productId);
    }

}

for (let checkBoxResult of productList) {
    onclickInputFunciont(checkBoxResult);
}