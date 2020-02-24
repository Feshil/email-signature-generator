"use strict"
window.onload = function(){
    getData();
    if(!form.checkworknum.checked){
        form.tel.disabled = true;
        form.tel.parentElement.addEventListener('click', thatNeed);
    }
    if(form.countCode.value){
        characters = +form.countCode.value.length;
        chNumber = form.countCode.value;
    }
    changePlaceholder();
    Particles.init({
        selector: '.background',
        color: '#ffffff',
        connectParticles: true
    });
    interval = setInterval(()=>{
        saveData();
        if (form.name.value !== ""||form.doljnost.value !== ""||form.tel.value !== ""||form.mobile.value !== ""||form.mail.value !== "") {
            generateSign(form);
        }
    },50);
}

const form = document.getElementById("main-form");
let interval;
let intervalInternal;
let urlsStamp = [
    'https://hybrid.ai/images/signature/stamp_pl.png',
    'https://hybrid.ai/images/signature/stamp_rus.png'
];


function saveData(){
    for(let i = 0; i <=5; i++){
        localStorage.setItem(form.elements[i].name,form.elements[i].value)
    }
    for(let i = 6; i <=9; i++){
        localStorage.setItem(form.elements[i].name,form.elements[i].checked)
    }
    let date = new Date();
    localStorage.setItem('Last Update', date)
}

function getData(){
    if(!localStorage.getItem('Last Update')){
        localStorage.clear();
    }else{
        let lastUpdate = new Date(localStorage.getItem('Last Update'));
        if (lastUpdate.setDate(lastUpdate.getDate() + 7) < new Date){
            localStorage.clear();
        }else{
            for(let i = 0; i <=5; i++){
                let inputValue = localStorage.getItem(form.elements[i].name);
                form.elements[i].value = inputValue;
            }
            for(let i = 6; i <=9; i++){
                let inputCheked = localStorage.getItem(form.elements[i].name);
                if(!inputCheked) continue;
                if(inputCheked === "false"){
                    form.elements[i].checked = false;
                }else{
                    form.elements[i].checked = true;
                }
            }
        }
    }
}

