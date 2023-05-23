function credential_list(){
    let credential = JSON.parse(sessionStorage.getItem("all_credential")), counter=1;
    //console.log(JSON.stringify(credential));
    let dic = {"StudentIDCredential":"Student ID Credential", "AcademicTranscriptCredential":"Graduation Credential"}
    for (let j of ["Student ID Credential","Academic Transcript Credential"]){
        if (j.split(" ").join("")!=JSON.parse(sessionStorage.getItem("verificationRequestDetail")).verificationRequest.credentialType){
            continue;
        }
        if (JSON.stringify(credential[j.split(" ").join("")])!==undefined){
        for (let x of credential[j.split(" ").join("")]){
            if (JSON.parse(x.data).firstName=="sophia") continue;
            var k = document.getElementById("select_list");
            var option = document.createElement("option");
            option.value = counter;
            option.setAttribute('value', JSON.stringify({"id":x.id, "credentialtype":x.credentialType}));
            if (j=="Student ID Credential") {
                option.text = j + " - " + JSON.parse(x.data).institution + " : " + JSON.parse(x.data).studentId + ' ('+ JSON.parse(x.data).expirationDate+') [' + x.credentialSource+']';
            }else{
                option.text= j + " - " + JSON.parse(x.data).institution + " : " + JSON.parse(x.data).dateOfIssuance;
            }
            k.add(option);
        }
        }
    }
}
function show_request_by_code(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    if (code==null){
      alert("No code.")
      window.location.assign("credential.html");
    }
    sessionStorage.setItem("uniquecode",code);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "uniqueCode": code
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/show-request-by-code", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message=="Credential Request is already accepted !!!"){
            alert("Credential request already accepted.")
            window.location.assign("credential.html");
        }else if(result.message=="There is no request found!!!"){
            alert("No credential request found.")
            window.location.assign("credential.html");
        }else{
            sessionStorage.setItem("verificationRequestDetail", JSON.stringify(result));
            document.getElementById("organization").innerHTML = result.verificationRequest.verifierName
            document.getElementById("schema").innerHTML = result.verificationRequest.credentialType    
            credential_list();
        }        
      })
      .catch(error => console.log('error', error));
}
function load_detail(){
   document.getElementById("user_name").textContent  = sessionStorage.getItem("user_email");
    if (sessionStorage.getItem("access_token")==null){
        window.location.assign("signin.html");
    }
    show_request_by_code();
}
function share_credential(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    var e = document.getElementById("select_list");
    var text = JSON.parse(e.options[e.selectedIndex].value);
    var raw = JSON.stringify({
      "uniqueCode": sessionStorage.getItem("uniquecode"),
      "verifierName": JSON.parse(sessionStorage.getItem("verificationRequestDetail")).verificationRequest.verifierName,
      "credentialType": JSON.parse(sessionStorage.getItem("verificationRequestDetail")).verificationRequest.credentialType,
      "credentialId": text.id,
      "holderId": sessionStorage.getItem("user_id")
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/share-credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message == "Share Credential Successfull") window.location.assign("credential.html");
        else alert(error);
      })
      .catch(error => console.log('error', error));
}