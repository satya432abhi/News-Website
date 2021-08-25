// javascript code for the headlines
//  API key: 3fb8558221cd4983938cb337ccd03961 

//initialize the news api parameters
let apiKey = '3fb8558221cd4983938cb337ccd03961';

` <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
<label class="btn btn-outline-primary" for="btnradio1">All</label>`;
let category='general';
helper(category);
let clicked = document.getElementsByClassName('btn-outline-primary');
console.log(clicked.length);
for(let i=0;i<clicked.length;i++)
{
    clicked[i].addEventListener('click',function(){
       helper(this.innerHTML);       
    })
}


function helper(category)
{
     //let it empty to be selected by the user later
        
     
     console.log(category);
     let source='in';
     //grab the news headline
     let newsAccordion = document.getElementById('newsAccordion');
     console.log(newsAccordion);
     // category='health';
     //create a get request
     const xhr = new XMLHttpRequest();
     xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=${source}&category=${category}&apiKey=${apiKey}`,true);

     xhr.onload = function()
     {
         if(this.status == 200)
         {
             // console.log(this.responseText);
             let json = JSON.parse(this.responseText);
             // console.log(json);
             let articles = json.articles;
             // console.log(articles);

             let newsHtml="";
             articles.forEach(function(element,index) {
                 
                 console.log(element);
                 let news = `<div class="accordion" id="newsAccordion">
                             <div class="accordion-item">
                             <h2 class="accordion-header" id="heading${index}">
                                 <button
                                 class="accordion-button"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapse${index}"
                                 aria-expanded="true"
                                 aria-controls="collapse${index}"
                                 >
                                 <b>Breaking News ${index+1} : &nbsp;</b>${element.title}
                                 </button>
                             </h2>
                             <div
                                 id="collapse${index}"
                                 class="accordion-collapse collapse "
                                 aria-labelledby="heading${index}"
                                 data-bs-parent="#accordionExample"
                             >
                                 <div class="accordion-body">
                                 ${element.content} . <a href="${element['url']}" target="_blank" style="text-decoration:none;">Read more here</a>
                                 </div>
                             </div><br>`;
                     newsHtml+=news;
             });

             newsAccordion.innerHTML = newsHtml;
         }
         else
         {
             console.log('some error occured');
         }
     }
     xhr.send();
}
