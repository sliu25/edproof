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
              if (JSON.parse(x.data).institution!="The Lawrenceville School") continue;// x.issuedDate.substring(0,10)!='2023-04-07'
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
        if (result.code===200){
          sessionStorage.setItem("issuer_access_token",JSON.stringify(result.data.access_token).substring(1,JSON.stringify(result.data.access_token).length-1));
            sessionStorage.setItem("issuer_email",JSON.stringify(result.data.user_details.user_name).substring(1,JSON.stringify(result.data.user_details.user_name).length-1));
            sessionStorage.setItem("issuer_id",JSON.stringify(result.data.user_details.id).substring(1,JSON.stringify(result.data.user_details.id).length-1));
          getRequestCredential();
        }
      })
      .catch(error => console.log('error', error));
}
function load(){
  var input = document.getElementById("floatingPassword");
  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("signInBtn").click();
    }
  });
}