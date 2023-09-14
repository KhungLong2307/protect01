var userSystem = JSON.parse(localStorage.getItem("userSystem"))||[];
const dataUsersTemplate = document.querySelector("[data-users-template]")
const accountList = document.querySelector("[account-list]");
var userLogin = JSON.parse(localStorage.getItem("userLogin"))||[];

function showData(){
  let x = 0;
  accountList.innerHTML = "";
  for(let i=0; i<userSystem.length; i++){
    if(userLogin[0].email==userSystem[i].email){
      continue;
    }
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-stt]");
    const dataEmail = card.querySelector("[data-email]");
    const dataPass = card.querySelector("[data-passWord]");
    const dataName = card.querySelector("[data-name]");
    const dataStatus = card.querySelector("[data-status]");
    const dataWork01 = card.querySelector("[data-Work01]");
    const dataWork02 = card.querySelector("[data-Work02]");
    dataStt.textContent = ++x;
    dataEmail.textContent = userSystem[i].email;
    dataName.textContent = userSystem[i].name;
    dataPass.textContent = userSystem[i].pass;
    dataWork01.setAttribute("onclick",`lockBtn(`+i+`)`);
    dataWork02.setAttribute("onclick",`unlockBtn(`+i+`)`);
    if(userSystem[i].status==true){
        dataStatus.textContent = "Hoạt động"
    }else{
        dataStatus.textContent = "Đang bị khóa";
    }
      accountList.append(card);
  }
}
document.onload = showData();


let pagination = document.querySelector("[pagination]");
let template = document.querySelector("[template-data-list]");
let rows = 10;
let current_page = 1;

function paginationShow(e){
  pagination.innerHTML = "";
  current_page = e;
  let length = accountList.getElementsByTagName("tr").length;
  let paginationLength = Math.ceil(length/rows);
  // let paginationLength = 100

  if(paginationLength<7){
    for(let i=1;i<=paginationLength;i++){
      let card = template.content.cloneNode(true);
      let aData = card.querySelector("[aData]");
      aData.setAttribute("onclick",`paginationShow(${i})`)
      aData.textContent = i;
      pagination.append(card);
    }
  }else{
    let x=0;
    let y= 0;
    if((e-3)>0){
      x = e-3;
      y = e+1;
      if(y>paginationLength){
        y=paginationLength;
      }
    }else{
      x=1;
      y=5;
    }
    for(let i=x;i<=y;i++){
      let card = template.content.cloneNode(true);
      let aData = card.querySelector("[aData]");
      aData.setAttribute("onclick",`paginationShow(${i})`);
      aData.setAttribute("id","adata"+i);
      aData.textContent = i;
      pagination.append(card);
    }
    if((e!=paginationLength)&&(paginationLength-e)!=1){
    let card = template.content.cloneNode(true);
    let aData = card.querySelector("[aData]");
    aData.textContent = "...";
    pagination.append(card);
    }
    if((e!=paginationLength)&&(paginationLength-e)!=1){
    card = template.content.cloneNode(true);
    aData = card.querySelector("[aData]");
    aData.setAttribute("onclick",`paginationShow(${paginationLength})`)
    aData.textContent = paginationLength;
    pagination.append(card);
    }
  }
  
  
  document.querySelector("[prevData]").classList.remove('hide');
  document.querySelector("[nextData]").classList.remove('hide');
  if(e==1){
    document.querySelector("[prevData]").classList.toggle('hide');
  }
  if((e-paginationLength)==0){
    document.querySelector("[nextData]").classList.toggle('hide');
  }
  
  let aLength = pagination.querySelectorAll("[adata]").length;
  let a = pagination.querySelectorAll("[adata]");
  for(let i=0; i<aLength;i++){
    if(a[i].textContent==e){
      a[i].classList.toggle("active");
    }
  }

  
  for(let i=0;i<length;i++){
    accountList.getElementsByTagName("tr")[i].classList.toggle('hide');
  }

  let start = (e-1)*rows;
  let end = start+rows;
  if(end>length){
    end=length;
  }
  for(let i=start; i<end ; i++){
    accountList.getElementsByTagName("tr")[i].classList.remove('hide');
  }
}
paginationShow(current_page);

document.querySelector("[prevData]").addEventListener("click",()=>{
  current_page--;
  paginationShow(current_page);
})
document.querySelector("[nextData]").addEventListener("click",()=>{
  current_page++;
  paginationShow(current_page);
})


document.querySelector("[search-text]").addEventListener("input",(e)=>{
    const value = e.target.value.toLowerCase();
    let x = 0;
  accountList.innerHTML = "";
  for(let i=0; i<userSystem.length; i++){
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-stt]");
    const dataEmail = card.querySelector("[data-email]");
    const dataPass = card.querySelector("[data-passWord]");
    const dataName = card.querySelector("[data-name]");
    const dataStatus = card.querySelector("[data-status]");
    const dataWork01 = card.querySelector("[data-Work01]");
    const dataWork02 = card.querySelector("[data-Work02]");
    dataStt.textContent = ++x;
    dataEmail.textContent = userSystem[i].email;
    dataName.textContent = userSystem[i].name;
    dataPass.textContent = userSystem[i].pass;
    dataWork01.innerHTML = `<div onclick="lockBtn(${i})">Lock<div>`;
    dataWork02.innerHTML = `<div onclick="unlockBtn(${i})">Unlock<div>`;
    if(userSystem[i].status==true){
        dataStatus.textContent = "Hoạt động"
    }else{
        dataStatus.textContent = "Đang bị khóa";
    }
    if(userSystem[i].email.toLowerCase().includes(value)||userSystem[i].name.toLowerCase().includes(value)||userSystem[i].pass.toLowerCase().includes(value)||dataStatus.textContent.toLowerCase().includes(value)){
    accountList.append(card);
    }
    }
    paginationShow(current_page); 
  }
)

document.querySelector("[selectInput]").addEventListener("change",(e)=>{
    e = e.target.value;
    if(e==0){   
    sortAlpha(0);
    paginationShow(current_page);
    }
    if(e==1){
    sortAlpha(1);
    paginationShow(current_page);
    }
    if(e==3){
    sortNumber(0);
    paginationShow(current_page);
    }
    if(e==4){
    sortNumber(1);
    paginationShow(current_page);
    }
    if(e==5){
    showData();
    }
});

function sortAlpha(n) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tableId");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      if(n==0){
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      else{
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } 
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function sortNumber(n) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tableId");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if(n==0){
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      else{
        if (Number(x.innerHTML) <  Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function lockBtn(e){
  let check = confirm("Bạn có muốn khóa tài khoản này không!")
  if(check){
    userSystem[e].status = false;
  }
  localStorage.setItem('userSystem',JSON.stringify(userSystem));
  showData();
  paginationShow(current_page);
}
function unlockBtn(e){
  let check = confirm("Bạn có muốn mở khóa tài khoản này không!")
  if(check){
    userSystem[e].status = true;
  }
  localStorage.setItem('userSystem',JSON.stringify(userSystem));
  showData();
  paginationShow(current_page);
}