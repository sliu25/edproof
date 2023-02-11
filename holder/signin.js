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
        console.log(JSON.stringify(result));
        if (result.code === 200){
            sessionStorage.setItem("access_token",JSON.stringify(result.data.access_token));
            sessionStorage.setItem("user_email",JSON.stringify(result.data.user_details.email).substring(1,JSON.stringify(result.data.user_details.email).length-1));
            sessionStorage.setItem("user_id",JSON.stringify(result.data.user_details.id));
            console.log(sessionStorage.getItem("access_token"),sessionStorage.getItem("user_email"),sessionStorage.getItem("user_id"));          
            window.location.assign("seed.html");
        }else{
            alert('error');
        }
    })
}