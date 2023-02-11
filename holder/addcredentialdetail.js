let credentialschema = {
    "Student ID Credential":["First Name","Last Name","Institution","Expiration Date","Student ID"],
    "Graduation Credential" : ["First Name","Last Name","Institution","House Affiliation","Graduation Year"]
}
let selected_schema = JSON.parse(sessionStorage.getItem("selected_credential_schema"));
let schemaname = sessionStorage.getItem("selected_credential_schema_name");
function create_fields(){
    document.getElementById("cardhead").innerHTML = schemaname;
    document.getElementById("cardsubtitle").innerHTML = "Please fill in the attributes for generating your "+schemaname.toLowerCase()+'.';
    for (let x of selected_schema){
        const box = document.getElementById("inputfield");
        const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.setAttribute("id", x + 1);
        clone.querySelector("#labelfield").setAttribute("id", x + 2);
        document.getElementById("addcredentialcard").appendChild(clone);
        document.getElementById(x + 2).placeholder = x;
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
        credentialdata[x] = document.getElementById(x + 2).value;
    }
    var raw = JSON.stringify({
      "holderId": sessionStorage.getItem("user_id"),
      "email": sessionStorage.getItem("user_email"),
      "secret": document.getElementById("Seed2"),
      "credentialType": schemaname.split(" ").join(""), //may need to update string format
      "issuerName": "The Lawrenceville School",
      "credentialData": JSON.stringify(credentialdata), //might need to change format as well
    });
    
    /*
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/create-credential", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    */
    credentialdata.Email = sessionStorage.getItem("user_email");
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
    console.log(sessionStorage.getItem("issuerCredentialTable"));
}
