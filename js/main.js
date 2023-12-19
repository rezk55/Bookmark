
'use strict'

var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var siteList = [];

siteName.addEventListener('mouseleave',function(){  
    if(validSiteName(siteName.value)){
        addClass(this,'was-validated');
    }
})
siteURL.addEventListener('mouseleave',function(){
    if(validURL(siteURL.value)){
        addClass(this,'was-validated');
    }
})

if(localStorage.getItem('sites')!=null){
    siteList = JSON.parse(localStorage.getItem('sites'));
    displayURLS();
}

function validate(){
    
    var siteNameVal = siteName.value;
    var url = siteURL.value;
    if(validSiteName(siteNameVal) && validURL(url)){
        main();
    }
    else {
        showModal(submit);
        submit.click();
        hideModal(submit);
    }
    
}

function main(){
    addURL();
    displayURLS();
    removeClass(siteName,'was-validated');
    removeClass(siteURL,'was-validated');
    clearInput();
}

function clearInput(){
    siteName.value = '';
    siteURL.value = '';
}

function addClass(el,className){
    el.parentElement.classList.add(className);
}

function removeClass(el,className){
    el.parentElement.classList.remove(className);
}

function showModal (btnModal){
    btnModal.setAttribute("data-bs-target","#myModal");
    btnModal.setAttribute("data-bs-toggle","modal");
}

function hideModal(btnModal){
    btnModal.removeAttribute("data-bs-target","#myModal");
    btnModal.removeAttribute("data-bs-toggle","modal");
}

function validSiteName(siteName){
    return (siteName.length > 2);
}

function validURL(myURL){
    
    // /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
    var expression = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    var regex = new RegExp(expression);
    var t = myURL;

    if (t.match(regex)) {
       return true;
    } else {
       return false;
    }
}

function addURL(){

    var site = {
        name:siteName.value,
        url:siteURL.value,
    };
   
    siteList.push(site);
    localStorage.setItem('sites',JSON.stringify(siteList));
   
}

function displayURLS(){
    var url = '';
    for(let i=0;i<siteList.length;i++){
        url += `<tr>
                    <td>${i+1}</td>
                    <td>${siteList[i].name}</td>
                    <td>
                      <a class="btn btn-success btn-visit" href="https://${siteList[i].url}" target="_blank"><i class="fa fa-eye"></i> <span class="d-inline-block">Visit</span> </a> 
                     </td>
                    <td><button class="btn btn-danger" onclick="deleteURL(${i})"> <i class="fa fa-trash-can"></i> <span class="d-inline-block">Delete</span></button></td>
                </tr>`;
    }
    // console.log(localStorage.sites);
    document.getElementById('showURL').innerHTML = url;
}

function deleteURL(index){
    siteList.splice(index,1);
    localStorage.setItem('sites',JSON.stringify(siteList));
    displayURLS();
}