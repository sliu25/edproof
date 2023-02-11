let text = "";
let credential = JSON.parse(sessionStorage.getItem("selected_credential"));
function load_detail(){
    for (let x in credential.data){
        let para = document.createElement("p");
        para.innerHTML = "<b>" + x + "</b>"+": " + credential["data"][x];
        document.getElementById("cardbody").appendChild(para);
    }
    document.getElementById("cardhead").innerHTML = credential.credentialType;
    document.getElementById("status").innerHTML = credential.credentialSource;
}