let credentialtemplate = {
  "StudentIDCredential": 
    {
        "First Name": "Example First Name",
        "Last Name": "Example Last Name",
        "Institution": "Example School",
        "Expiration Date": "YYYY-MM-DD",
        "Student Id": "XXXXXX",
    },
  "AcademicTranscriptCredential":
    {
        "First Name": "Example First Name",
        "Last Name": "Example Last Name",
        "Institution": "Example School",
        "Student Id":"XXXXXX",
        "Graduation Date": "YYYY-MM-DD"
    },
};
let text = "";
let dic = {
  "StudentIDCredential": "Student ID Credential",
  "AcademicTranscriptCredential": "Graduation Diploma",
};
let credential = credentialtemplate[sessionStorage.getItem("verifier_selected_credential_schema_name")];
function camel2title(camelCase) {
  // no side-effects
  return (
    camelCase
      // inject space before the upper case letters
      .replace(/([A-Z])/g, function (match) {
        return " " + match;
      })
      // replace first char with upper case
      .replace(/^./, function (match) {
        return match.toUpperCase();
      })
  );
}

function load_detail() {
  document.getElementById("user_name").textContent  = "University";
  for (let x in credential) {
    let para = document.createElement("p");
    para.innerHTML =  "<b>" +  x +  "</b>" +  ": " +  credential[x];
    document.getElementById("cardbody").appendChild(para);
  }
  document.getElementById("cardhead").innerHTML =    dic[sessionStorage.getItem("verifier_selected_credential_schema_name")];
}
function generate_codelink(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("verifier_access_token"));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/verifier/generate-code-link/"+sessionStorage.getItem("verifier_id"), requestOptions)
      .then(response => response.json())
      .then(result => {
        document.getElementById("create_request").classList.add("disabled");
        sessionStorage.setItem("codelink",JSON.stringify(result));
        document.getElementById("code_link").innerHTML = "http://127.0.0.1:5500/holder/sharecredential.html?code="+result.uniqueCode;
        document.getElementById("second_card").style.display = "block";
        document.getElementById("btn_create_request").classList.remove("btn-primary");
        document.getElementById("btn_create_request").classList.add("btn-secondary");
        console.log(result)
      })
      .catch(error => console.log('error', error));
}
function activate_codelink(){
    
    //document.getElementById("activate_link").classList.add("disabled");
    document.getElementById("btn_activate_link").classList.remove("btn-primary");
        document.getElementById("btn_activate_link").classList.add("btn-secondary");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("verifier_access_token"));
    myHeaders.append("Content-Type", "application/json");
    var codelink = JSON.parse(sessionStorage.getItem("codelink"))
    console.log(sessionStorage.getItem("codelink"));
    var raw = JSON.stringify({
      "uniqueCode": String(codelink.uniqueCode),
      "secureLink": codelink.secureLink,
      "holderEmail": document.getElementById("holder_email").value,
      "verifierId": sessionStorage.getItem("verifier_id"),
      "credentialType": sessionStorage.getItem("verifier_selected_credential_schema_name"),
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/verifier/send-request", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}