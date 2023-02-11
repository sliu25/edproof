let access_token = "123456";
let user_id = "";
let user_email = "";
let credential_type = "StudentIDCredential"
let all_credential = [];
let selected_credential ={};
function setAccess_token (value){
    access_token=value;
}
function setUser_id (value){
    user_id=value;
}
function setUser_email (value){
    user_id=value;
}
function setCredential_type (value){
    credential_type=value;
}
function appendAll_credential (value){
    all_credential.push(value);
}
function setAll_credential (value){
    all_credential = value;
}
function setSelected_credential(value){
    selected_credential = value;
}

export{access_token,user_id,user_email,credential_type,selected_credential, setAccess_token,setUser_id,setUser_email, setCredential_type, setSelected_credential};
