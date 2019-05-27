var result = 0 ;
var expression = '';
var numString = '';
var prevOp;
var clearText = false ;
var display = document.getElementById('resultPannel');

function addListeners() {
    var literalButtons = document.querySelectorAll('.literal') ;
    literalButtons.forEach(function(button){
        button.addEventListener('click',function(){
            handleButton(this);
        });
    });

    var opButtons = document.querySelectorAll('.literalOp');
    opButtons.forEach(function(button){
        button.addEventListener('click',function(){
            handleOperation(this);
        })
    });
}

function handleButton(button) {
    if (clearText === true) {
        display.innerHTML = '' ;
        clearText = false ;
        numString = '';
    }
    numString = numString + button.value ;
    expression = expression + button.value ;
    display.innerHTML = numString ;
}


function handleOperation(opButton) {    
    clearText = true ;
    expression = expression + opButton.value ;

}



function displayResult() {
    var operand = '' ;
    evaluation:
    for(let i = 0; i < expression.length ; i++){
        if ( (isNaN(expression[i])==true) || (i == expression.length - 1) ) {
            if (i == expression.length - 1 && !isNaN(expression[i]) ){
                operand += expression[i];
            }
            if (prevOp){
                switch(prevOp){
                    case '+':
                        result = result + parseInt(operand) ;
                        break;
                    case '-':
                        result = result - parseInt(operand) ;
                        break;
                    case '*':
                        result  = result * parseInt(operand) ;
                        break;
                    case '/':
                        if (operand == '0' ){
                            result = 'error';
                            break evaluation;           
                        } 
                        result = result / parseInt(operand) ;
                        break;       
                }                   
            }
            else {
                result += parseInt(operand);
                console.log(result);
            }
            operand = '';
            prevOp = expression[i];
        }
        else {
            operand += expression[i];
        }
    }

    display.innerHTML = result ;
    result = 0;
    numString = '';
}

function reset() {
    result = 0;
    expression = numString = '';
    prevOp = undefined ;
    clearText = false;
    display.innerHTML = '';
}