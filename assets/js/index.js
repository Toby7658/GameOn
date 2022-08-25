const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// setting w and h to cove full screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// code to create the spaceship
class Player {
    constructor() {

        // code to create movement for spaceship
        this.velocity = {
            x: 0,
            y: 0
        }

        // image defined within constructor
        const image = new Image()
        image.src = '/assets/images/shipimage.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

    }
    draw() {
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, 
        // this.width, this.height)

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

update() {
if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
}
}

const player = new Player()


// code to loop animation over and over
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update
    
}

animate()

// code for arrow key controls
addEventListener('keydown', ({
    key
}) => {
    switch (key) {
        case 'a':
            console.log('left')
            break
        case 'd':
            console.log('right')
            break
        case ' ':
            console.log('space')
            break
    }
})