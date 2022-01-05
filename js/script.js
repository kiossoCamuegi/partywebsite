
const GET = (e)=> {return document.querySelectorAll(e)}



function input_reset(input_container){
  if (input_container.length >= 1) {
      let container = input_container[0];
      const input = container.querySelectorAll("input");
      const reset = container.querySelectorAll(".btn");
       if (input.length >= 1 || reset.length >= 1){
           for(let e = 0; e < input.length; e++) {
                  setInterval(() => {
                      if (input[e].value.length >= 1){
                          if (reset[e].type === "reset") {
                              if(!reset[e].classList.contains("active")){
                                 reset[e].classList.toggle("active");
                              } 
                          }
                      }else{
                        if(reset[e].classList.contains("active")){
                            reset[e].classList.toggle("active");
                         } 
                      }
                  }, 10);
           }
       }
  }
}
input_reset(GET(".search-input"));





function back_history(){
     let btn = GET(".back-btn");
     if (btn.length >= 1) {
         btn.forEach(link => {
             link.onclick = ()=>{
                 window.history.back();
             }
         });
     }
}
back_history();