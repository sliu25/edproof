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
      console.log(JSON.stringify(result));
      sessionStorage.setItem("all_credential",JSON.stringify(result));
      window.location.assign("credential.html");
    })
    .catch(error => console.log('error', error));
}

function create_credential(){
  sessionStorage.setItem("access_token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9vYXV0aC5hcnRlbWlzLnN0YWNrZWQuaXRkZy5pb1wvYXBpXC9hdXRoXC9sb2dpbi1ieS1lbWFpbCIsImlhdCI6MTY4MDAwMjM2NCwiZXhwIjoxNjgxMjk4MzY0LCJuYmYiOjE2ODAwMDIzNjQsImp0aSI6InZpUkhraTBrbzBCd2xTNlAiLCJzdWIiOiI3MjcyZjgxYy04YjAyLTQzZjctYjI3My02NDNiYWNmODAxZGUiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwib3JnX2lkIjoic3RhY2tlZCJ9.3rja2UpN9ov0kZ8RFhEYJU9ojqIl7DmxBOXKaAwRTsw");
  sessionStorage.setItem("user_email","swsliu07@gmail.com");
  sessionStorage.setItem("user_id","7272f81c-8b02-43f7-b273-643bacf801de");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    let selected_schema = ["First Name","Last Name","Institution","Expiration Date","Student Id"];
    var credentialdata={};
    for (x of selected_schema){
      if (x==="Institution") credentialdata[camelCase(x)] = "The Lawrenceville School"; //check if must be THEi
      else credentialdata[camelCase(x)] = document.getElementById(x + 2).value;
    }
    console.log(JSON.stringify(credentialdata));
    var raw = JSON.stringify({
      "holderId": sessionStorage.getItem("user_id"),
      "email": sessionStorage.getItem("user_email"),
      "secret": document.getElementById("Seed2").value,
      "credentialType": "StudentIDCredential",
      "issuerName": "THEi",
      "credentialData": JSON.stringify(credentialdata),
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/create-credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status===true){
          create_credential();
        }
      })
      .catch(error => console.log('error', error));
}