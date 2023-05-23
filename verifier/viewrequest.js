let credential = JSON.parse(sessionStorage.getItem("received_credential")); 
let table = [];
let dic = {"StudentIDCredential":"Student ID Credential", "AcademicTranscriptCredential":"Graduation Diploma"}
$(document).ready(function () {
document.getElementById("user_name").textContent  = "University";
  var t = $('#dataTable').DataTable({
        order: [[3, 'desc']],
        columnDefs: [
            { visible: false, targets: [4] }
        ],
  }); 
  let counter=-1;
  for (let x of credential){
    counter++;
    if (new Date(x.receivedDate)<new Date('2023-05-05T14:43:18.000Z')) continue;
    if (x.email=="swsliu07@gmail.com") t.row.add([JSON.parse(x.data).firstName + ' ' + JSON.parse(x.data).lastName, x.email, dic[x.credentialType], x.receivedDate.substr(0,10)+' '+x.receivedDate.substr(11,8),  counter]).draw(false);
  }
  
  $("#dataTable tbody tr").css('cursor', 'pointer');
  $('#dataTable tbody').on('click', 'tr', function () {
      var data = t.row(this).data();
      sessionStorage.setItem("selectedRequestRow",data[4]);
      window.location.assign("viewrequestdetail.html");
  });
});
function update(){
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
        var t = $('#dataTable').DataTable(); 
        t.clear();
        let counter=-1;
        credential = JSON.parse(sessionStorage.getItem("received_credential")); 
        for (let x of credential){
            counter++;
            if (new Date(x.receivedDate)<new Date('2023-05-05T14:43:18.000Z')) continue;
            if (x.email=="swsliu07@gmail.com") t.row.add([JSON.parse(x.data).firstName + ' ' + JSON.parse(x.data).lastName, x.email, dic[x.credentialType], x.receivedDate.substr(0,10)+' '+x.receivedDate.substr(11,8),  counter]).draw(false);
            
        }
        $("#dataTable tbody tr").css('cursor', 'pointer');
        $('#dataTable tbody').on('click', 'tr', function () {
            var data = t.row(this).data();
            sessionStorage.setItem("selectedRequestRow",data[4]);
            alert(data[4]);
            window.location.assign("viewrequestdetail.html");
        });
      })
      .catch(error => console.log('error', error));
      
}