var userLogin = JSON.parse(localStorage.getItem("userLogin"))||[];
var studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
var userSystem = JSON.parse(localStorage.getItem("userSystem"))||[];

if(userLogin.length==0){
    alert("Bạn cần đăng nhập hoặc đăng ký trước!");
    window.location.href="./login.html";
}
document.querySelector("[centerText]").textContent = userLogin[0].name;

var signOutBox = document.querySelector("[signOutBox]");
var text = document.querySelector("[imformationText");
document.querySelector("[signOutBtn]").addEventListener("click",(e)=>{
    e.preventDefault();
    signOutBox.classList.remove("hide");
    text.style.display = "none";
    addBox.style.display = "none";
})
document.querySelector("[btnNo01]").addEventListener("click",(e)=>{
    e.preventDefault();
    signOutBox.classList.toggle("hide");
    text.style.display = "";
    addBox.style.display = "none";
})
document.querySelector("[btnNo02]").addEventListener("click",(e)=>{
    e.preventDefault();
    signOutBox.classList.toggle("hide");
    text.style.display = "";
    addBox.style.display = "none";
})
document.querySelector("[btnYes]").addEventListener("click",(e)=>{
    e.preventDefault();
    userLogin=[];
    localStorage.setItem("userLogin",JSON.stringify(userLogin));
    window.location.href="./login.html";
})
