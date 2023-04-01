let credential = JSON.parse(sessionStorage.getItem("issued_credential")); 
let table = [];
$(document).ready(function () {
  var t = $('#dataTable').DataTable({
        order: [[3, 'desc']],
        columnDefs: [
            { visible: false, targets: [4] }
        ],
  }); 
  let counter=0;
  //console.log(sessionStorage.getItem("issuedCredentialTable"))
  for (let x of credential){
    t.row.add([JSON.parse(x.data).firstName + ' ' + JSON.parse(x.data).lastName, x.email, x.credentialType, x.issuedDate, counter]).draw(false);
    counter++;
  }
  /*for (let j of ["Student ID Credential","Graduation Credential"]){
      if (JSON.stringify(credential[j])!='[]'){
          for (let x of credential[j]){
              table.push(x);
              t.row.add([x.data["First Name"] + ' ' + x.data["Last Name"], x.data["Email"], x.credentialType, x.issuedDate, counter]).draw(false);
              counter++;
          }
      }
  }
  sessionStorage.setItem("issuerCredentialTable",JSON.stringify(table));    */
  $("#dataTable tbody tr").css('cursor', 'pointer');
  $('#dataTable tbody').on('click', 'tr', function () {
      var data = t.row(this).data();
      sessionStorage.setItem("selectedIssuedRow",data[4]);
      window.location.assign("issueddetail.html");
  });
});
