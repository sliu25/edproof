let text = "";
let index = parseInt(sessionStorage.getItem("selectedRow"));
let credential = JSON.parse(sessionStorage.getItem("requested_credential"))[index];
let dic = {"AcademicTranscriptCredential":"Graduation Diploma", "StudentIDCredential":"Student ID Credential"};
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
            if (x=="dateOfIssuance") para.innerHTML = "<b>"+"Graduation Date"+"</b>" + ": " + camel2title(JSON.parse(credential.data)[x]);
            else para.innerHTML = "<b>"+camel2title(x)+"</b>" + ": " + camel2title(JSON.parse(credential.data)[x]);
            document.getElementById("cardbody").appendChild(para);
        }
    }
    let para = document.createElement("p");
    para.innerHTML = "<b>"+"Issued Date"+"</b>" + ": " + credential.issuedDate.substr(0,10)+" "+credential.issuedDate.substr(11,8);
    if (credential.credentialSource=='official'){
      document.getElementById("credential_source").classList.remove('btn-warning');
      document.getElementById("credential_source").classList.add('btn-success');
    }else{
      document.getElementById("credential_source").classList.add('btn-warning');
      document.getElementById("credential_source").classList.remove('btn-success');
    }
    document.getElementById("cardbody").appendChild(para);
    document.getElementById("cardhead").innerHTML = dic[credential.credentialType];
    document.getElementById("status").innerHTML = camel2title(credential.credentialSource);
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
}
function reject(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("issuer_access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "credentialId":  credential.id,
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
        console.log(JSON.stringify(result))
        getRequestCredential();
      })
      .catch(error => console.log('error', error));
      /*let temp = JSON.parse(sessionStorage.getItem("issuerCredentialTable"));
      temp.splice(index,1);
      sessionStorage.setItem("issuerCredentialTable",JSON.stringify(temp));
      document.getElementById("rejecttext").style.display = "block";
      document.getElementById("acceptbox").style.display = "none";
      document.getElementById("rejectbox").style.display = "none";*/
}