var studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
const dataUsersTemplate = document.querySelector("[data-users-template]")
const studentList = document.querySelector("[student-list]");

function showData(){
  let x = 0;
  studentList.innerHTML = "";
  for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
      for(let z=0; z<studentManagement[i].arrClass[j].arrStudent.length;z++){
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-stt]")
    const dataId = card.querySelector("[data-id]")
    const dataName = card.querySelector("[data-name]");
    const dataYear = card.querySelector("[data-year]");
    const dataEmail = card.querySelector("[data-email]");
    const dataAddress = card.querySelector("[data-address]");
    const dataPhone = card.querySelector("[data-phone]");
    const dataSex = card.querySelector("[data-sex]");
    const dataStatus = card.querySelector("[data-status]")
    const dataWork01 = card.querySelector("[data-work01]");
    const dataWork02 = card.querySelector("[data-work02]");
    dataStt.textContent = ++x;
    dataId.textContent = studentManagement[i].arrClass[j].arrStudent[z].studentId;
    dataName.textContent = studentManagement[i].arrClass[j].arrStudent[z].studentName;
    dataYear.textContent = studentManagement[i].arrClass[j].arrStudent[z].year;
    dataEmail.textContent = studentManagement[i].arrClass[j].arrStudent[z].email;
    dataAddress.textContent = studentManagement[i].arrClass[j].arrStudent[z].address;
    dataPhone.textContent = studentManagement[i].arrClass[j].arrStudent[z].phone;
    if(studentManagement[i].arrClass[j].arrStudent[z].sex){
      dataSex.textContent = "Nam";
    }
    else{
      dataSex.textContent = "Nữ";
    }
    dataStatus.textContent = studentManagement[i].arrClass[j].arrStudent[z].status;
    dataWork01.setAttribute("onclick",`updateBtn(`+i+`,`+j+`,`+z+``+`)`);
    dataWork02.setAttribute("onclick",`deleteBtn(`+i+`,`+j+`,`+z+`)`);
    studentList.append(card);
      }
    }
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
  let length = studentList.getElementsByTagName("tr").length;
  let paginationLength = Math.ceil(length/rows);
  

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
    studentList.getElementsByTagName("tr")[i].classList.toggle('hide');
  }

  let start = (e-1)*rows;
  let end = start+rows;
  if(end>length){
    end=length;
  }
  for(let i=start; i<end ; i++){
    studentList.getElementsByTagName("tr")[i].classList.remove('hide');
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
  studentList.innerHTML = "";
  for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
      for(let z=0; z<studentManagement[i].arrClass[j].arrStudent.length;z++){
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-stt]")
    const dataId = card.querySelector("[data-id]")
    const dataName = card.querySelector("[data-name]");
    const dataYear = card.querySelector("[data-year]");
    const dataEmail = card.querySelector("[data-email]");
    const dataAddress = card.querySelector("[data-address]");
    const dataPhone = card.querySelector("[data-phone]");
    const dataSex = card.querySelector("[data-sex]");
    const dataStatus = card.querySelector("[data-status]")
    const dataWork01 = card.querySelector("[data-work01]");
    const dataWork02 = card.querySelector("[data-work02]");
    dataStt.textContent = ++x;
    dataId.textContent = studentManagement[i].arrClass[j].arrStudent[z].studentId;
    dataName.textContent = studentManagement[i].arrClass[j].arrStudent[z].studentName;
    dataYear.textContent = studentManagement[i].arrClass[j].arrStudent[z].year;
    dataEmail.textContent = studentManagement[i].arrClass[j].arrStudent[z].email;
    dataAddress.textContent = studentManagement[i].arrClass[j].arrStudent[z].address;
    dataPhone.textContent = studentManagement[i].arrClass[j].arrStudent[z].phone;
    if(studentManagement[i].arrClass[j].arrStudent[z].sex){
      dataSex.textContent = "Nam";
    }
    else{
      dataSex.textContent = "Nữ";
    }
    dataStatus.textContent = studentManagement[i].arrClass[j].arrStudent[z].status;
    dataWork01.setAttribute("onclick",`updateBtn(`+i+`,`+j+`,`+z+``+`)`);
    dataWork02.setAttribute("onclick",`deleteBtn(`+i+`,`+j+`,`+z+`)`);
    if(studentManagement[i].arrClass[j].arrStudent[z].studentId.toLowerCase().includes(value)||studentManagement[i].arrClass[j].arrStudent[z].studentName.toLowerCase().includes(value)
    ||studentManagement[i].arrClass[j].arrStudent[z].email.toLowerCase().includes(value)||
    studentManagement[i].arrClass[j].arrStudent[z].address.toLowerCase().includes(value)||
    dataSex.textContent.toLowerCase().includes(value)||
    studentManagement[i].arrClass[j].arrStudent[z].status.toLowerCase().includes(value)){
      studentList.append(card);
      }
    }
  }
  paginationShow(current_page);
}
})

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
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
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
let addBoxUpText = document.querySelector("[addBoxUpText]");
var addBox = document.querySelector("[addBox]");
let courseId = document.querySelector("[courseId]");
let courseIdTemplate = document.querySelector("[template-courseId-list]");
let classId = document.querySelector("[classId]");
let classIdTemplate = document.querySelector("[template-classId-list]");

