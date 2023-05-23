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
function signIn(){
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "org_id": "stacked",
      "email": document.getElementById("floatingEmailAddress").value,
      "password": document.getElementById("floatingPassword").value,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://oauth.artemis.stacked.itdg.io/api/auth/login-by-email/", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.code === 200){
            sessionStorage.setItem("access_token",JSON.stringify(result.data.access_token).slice(1,-1));
            sessionStorage.setItem("user_email",JSON.stringify(result.data.user_details.email).slice(1,-1));//.substring(1,JSON.stringify(result.data.user_details.email).length-1))
            sessionStorage.setItem("user_id",JSON.stringify(result.data.user_details.id).slice(1,-1));
            //console.log(sessionStorage.getItem("access_token"),sessionStorage.getItem("user_email"),sessionStorage.getItem("user_id"));          
            getallcredential();
        }else{
            alert('error');
        }
    })
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
