function createCredential(){
  document.getElementById("user_name").textContent  = sessionStorage.getItem("user_email");
  let credential = JSON.parse(sessionStorage.getItem("all_credential")), counter=1;
  let dic = {"StudentIDCredential":"Student ID Credential", "AcademicTranscriptCredential":"Graduation Diploma"}
  for (let j of ["Student ID Credential","Academic Transcript Credential"]){
    if (JSON.stringify(credential[j.split(" ").join("")])!==undefined){
      for (let x of credential[j.split(" ").join("")]){
        //if (x.issuedDate.substring(0,10)!='2023-04-07'&&x.issuedDate.substring(0,10)!='2023-04-10'||x.id=="bc6c510a-908f-4fa1-b87b-835f642e5d96"||x.id=="e5fecbb1-0f6a-4d9f-a9b4-f5c5eea56861"||JSON.parse(x.data).dateOfIssuance=='2026') continue; //JSON.parse(x.data).firstName=="sophia"
        if (new Date(x.issuedDate)<new Date('2023-05-05T14:43:18.000Z')) continue;
        const box = document.getElementById("credentialcards");
        const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.setAttribute("id", "credentialcards " +counter);
        clone.setAttribute("data-detail", JSON.stringify(x));
        if (x.credentialSource=='self'){
          clone.querySelector("#bordercard").classList.remove("border-left-primary");
          clone.querySelector("#bordercard").classList.add("border-left-secondary");
        }
        clone.querySelector("#cardtitle").setAttribute("id", "cardtitle " + counter);
        clone.querySelector("#cardimage").setAttribute("id", "cardimage " + counter);
        clone.querySelector("#cardtext").setAttribute("id", "cardtext " + counter);
        //document.getElementById("credentialList").appendChild(clone);
        document.getElementById(j+' List').appendChild(clone);
        document.getElementById("cardtitle " + counter).innerHTML = dic[x.credentialType] +" ["+ x.credentialSource+"]" +'<br>'+x.issuedDate.substr(0,10)+" "+x.issuedDate.substr(11,8) ;
        document.getElementById("cardtext " + counter).innerHTML = JSON.parse(x.data).institution;
        document.getElementById("cardimage " + counter).setAttribute("class", (j==="Student ID Credential"?  "fas fa-id-card ":"fas fa-certificate ") + "fa-2x text-gray-300" );
        counter++;
      }
    }
  }
}
function update(){
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
      for (let j of ["Student ID Credential","Academic Transcript Credential"]){
        const myNode = document.getElementById(j+' List');
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }
      }
      createCredential();
    })
    .catch(error => console.log('error', error));
}
