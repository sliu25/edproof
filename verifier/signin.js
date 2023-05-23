function getReceivedCredential(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("verifier_access_token"));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://backend.stacked.itdg.io/api/verifier/show-all-received-credential/"+sessionStorage.getItem("verifier_id"), requestOptions)
    .then(response => response.json())
    .then(result => {
      sessionStorage.setItem("received_credential",JSON.stringify(result.data));
      window.location.assign("createcredentialrequest.html");
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
          sessionStorage.setItem("verifier_access_token",JSON.stringify(result.data.access_token).substring(1,JSON.stringify(result.data.access_token).length-1));
          sessionStorage.setItem("verifier_email",JSON.stringify(result.data.user_details.user_name).substring(1,JSON.stringify(result.data.user_details.user_name).length-1));
          sessionStorage.setItem("verifier_id",JSON.stringify(result.data.user_details.id).substring(1,JSON.stringify(result.data.user_details.id).length-1));
          getReceivedCredential();
        }
      })
      .catch(error => console.log('error', error));
}
function load(){
  var input = document.getElementById("floatingPassword");
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