document.querySelector("[courseId]").addEventListener("change",(e)=>{
  e = e.target.value;
  let check = studentManagement.findIndex((user)=>{return user.courseId==e})
  classId.innerHTML = "";
  for(let i=0;i<studentManagement[check].arrClass.length;i++){
    let card = classIdTemplate.content.cloneNode(true);
    let optionId = card.querySelector("[classId-value]");
    optionId.setAttribute("value",studentManagement[check].arrClass[i].classId);
    optionId.textContent=studentManagement[check].arrClass[i].classId;
    classId.append(card);
  }
})


document.querySelector("[addBtn]").addEventListener("click",(e)=>{
    e.preventDefault();
    text.style.display = "none"
    addBox.style.display = "";
courseId.innerHTML = "";
    for(let i=0;i<studentManagement.length;i++){
      let card = courseIdTemplate.content.cloneNode(true);
      let optionId = card.querySelector("[courseId-value]");
      optionId.setAttribute("value",studentManagement[i].courseId);
      optionId.textContent=studentManagement[i].courseId;
      courseId.append(card);
    }
classId.innerHTML = "";
    for(let i=0;i<studentManagement[0].arrClass.length;i++){
      let card = classIdTemplate.content.cloneNode(true);
      let optionId = card.querySelector("[classId-value]");
      optionId.setAttribute("value",studentManagement[0].arrClass[i].classId);
      optionId.textContent=studentManagement[0].arrClass[i].classId;
      classId.append(card);
    }

    document.querySelector("[studentId]").value="";
    document.querySelector("[studentName]").value="";
    document.querySelector("[year]").value="";
    document.querySelector("[address]").value="";
    document.querySelector("[email]").value ="";
    document.querySelector("[phone]").value ="";
    

    document.querySelector("[btnAdd]").style.display = "";
    document.querySelector("[btnEdit]").style.display = "none";
    document.querySelector("[btnDelete]").style.display = "none";
    addBoxUpText.textContent = "Quản lý sinh viên-Thêm mới sinh viên";
})

document.querySelector("[addBoxOutBtn]").addEventListener("click",(e)=>{
    e.preventDefault();
    text.style.display = ""
    addBox.style.display = "none";
    removeRe();
})
document.querySelector("[btnClose]").addEventListener("click",(e)=>{
    e.preventDefault();
    text.style.display = "";
    addBox.style.display = "none";
    removeRe();
})

