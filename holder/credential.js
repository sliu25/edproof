function createCredential(){
  document.getElementById("user_name").textContent  = sessionStorage.getItem("user_email");
  let credential = JSON.parse(sessionStorage.getItem("all_credential")), counter=1;
  let dic = {"StudentIDCredential":"Student ID Credential", "AcademicTranscriptCredential":"Graduation Credential"}
  for (let j of ["Student ID Credential","Academic Transcript Credential"]){
    if (JSON.stringify(credential[j.split(" ").join("")])!==undefined){
      for (let x of credential[j.split(" ").join("")]){
        if (JSON.parse(x.data).firstName=="sophia") continue;
        const box = document.getElementById("credentialcards");
        const clone = box.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.setAttribute("id", "credentialcards " +counter);
        clone.setAttribute("data-detail", JSON.stringify(x));
        clone.querySelector("#cardtitle").setAttribute("id", "cardtitle " + counter);
        clone.querySelector("#cardimage").setAttribute("id", "cardimage " + counter);
        clone.querySelector("#cardtext").setAttribute("id", "cardtext " + counter);
        document.getElementById("credentialList").appendChild(clone);
        document.getElementById("cardtitle " + counter).innerHTML = dic[x.credentialType] +" ["+ x.credentialSource+"]";
        document.getElementById("cardtext " + counter).innerHTML = JSON.parse(x.data).institution;
        document.getElementById("cardimage " + counter).setAttribute("class", (j==="Student ID Credential"?  "fas fa-id-card ":"fas fa-certificate ") + "fa-2x text-gray-300" );
        counter++;
      }
    }
  }
}
