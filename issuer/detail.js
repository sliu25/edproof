let text = "";
let index = parseInt(sessionStorage.getItem("selectedRow"));
let credential = JSON.parse(sessionStorage.getItem("issuerCredentialTable"))[index];

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
function accept(){
    /*var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("issuer_access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "credentialId": credential.credentialId,
      "credentialType": credential.credentialType,
      "issuerId": sessionStorage.getItem("issuer_id")
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/issuer/issue-credential", requestOptions)
      .then(response => response.json())
      .then(result => console.log(JSON.stringify(result)))
      .catch(error => console.log('error', error));*/

    //the following will be deleted when the APIs are finalized
    let temp = JSON.parse(sessionStorage.getItem("issuerCredentialTable"));
    console.log(JSON.stringify(temp));
    temp.splice(index,1);
    sessionStorage.setItem("issuerCredentialTable",JSON.stringify(temp)); //why doesn't issuer need seed
    console.log(sessionStorage.getItem("issuerCredentialTable"));
    let newtemp = JSON.parse(sessionStorage.getItem("issuedCredentialTable"));
    let today = new Date();
    let todaydate = today.toISOString().substring(0,10);
    let newcred = {
        "credentialId":credential.credentialId,
        "credentialSource":"Issued",
        "issuerOrganization":"The Lawrenceville School",
        "credentialStatus":"Valid",
        "credentialType": credential.credentialType,
        "issuedDate": todaydate,
        "createdAt": credential.createdAt,
        "updatedAt":todaydate,
        "data":credential.data,
    }
    newtemp.push(newcred);
    console.log(JSON.stringify(newtemp));
    sessionStorage.setItem("issuedCredentialTable",JSON.stringify(newtemp));
    let newtemp2 = JSON.parse(sessionStorage.getItem("all_credential"));
    newtemp2[newcred.credentialType].push(newcred);
    sessionStorage.setItem("all_credential",JSON.stringify(newtemp2));
    document.getElementById("successtext").style.display = "block";
    document.getElementById("acceptbox").style.display = "none";
    document.getElementById("rejectbox").style.display = "none";
}
function reject(){
    /*var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("issuer_access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "credentialId": credential.credentialId,
      "credentialType": credential.credentialType,
      "issuerId": sessionStorage.getItem("issuer_id")
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/issuer/reject-credential", requestOptions)
      .then(response => response.json())
      .then(result => console.log(JSON.stringify(result)))
      .catch(error => console.log('error', error));*/
      let temp = JSON.parse(sessionStorage.getItem("issuerCredentialTable"));
      temp.splice(index,1);
      sessionStorage.setItem("issuerCredentialTable",JSON.stringify(temp));
      document.getElementById("rejecttext").style.display = "block";
      document.getElementById("acceptbox").style.display = "none";
      document.getElementById("rejectbox").style.display = "none";
}