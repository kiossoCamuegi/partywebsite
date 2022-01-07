
function autocomplete(){
    let search = document.querySelectorAll(".searchform");
    let complete = document.querySelectorAll(".auto-complete")
   if (complete.length >= 1) {
       if (search.length >= 1) {
           let input = search[0];
           let container = complete[0];

          const searchStates = async searchText =>{
              const result = await fetch('js/data.json');
              const states = await result.json(); 
              //get matches to current text input
              let matches = states.filter(state =>{
                  const regex = new RegExp(`^${searchText}`,  'gi');
                  return state.name.match(regex) || state.abbr.match(regex);
              }); 

              if (searchText.length === 0) {
                  matches = [];
                 container.innerHTML = ""; 
                 container.style.display = "none";
              }else{
                  container.style.display = "block";
              }

              if (matches.length === 0) { 
                container.innerHTML = ""; 
                container.style.display = "none";
             }else{
                 container.style.display = "block";
             }
             
              outputHtml(matches);
          } 

        const outputHtml = matches =>{
            if (matches.length > 0) {
                  const html = matches.map(match =>`
                  <article link="pagename" class="founded-item" data-search="${match.name}">
                        <h6 class="title">${match.name} <span> ${match.abbr}</span></h6>
                        <small>${match.capital}</small>
                        <img src="./images/icons/autocomplete/${match.icon}" alt="">
                   </article> 
                  `).join('');
                  container.innerHTML = html;
                //
            }
        } 

        setInterval(() => {
            let dt = document.querySelectorAll(".founded-item");
            dt.forEach(page => {
                page.onclick = ()=>{
                    let link = page.getAttribute("pagename");
                    window.location.href = "search.html";
                }
            });
        }, 10);
          input.addEventListener("input",()=>searchStates(input.value)); 
          setInterval(() => {
            let links = container.querySelectorAll("article");
            if (links.length >= 1) {
                links.forEach(a => {
                  a.onclick = ()=>{
                    let target = a.getAttribute("data-search");
                   // alert(target);
                   setTimeout(() => {
                      // window.location.href = location.hostname +"/search.html?"+target;
                   }, 10);
                  } 
                });
            }
          }, 1);
          
       }
   }
}
autocomplete();

 function tabs_switch(main , header, container, active, a, b){
     let tab = document.querySelectorAll(main);
    if(tab.length >= 1){
        const tabMain = tab[0];
        const tab_header = tabMain.querySelector(header);
        const tab_body = tabMain.querySelector(container);
        let link = tab_header.querySelectorAll(a);
        let content = tab_body.querySelectorAll(b);
        for(let i = 0; i < link.length; i++){
           let x1 = link.length;
           let x2 = content.length;
           if (x1 == x2){
               link[i].onclick = ()=>{
                   tab_header.querySelector("."+active).classList.remove(active);
                   link[i].classList.add(active); 
                   tab_body.querySelector("."+active).classList.remove(active);
                   content[i].classList.add(active);
               }
           }
        }
    }
 }
tabs_switch(
    ".tab-filter",
    ".tab-filter-head",
    ".tab-filter-body",
    "active","li",
    ".item"
);
tabs_switch(
    ".provider-tab",
    ".provider-tab-header",
    ".provider-tab-body",
    "active","li",
    "aside"
);


function provider_video(){
    const btn = document.querySelectorAll(".play-provider-video");  
    btn.forEach(button =>{
        button.onclick = ()=>{
             button.classList.toggle("fa-play");
             button.classList.toggle("fa-pause");
        }
    });
}
provider_video();



