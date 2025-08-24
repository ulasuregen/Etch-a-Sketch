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

    sub_container.addEventListener('mouseenter', (e) => {
        if(mouseDown){  
            sub_container.classList.remove('whitebg');
            sub_container.classList.add('blackbg'); 
        
            setTimeout( () => {
                sub_container.classList.remove('blackbg');
                sub_container.classList.add('whitebg'); 
            }, 1000)
        }
    })
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