const container = document.querySelector('.container');

for(i = 0; i < 16; i++){
    const sub_container = document.createElement('div');
    sub_container.classList.add('sub-container');
    
    let random_color = [Math.random() * 255,Math.random() * 255,Math.random() * 255];
    sub_container.style.backgroundColor = 'rgba(' + random_color.join(',') + ')';
    container.appendChild(sub_container);
}