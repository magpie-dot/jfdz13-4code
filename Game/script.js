let gameStarted = false;

const numberOfCats = 10;
const catFallingOffsetStep = 25;
const catFallingSpeed = 50;
const catDimensions = {
    width: 75,
    height: 75,
};
const dogDimensions = {
    width: 256,
    height: 160
};


const superDog = document.querySelector('#superDog');
const world = document.querySelector('#world');
// const fallingCat = document.getElementById('fallingCat');


const worldHeight = parseInt(window.getComputedStyle(world).height);
const worldWidth = parseInt(window.getComputedStyle(world).width);


const superDogWidth = parseInt(window.getComputedStyle(superDog).width);
const superDogHeight = parseInt(window.getComputedStyle(superDog).height);

// const fallingCatWidth = parseInt(window.getComputedStyle(fallingCat).width);
// const fallingCatHeight = parseInt(window.getComputedStyle(fallingCat).height);

let superDogSpeed = 10;
let superDogPositionX = parseInt(window.getComputedStyle(superDog).left);
let superDogPositionY = parseInt(window.getComputedStyle(superDog).top);

// let fallingCatPositionX = parseInt(window.getComputedStyle(fallingCat).right);
// let fallingCatPositionY = parseInt(window.getComputedStyle(fallingCat).bottom);
class Game {
    constructor() {
        this.startTime = null;
        this.cats = [];
        this.lastFrame = 0;
    }

    startGame() {
        console.log('start')
        gameStarted = true;
        this.startTime = new Date().getTime();
        document.getElementById("startPage").style.display = "none";
        document.getElementById("game-container").style.visibility = "visible";
        this.generateCats();
        requestAnimationFrame(this.update.bind(this));
        generateLife();
    }

    generateCats() {
        setInterval(() => {
            const cat = new Cat();
            cat.createNode();
            world.appendChild(cat.node);
            this.cats.push(cat);
        }, 1000);
    }

    update(totalTime) {
        if (!this.lastFrame)
            this.lastFrame = totalTime;

        const dt = (totalTime - this.lastFrame) / 1000; //delta time in seconds
        this.lastFrame = totalTime;

        this.moveCats(dt);

        requestAnimationFrame(this.update.bind(this));
    }

    moveCats(dt) {
        this.cats.forEach(cat => {
            cat.update(dt);
            this.checkCollision(cat);
        });
    }

    checkCollision(cat) {
        const catX = cat.x;
        const catY = cat.y
        const dogX = superDogPositionX;
        const dogY = superDogPositionY;

        var cat = { x: catX, y: catY, width: catDimensions.width, height: catDimensions.height }
        var dog = { x: dogX, y: dogY, width: dogDimensions.width, height: dogDimensions.height }


        if (cat.x < dog.x + dog.width &&
            cat.x + cat.width > dog.x &&
            cat.y < dog.y + dog.height &&
            cat.y + cat.height > dog.y + dog.height / 2) {
          
            superDog.style.background = "red";
            }
    }

};


class Cat {
    constructor() {
        this.node = null;
        this.y = 0;
        this.x = getRandom();
    }

    createNode() {
        const node = document.createElement('div');
        node.classList.add('falling-cat');
        node.style.top = 0;
        node.style.left = this.x + 'px';
        this.node = node;
    }

    update(dt) {
        this.y += catFallingSpeed * dt;
        this.node.style.top = this.y + 'px';
    }
}

class Player {

}

const game = new Game();
document.getElementById("start_btn").addEventListener("click", () => game.startGame());
//sprawdzanie kolizji



function getRandom() {
    return parseInt(Math.random() * (worldWidth-catDimensions.width));
}



// function checkCollision(cat) {
//     const catX = cat.node.style.left;
//     const catY = cat.node.style.top;
//     const dogX = superDog.style.left;
//     const dogY = superDog.style.top;


//   var cat = {x: catX, y: catY, width: catDimensions.width, height: catDimensions.height}
//   var dog = {x: dogX, y: dogY, width: superDog.width, height: superDog.height}

//   console.log(dog.width);


//   if (cat.x < dog.x + dog.width &&
//      cat.x + cat.width > dog.x &&
//      cat.y < dog.y + dog.height &&
//      cat.y + cat.height > dog.y) {
//       console.log("hit");

//   }
// }


//sterowanie


//przyciski





window.addEventListener('keydown', event => {

    console.log('event: ', event.code);
    if (event.code === 'ArrowRight' && superDogPositionX + superDogWidth < worldWidth) {
        superDogPositionX += superDogSpeed;
        superDog.style.transform = 'scaleX(-1)';
        superDog.style.left = `${superDogPositionX}px`;
    }
    if (event.code === 'ArrowLeft' && superDogPositionX > 0) {
        superDogPositionX -= superDogSpeed;
        superDog.style.transform = 'scaleX(1)';
        superDog.style.left = `${superDogPositionX}px`;
    }


});

// dodawanie losowych kotów inne

// const generateRandomNumberWidth = () => {
//     return Math.floor(Math.random() * (worldHeight - fallingCatWidth + 1));
// };

// setInterval(() => {
//     let fallingCats = document.querySelectorAll('fallingCat');
//     if (fallingCats.length < 20) {
//         let newElement = document.createElement('div');
//         newElement.classList.add('fallingCat');
//         newElement.style.left ='${generateRandomNumberWidth()}px';

//     }

// }, 6000);

// dodoawanie losowych kotów





function createSprite(element, x, y, w, h) {
    let result = new Object();
    result.element = element;
    result.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    return result;
}

