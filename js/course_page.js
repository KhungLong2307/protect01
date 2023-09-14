var studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
const dataUsersTemplate = document.querySelector("[data-users-template]")
const courseList = document.querySelector("[course-list]");

function showData(){
  let x = 0;
  courseList.innerHTML = "";
  for(let i=0; i<studentManagement.length; i++){
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-Stt]")
    const dataId = card.querySelector("[data-Id]")
    const dataName = card.querySelector("[data-Name]")
    const dataTime = card.querySelector("[data-Time]")
    const dataStatus = card.querySelector("[data-Status]")
    const dataWork01 = card.querySelector("[data-work01]");
    const dataWork02 = card.querySelector("[data-work02]");
    dataStt.textContent = i+1;
    dataId.textContent = studentManagement[i].courseId;
    dataName.textContent = studentManagement[i].courseName;
    dataTime.textContent = studentManagement[i].courseTime;
    dataWork01.setAttribute("onclick",`updateBtn(`+i+`)`);
    dataWork02.setAttribute("onclick",`deleteBtn(`+i+`)`);
    if(studentManagement[i].status==true){
        dataStatus.textContent = "Hoạt động"
    }else{
        dataStatus.textContent = "Không hoạt động";
    }
    courseList.append(card);
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
  let length = courseList.getElementsByTagName("tr").length;
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
    courseList.getElementsByTagName("tr")[i].classList.toggle('hide');
  }

  let start = (e-1)*rows;
  let end = start+rows;
  if(end>length){
    end=length;
  }
  for(let i=start; i<end ; i++){
    courseList.getElementsByTagName("tr")[i].classList.remove('hide');
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
    courseList.innerHTML = "";
    for(let i=0; i<studentManagement.length; i++){
      const card = dataUsersTemplate.content.cloneNode(true).children[0];
      const dataStt = card.querySelector("[data-Stt]")
      const dataId = card.querySelector("[data-Id]")
      const dataName = card.querySelector("[data-Name]")
      const dataTime = card.querySelector("[data-Time]")
      const dataStatus = card.querySelector("[data-Status]")
      const dataWork01 = card.querySelector("[data-work01]");
      const dataWork02 = card.querySelector("[data-work02]");
      dataStt.textContent = ++x;
      dataId.textContent = studentManagement[i].courseId;
      dataName.textContent = studentManagement[i].courseName;
      dataTime.textContent = studentManagement[i].courseTime;
      dataWork01.setAttribute("onclick",`updateBtn(`+i+`)`);
      dataWork02.setAttribute("onclick",`deleteBtn(`+i+`)`);
      if(studentManagement[i].status==true){
          dataStatus.textContent = "Hoạt động"
      }else{
          dataStatus.textContent = "Không hoạt động";
      }
      if(studentManagement[i].courseId.toLowerCase().includes(value)||studentManagement[i].courseName.toLowerCase().includes(value)||studentManagement[i].courseTime.toString().includes(value)||dataStatus.textContent.toLowerCase().includes(value)){
        courseList.append(card);
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
document.querySelector("[addBtn]").addEventListener("click",(e)=>{
    e.preventDefault();
    text.style.display = "none"
    addBox.style.display = "";
    document.querySelector("[courseId]").value="";
    document.querySelector("[courseName]").value = "";
    document.querySelector("[courseTime]").value = "";
    document.querySelector("[courseStatus]").value = "true";
    document.querySelector("[btnAdd]").style.display = "";
    document.querySelector("[btnEdit]").style.display = "none";
    document.querySelector("[btnDelete]").style.display = "none";
    addBoxUpText.textContent = "Quản lý khóa học-thêm mới khóa học";
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

let formatText = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
let formatEmail = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;


document.querySelector("[btnAdd]").addEventListener("click",(e)=>{
  e.preventDefault();
  var courseId = document.querySelector("[courseId]").value;
  var courseName = document.querySelector("[courseName]").value;
  var courseTime = document.querySelector("[courseTime]").value;
  var courseStatus = document.querySelector("[courseStatus]").value;
  if(courseStatus=="true"){
    courseStatus = true;
  }
  else{
    courseStatus = false;
  }
  courseId = courseId.toUpperCase();
  if(courseId==""){
    alert("Mã số khóa học đang trống");
    return false;
  }
  if(courseName==""){
    alert("Tên khóa học đang trống");
    return false;
  }
  if(courseTime==""){
    alert("Thời gian khóa học đang trống");
    return false;
  }
  if(formatText.test(courseId)==true){
    alert("Mã khóa học chứa ký tự đặc biệt");
    return false;
  }
  if(formatText.test(courseName)==true){
    alert("Tên khóa học chứa ký tự đặc biệt!");
    return false;
  }
  if(/^\d+$/.test(courseTime)==false){
    alert("Thời gian khóa học không hợp lệ")
    return false;
  }
  let check = studentManagement.findIndex((user)=>{return user.courseId==courseId});
  if(check!=-1){
    alert("Mã số khóa học đang bị trùng!");
    return false;
  }
  
  studentManagement.push({courseId: courseId, courseName: courseName, courseTime: courseTime, status: courseStatus, arrClass: []});
  localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
  paginationLength =Math.ceil(studentManagement.length/rows)
  showData();
  paginationShow(current_page);
  text.style.display = ""
  addBox.style.display = "none";
})


let updateNumber = 0;
function updateBtn(n){
  updateNumber = n;
  addBoxUpText.textContent = "Quản lý khóa học-Cập nhật khóa học";
  document.querySelector("[btnAdd]").style.display = "none";
  document.querySelector("[btnEdit]").style.display = "";
  document.querySelector("[btnDelete]").style.display = "none";

  document.querySelector("[courseId]").readOnly = true;
  
  document.querySelector("[courseId]").value= studentManagement[n].courseId;
  document.querySelector("[courseName]").value = studentManagement[n].courseName;
  document.querySelector("[courseTime]").value = studentManagement[n].courseTime;
  
  if(studentManagement[n].status==true){
  document.querySelector("[courseStatus]").value = "true";
  }
  else{
    document.querySelector("[courseStatus]").value = "false";
  }
  text.style.display = "none"
  addBox.style.display = "";
}
document.querySelector("[btnEdit]").addEventListener("click",(e)=>{
  e.preventDefault();
  let courseId = document.querySelector("[courseId]").value;
  let courseName = document.querySelector("[courseName]").value;
  let courseTime = document.querySelector("[courseTime]").value;
  let courseStatus = document.querySelector("[courseStatus]").value;
  if(courseStatus=="true"){
    courseStatus = true;
  }
  else{
    courseStatus = false;
  }
  if(courseId==""){
    alert("Mã số khóa học đang trống");
    return false;
  }
  if(courseName==""){
    alert("Tên khóa học đang trống");
    return false;
  }
  if(courseTime==""){
    alert("Thời gian khóa học đang trống");
    return false;
  }
  else if(/^\d+$/.test(courseTime)==false){
    alert("Thời gian khóa học không hợp lệ")
    return false;
  }
  studentManagement[updateNumber] = {courseId: courseId, courseName: courseName, courseTime: courseTime, status: courseStatus,arrClass: studentManagement[updateNumber].arrClass};
  localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
  paginationLength =Math.ceil(studentManagement.length/rows)
  showData();
  paginationShow(current_page);
  text.style.display = ""
  addBox.style.display = "none";
})
let deleteNumber = 0;
function deleteBtn(n){
  deleteNumber = n;
  let classActiveNumber = 0;
  let classWaitNumber = 0;

    for(let j=0; j<studentManagement[n].arrClass.length; j++){
        if(studentManagement[n].arrClass[j].status.includes("Hoạt động")){
            classActiveNumber++;
        }
        if(studentManagement[n].arrClass[j].status.includes("Đang chờ")){
            classWaitNumber++;
        }   
    }
  
    if(classActiveNumber>0||classWaitNumber>0){
      alert("Có lớp đang hoạt động hoặc đang đợi!Bạn không thể xóa")
    }else{
      let x = confirm("Bạn có muốn xóa khóa học "+studentManagement[n].courseId+" Không?");
      if(x!=1){
        return -1;
      }
      else{
        studentManagement.splice(deleteNumber,1);
      localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
      paginationLength =Math.ceil(studentManagement.length/rows)
      showData();
      paginationShow(current_page);
      text.style.display = ""
      addBox.style.display = "none";
      removeRe();
      }
    }

}
document.querySelector("[btnDelete]").addEventListener("click",(e)=>{
  e.preventDefault();
    studentManagement.splice(deleteNumber,1);
    localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
    paginationLength =Math.ceil(studentManagement.length/rows)
    showData();
    paginationShow(current_page);
    text.style.display = ""
    addBox.style.display = "none";
    removeRe();
})

function removeRe(){
  document.querySelector("[courseId]").readOnly= false;
  document.querySelector("[courseName]").readOnly= false;
  document.querySelector("[courseTime]").readOnly= false;
  document.querySelector("[courseStatus]").removeAttribute('disabled', '');
}