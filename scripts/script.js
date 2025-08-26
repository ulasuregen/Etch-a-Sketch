const container = document.querySelector('.container');
const number_button = document.querySelector('.number');
const inputBox = document.querySelector('.num-input');
let box_num = 100;
let mouseDown = false;

let color_location = [125, 125, 125];

const wormOn = new CustomEvent("wormOn");


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

    ['mouseenter', 'touchmove', 'wormOn'].forEach( (ev) => {
        addEvent(sub_container, ev, false);
    });

    table = Array.from(document.querySelectorAll(".sub-container"));
}

document.addEventListener('mousedown', () => {
    mouseDown = true;
})

document.addEventListener('mouseup', () => {
    mouseDown = false;
})

number_button.addEventListener('click', (e) => {
    box_num = getInput(inputBox);

    deleteTable(container);

    for(i = 0; i < box_num * box_num; i++){
    createSquare(box_num);
}
})


function addEvent(element, ev, onClick) {
    element.addEventListener(ev, () => {
    onClick = onclick ? mouseDown : true; 
    if(onClick){  
            const step = randomVector(20);
            for(let i = 0; i < 3; i++){color_location[i] += step[i];}

            changeBackground(element, color_location);
            //element.classList.remove('whitebg');
            //element.classList.add('blackbg'); 
        
            setTimeout( () => {
                changeBackground(element);
                //element.classList.remove('blackbg');
                //element.classList.add('whitebg'); 
            }, 1000)
        }
});
}

function randomVector(magnitude = 1){
    const theta = Math.PI * Math.random();
    const phi   = 2 * Math.PI * Math.random();

    const cos_theta = Math.cos(theta);

    const x = cos_theta * Math.cos(phi) * magnitude;
    const y = cos_theta * Math.sin(phi) * magnitude;
    const z = Math.sin(theta) * magnitude;
    let vector = [x,y,z];
    
    let sign_vector = [];
    for(let i = 0; i < 3; i++){
        let new_location = color_location[i] + vector[i];
        let sign = new_location < 0 || new_location > 255 ? -1 : 1;
        sign_vector.push(vector[i] * sign); 
    }

    return sign_vector;
}

function changeBackground(element, color_palet = [255,255,255]){
    element.style.background = 'rgba(' + color_palet.join(',') + ')';
}


function getInput(inputBox){
    const value = inputBox.value;

    if(value > 100){
        inputBox.value = 100;
        return 100;
    }else if(value < 10){
        inputBox.value = 10;
        return 10
    }else{
        return value;
    }
}