function generateSign(form) {
    saveData();
    clearInterval(interval);
    let email = form.mail.value + "@hybrid.ai";
    let fblink = 'https://www.facebook.com/hybridrussia/';
    if (email === 'd.shevchenko@hybrid.ai'
        || email === 'a.iwinski@hybrid.ai'
        || email === 'k.budzaj@hybrid.ai') {
        fblink = 'https://www.facebook.com/Hybrid-Poland-412545579183526/';
    }
    let template = [
        "<div style='display:flex;align-items:center;box-sizing:border-box;border:4px double black;padding:20px;min-height:190px;border-radius: 10px;'>"
                + "<table bgcolor='#ffffff' id='generSignature' cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;border-radius: 10px;'>"
                    + "<tbody>"
                        + "<tr>"
                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 10px 20px 10px 10px;'><a href='https://hybrid.ai/' target='_blank'><img alt='logo' src='https://hybrid.ai/images/signature/new/logo_hyb.png' style='display:inline;width: 200px;' /></a></td>"
                            + "<td nowrap id='td-2' valign='middle' style='vertical-align:middle;padding:10px 10px 10px 20px;border-left:1px solid #B2B2C7'>"
                                + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                    + "<tbody>"
                                        + "<tr>"
                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 5px 0;'>"
                                                +"<span id='name-out' style='display:block;font-size: 18px; line-height: 18px; font-family: \"Segoe UI\", Arial, sans-serif; color: #2c3d4f; font-weight: bold;'>" + form.name.value + "</span>"
                                            + "</td>"
                                        + "</tr>"
                                        + "<tr>"
                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 12px 0;'>"
                                                + "<span id='doljnost-out' style='display:block;font-size: 14px; line-height: 14px; font-family: \"Segoe UI\", Arial, sans-serif; color: #C457BD; font-weight: normal;'>" + form.doljnost.value + "</span>"
                                            + "</td>"
                                        + "</tr>"
                                        + "<tr id='cont-phone'>"
                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 5px 0;'>"
                                                + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                                    + "<tbody>"
                                                        + "<tr>"
                                                            + "<td nowrap align='center' valign='middle' style='vertical-align:middle;padding: 0 5px 0 0;'>"
                                                                + "<img alt='ph' style='display:block;' src='https://hybrid.ai/images/signature/new/phone.png?v=1'/>"
                                                            + "</td>"
                                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 0 0;'>"
                                                                + "<span id='tel-out' style='display:block;line-height: 12px;font-size: 12px; font-family: \"Segoe UI\", Arial, sans-serif; color: #55606E;'>+" + form.tel.value + "</span>"
                                                            + "</td>"
                                                        + "</tr>"
                                                    + "</tbody>"
                                                + "</table>"
                                            + "</td>"
                                        + "</tr>"
                                        + "<tr>"
                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 5px 0;'>"
                                                + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                                    + "<tbody>"
                                                        + "<tr>"
                                                            + "<td nowrap align='center' valign='middle' style='vertical-align:middle;padding: 0 7px 0 2px;'>"
                                                                + "<img alt='mb' style='display:block;' src='https://hybrid.ai/images/signature/new/mobile.png?v=1'/>"
                                                            + "</td>"
                                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 0 0;'>"
                                                                + "<span id='mobile-out' style='display:block;line-height: 12px;font-size: 12px; font-family: \"Segoe UI\", Arial, sans-serif; color: #55606E;'>+" + form.mobile.value +"</span>"
                                                            + "</td>"
                                                        + "</tr>"
                                                    + "</tbody>"
                                                + "</table>"
                                            + "</td>"
                                        + "</tr>"
                                        + "<tr>"
                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 5px 0;'>"
                                                + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                                    + "<tbody>"
                                                        + "<tr>"
                                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 7px 0 0;'>"
                                                                + "<a id='email1-out' href='mailto:'+ email>"
                                                                    + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                                                        + "<tbody>"
                                                                            + "<tr>"
                                                                                + "<td nowrap align='center' valign='middle' style='vertical-align:middle;padding: 0 5px 0 0;'>"
                                                                                    + "<img alt='mail' style='display:block;' src='https://hybrid.ai/images/signature/new/letter.png?v=1'/>"
                                                                                + "</td>"
                                                                                + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 0 0 0;'>"
                                                                                    + "<span id='email2-out' style='display:block;line-height: 12px;font-size: 12px; font-family: \"Segoe UI\", Arial, sans-serif; color: #55606E;'>" + email + "</span>"
                                                                                + "</td>"
                                                                            + "</tr>"
                                                                        + "</tbody>"
                                                                    + "</table>"
                                                                + "</a>"
                                                            + "</td>"
                                                            + "<td nowrap>"
                                                                + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                                                    + "<tbody>"
                                                                        + "<tr>"
                                                                            + "<td nowrap align='center' valign='middle' style='vertical-align:middle;padding: 0 5px 0 0;'>"
                                                                                + "<a href='http://hybrid.ai' target='_blank'>"
                                                                                    + "<img alt='web' style='display:block;' src='https://hybrid.ai/images/signature/new/web.png?v=1'/>"
                                                                                + "</a>"
                                                                            + "</td>"
                                                                            + "<td nowrap valign='middle' style='vertical-align:middle;padding: 0 16px 0 0;'>"
                                                                                + "<a href='http://hybrid.ai' target='_blank'>"
                                                                                    + "<span style='display:block;line-height: 12px;font-size: 12px;font-family: \"Segoe UI\", Arial, sans-serif; color: #55606E'>hybrid.ai</span>"
                                                                                + "</a>"
                                                                            + "</td>"
                                                                        + "</tr>"
                                                                    + "</tbody>"
                                                                + "</table>"
                                                            + "</td>"
                                                        + "</tr>"
                                                    + "</tbody>"
                                                + "</table>"
                                            + "</td>"
                                        + "</tr>"
                                        + "<tr>"
                                            + "<td nowrap id='cont-soc-link' style='padding: 0px 0px 0px 0px;'>"
                                                + "<table cellpadding='0' cellspacin='0' border='0' style='border-spacing:0;border-collapse:collapse;'>"
                                                    + "<tbody>"
                                                        + "<tr>"
                                                            + "<td style='padding: 0px 5px 0px 0px;'>"
                                                                + "<a href=" + fblink + " target='_blank'><img alt='fb' style='display:block;width: 16px' src='https://hybrid.ai/images/signature/new/facebook.png?v=4'/></a>"
                                                            + "</td>"
                                                            + "<td style='padding: 0px 5px 0px 0px;'>"
                                                                + "<a href='https://www.instagram.com/hybrid_official' target='_blank'><img alt='inst' style='display:block;width: 16px' src='https://hybrid.ai/images/signature/new/instagram.png?v=4' /></a>"
                                                            + "</td>"
                                                            + "<td style='padding: 0px 5px 0px 0px;'>"
                                                                + "<a href='https://twitter.com/Hybrid_Russia' target='_blank'><img alt='tw' style='display:block;width: 16px' src='https://hybrid.ai/images/signature/new/twitter.png?v=4' /></a>"
                                                            + "</td>"
                                                            + "<td style='padding: 0px 0px 0px 0px;'>"
                                                                + "<a href='https://www.youtube.com/channel/UCZJDmPu1j3Vzxo7GpBQdt5w' target='_blank'><img alt='youtube' style='display:block;width: 16px' src='https://hybrid.ai/images/signature/new/youtube.png?v=4' /></a>"
                                                            + "</td>"
                                                        + "</tr>"
                                                    + "</tbody>"
                                                + "</table>"
                                            + "</td>"
                                        + "</tr>"
                                    + "</tbody>"
                                + "</table>"
                            + "</td>"
                        + "</tr>"
                    + "</tbody>"
                + "</table>"
                + "<div></div>"
            + "</div>"
    ];
    let containerSign = document.getElementById('sign');
    containerSign.innerHTML = template[0];

    let column2 = document.getElementById('td-2');
    if(form.checkstamppl.checked){
        column2.insertAdjacentHTML('afterend', `<td nowrap id='td-3' valign='middle' style='vertical-align:middle;padding: 0 0 0 10px;'><img id='img-stamp' alt='stamp' src='${urlsStamp[0]}' style='display:block;width: 100px;'/></td>`);
    }else if(form.checkstamprus.checked){
        column2.insertAdjacentHTML('afterend', `<td nowrap id='td-3' valign='middle' style='vertical-align:middle;padding: 0 0 0 10px;'><img id='img-stamp' alt='stamp' src='${urlsStamp[1]}' style='display:block;width: 100px;'/></td>`);
    }
    if(!form.checksoclink.checked){
        document.getElementById('cont-soc-link').remove();
    }

    if(!form.checkworknum.checked){
        document.getElementById('cont-phone').remove();
        delTooltip(form.tel);
        form.tel.disabled = true;
        form.tel.parentElement.addEventListener('click', thatNeed);
    }else{
        form.tel.disabled = false;
        form.tel.parentElement.removeEventListener('click', thatNeed);
    }
    let bName = document.getElementById("name-out"),
        bDoljnost = document.getElementById("doljnost-out"),
        bTel = document.getElementById("tel-out"),
        bMobile = document.getElementById("mobile-out"),
        bMail1 = document.getElementById("email1-out"),
        bMail2 = document.getElementById("email2-out");

    intervalInternal = setInterval(()=>{
        bName.textContent = form.name.value;
        bDoljnost.textContent = form.doljnost.value;
        if(form.checkworknum.checked)bTel.textContent = "+" + form.tel.value;
        bMobile.textContent ="+" + form.mobile.value;
        bMail1.setAttribute('href', 'mailto:'+ form.mail.value +'@hybrid.ai');
        bMail2.textContent = form.mail.value+"@hybrid.ai";
        saveData();
    },50);
}

