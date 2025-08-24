const container = document.querySelector('.container');
const number_button = document.querySelector('.number');
const inputBox = document.querySelector('.num-input');
let box_num = 16;
let mouseDown = false;

for(i = 0; i < box_num * box_num; i++){
    createSquare(box_num);
}


function deleteTable(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function createSquare(box_num) {
    const sub_container = document.createElement('div');

    sub_container.style.width = 'calc(min(100vw,100vh) * 1/' + box_num + ')';
    sub_container.style.height = 'calc(min(100vw,100vh) * 1/'+ box_num + ')';
    sub_container.classList.add('sub-container');   
    container.appendChild(sub_container);
    sub_container.classList.add('whitebg');

    addEvent(sub_container, 'mouseenter', false);
    addEvent(sub_container, 'touchmove', false);
}

document.addEventListener('mousedown', () => {
    mouseDown = true;
})

document.addEventListener('mouseup', () => {
    mouseDown = false;
})

number_button.addEventListener('click', (e) => {
    box_num = inputBox.value;
    deleteTable(container);

    for(i = 0; i < box_num * box_num; i++){
    createSquare(box_num);
}
})


['mousemove', 'touchmove'].forEach( (ev) => {
    addEvent(ev);
});


function addEvent(element, ev, onClick) {
    element.addEventListener(ev, () => {
    onClick = onclick ? mouseDown : true; 
    if(onClick){  
            element.classList.remove('whitebg');
            element.classList.add('blackbg'); 
        
            setTimeout( () => {
                element.classList.remove('blackbg');
                element.classList.add('whitebg'); 
            }, 1000)
        }
});
}