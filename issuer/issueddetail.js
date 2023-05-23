let text = "";
let index = parseInt(sessionStorage.getItem("selectedIssuedRow"));
let credential = JSON.parse(sessionStorage.getItem("issued_credential"))[index];
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
    if (document.getElementById("status").innerHTML =="self"){
        document.getElementById("flag").style.color = "yellow";
      }
}