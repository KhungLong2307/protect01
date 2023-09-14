//Lấy dữ liệu từ local storage
var userSystem = JSON.parse(localStorage.getItem("userSystem"))||[];
var userLogin = JSON.parse(localStorage.getItem("userLogin"))||[];
var adminUser = [{
    name: "admin admin",
    email: "admin@success.com",
    pass: "1234",
    status: true
},
{
    name: "admin admin",
    email: "admin@fail.com",
    pass: "1234",
    status: false
}];
localStorage.setItem("adminUser",JSON.stringify(adminUser));
//Function làm mới giá trị trong ô
function clearField(){
    document.querySelector("[emailLogin]").value = "";
    document.querySelector("[passLogin]").value = "";
    document.querySelector("[userResister]").value = "";
    document.querySelector("[emailResister]").value = "";
    document.querySelector("[passResister]").value = "";
    document.querySelector("[passResisterCofirm]").value = ""; 
}
//Xác nhận đã đăng nhập chưa
//Nếu đã đăng nhập thì sẽ tự động chuyển sang trang home
if(userLogin.length==1){
    window.location.href ="./home_page.html"
}
//Sự kiện Login
document.querySelector("[loginBtn]").addEventListener("click",(e)=>{    
    e.preventDefault();
    let emailLogin = document.querySelector("[emailLogin]").value;
    let passLogin = document.querySelector("[passLogin]").value;
    if(emailLogin==""){                         //Kiểm tra xem đã nhập email chưa
        alert("Hãy nhập email!!");
    }
    else if(!emailLogin.includes("@")){         //Kiểm tra đã đúng email chưa
        alert("Email phải bao gồm @");
    }
    if(passLogin==""){                          //Kiểm tra đã nhập mật khẩu chưa
        alert("Hãy nhập mật khẩu!!");
    }
    let adminConfirm = adminUser.findIndex((user)=>{return user.email==emailLogin&&user.pass==passLogin});  //Kiểm tra thông tin đăng nhập có trong adminUser hay không
    let loginConfirm = userSystem.findIndex(user=>user.email==emailLogin&&user.pass==passLogin);              //Kiểm tra thông tin đăng nhập có trong userSystem hay không
    if(adminConfirm==-1){
        if(loginConfirm==-1){
            alert("Email hoặc Mật khẩu sai!!Vui lòng thử lại");
            clearField();
        }
        else{
            if(userSystem[loginConfirm].status==false){
                alert("Tài khoản đang bị khóa!!");
                clearField();
            }
            else{
                userLogin.push(userSystem[loginConfirm]);
                localStorage.setItem("userLogin",JSON.stringify(userLogin));
                window.location.href = "./home_page.html";
                clearField();
            }
        }
    }else{
        if(adminUser[adminConfirm].status==false){
            alert("Tài khoản đang bị khóa!!");
            clearField();
        }
        else{
            userLogin.push(adminUser[adminConfirm]);
            localStorage.setItem("userLogin",JSON.stringify(userLogin));
            window.location.href = "./home_page.html";
            clearField();
        }
    }
});
//Sự kiện Resister
document.querySelector("[resisterBtn]").addEventListener("click",(e)=>{
    e.preventDefault();
    let userResister = document.querySelector("[userResister]").value;
    let emailResister = document.querySelector("[emailResister]").value;
    let passResister = document.querySelector("[passResister]").value;
    let passResisterCofirm = document.querySelector("[passResisterCofirm]").value;

    var formatText = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var formatEmail = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

    if(userResister==""){
        alert("Tên đang bị bỏ trống!!");
    }
    else if(formatText.test(userResister)){
        alert("Tên chứa ký tự đặc biệt!")
    }
    for(let i=0; i<userResister.length;i++){
        if(userResister.slice(i,i+2)==="  "){
            alert("Tên không hợp lệ");
        }
    }
    let x = userSystem.findIndex((user)=>{return user.email==emailResister});
    if(emailResister==""){
        alert("Email đang bị bỏ trống!!");
    }
    else if(!emailResister.includes("@")){
        alert("Email phải bao gồm @");
    }
    else if(formatEmail.test(emailResister)){
        alert("Email không hợp lệ");
    }
    else if(emailResister.toLowerCase().contain("admin")){
        alert("Email không hợp lệ");
    }
    else if(x!=-1){
        alert("Email đã tồn tại!");
    }
    for(let i=0; i<emailResister.length;i++){
        if(emailResister.slice(i,i+2)==="  "){
            alert("Email không hợp lệ");
        }
    }
    if(passResister==""){
        alert("Hãy nhập mật khẩu");
    }
    else if(formatText.test(passResister)){
        alert("Mật khẩu không hợp lệ");
    }
    for(let i=0; i<passResister.length;i++){
        if(passResister.slice(i,i+2)==="  "){
            alert("Mật khẩu không hợp lệ");
        }
    }
    if(passResister!=passResisterCofirm){
        alert("Mật khẩu không giống nhau");
    }

    let userConfirm = userSystem.findIndex((users)=>{return users.email==emailResister});
    let adminConfirm = adminUser.findIndex((users)=>{return users.email==emailResister});
    if(userConfirm!=-1&&adminConfirm!=-1){
        alert("Email đã có người sử dụng!!");
    }
    else{
        userSystem.push({name:userResister,email:emailResister,pass:passResister,status:true});
        localStorage.setItem("userSystem",JSON.stringify(userSystem));
        userLogin.push({name:userResister,email:emailResister,pass:passResister,status:true});
        localStorage.setItem("userLogin",JSON.stringify(userLogin));
        window.location.href = "./home_page.html";
        clearField();
    }
});