function gallery_modal(){
    const main_modal = document.querySelectorAll(".gallery-modal");
    const font_items = document.querySelectorAll(".row-images");
    if(font_items.length >= 1){ 
        if (main_modal.length >= 1) {
            let My_gallery_items = [];
            let current_src;
            const modal = main_modal[0];
            const view = modal.querySelector(".gallery-modal-view img");
           let items = font_items[0].querySelectorAll("li");
           for (let i = 0; i < items.length; i++) {
                My_gallery_items.push(items[i].querySelector("img").src)
                items[i].onclick = ()=>{
                current_src = items[i].querySelector("img").src;
                modal.classList.toggle("showmodal");
                view.src = current_src;
              }
           } 
         const more_items = modal.querySelectorAll(".gallery-modal-items li");
          for(let e = 0; e < more_items.length; e++){
               more_items[e].onclick = ()=>{ 
                   
                   current_src = more_items[e].querySelector("img").src;
                   view.src = current_src;
               }
          }
         
          const close = modal.querySelector(".closemodal");
          close.onclick = ()=>{
              modal.classList.toggle("showmodal");
          }

           console.table(My_gallery_items);
        }
    }

}
gallery_modal();


function Homeslider(){
    let s = document.querySelectorAll(".hero-prt .slider");
    if (s.length >= 1) {
    let slides  = document.querySelector(".hero-prt .slider").children; 
    let authors = document.querySelector(".hero-slider-author").children; 
    const indicator = document.querySelector(".hero-controls ul");
    let index = 0;
    
 
    
     function NextSlider(){
         if(index == slides.length-1){
           index=0;
         }else{
             index++;
         }
         changeSlide();
    }
    
     
    
    function changeSlide(){
        /**remove active class for each slide */
         for(let i=0; i <slides.length; i++){
               slides[i].classList.remove("active")
         }
        slides[index].classList.add("active");

        for (let e = 0; e < authors.length; e++) {
            authors[e].classList.remove("active");
          }
          authors[index].classList.add("active");
    }
    
    
    
     /*create  Circle indicators */ 
    
     function circleIndicator(){
        for(let i=0; i< slides.length; i++){
             const div = document.createElement("div");
            // div.innerHTML = i+1; 
              div.id=i;
             /* To add the  active class to the circle */
                if(i==0){
                    div.className="active";
                }
             /* end */ 
    
             indicator.appendChild(div);  
             setInterval(() => {
                 let CT = indicator.querySelectorAll("div");
                for(let i = 0; i < CT.length; i++){
                    CT[i].onclick = ()=>{
                        index = CT[i].getAttribute("id");
                        console.log(index);
                        changeSlide()
                        updatecircleIndicator();
                        resetTimer();
                    }
                }
             }, 10);
        }
    } 
    circleIndicator()
     
    
    function updatecircleIndicator(){
        for(let i=0; i< indicator.children.length; i++){
              indicator.children[i].classList.remove("active");
        }
        indicator.children[index].classList.add("active");
    }
    
    function indicateSlide(element) {
         index=element.id;
         changeSlide()
         updatecircleIndicator();
         resetTimer();
    }
    
    function resetTimer(){
        // when click to indicator or controls button
        //stop timer
        clearInterval(timer);
        // then started again timer
        timer =  setInterval(autoplay, 6000)
    }
    
    
function autoplay(){
        NextSlider()
        updatecircleIndicator()
    }
    
    let timer = setInterval(autoplay, 6000);
    }     
}
 Homeslider();



function name(params) {
    
}



















  

 
    var url = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?49607';
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var options = {
  "enabled":true,
  "chatButtonSetting":{
      "backgroundColor":"#4dc247",
      "ctaText":"",
      "borderRadius":"25",
      "marginLeft":"0",
      "marginBottom":"50",
      "marginRight":"50",
      "position":"right"
  },
  "brandSetting":{
      "brandName":"Bodas",
      "brandSubTitle":"Normalmente responde dentro de um dia",
      "brandImg":"https://cdn.clare.ai/wati/images/WATI_logo_square_2.png",
      "welcomeText":"olá Amigo\ncomo posso ajudar ?",
      "messageText":"oi como posso ajudar ?",
      "backgroundColor":"#0a5f54",
      "ctaText":"Start Chat",
      "borderRadius":"25",
      "autoShow":false,
      "phoneNumber":"244916207099"
  }
};
    s.onload = function() {
        CreateWhatsappChatWidget(options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x); 




  

    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en'
        }, 'tr-google');
      }