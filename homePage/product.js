let productDetails = document.getElementById("productDetails")
let mostPopular = document.getElementById("mostPopular")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
var selectedRow = null

function onclickProductItems() {
    let localStoragegetItems = localStorage.getItem("addProducts");
    let parseItems = JSON.parse(localStoragegetItems);
    if (parseItems === null) {
        return [];
    } else {
        return parseItems;
    }
}

let addProductList = onclickProductItems();


function productSave() {
    localStorage.setItem("addProducts", JSON.stringify(addProductList));
    swal("Saved!", "You clicked the Saved!", "success");
}


let addProductCount = addProductList.length;

function onFormSubmit() {

    let productInputJs = document.getElementById("productName");
    let productInputType = document.getElementById("typeText");
    let productInputInventory = document.getElementById("inventoryText");
    let productInputPrice = document.getElementById("priceText");

    let inputValue = productInputJs.value;
    let typeValue = productInputType.value;
    let inventoryValue = productInputInventory.value;
    let priceValue = productInputPrice.value;

    addProductCount = addProductCount + 1;
                       
    let newProduct = {
        product:  inputValue,
        type: typeValue,
        inventory: inventoryValue,
        price: priceValue,
        productNo:addProductCount
    };
    console.log(newProduct)
                  
    addProductList.push(newProduct);
    if (validate()) {
        swal("Done!", "You clicked the button!", "success");
        if (selectedRow == null)
            insertNewRecord(newProduct);
        else
            updateRecord(newProduct);
        
        resetForm();
    }
    
}


for (let data of addProductList) {
    insertNewRecord(data)
}


for (let dataform of addProductList){
    updateRecord(dataform)
}




function insertNewRecord(data) {
    
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<span class="custom-checkbox">
                            <input type="checkbox" id="checkbox1" name="options[]" value="1">
                            <label for="checkbox1"></label>
                        </span>`;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.product;
    cell2.classList.add("product-list")
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.type;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.inventory;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.price;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a href="#addEmployeeModal" class="fas fa-edit icon-list" data-toggle="modal" onClick="onEdit(this)"></a>
                       <a class="far fa-trash-alt icon-list" onClick="onDelete(this)"></a>`;
                       
    
    
    
}

function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("typeText").value = "";
    document.getElementById("inventoryText").value = "";
    document.getElementById("priceText").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("typeText").value = selectedRow.cells[2].innerHTML;
    document.getElementById("inventoryText").value = selectedRow.cells[3].innerHTML;
    document.getElementById("priceText").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.type;
    selectedRow.cells[3].innerHTML = formData.inventory;
    selectedRow.cells[4].innerHTML = formData.price;
    productSave();
    swal("Updated!", "You clicked the updated!", "success");

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        addProductList.splice(row.rowIndex);
        productSave();
        swal("Deleted!", "You clicked the delete!", "success");
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("productName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function searchFun(){
    let filter = document.getElementById("inputSearch").value.toUpperCase();
    let myTable = document.getElementById("myTable")
    let tr = myTable.getElementsByTagName('tr')
    for(var i=0;i<tr.length;i++){
        let td= tr[i].getElementsByTagName('td')[1]
        if(td){
            let textvalue = td.textContent || td.innerHTML;
            if(textvalue.toLocaleUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

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