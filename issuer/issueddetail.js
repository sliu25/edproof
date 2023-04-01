let text = "";
let index = parseInt(sessionStorage.getItem("selectedIssuedRow"));
let credential = JSON.parse(sessionStorage.getItem("issued_credential"))[index];
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
function load_detail(){
    for (let x in JSON.parse(credential.data)){
        if (x!="Institution"){
            let para = document.createElement("p");
            para.innerHTML = "<b>"+camel2title(x)+"</b>" + ": " + camel2title(JSON.parse(credential.data)[x]);
            document.getElementById("cardbody").appendChild(para);
        }
    }
    document.getElementById("cardhead").innerHTML = dic[credential.credentialType];
    document.getElementById("status").innerHTML = credential.credentialSource;
}