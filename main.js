let moveShed = true;
let entities = []
let destiny;

class Destination {
    constructor(x, y) {
        this.x = x,
        this.y = y;
    }
    draw() {
        fill([0, 255, 0])
        square(this.x, this.y, 100)
        fill(255)
    }
}

function setup() {
    createCanvas(window.innerWidth, 600)
    background(0)
    for(let i = 0; i < 10; i++) {
        entities.push(new Entity(10, 10, i));
    }
    
    destiny = new Destination(window.innerWidth - 100, 480);
    frameRate(10);
}

function draw() {
    background(0)
    fill([255, 0, 0])
    square(100, width, 10)
    fill(255)
    destiny.draw();
    if(moveShed){
        destiny.x = mouseX;
        destiny.y = mouseY;    
    }
    if(mouseIsPressed) {
        moveShed = !moveShed
    };
    entities.forEach(entity => {
        entity.train(destiny);
        entity.move();
        entity.draw();
    });
    let currentBest = Number.POSITIVE_INFINITY;
    let orderedEntities = [];
    let bestEntity = null;
    entities.forEach((entity, i) => {
        if(entity.err < currentBest) {
            currentBest = entity.err;
            bestEntity = entity;
            orderedEntities.push(bestEntity)
        } else {
            orderedEntities.push(entity)
        }
    });
    orderedEntities.sort((a, b) => b.err > a.err ? 1 : -1);
    const secondBestEntity = orderedEntities[orderedEntities.length - 2];

    entities = [];
    for(let i = 0; i < 10; i++) {
        entities.push(bestEntity.mutate(i, secondBestEntity));
    }
}