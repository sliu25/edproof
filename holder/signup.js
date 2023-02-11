function sendVerificationCode() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://oauth.artemis.stacked.itdg.io/api/auth/signup/by-email/" +
      document.getElementById("floatingEmailAddress").value,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) =>
      {if (result.code !== 400){
        alert("Please check your mailbox for the verification code.");
      }else{
        alert("error");
      }}
    )
    .catch((error) => alert("error", error));
}

function signUp() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    channel: "email",
    phone: document.getElementById("floatingPhoneNumber").value,
    code: document.getElementById("floatingVerificationCode").value,
    email: document.getElementById("floatingEmailAddress").value,
    password: document.getElementById("floatingPassword").value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://oauth.artemis.stacked.itdg.io/api/auth/signup", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(JSON.stringify(result)); 
      if (Object.keys(result)[0]!=="error") {
        window.location.assign("signin.html");
      }
    })
    .catch((error) => alert("error", error));
}
