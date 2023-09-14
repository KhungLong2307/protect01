var studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
const dataUsersTemplate = document.querySelector("[data-users-template]")
const classList = document.querySelector("[class-list]");

function showData(){
  let x = 0;
  classList.innerHTML = "";
  for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-Stt]")
    const dataId = card.querySelector("[data-Id]")
    const dataName = card.querySelector("[data-Name]");
    const dataTeacher = card.querySelector("[data-teacher]");
    const dataDescriber = card.querySelector("[data-describer]");
    const dataTolat = card.querySelector("[data-tolat]")
    const dataStatus = card.querySelector("[data-Status]")
    const dataWork01 = card.querySelector("[data-work01]");
    const dataWork02 = card.querySelector("[data-work02]");
    dataStt.textContent = ++x;
    dataId.textContent = studentManagement[i].arrClass[j].classId;
    dataName.textContent = studentManagement[i].arrClass[j].className;
    dataTeacher.textContent=studentManagement[i].arrClass[j].lecturer;
    dataDescriber.textContent=studentManagement[i].arrClass[j].description;
    dataTolat.textContent=studentManagement[i].arrClass[j].totalNumber;
    dataStatus.textContent=studentManagement[i].arrClass[j].status;
    dataWork01.setAttribute("onclick",`updateBtn(`+i+`,`+j+`)`);
    dataWork02.setAttribute("onclick",`deleteBtn(`+i+`,`+j+`)`);
    classList.append(card);
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
  let length = classList.getElementsByTagName("tr").length;
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
    classList.getElementsByTagName("tr")[i].classList.toggle('hide');
  }

  let start = (e-1)*rows;
  let end = start+rows;
  if(end>length){
    end=length;
  }
  for(let i=start; i<end ; i++){
    classList.getElementsByTagName("tr")[i].classList.remove('hide');
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
    classList.innerHTML = "";
    for(let i=0; i<studentManagement.length; i++){
    for(let j=0; j<studentManagement[i].arrClass.length; j++){
    const card = dataUsersTemplate.content.cloneNode(true).children[0];
    const dataStt = card.querySelector("[data-Stt]")
    const dataId = card.querySelector("[data-Id]")
    const dataName = card.querySelector("[data-Name]");
    const dataTeacher = card.querySelector("[data-teacher]");
    const dataDescriber = card.querySelector("[data-describer]");
    const dataTolat = card.querySelector("[data-tolat]")
    const dataStatus = card.querySelector("[data-Status]")
    const dataWork01 = card.querySelector("[data-work01]");
    const dataWork02 = card.querySelector("[data-work02]");
    dataStt.textContent = ++x;
    dataId.textContent = studentManagement[i].arrClass[j].classId;
    dataName.textContent = studentManagement[i].arrClass[j].className;
    dataTeacher.textContent=studentManagement[i].arrClass[j].lecturer;
    dataDescriber.textContent=studentManagement[i].arrClass[j].description;
    dataTolat.textContent=studentManagement[i].arrClass[j].totalNumber;
    dataStatus.textContent=studentManagement[i].arrClass[j].status;
    dataWork01.setAttribute("onclick",`updateBtn(`+i+`,`+j+`)`);
    dataWork02.setAttribute("onclick",`deleteBtn(`+i+`,`+j+`)`);
    if(studentManagement[i].arrClass[j].classId.toLowerCase().includes(value)||studentManagement[i].arrClass[j].className.toLowerCase().includes(value)||studentManagement[i].arrClass[j].lecturer.toLowerCase().includes(value)||studentManagement[i].arrClass[j].description.toLowerCase().includes(value)||studentManagement[i].arrClass[j].totalNumber.toString().toLowerCase().includes(value)||studentManagement[i].arrClass[j].status.toLowerCase().includes(value)){
    classList.append(card);
    }
    }
  }
  paginationShow(current_page); 
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

    document.querySelector("[classId]").value="";
    document.querySelector("[className]").value="";
    document.querySelector("[lecturer]").value="";
    document.querySelector("[totalNumber]").value="";
    document.querySelector("[description]").value="";
    document.querySelector("[classStatus]").value="Hoạt động";
    document.querySelector("[btnAdd]").style.display = "";
    document.querySelector("[btnEdit]").style.display = "none";
    document.querySelector("[btnDelete]").style.display = "none";
    addBoxUpText.textContent = "Quản lý Lớp học-Thêm mới lớp học";
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
  let courseId = document.querySelector("[courseId]").value;
  let classId = document.querySelector("[classId]").value;
  let className = document.querySelector("[className]").value;
  let lecturer = document.querySelector("[lecturer]").value;
  let totalNumber = document.querySelector("[totalNumber]").value;
  let description = document.querySelector("[description]").value;
  let classStatus = document.querySelector("[classStatus]").value;
  
  let x = 0;
  x = studentManagement.findIndex((user)=>{return user.courseId==courseId});
  
  classId = classId.toUpperCase();

  if(classId==""){
    alert("Tên lớp đang trống");
    return false;
  }
  if(className==""){
    alert("Tên lớp học đang trống!");
    return false;
  }
  if(lecturer==""){
    alert("Tên giảng viên đang trống");
    return false;
  }
  if(description==""){
    alert("Mô tả đang trống");
    return false;
  }
  if(classStatus==null){
    alert("Hãy chọn trạng thái hoạt động!");
    return false;
  }
  if(totalNumber==""){
    alert("Thời gian khóa học đang trống");
    return false;
  }
  else if(/^\d+$/.test(totalNumber)==false){
    alert("Thời gian khóa học không hợp lệ")
    return false;
  }
  studentManagement[x].arrClass.push({classId:classId,className:className,lecturer:lecturer,totalNumber:totalNumber,description:description,status:classStatus,arrStudent:[]});
  localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
  showData();
  paginationShow(current_page);
  text.style.display = ""
  addBox.style.display = "none";

})
let updateNumberx = 0;
let updateNumbery = 0;
function updateBtn(x,y){
  updateNumberx = x;
  updateNumbery = y;
  addBoxUpText.textContent = "Quản lý lớp học-Cập nhật lớp học";
  document.querySelector("[btnAdd]").style.display = "none";
  document.querySelector("[btnEdit]").style.display = "";
  document.querySelector("[btnDelete]").style.display = "none";

  document.querySelector("[courseId]").innerHTML= `<option value="`+studentManagement[x].courseId+`">`+studentManagement[x].courseId+`</option>`;
  document.querySelector("[courseId]").setAttribute("disabled","");
  document.querySelector("[classId]").value=  studentManagement[x].arrClass[y].classId;
  document.querySelector("[className]").value= studentManagement[x].arrClass[y].className;
  document.querySelector("[lecturer]").value= studentManagement[x].arrClass[y].lecturer;
  document.querySelector("[totalNumber]").value= studentManagement[x].arrClass[y].totalNumber;
  document.querySelector("[description]").value= studentManagement[x].arrClass[y].description;
  document.querySelector("[classStatus]").value= studentManagement[x].arrClass[y].status;
  
  text.style.display = "none"
  addBox.style.display = "";
}
document.querySelector("[btnEdit]").addEventListener("click",(e)=>{
  e.preventDefault();
  let courseId = document.querySelector("[courseId]").value;
  let classId = document.querySelector("[classId]").value;
  let className = document.querySelector("[className]").value;
  let lecturer = document.querySelector("[lecturer]").value;
  let totalNumber = document.querySelector("[totalNumber]").value;
  let description = document.querySelector("[description]").value;
  let classStatus = document.querySelector("[classStatus]").value;
  
  let x = 0;
  x = studentManagement.findIndex((user)=>{return user.courseId==courseId});
  
  if(className==""){
    alert("Tên lớp học đang trống!");
    return false;
  }
  if(lecturer==""){
    alert("Tên giảng viên đang trống");
    return false;
  }
  if(description==""){
    alert("Mô tả đang trống");
    return false;
  }
  if(classStatus==null){
    alert("Hãy chọn trạng thái hoạt động!");
    return false;
  }
  if(totalNumber==""){
    alert("Thời gian khóa học đang trống");
    return false;
  }
  else if(/^\d+$/.test(totalNumber)==false){
    alert("Thời gian khóa học không hợp lệ")
    return false;
  }
  studentManagement[updateNumberx].arrClass[updateNumbery] = {classId:classId,className:className,lecturer:lecturer,totalNumber:totalNumber,description:description,status:classStatus,arrStudent:studentManagement[updateNumberx].arrClass[updateNumbery].arrStudent};
  localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
  showData();
  paginationShow(current_page);
  text.style.display = ""
  addBox.style.display = "none";
})
let deleteNumberx = 0;
let deleteNumbery = 0;
function deleteBtn(x,y){
  deleteNumberx = x;
  deleteNumbery = y;
  let check = confirm("Bạn có muốn xóa lớp "+studentManagement[x].arrClass[y].className+" không?");
  if(check!=1){
    return -1;
  }
  else{
    studentManagement[deleteNumberx].arrClass.splice(deleteNumbery,1);
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
//     studentManagement[deleteNumberx].arrClass.splice(deleteNumbery,1);
//     localStorage.setItem("studentManagement",JSON.stringify(studentManagement));
//     showData();
//     paginationShow(current_page);
//     text.style.display = ""
//     addBox.style.display = "none";
//     removeRe();
// })

function removeRe(){
  document.querySelector("[courseId]").removeAttribute("disabled");
  document.querySelector("[classId]").readOnly= false;
  document.querySelector("[className]").readOnly= false;
  document.querySelector("[lecturer]").readOnly= false;
  document.querySelector("[totalNumber]").readOnly= false;
  document.querySelector("[description]").readOnly= false;
  document.querySelector("[classStatus]").removeAttribute('disabled', '');
}

