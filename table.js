var get_data = [];
var total=[];
var budget_string;

//store data
function store_data(){
    sessionStorage.setItem("budget_data",budget_string);
}

//retrieve data from html
function retrieve_data(){
    var str1 = sessionStorage.getItem("budget_data");
    var input = JSON.parse(str1);
    for(var i=0;i<input.length;i++){
        add_row(input[i]);
    }
    add();
}

//when users hit add and clear buttons
function check(){
    var input = read();
    console.log(input);
    get_data.push(input);
    budget_string = JSON.stringify(get_data);
    store_data();
    console.log(budget_string);
    clear();
    
}
//read data
function read(){
    var val = {}
    val.client_name = document.getElementById("client_name").value;
    val.project_name = document.getElementById("project_name").value;
    val.budget = document.getElementById("budget").value;
    return val;

}

//add rows
function add_row(input){
    var table = document.getElementById("get_budget");
    var body = table.getElementsByTagName("tbody")[0];
    var row = body.insertRow(body.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML=input.client_name;
    var cell2 = row.insertCell(1);
    cell2.innerHTML=input.project_name;
    var cell3 = row.insertCell(2);
    cell3.innerHTML="$"+input.budget;
    total.push(input.budget);
}
//add budget to get total
function add(){
    var sum = 0;
    for (var i = 0; i<total.length;i++){
        sum+= Number(total[i]);
    }
    var table = document.getElementById("get_budget");
    var body = table.getElementsByTagName("tbody");
    var row = body.insertRow(body.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML="";
    var cell2 = row.insertCell(1);
    cell2.innerHTML="";
    var cell3 = row.insertCell(2);
    cell3.innerHTML="$"+sum;
}

//reset
function clear(){
    document.getElementById("client_name").value="";
    document.getElementById("project_name").value="";
    document.getElementById("budget").value="";
}














// function TableJSON(){

//     //extract values for HTML
//     var array = [];
//     for (var i = 0; i < getData.length; i++){
//         for (var key in getData[i]){
//             if(array.indexOf(key) === -1){
//                 array.push(key);
//             }
//         }
//     }

//     //create table
//     var table = document.createElement("table");

//     var row = table.insertRow(-1);
//     for(var i = 0; i < array.length; i++){
//         var header = document.createElement("header");
//         header.innerHTML = array[i];
//         row.appendChild(header);
//     }

//     for (var i=0; i<getData.length; i++){
//         row = table.insertRow(-1);
//         for (var j=0; i<getData.length;j++){
//             var cell = row.insertCell(-1);
//             cell.innerHTML = getData[i][array[j]];
//         }

//     }
// }

