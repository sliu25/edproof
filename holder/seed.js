function sign(){
  let credential = {
    "Academic Transcript Credential":[],
    "Vaccination Credential":[],
    "Student ID Credential":[
      {
        "credentialId":"9cde5fd8-13cf-4922-886a-2622301bee83",
        "credentialSource":"Self-Certified",
        "issuerOrganization":"The Lawrenceville School",
        "credentialStatus":"Valid",
        "credentialType":"Student ID Credential",
        "issuedDate":"2023-02-01",
        "createdAt":"2023-01-30",
        "updatedAt":"2023-02-01",
        "data":{
          "First Name": "Bob",
          "Last Name": "Lee",
          "Institution": "The Lawrenceville School",
          "Expiration Date": "2025-05-31",
          "Student ID ": "16201142",
          "Email": "swsliu07@gmail.com"
        }
      },{
        "credentialId":"9cde5fd8-13cf-4922-886a-2622301bee83",
        "credentialSource":"Issued",
        "issuerOrganization":"The Lawrenceville School",
        "credentialStatus":"Valid",
        "credentialType":"Student ID Credential",
        "issuedDate":"2023-02-01",
        "createdAt":"2023-01-30",
        "updatedAt":"2023-02-01",
        "data":{
          "First Name": "Bob",
          "Last Name": "Lee",
          "Institution": "The Lawrenceville School",
          "Expiration Date": "2025-05-31",
          "Student ID": "16201142",
          "Email": "swsliu07@gmail.com"
        }
      }
    ],
    "Graduation Credential":[/*{
      "credentialId":"9cde5fd8-13cf-4922-886a-2622301bee83",
      "credentialSource":"Issued",
      "issuerOrganization":"The Lawrenceville School",
      "credentialStatus":"Valid",
      "credentialType":"Graduation Credential",
      "issuedDate":"2023-02-01",
      "createdAt":"2021-01-30",
      "updatedAt":"2023-02-01",
      "data":{
        "First Name": "Bob",
        "Last Name": "Lee",
        "Institution": "The Lawrenceville School",
        "Graduation Year": "2025",
        "House Affiliation": "Haskell",
        "Email": "swsliu07@gmail.com"
      }
    }*/]
  }
  sessionStorage.setItem("all_credential",JSON.stringify(credential)); //will be replaced with real API and move to home screen
  window.location.assign("credential.html");
  /*document.getElementById("signBtn").onclick = function (){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "holderId": sessionStorage.getItem("user_id"),
      "email": sessionStorage.getItem("user_email"),
      "secret": document.getElementById("floatingSeed").value,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/create-authentication-did", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        if (result.code === 200){
            window.location.assign("credential.html");
        }else{
            alert('error');
        }
    })
      .catch(error => console.log('error', error));
  }*/
}
