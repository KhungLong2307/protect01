let userLogin = JSON.parse(localStorage.getItem("userLogin"))||[];
let studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
let userSystem = JSON.parse(localStorage.getItem("userSystem"))||[];

if(userLogin.length==0){
    alert("Bạn cần đăng nhập hoặc đăng ký trước!");
    window.location.href="./login.html";
}
document.querySelector("[centerText]").textContent = userLogin[0].name;

let signOutBox = document.querySelector("[signOutBox]");
let text = document.querySelector("[imformationText");
document.querySelector("[signOutBtn]").addEventListener("click",(e)=>{
    e.preventDefault();
    signOutBox.classList.remove("hide");
    text.style.display = "none";
})
document.querySelector("[btnNo01]").addEventListener("click",(e)=>{
    e.preventDefault();
    signOutBox.classList.toggle("hide");
    text.style.display = "block";
})
document.querySelector("[btnNo02]").addEventListener("click",(e)=>{
    e.preventDefault();
    signOutBox.classList.toggle("hide");
    text.style.display = "block";
})
document.querySelector("[btnYes]").addEventListener("click",(e)=>{
    e.preventDefault();
    userLogin=[];
    localStorage.setItem("userLogin",JSON.stringify(userLogin));
    window.location.href="./login.html";
})

document.querySelector("[courseNumber]").textContent = studentManagement.length;
let classNumber = 0;
for(let i=0; i<studentManagement.length; i++){
    classNumber += studentManagement[i].arrClass.length;
}
document.querySelector("[classNumber]").textContent = classNumber;

let classActiveNumber = 0;
let classOverNumber = 0;
let classWaitNumber = 0;
for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
        if(studentManagement[i].arrClass[j].status.includes("Hoạt động")){
            classActiveNumber++;
        }
        if(studentManagement[i].arrClass[j].status.includes("Đang chờ")){
            classWaitNumber++;
        }
        if(studentManagement[i].arrClass[j].status.includes("Kết thúc")){
            classOverNumber++;
        }
        
    }
}
document.querySelector("[classActiveNumber]").textContent = classActiveNumber;
document.querySelector("[classOverNumber]").textContent = classOverNumber;
document.querySelector("[classWaitNumber]").textContent = classWaitNumber;

var studentNumber = 0;
for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
       studentNumber +=studentManagement[i].arrClass[j].arrStudent.length;
    }
}
document.querySelector("[studentNumber]").textContent = studentNumber;

let studentClassWaitNumber = 0;
let studentActiveNumber = 0;
let studentStopNumber = 0;
let studentOverNumber = 0;
for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
        for(let x=0; x<studentManagement[i].arrClass[j].arrStudent.length; x++){
        if(studentManagement[i].arrClass[j].arrStudent[x].status.includes("Đang học")){
            studentActiveNumber++;
        }
        if(studentManagement[i].arrClass[j].arrStudent[x].status.includes("Chờ lớp")){
            studentClassWaitNumber++;
        }
        if(studentManagement[i].arrClass[j].arrStudent[x].status.includes("Bảo lưu")){
            studentStopNumber++;
        }
        if(studentManagement[i].arrClass[j].arrStudent[x].status.includes("Đình chỉ")){
            studentStopNumber++;
        }
        if(studentManagement[i].arrClass[j].arrStudent[x].status.includes("Tốt nghiệp")){
            studentOverNumber++;
        }
    }
    }
}
document.querySelector("[studentClassWaitNumber]").textContent = studentClassWaitNumber;
document.querySelector("[studentActiveNumber]").textContent = studentActiveNumber;
document.querySelector("[studentStopNumber]").textContent = studentStopNumber;
document.querySelector("[studentOverNumber]").textContent = studentOverNumber;