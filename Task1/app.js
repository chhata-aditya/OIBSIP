const btn = document.querySelector(".theme-toggle");
const btnToggle = document.querySelector(".theme-toggle span");

btn.onclick = function(){
    btnToggle.classList.toggle("active-btn");
    document.body.classList.toggle("active-dark")
}

const Entered_value = document.querySelector('.result-1');
const Result1 = document.querySelector('.result-2');
const sideResult = document.querySelector('.side-result'); 
const nums = document.querySelectorAll('.number');
const ops = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clearAll = document.querySelector('.clear_all');
const clearRecent = document.querySelector('.recent-value');
let nums_entered_value = '';
let Result_value = '';
let result = null;
let recent_op = '';
let consist_period = false;
let calc_value = document.getElementsByClassName("result-1");
let res_value = document.getElementsByClassName("result-2");


nums.forEach( number => {
  number.addEventListener('click', (e)=>{
    if(e.target.innerText === '.' && !consist_period){
      consist_period = true;
    } else if (e.target.innerText === '.' && consist_period){
      return;
    }
    Result_value += e.target.innerText;
    Result1.innerText = Result_value;
  })
})

ops.forEach( operation => {
  operation.addEventListener('click', (e)=> {
    if (!Result_value) return;
    consist_period = false;
    const operationName = e.target.innerText;
    if (nums_entered_value && Result_value && recent_op){
      calculate();

    }else{
      result = parseFloat(Result_value);
    }
    clear_value(operationName);
    recent_op = operationName;
    console.log(result)
  })
});

function clear_value(name = ''){
  nums_entered_value += Result_value + ' ' + name + ' ';
  Entered_value.innerText = nums_entered_value;
  Result1.innerText = '';
  Result_value = '';
  sideResult.innerText = result;
}

function calculate() {
  if (recent_op === 'x') {
    result = parseFloat(result) * parseFloat(Result_value);
  } else if (recent_op === '+') {
    result = parseFloat(result) + parseFloat(Result_value);
  } else if (recent_op === '-') {
    result = parseFloat(result) - parseFloat(Result_value);
  } else if (recent_op === '/') {
    result = parseFloat(result) / parseFloat(Result_value);
  }else if( recent_op === '%'){
    result = parseFloat(result) % parseFloat(Result_value);
  }
}

equal.addEventListener('click', ()=> {
  if (!Result_value || !nums_entered_value) return;
  consist_period = false;
  calculate();
  clear_value();
  Result1.innerText = result;
  sideResult.innerText = '';
  Result_value = result;
  nums_entered_value = '';
  showHistoryResults();
})

clearAll.addEventListener('click', ()=>{
  nums_entered_value = '';
  Result_value = '';
  Entered_value.innerText ='';
  Result1.innerText ='';
  result = '';
  sideResult.innerText = '';
});

clearRecent.addEventListener('click', () => {
  Result1.innerText = '';
  Result_value= '';
});

window.addEventListener('keydown', (e)=>{
  if(e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '.' 
  ){
    keyboard_btns(e.key)
  }else if(e.key === '+' || e.key === '-' || e.key === '/' || e.key === '%'){
    keyboard_ops(e.key);
  }
  else if(e.key === '*'){
    keyboard_ops('x')
  } else if( e.key == "Enter" || e.key === '='){
    clickEqual();
  }
})
function keyboard_btns(key) {
  nums.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}
function keyboard_ops(key){
  ops.forEach( operation => {
    if(operation.innerText === key){
      operation.click()
    }
  })
}
function clickEqual(){
  equal.click();
}


function showHistoryResults(){
  let history = document.getElementById("history");
  paragraph = document.createElement('p');
  heading = document.createElement('h1');
  upper_hist_Value = calc_value[0].innerHTML;
  lower_hist_Value = res_value[0].innerHTML;
  paragraph.innerText = upper_hist_Value;
  heading.innerText = lower_hist_Value;
  history.appendChild(paragraph);
  history.appendChild(heading);
}
deleteHistory = document.querySelector(".deleteHistory");
deleteHistory.onclick = function() {
  document.getElementById("history").innerHTML = "";
}


function show_hide_btns_results() {
  showHistory = document.querySelector(".showHistory");
  showClosebtn = document.querySelector(".historyShower");
  hideClosebtn = document.querySelector(".closeBtn");
  deleteHistory = document.querySelector(".deleteHistory");

  hist = document.querySelector(".hist");
  hist.classList.toggle("active");
  showClosebtn.classList.toggle("active");
  hideClosebtn.classList.toggle("active");
  deleteHistory.classList.toggle("active");
}