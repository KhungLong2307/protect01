let signinBtn = document.querySelector(".signinBtn");
let signupBtn = document.querySelector(".signupBtn");
let body = document.querySelector("body");

signupBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    body.classList.toggle("slide");
})
signinBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    body.classList.remove("slide");
})