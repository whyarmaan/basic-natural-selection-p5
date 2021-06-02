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
    createCanvas(600, 600)
    background(0)
    for(let i = 0; i < 10; i++) {
        entities.push(new Entity(width / 2, 10, i));
    }
    destiny = new Destination(10, 480);
    frameRate(10);
}

function draw() {
    background(0)
    destiny.draw();
    entities.forEach(entity => {
        entity.train(destiny);
        console.log(`Entity: ${entity.id} erruracy: ${entity.err}`);
        entity.move();
        entity.draw();
    });
    let currentBest = Number.POSITIVE_INFINITY;
    let bestEntity = null;
    entities.forEach(entity => {
         console.log(entity.err)
        if(entity.err < currentBest) {
            currentBest = entity.err;
            bestEntity = entity;
        }
    })
    entities = [];
    for(let i = 0; i < 10; i++) {
        entities.push(bestEntity.mutate(i));
    }
}