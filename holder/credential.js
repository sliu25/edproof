let credential = JSON.parse(sessionStorage.getItem("all_credential")), /*table=[],*/ counter=1;
function getallcredential(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://backend.stacked.itdg.io/api/holder/get-all-credential/37ad56b4-2e09-4cef-adb6-56d94fadf471", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function createCredential(){
  for (let j of ["Student ID Credential","Graduation Credential"]){
    if (JSON.stringify(credential[j])!='[]'){
      for (let x of credential[j]){
        const box = document.getElementById("credentialcards");
        const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.setAttribute("id", "credentialcards " +counter);
        clone.setAttribute("data-detail", JSON.stringify(x));
        clone.querySelector("#cardtitle").setAttribute("id", "cardtitle " + counter);
        clone.querySelector("#cardimage").setAttribute("id", "cardimage " + counter);
        clone.querySelector("#cardtext").setAttribute("id", "cardtext " + counter);
        document.getElementById("credentialList").appendChild(clone);
        document.getElementById("cardtitle " + counter).innerHTML = x.credentialType +" ["+ x.credentialSource+"]";
        document.getElementById("cardtext " + counter).innerHTML = x.issuerOrganization;
        document.getElementById("cardimage " + counter).setAttribute("class", (j==="Student ID Credential"?  "fas fa-id-card ":"fas fa-certificate ") + "fa-2x text-gray-300" );
        counter++;
        //table.push(credential[j]);
      }
    }
  }
}