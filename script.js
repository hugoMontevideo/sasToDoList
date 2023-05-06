//************************     ********************/
//************  VAR & CONST    ********************/
//************************     ********************/

const addToDoButton = document.getElementById('addToDo');         // Je creer une variable lié au button, avec le content de "addToDo"
const toDoContainer = document.getElementById('toDoContainer');   // Je creer une variable lié au container avec le content de "toDoContainer"
const inputField = document.getElementById('inputField');

let todoLines = []; // contient le numero de ligne de chaque tache

const keyLS = "todoList";                     // variable de config

const todoList = loadTodoList(keyLS);
console.log(todoList);                                

let lastKey = todoList[0].value;
//console.log(lastKey)
let ii = 1;





//************************     ********************/
//************************ FUNCTIONS  ********************/
//************************     ********************/

/**
 * 
 * @param {string} keyLS  = "todoList"
 * @returns Array todoList 
 */
function loadTodoList(keyLS)
{
    let todoList = loadFromLocalStorage(keyLS);   
    if (todoList === null){
        todoList = [
            {
                "key" : 0,     // code en dur : key = 0  aura la derniere
                "value" : 0,   //  valeur de key  (lastkey)
                "clicked" : 0
            }
        ];
    }
    return todoList;
}

function loadFromLocalStorage(keyLS){
    const jsonData = localStorage.getItem(keyLS); // récuperer les donées depuis LStorage
    return JSON.parse(jsonData);                  // retourne liste de taches deserialisée
}


/**
 * 
 * @param {string} keyLS 
 * @param {Array} todoList 
 */
function saveTodoListToLocalStorage(keyLS, todoList){
    const jsonData = JSON.stringify(todoList); // transformation todolist en json
    localStorage.setItem(keyLS, jsonData);       // Enregistrement dans localStorage
}


/**
 * Ajoute la classe paragraph_click pour indiquer que la tache est finie
 * @param {event} event 
 * @returns void
 */
function onClickTask(event){
    const clickedTask = event.currentTarget;
    const index = clickedTask.dataset.index ;
    clickedTask.classList.add('paragraph_click');
    todoList[index].clicked = 1 ;

    saveTodoListToLocalStorage(keyLS, todoList);    //console.log(clickedTask);
}


/**
 * Ajoute la classe paragraph_none pour indiquer qu'on veut effacer la tache
 * @param {event} event 
 * @returns void
 */
function onDblclickDelete(event){
    const clickedTask = event.currentTarget;

    const index = clickedTask.dataset.index ;     // récupérer data-index de paragraphe
    clickedTask.classList.add('paragraph_none');
    todoList.splice(index, 1) ;

    saveTodoListToLocalStorage(keyLS, todoList);
}

//************************     ********************/
//*********************   CODE   ********************/
//************************     ********************/


document.addEventListener('DOMContentLoaded', function(){ // on s'assure que la page a été chargée


    todoList.forEach(element => {                         // boucle dans todolist pour afficher les taches

        if(element.key != 0){
            
            var paragraph = document.createElement('p') ;
            paragraph.innerText = element.value;           // afficher la tache
            paragraph.classList.add('paragraphe_style'); 
            toDoContainer.appendChild(paragraph);          // J'insere le paragraphe dans l'element toDoContainer

            if (element.clicked == 1 ){                     
                paragraph.classList.add("paragraph_click"); // si tache finie, ajout de la classe
            }
        }
            
    }) 
    
   /**
    * Taches ajoutes dynamiquement en js
    */    
    addToDoButton.onclick = function(){                             // C'est une fonction "execution" qui se declanche quand on click 
        if(inputField.value != ""){                                 // Je controle que quand on click inputField ne soit pas vide 
            var paragraph = document.createElement('p') ;           // Si inputField n'ai pas vide, je creer une var avec comme value un 'p'
            paragraph.innerText = inputField.value;
            
            lastKey += 1;                                  // key de la dernière tache (en dur dans todolist[0].value)
            let task = {
                "key" : lastKey,
                "value" : inputField.value,
                "clicked" : 0                 
            }
            todoList.push(task);    
            todoList[0].value = lastKey ;                  // met à jour lastkey dans todolist[0]
            saveTodoListToLocalStorage(keyLS, todoList);   // enregistrement de todolist dans localStorage                
            
            paragraph.classList.add('paragraphe_style');                //Je creer une classList "baliseCss" pour la styliser 
            paragraph.setAttribute("data-index", ii);

            toDoContainer.appendChild(paragraph);                       // J'insere le paragraphe dans l'element toDoContainer
            
            inputField.value = "";                                      // Je vide l'input quand le paragraphe est ajoute 

            ii++ ;

        }
        
    
        paragraph.addEventListener('click',function(){              //C'est une function qui, quand on click on ajoute un effect de style dans le css
            paragraph.classList.add('paragraph_click');
        })

    
        paragraph.addEventListener('dblclick',function(){           // Function eventListener, quand on double  click, on remove l'enfant de toDoContainer
            toDoContainer.removeChild(paragraph);
            
            let index = paragraph.dataset.index ;            // récupérer data-index de paragraphe
            todoList.splice(index, 1) ;                      // effacer la tache du tableau

            saveTodoListToLocalStorage(keyLS, todoList);     // mettre à jour le tableau
        })
    }

    let aParagraphs = document.querySelectorAll(".paragraphe_style"); // créer le tableau aParagraphs 
    
    for (const p of aParagraphs){
        p.setAttribute("data-index", ii);
        
        p.addEventListener("click", onClickTask, false ) ;           //ajouter un addeventlistener click à chaque p de aParagraphs
        
        p.addEventListener("dblclick", onDblclickDelete, false ) ;           //ajouter un addeventlistener dblclick à chaque p de aParagraphs

        ii++ ;

    }
})


// key(index)