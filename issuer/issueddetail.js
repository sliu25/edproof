let text = "";
let index = parseInt(sessionStorage.getItem("selectedIssuedRow"));
let credential = JSON.parse(sessionStorage.getItem("issuedCredentialTable"))[index];

function load_detail(){
    for (let x in credential.data){
        if (x!="Institution"){
            let para = document.createElement("p");
            para.innerHTML = "<b>"+x+"</b>" + ": " + credential["data"][x];
            document.getElementById("cardbody").appendChild(para);
        }
    }
    document.getElementById("cardhead").innerHTML = credential.credentialType;
    document.getElementById("status").innerHTML = credential.credentialSource;
}