document.querySelector("[btnAdd]").addEventListener("click",(e)=>{
  e.preventDefault();
  let courseId = document.querySelector("[courseId]").value;
  let classId = document.querySelector("[classId]").value;
  let studentId = document.querySelector("[studentId]").value;
  let studentName = document.querySelector("[studentName]").value;
  let year = document.querySelector("[year]").value;
  let address = document.querySelector("[address]").value;
  let email = document.querySelector("[email]").value;
  let phone = document.querySelector("[phone]").value;
  let status = document.querySelector("[status]").value;
  let studentSex = document.querySelector("[studentSex]").value;
  
  let x = 0;
  let y = 0;
  var formatText = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var formatEmail = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  x = studentManagement.findIndex((user)=>{return user.courseId==courseId});
  y = studentManagement[x].arrClass.findIndex((user)=>{return user.classId==classId});
  
  if(studentId==""||formatText.test(studentId)==true){
    alert("Mã số sinh viên đang trống hoặc không hợp lệ");
  }
  if(studentName==""||formatText.test(studentName)==true){
    alert("Tên sinh viên đang trống hoặc không hợp lệ");
  }
  if(address==""||formatText.test(address)==true){
    alert("Địa chỉ đang trống hoặc không hợp lệ!");
  }
  if(email==""||formatEmail.test(email)){
    alert("Email đang trống!");
  }
  if(year==""||/^\d+$/.test(year)==false){
    alert("Năm sinh đang trống hoặc không hợp lệ!");
  }
  if(phone==""||/^\d+$/.test(phone)==false){
    alert("Số điện thoại đang trống hoặc không hợp lệ!");
  }
  studentId = studentId.toUpperCase();
  studentManagement[x].arrClass[y].arrStudent.push({studentId:studentId,studentName:studentName,year:year,address:address,email:email,phone:phone,status:status,sex:studentSex});
  localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
  showData();
  paginationShow(current_page);
  text.style.display = ""
  addBox.style.display = "none";

})
let updateNumberx = 0;
let updateNumbery = 0;
let updateNumberz = 0;
function updateBtn(x,y,z){
  updateNumberx = x;
  updateNumbery = y;
  updateNumberz = z;
  addBoxUpText.textContent = "Quản lý sinh viên-cập nhật sinh viên";
  document.querySelector("[btnAdd]").style.display = "none";
  document.querySelector("[btnEdit]").style.display = "";
  document.querySelector("[btnDelete]").style.display = "none";

  document.querySelector("[courseId]").innerHTML = `<option value=`+studentManagement[x].courseId+`>`+studentManagement[x].courseId+`</option>`
  document.querySelector("[classId]").innerHTML = `<option value=`+studentManagement[x].arrClass[y].classId+`>`+studentManagement[x].arrClass[y].classId+`</option>`;
  document.querySelector("[courseId]").setAttribute("disabled","");
  document.querySelector("[classId]").setAttribute("disabled","");

  document.querySelector("[studentId]").value=studentManagement[x].arrClass[y].arrStudent[z].studentId;
  document.querySelector("[studentName]").value=studentManagement[x].arrClass[y].arrStudent[z].studentName;
  document.querySelector("[year]").value=studentManagement[x].arrClass[y].arrStudent[z].year;
  document.querySelector("[address]").value=studentManagement[x].arrClass[y].arrStudent[z].address;
  document.querySelector("[email]").value =studentManagement[x].arrClass[y].arrStudent[z].email;
  document.querySelector("[phone]").value =studentManagement[x].arrClass[y].arrStudent[z].phone;
  document.querySelector("[studentSex]").value= studentManagement[x].arrClass[y].arrStudent[z].sex;
  document.querySelector("[status]").value= studentManagement[x].arrClass[y].arrStudent[z].status;
  
  text.style.display = "none"
  addBox.style.display = "";
}
document.querySelector("[btnEdit]").addEventListener("click",(e)=>{
  e.preventDefault();
  let courseId = document.querySelector("[courseId]").value;
  let classId = document.querySelector("[classId]").value;
  let studentId = document.querySelector("[studentId]").value;
  let studentName = document.querySelector("[studentName]").value;
  let year = document.querySelector("[year]").value;
  let address = document.querySelector("[address]").value;
  let email = document.querySelector("[email]").value;
  let phone = document.querySelector("[phone]").value;
  let studentSex = document.querySelector("[studentSex]").value;
  if(studentSex=="true"){
    studentSex = true;
  }
  else{
    studentSex=false;
  }
  let status = document.querySelector("[status]").value;
  let x = 0;
  let y = 0;
  var formatText = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var formatEmail = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  x = studentManagement.findIndex((user)=>{return user.courseId==courseId});
  y = studentManagement[x].arrClass.findIndex((user)=>{return user.classId==classId});
  
  if(studentId==""||formatText.test(studentId)==true){
    alert("Mã số sinh viên đang trống hoặc không hợp lệ");
  }
  if(studentName==""||formatText.test(studentName)==true){
    alert("Tên sinh viên đang trống hoặc không hợp lệ");
  }
  if(address==""||formatText.test(address)==true){
    alert("Địa chỉ đang trống hoặc không hợp lệ!");
  }
  if(email==""||formatEmail.test(email)){
    alert("Email đang trống!");
  }
  if(year==""||/^\d+$/.test(year)==false){
    alert("Năm sinh đang trống hoặc không hợp lệ!");
  }
  if(phone==""||/^\d+$/.test(phone)==false){
    alert("Số điện thoại đang trống hoặc không hợp lệ!");
  }
  studentId = studentId.toUpperCase();
  studentManagement[updateNumberx].arrClass[updateNumbery].arrStudent[updateNumberz] = ({studentId:studentId,studentName:studentName,year:year,address:address,email:email,phone:phone,status:status,sex:studentSex});
  localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
  showData();
  paginationShow(current_page);
  text.style.display = ""
  addBox.style.display = "none";
})
let deleteNumberx = 0;
let deleteNumbery = 0;
let deleteNumberz = 0
function deleteBtn(x,y,z){
  deleteNumberx = x;
  deleteNumbery = y;
  deleteNumberz = z
  let check = confirm("Bạn có muốn xóa học sinh tên "+studentManagement[x].arrClass[y].arrStudent[z].studentName+" không?");
  if(check!=1){
    return -1;
  }
  else{
    studentManagement[deleteNumberx].arrClass[deleteNumbery].arrStudent.splice(deleteNumberz,1);
    localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
    showData();
    paginationShow(current_page);
    text.style.display = ""
    addBox.style.display = "none";
    removeRe();
  }
}
// document.querySelector("[btnDelete]").addEventListener("click",(e)=>{
//   e.preventDefault();
//     studentManagement[deleteNumberx].arrClass[deleteNumbery].arrStudent.splice(deleteNumberz,1);
//     localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
//     showData();
//     paginationShow(current_page);
//     text.style.display = ""
//     addBox.style.display = "none";
//     removeRe();
// })

function removeRe(){
    document.querySelector("[courseId]").removeAttribute("disabled");
    document.querySelector("[classId]").removeAttribute("disabled");
    document.querySelector("[studentId]").readOnly = false;
    document.querySelector("[studentName]").readOnly = false;
    document.querySelector("[year]").readOnly = false;
    document.querySelector("[address]").readOnly = false;
    document.querySelector("[email]").readOnly = false;
    document.querySelector("[phone]").readOnly = false;
    document.querySelector("[studentSex]").removeAttribute('disabled','');
    document.querySelector("[status]").removeAttribute('disabled','');
}

