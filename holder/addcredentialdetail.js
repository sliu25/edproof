/*let credentialschema = {
    "Student ID Credential":["First Name","Last Name","Institution","Expiration Date","Student Id"],
    "Graduation Credential" : ["First Name","Last Name","Institution","House Affiliation","Date Of Issuance"]
}*/
let dic = {"StudentIDCredential":"Student ID Credential", "GraduationDiploma":"Graduation Diploma"}
let selected_schema = JSON.parse(sessionStorage.getItem("selected_credential_schema"));
let schemaname = sessionStorage.getItem("selected_credential_schema_name");
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
function camelCase(str) {
  return str
      .replace(/\s(.)/g, function(a) {
          return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function(b) {
          return b.toLowerCase();
      });
}
function getallcredential(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://backend.stacked.itdg.io/api/holder/get-all-credential/"+sessionStorage.getItem("user_id"), requestOptions)
    .then(response => response.json())
    .then(result => {
      sessionStorage.setItem("all_credential",JSON.stringify(result));
      window.location.assign("credential.html");
    })
    .catch(error => console.log('error', error));
}
function create_fields(){
  document.getElementById("user_name").textContent  = sessionStorage.getItem("user_email");
    document.getElementById("cardhead").innerHTML = dic[schemaname];
    document.getElementById("cardsubtitle").innerHTML = "Please fill in the attributes for generating your "+ ((schemaname=="StudentIDCredential")?"student id credential":"graduation diploma")+'.';
    for (let x of selected_schema){
      console.log(x);
      const box = document.getElementById("inputfield");
      const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
      clone.setAttribute("id", x + 1);
      clone.querySelector("#labelfield").setAttribute("id", x + 2);
      //if (x.includes("Date")) clone.innerHTML =  '<input type="date" class="form-control" id="dateinput" name="dateinput" >';
      document.getElementById("addcredentialcard").appendChild(clone);
      //if (x.includes("Date")||x.includes("Year")) document.getElementById(x + 2).setAttribute("type", "date");
      if (!x.includes("Date")) document.getElementById(x + 2).placeholder = x;
      else document.getElementById(x + 2).placeholder = x+" (YYYY-MM-DD)";
      if (x=='Institution'){
        document.getElementById(x + 2).value = "The Lawrenceville School";
        document.getElementById(x + 1).style.display = "none";
      }
    }
    const box = document.getElementById("inputfield");
    const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
    clone.setAttribute("id", "Seed" + 1);
    clone.querySelector("#labelfield").setAttribute("id", "Seed" + 2);
    document.getElementById("addcredentialcard").appendChild(clone);
    document.getElementById("Seed" + 2).setAttribute("type","password");
    document.getElementById("Seed" + 2).placeholder = "Seed";
}
function create_credential(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    var credentialdata = {}
    for (x of selected_schema){
        if (x=="House Affiliation") continue;
        if (x=="Graduation Date"){
           credentialdata["dateOfIssuance"] = document.getElementById("Graduation Date" + 2).value;
           continue;
        }
        credentialdata[camelCase(x)] = document.getElementById(x + 2).value;
    }
    var raw = JSON.stringify({
      "holderId": sessionStorage.getItem("user_id"),
      "email": sessionStorage.getItem("user_email"),
      "secret": document.getElementById("Seed2").value,
      "credentialType": (schemaname.split(" ").join("")=="GraduationDiploma")?"AcademicTranscriptCredential":schemaname.split(" ").join(""), //may need to update string format
      "issuerName": "THEi",
      "credentialData": JSON.stringify(credentialdata), //might need to change format as well
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://backend.stacked.itdg.io/api/holder/create-credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        if (result.status==true){
          getallcredential();
        }
      })
      .catch(error => console.log('error', error));

    /*credentialdata.Email = sessionStorage.getItem("user_email");
    let today = new Date();
    let todaydate = today.toISOString().substring(0,10);
    let credentialall = JSON.parse(sessionStorage.getItem("all_credential"));
    let credentialsample = {
       "credentialId":"9cde5fd8-13cf-4922-886a-2622301bee83",
        "credentialSource": "Self-Certified",
        "issuerOrganization": "The Lawrenceville School",
        "credentialStatus":"Valid",
        "credentialType": schemaname,
        "issuedDate" : todaydate,
        "createdAt" : todaydate,
        "updatedAt": todaydate,
        "data": credentialdata,
    }
    credentialall[schemaname].push(credentialsample);
    sessionStorage.setItem("all_credential",JSON.stringify(credentialall));
    credentialall = JSON.parse(sessionStorage.getItem("issuerCredentialTable"));
    credentialall.push(credentialsample);
    sessionStorage.setItem("issuerCredentialTable", JSON.stringify(credentialall));
    console.log(sessionStorage.getItem("issuerCredentialTable"));*/
}
