let credential ={
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
        "First Name": "Kevin",
        "Last Name": "Hu",
        "Institution": "The Lawrenceville School",
        "Expiration Date": "2027-05-31",
        "Student ID ": "12345678",
        "Email": "kevin.hu@gmail.com"
      }
    }
  ],
  "Graduation Credential":[{
    "credentialId":"077e1f54-0d1e-4d9f-a5d5-8e0b8ff6f7c2",
    "credentialSource":"Self-Certified",
    "issuerOrganization":"The Lawrenceville School",
    "credentialStatus":"Valid",
    "credentialType":"Graduation Credential",
    "issuedDate":"2023-02-01",
    "createdAt":"2023-01-30",
    "updatedAt":"2023-02-01",
    "data":{
      "First Name": "Kevin",
      "Last Name": "Hu",
      "Institution": "The Lawrenceville School",
      "Graduation Year": "2027",
      "House Affiliation": "Haskell",
      "Email": "kevin.hu@gmail.com"
    }
  }]
}
let issuedCredential ={
  "Academic Transcript Credential":[],
  "Vaccination Credential":[],
  "Student ID Credential":[
    {
      "credentialId":"9cde5fd8-13cf-4922-886a-2622301bee83",
      "credentialSource":"Issued",
      "issuerOrganization":"The Lawrenceville School",
      "credentialStatus":"Valid",
      "credentialType":"Student ID Credential",
      "issuedDate":"2023-02-01",
      "createdAt":"2023-01-30",
      "updatedAt":"2023-02-01",
      "data":{
        "First Name": "Samuel",
        "Last Name": "Thatcher",
        "Institution": "The Lawrenceville School",
        "Expiration Date": "2024-05-31",
        "Student ID": "18925462",
        "Email": "samthatcher@gmail.com"
      }
    },
    {
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
  "Graduation Credential":[{
    "credentialId":"077e1f54-0d1e-4d9f-a5d5-8e0b8ff6f7c2",
    "credentialSource":"Issued",
    "issuerOrganization":"The Lawrenceville School",
    "credentialStatus":"Valid",
    "credentialType":"Graduation Credential",
    "issuedDate":"2023-02-01",
    "createdAt":"2021-01-30",
    "updatedAt":"2023-02-01",
    "data":{
      "First Name": "Sam",
      "Last Name": "Thatcher",
      "Institution": "The Lawrenceville School",
      "Graduation Year": "2024",
      "House Affiliation": "Haskell",
      "Email": "samthatcher@gmail.com"
    }
  }]
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
function signIn(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "org_id": "stacked",
      "user_name": document.getElementById("floatingUserName").value,
      "password": document.getElementById("floatingPassword").value,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://oauth.artemis.stacked.itdg.io/api/auth/login-by-user-name", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        if (result.code===200){
          sessionStorage.setItem("issuer_access_token",JSON.stringify(result.data.access_token).substring(1,JSON.stringify(result.data.access_token).length-1));
            sessionStorage.setItem("issuer_email",JSON.stringify(result.data.user_details.user_name).substring(1,JSON.stringify(result.data.user_details.user_name).length-1));
            sessionStorage.setItem("issuer_id",JSON.stringify(result.data.user_details.id).substring(1,JSON.stringify(result.data.user_details.id).length-1));
          getRequestCredential();
        }
      })
      .catch(error => console.log('error', error));
}