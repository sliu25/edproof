let text = "";
let dic = {"StudentIDCredential":"Student ID Credential", "AcademicTranscriptCredential": "Graduation Diploma"};
let credential = JSON.parse(sessionStorage.getItem("selected_credential"));
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

function load_detail(){
  document.getElementById("user_name").textContent  = sessionStorage.getItem("user_email");
    for (let x in JSON.parse(credential.data)){
        let para = document.createElement("p");
        if (x=="dateOfIssuance"){
          para.innerHTML = "<b>" + "Graduation Date" + "</b>"+": " + JSON.parse(credential["data"])[x];
        }else{
          para.innerHTML = "<b>" + camel2title(x) + "</b>"+": " + JSON.parse(credential["data"])[x];
        }
        
        document.getElementById("cardbody").appendChild(para);
    }
    let para = document.createElement("p");
    para.innerHTML = "<b>" + "Issued Date" + "</b>"+": " + credential.issuedDate.substr(0,10)+" "+credential.issuedDate.substr(11,8);
    document.getElementById("cardbody").appendChild(para);
    document.getElementById("cardhead").innerHTML = dic[credential.credentialType];
    setTimeout(function(){
      document.getElementById("status").innerHTML = camel2title(credential.credentialSource);
      if (credential.credentialSource=='official'){
        document.getElementById("credential_source").classList.remove('btn-warning');
        document.getElementById("credential_source").classList.add('btn-success');
      }else{
        document.getElementById("credential_source").classList.add('btn-warning');
        document.getElementById("credential_source").classList.remove('btn-success');
      }
    }, 1000);
    
}