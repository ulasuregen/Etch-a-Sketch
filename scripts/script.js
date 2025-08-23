const container = document.querySelector('.container');

for(i = 0; i < 16 * 16; i++){
    const sub_container = document.createElement('div');
    sub_container.classList.add('sub-container');
    container.appendChild(sub_container);
}