const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// setting w and h to cove full screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// code to create the spaceship
class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        }
        // code to create movement for spaceship
        this.velocity = {
            x: 0,
            y: 0
        }

        // image defined within constructor
        const image = new Image()
        image.src = '/assets/images/shipimage.png'

        this.image = image;
        this.width = 100;
        this.height = 100;
    }
    draw() {
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, 
        // this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}

const player = new Player()
player.draw()