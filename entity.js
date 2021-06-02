class Entity {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.beginningX = x;
        this.beginningY = y;
        this.id = id;
        this.weights = [
            Math.random() * (1 - (-1)) + (-1),
            Math.random() * (1 - (-1)) + (-1)
        ]
        this.bias = Math.random() * (1 - (-1)) + (-1)
        this.predicted = [];
        this.err = 0;
    }
    move() {
        this.y += this.predicted[1];
        this.x += this.predicted[0];    
    }
    draw() {
        ellipse(this.x, this.y, 50, 50)
    }
    train(destiny) {
        const x = destiny.x - this.x;
        const y = destiny.y - this.y;
        this.toGo = [ x, y ]
        this.predicted.push((this.weights[0] * this.x) + this.bias);
        this.predicted.push((this.weights[1] * this.y) + this.bias);
        this.err = (((this.toGo[0] - this.predicted[0])**2) + (this.toGo[1] - this.predicted[1])**2) / 2
    }
    mutate(id, partner) {
        const newEntity = new Entity(this.beginningX, this.beginningY, id);
        newEntity.weights[0] = partner.weights[0]  + (Math.random() * (1 - (-1)) + (-1));
        newEntity.weights[1] = this.weights[1]  + (Math.random() * (1 - (-1)) + (-1));
        return newEntity;
    }
}