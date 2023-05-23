let text = "";
let index = parseInt(sessionStorage.getItem("selectedRow"));
let credential = JSON.parse(sessionStorage.getItem("requested_credential"))[index];
let dic = {"AcademicTranscriptCredential":"Academic Transcript Credential", "StudentIDCredential":"Student ID Credential"};
function camel2title(camelCase) {
  // no side-effects
  return camelCase
    // inject space before the upper case letters
    .replace(/([A-Z])/g, function(match) {
       return " " + match;
    })
    // replace first char with upper case
    .replace(/^./, function(match) {
      return match.toUpperCase();
    });
}
function getIssuedCredential(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("issuer_access_token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://backend.stacked.itdg.io/api/issuer/get-all-issued-credential/"+sessionStorage.getItem("issuer_id"), requestOptions)
    .then(response => response.json())
    .then(result => {
        let table=[]; 
        for (let j of ["AcademicTranscriptCredential","StudentIDCredential"]){
          if (JSON.stringify(result[j])!='[]'){
              for (let x of result[j]){
                  if (JSON.parse(x.data).institution!="The Lawrenceville School") continue;
                  table.push(x);
              }
          }
        } 
        sessionStorage.setItem("issued_credential",JSON.stringify(table)); 
        window.location.assign("dashboard.html");
      }
    )
    .catch(error => console.log('error', error));
}
function getRequestCredential(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("issuer_access_token"));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://backend.stacked.itdg.io/api/issuer/get-all-requested-credential/"+sessionStorage.getItem("issuer_id"), requestOptions)
    .then(response => response.json())
    .then(result => {
      let table=[]; 
      for (let j of ["AcademicTranscriptCredential","StudentIDCredential"]){
        if (JSON.stringify(result[j])!='[]'){
            for (let x of result[j]){
              if (JSON.parse(x.data).institution!="The Lawrenceville School") continue;
                table.push(x);
            }
        }
      } 
      sessionStorage.setItem("requested_credential",JSON.stringify(table)); 
      getIssuedCredential();
    })
    .catch(error => console.log('error', error));
}

function load_detail(){
  
  document.getElementById("user_name").textContent  = "The Lawrenceville School";
    for (let x in JSON.parse(credential.data)){
        if (x!="Institution"){
            let para = document.createElement("p");
            para.innerHTML = "<b>"+camel2title(x)+"</b>" + ": " + camel2title(JSON.parse(credential.data)[x]);
            document.getElementById("cardbody").appendChild(para);
        }
    }
    document.getElementById("cardhead").innerHTML = dic[credential.credentialType];
    document.getElementById("status").innerHTML = credential.credentialSource;
    if (document.getElementById("status").innerHTML =="self"){
      document.getElementById("flag").style.color = "yellow";
    }
}
function accept(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("issuer_access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "credentialType": credential.credentialType,
      "issuerId": sessionStorage.getItem("issuer_id"),
      "credentialId": credential.id,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(JSON.stringify(credential));
    console.log(raw);
    fetch("https://backend.stacked.itdg.io/api/issuer/issue-credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        getRequestCredential();       
      })
      .catch(error => console.log('error', error));
/*
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
    document.getElementById("rejectbox").style.display = "none";*/
}
function reject(){
    var myHeaders = new Headers();
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
      .then(result => {
        getRequestCredential();
        console.log(JSON.stringify(result))
      })
      .catch(error => console.log('error', error));
      /*let temp = JSON.parse(sessionStorage.getItem("issuerCredentialTable"));
      temp.splice(index,1);
      sessionStorage.setItem("issuerCredentialTable",JSON.stringify(temp));
      document.getElementById("rejecttext").style.display = "block";
      document.getElementById("acceptbox").style.display = "none";
      document.getElementById("rejectbox").style.display = "none";*/
}