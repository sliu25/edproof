let credentialschema = ["Student ID Credential","Graduation Diploma"];
let dic = {"Student ID Credential":"StudentIDCredential", "Graduation Diploma":"AcademicTranscriptCredential"};
let counter=0;
function getAllCredentialSchema(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("verifier_access_token"));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/get-all-credential-data-schema", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}
function createSchema(){
    document.getElementById("user_name").textContent  = "University";
    for (let x of credentialschema){
        const box = document.getElementById("credentialschemacard");
        const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.setAttribute("id", "credentialschema " +counter);
        clone.setAttribute("data-name", dic[x]);
        clone.querySelector("#cardtitle").setAttribute("id", "cardtitle " + counter);
        clone.querySelector("#cardimage").setAttribute("id", "cardimage " + counter);
        document.getElementById("credentialschemaList").appendChild(clone);
        document.getElementById("cardtitle " + counter).innerHTML = x;
        document.getElementById("cardimage " + counter).setAttribute("class", (x==="Student ID Credential"?  "fas fa-id-card ":"fas fa-certificate ") + "fa-2x text-gray-300" );
        counter++;
    }
}
