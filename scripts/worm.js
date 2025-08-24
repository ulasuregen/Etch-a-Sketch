let table = Array.from(document.querySelectorAll(".sub-container"));

//-----------------------------------------------
let increment_x = 0.3;
let increment_y = 0.3;

//Worm class 

class Worm{
    constructor(x, y){
        this.x = Math.round(Math.random() * box_num);
        this.y = Math.round(Math.random() * box_num);
        this.sign = 1;

        this.perlin_x = Math.random() * 100;
        this.perlin_y = Math.random() * 100;
        this.increment_x = increment_x;
        this.increment_y = increment_y;
    }


    stepVector(magnitude = 1.5){
        let phi = 4 * Math.PI * perlin.get(this.perlin_x, this.perlin_y); 
        
        if(this.perlin_x + this.increment_x > 100 || this.x + this.increment_x < 0){
            this.increment_x *= -1;
            if(this.perlin_y + this.increment_y > 100 || this.perlin_y + this.increment_y < 0){
                this.increment_y *= -1;
            }
            this.perlin_y += this.increment_y;
            }
        this.perlin_x += this.increment_x;

        
        if(1 - Math.abs(phi) < 0.01){
            this.sign = Math.random() < 0.5 ? 1 : -1;
            phi *= this.sign;
        }
        
        const step_x = Math.cos(phi);
        const step_y = Math.sin(phi);

        let vector = [step_x, step_y];
        
        return vector;
    }

    takeStep(step){
        this.x = Math.round(this.x + step[0]);
        this.y = Math.round(this.y + step[1]); 
    }

    move(){
        const step_vector = this.stepVector();
        this.takeStep(step_vector);
        this.control();
        this.fireBox();
    }

    control(){
        if(this.x > box_num - 1) this.x = 0;
        if(this.x < 0)           this.x = box_num -1;

        if(this.y > box_num - 1) this.y = 0;
        if(this.y < 0)           this.y = box_num -1;
    }

    fireBox(){
        let index = this.x + this.y * box_num;
        table[index].dispatchEvent(wormOn);
    }

    resetXY(){
        this.x = Math.round(Math.random() * box_num);
        this.y = Math.round(Math.random() * box_num);
    }
}

let wormNum = 30;
const worms = []

for(let i = 0; i < wormNum; i++){
    worms.push(new Worm());
}

setInterval(() => {
    for(let worm of worms){
        worm.move();
    }
}, 100);



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

    for(let worm of worms){
        worm.resetXY();
    }
}