let labelWorkNum = document.getElementById('label-work-num');
function thatNeed(){
        labelWorkNum.classList.add('that');
    setTimeout(() => {
        labelWorkNum.classList.remove('that');
    }, 300);
}

function validName(e){
    let target = this;
    function check(e){
        let availNumber =/[\d\@\(\)\{\}\-\_\=\+\/\\\|\*\&\?\'\"\`\~\#\$\%\^\№\:\;\!\,\.\<\>]/.test(target.value);
        if(availNumber){
            let positionNum = target.value.search(/[\d\@\(\)\{\}\-\_\=\+\/\\\|\*\&\?\'\"\`\~\#\$\%\^\№\:\;\!\,\.\<\>]/);
            target.setSelectionRange(positionNum, positionNum + 1);
            showTooltip(target, "There should not be a number and specials. characters");
        }
        else {
            delTooltip(target);
        }
    }
    function key(e){
        let key = e.key;
        if((e.ctrlKey || e.metaKey) || (key >= '0' && key <= '9') || key == '(' || key == ')'){e.preventDefault()}
    }
    function cl(e){
        check(e);
        target.removeEventListener('input', check);
        target.removeEventListener('keydown', key);
        target.removeEventListener('blur', cl);
    }
    target.addEventListener('input', check);
    target.addEventListener('keydown', key);
    target.addEventListener('blur', cl);
}
form.name.addEventListener('focus', validName);
document.addEventListener('DOMContentLoaded', ()=>{
    form.name.focus();
},{once:true});

let mapTooltip = new Map;
function showTooltip(target, text = 'lorem ispum', id = Math.round((Math.random() * 1000) + 100)){
    if(mapTooltip.has(target.name))return;
    target.style.border="2px solid red";
    let top = target.getBoundingClientRect().top + window.pageYOffset;
    let left = target.getBoundingClientRect().right + window.pageXOffset ;
    let tooltip = document.createElement('div');
    mapTooltip.set(target.name, tooltip);
    tooltip.className = "tooltip";
    tooltip.innerHTML = text;
    tooltip.toolId = id;
    tooltip.style.top = top + 'px';
    tooltip.style.left = 10 + left + 'px';
    document.body.append(tooltip);
    setTimeout(()=>{
        tooltip.classList.add('active');
    });
}
function delTooltip(target){
    if(mapTooltip.has(target.name)){
        target.style.border="2px solid #fff";
        let tooltip = mapTooltip.get(target.name);
        mapTooltip.delete(target.name);
        tooltip.classList.remove('active');
        setTimeout(()=>{
            tooltip.remove();
        },300);
    }
}
function getTooltipId(target){
    let tooltip = mapTooltip.get(target.name);
    if(tooltip){
        return tooltip.toolId
    }else{
        return undefined
    }
}

let characters = 1,
    chNumber = "1";
function changePlaceholder(){
    inputsTel.forEach((el)=>{
        el.setAttribute('placeholder',`(${chNumber}) 777 777 77 77`);
    });
}
form.countCode.addEventListener('input',(e)=>{
    const target = e.target;
    if(target.value > 999){
        target.value = '999';
    }
    if(target.value !== '' && !/[^\d]/.test(target.value)){
        characters = +target.value.length;
        chNumber = target.value;
        inputsTel.forEach((el)=>{
            if(!el.value || +el.value.length <= 4){
                el.value = chNumber + " ";
            }
        });
        changePlaceholder();
    }else{
        characters = 1;
        chNumber = "1";
        changePlaceholder();
    }
});

let inputsTel = document.querySelectorAll("input[type='tel']");
inputsTel.forEach((el)=>{
    el.addEventListener('focus', validTel);
});
function validTel(e){
    const target = this;
    let prevLength = 0;
    function check(e){
        let caretca = target.selectionStart;
        let value = target.value;
        let vLength = value.length;
        let arrValue = value.split('');
        function editValue(num){
            arrValue.splice(num, 0, " ");
            let strValue = arrValue.join('');
            target.value = strValue;
        }
        // add spaces if there are no unnecessary characters
        for(let i = 0; i <= vLength + 4; i++){
            if(arrValue[characters] !== " " && /\d/.test(arrValue[characters-1]) && prevLength < vLength){
                editValue(characters);
                caretca +=1
            }else if(arrValue[characters+4] !== " " && /\d/.test(arrValue[characters+3]) && prevLength < vLength){
                editValue(characters+4);
                caretca +=1
            }else if(arrValue[characters+8] !== " " && /\d/.test(arrValue[characters+7]) && prevLength < vLength){
                editValue(characters+8);
                caretca +=1
            }else if(arrValue[characters+11] !== " " && /\d/.test(arrValue[characters+10]) && prevLength < vLength){
                editValue(characters+11);
                caretca +=1
            }
        }
        let position = target.value.search(/[^\d\s]/);
        if(position === -1){
            // validation
            let isRight = /\d{1,3} \d{3} \d{3} \d{2} \d{2}/.test(target.value);
            if(isRight || value === ''){
                delTooltip(e.target);
            }else{
                if(getTooltipId(e.target) === 2){
                    delTooltip(e.target);
                }
                showTooltip(e.target, "Enter the full number", 1);
            }
        }else{
            if(getTooltipId(e.target) === 1){
                delTooltip(e.target);
            }
            showTooltip(e.target, "Invalid characters", 2);
        }
        // cut off the excess
        if (vLength > characters + 14){
            arrValue.splice(characters + 14);
            let strValue = arrValue.join('');
            vLength = strValue.length;
            target.value = strValue;
        }
        if(position !== -1){
            target.setSelectionRange(position, position + 1);
        }else{
            target.setSelectionRange(caretca, caretca);
        }
        prevLength = vLength;
    }
    function key(e){
        let key = e.key;
        let code = e.code;
        let ctrl = e.ctrlKey;
        let meta = e.metaKey;
        if(
            !(
                (key >= '0' && key <= '9')
                || key == 'ArrowLeft'
                || key == 'ArrowRight'
                || key == 'Delete'
                || key == 'Backspace'
                || key == 'Tab'
                || key == 'Control'
                || ((ctrl || meta) && code == 'KeyC')
                || ((ctrl || meta) && code == 'KeyV')
                || ((ctrl || meta) && code == 'KeyA')
            )
        ){
            e.preventDefault();}
    }
    function cl(){
        target.removeEventListener('input', check);
        target.removeEventListener('keydown', key);
        target.removeEventListener('blur', cl);
    }
    check(e);
    target.addEventListener('input', check);
    target.addEventListener('keydown', key);
    target.addEventListener('blur', cl);
}

function validMail(e){
    let target = this;
    function check(e){
        let avail =/[^\w.]/.test(target.value);
        if(avail){
            let positionNum = target.value.search(/[^\w.]/);
            target.setSelectionRange(positionNum, positionNum + 1);
            showTooltip(e.target, "Part of the mail before the @ symbol");
        }
        else {
            delTooltip(e.target);
        }
    }
    function key(e){
        let key = e.key;
        if(key === '@'){e.preventDefault()}
    }
    function cl(e){
        check(e);
        target.removeEventListener('input', check);
        target.removeEventListener('keydown', key);
        target.removeEventListener('blur', cl);
    }
    target.addEventListener('input', check);
    target.addEventListener('keydown', key);
    target.addEventListener('blur', cl);
}
form.mail.addEventListener('focus', validMail);

form.checkstamppl.addEventListener('input', ()=>{
    if(!form.checkstamppl.checked && form.checkstamprus.checked && intervalInternal){
        return
    }else if(form.checkstamppl.checked && form.checkstamprus.checked && intervalInternal){
        form.checkstamprus.checked = false;
        document.getElementById('img-stamp').src = urlsStamp[0];
    }else if(form.checkstamppl.checked && !form.checkstamprus.checked && intervalInternal){
        document.getElementById('td-2').insertAdjacentHTML('afterend', `<td nowrap id='td-3' valign='middle' style='vertical-align:middle;padding: 0 0 0 10px;'><img id='img-stamp' alt='stamp' src='${urlsStamp[0]}' style='display:block;width: 100px;'/></td>`);
    }else if(!form.checkstamppl.checked && !form.checkstamprus.checked && intervalInternal){
        document.getElementById('td-3').remove();
    }else{
        clearInterval(intervalInternal);
        generateSign(form);
    }
});
form.checkstamprus.addEventListener('input', ()=>{
    if(!form.checkstamprus.checked && form.checkstamppl.checked && intervalInternal){
        return
    }else if(form.checkstamprus.checked && form.checkstamppl.checked && intervalInternal){
        form.checkstamppl.checked = false;
        document.getElementById('img-stamp').src = urlsStamp[1];
    }else if(form.checkstamprus.checked && !form.checkstamppl.checked && intervalInternal){
        document.getElementById('td-2').insertAdjacentHTML('afterend', `<td nowrap id='td-3' valign='middle' style='vertical-align:middle;padding: 0 0 0 10px;'><img id='img-stamp' alt='stamp' src='${urlsStamp[1]}' style='display:block;width: 100px;'/></td>`);
    }else if(!form.checkstamprus.checked && !form.checkstamppl.checked && intervalInternal){
        document.getElementById('td-3').remove();
    }else{
        clearInterval(intervalInternal);
        generateSign(form);
    }
});

form.checksoclink.addEventListener('input', ()=>{
    if(document.getElementById('cont-soc-link')){
        document.getElementById('cont-soc-link').remove();
    }else{
        clearInterval(intervalInternal);
        generateSign(form);
    }
});
form.checkworknum.addEventListener('input', ()=>{
    if(document.getElementById('cont-phone')){
        document.getElementById('cont-phone').remove();
        delTooltip(form.tel);
        form.tel.disabled = true;
        form.tel.parentElement.addEventListener('click', thatNeed);
    }else{
        clearInterval(intervalInternal);
        generateSign(form);
    }
});

const btnCopy = document.getElementById('copy');
function createBox(text, color){
    let styleBox = "margin-bottom:10px;padding:10px 20px;font-size:28px;background-color:#fff;box-shadow: 0 0 30px 1px #00000040;border-radius:20px;"
    let div = document.createElement('div');
    let boxAlerts = document.getElementById('alerts');
    div.textContent = text;
    div.style.cssText = styleBox + color;
    boxAlerts.append(div);
    setTimeout(()=> div.remove(),1000);
}
btnCopy.addEventListener('click', ()=>{
    let Signature = document.getElementById('generSignature');
    try {
        window.getSelection().removeAllRanges();
        window.getSelection().selectAllChildren(Signature);
        let successful = document.execCommand('copy');
        window.getSelection().removeAllRanges();
        if(!successful) {throw new Error('Nothing to copy')};
        createBox("Copy successfully", "color: green");
    } catch (e){
        createBox("Nothing to copy", "color: red");
    }
});

let btnReset = document.getElementById('reset');
btnReset.addEventListener('click',()=>{
    clearInterval(intervalInternal);
    for(let i = 0; i <= 5; i++){
        delTooltip(form.elements[i]);
    }
    form.checksoclink.checked = false;
    form.checkworknum.checked = false;
    form.checkstamppl.checked = false;
    form.checkstamprus.checked = false;
    generateSign(form);
});