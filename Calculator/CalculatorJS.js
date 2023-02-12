const output = document.querySelector(".results");
const buttons = document.querySelectorAll("button");
const error_popup = document.querySelector(".error")

function call_error(){
    error_popup.style.display = "initial";
    error_popup.style.animation = "out 0.5s ease forwards";
    setTimeout(()=>{
        error_popup.style.animation = "in 0.5s ease forwards";
        setTimeout(()=>(error_popup.style.display ="none"),500);
    },2000);
}

buttons.forEach((button) => {
    button.onclick = () => {
        if(button.id === "CE"){
            output.innerHTML = "";
        }
        else if(button.id === "DEL"){
            let current_calc = output.innerHTML.toString();
            output.innerHTML = current_calc.substring(0,current_calc.length-1);
        }
        else if(output.innerHTML !== "" && button.id === "equals"){
            try {
                let temp = eval(output.innerHTML);
                if(typeof temp === "undefined"){
                    output.innerHTML = "";
                    call_error();
                }
                else
                    output.innerHTML = temp;

            } catch (e) {
                output.innerHTML = "";
                call_error();
            }
        }
        else if(output.innerHTML === "" && button.id === "equals"){
            call_error();
        }
        else {
            if(button.id === "multiply"){
                output.innerHTML += "x";
            }else if(button.id === "divide"){
                output.innerHTML += "/";
            } else if(button.id === "plus"){
                output.innerHTML += "+";
            } else if(button.id === "minus"){
                output.innerHTML += "-";
            } else{
                output.innerHTML += button.id;
            }
        }
        console.log("clicked");
    }
})