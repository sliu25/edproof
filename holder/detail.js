let text = "";
let dic = {"StudentIDCredential":"Student ID Credential", "AcademicTranscriptCredential": "Graduation Credential"};
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
        para.innerHTML = "<b>" + camel2title(x) + "</b>"+": " + JSON.parse(credential["data"])[x];
        document.getElementById("cardbody").appendChild(para);
    }
    document.getElementById("cardhead").innerHTML = dic[credential.credentialType];
    document.getElementById("status").innerHTML = credential.credentialSource;
    if (document.getElementById("status").innerHTML =="self"){
      document.getElementById("flag").style.color = "yellow";
    }
}