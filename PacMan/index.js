const canvas = document.querySelector('canvas')
const container = document.querySelector('.center')
const context = canvas.getContext('2d')

const current_score = document.querySelector('#current_score')

canvas.width = container.getBoundingClientRect().width // == window.innerWidth
canvas.height = innerHeight


class Boundary{
    static width = 40
    static height = 40

    constructor({position, image}) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw(){
        //context.fillStyle = 'blue'
        //context.fillRect(this.position.x, this.position.y,this.width,this.height)

        context.drawImage(this.image,this.position.x,this.position.y)
    }
}

class Pacman{
    constructor({position , velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.radian = 0.75
        this.openRate = 0.12
        this.rotation = 0
    }

    draw(){
        context.save()
        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotation)
        context.translate(-this.position.x, -this.position.y)
        context.beginPath()
        context.arc (this.position.x, this.position.y, this.radius, this.radian, Math.PI * 2 - this.radian)
        context.lineTo(this.position.x, this.position.y)
        context.fillStyle = "yellow"
        context.fill()
        context.closePath()
        context.restore()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.radian < 0 || this.radian > 0.75) {
            this.openRate = -this.openRate
        }
        this.radian += this.openRate
    }
}

class Ghost{
    static speed = 2
    constructor({position , velocity, color = '#AAFF00'}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollisions = []
        this.speed = 2
        this.scared = false
        this.bluewhite = 'blue';
    }

    draw(){
        context.beginPath()
        context.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = this.scared ? this.bluewhite : this.color
        context.fill()
        context.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet{
    constructor({position}) {
        this.position = position
        this.radius = 3
    }

    draw(){
        context.beginPath()
        context.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = "white"
        context.fill()
        context.closePath()
    }
}

class PowerUp{
    constructor({position}) {
        this.position = position
        this.radius = 10
    }

    draw(){
        context.beginPath()
        context.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = "white"
        context.fill()
        context.closePath()
    }
}

const pellets = []
const boundaries = []
const powerup = []
const ghost = [
    new Ghost({
        position : {
            x : Boundary.width * 6 + Boundary.width / 2,
            y : Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }
        }),
    new Ghost({
        position : {
            x : Boundary.width * 6 + Boundary.width / 2,
            y : Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color: 'red'
    }),
    new Ghost({
        position : {
            x : Boundary.width * 6 + Boundary.width / 2,
            y : Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color: 'orange'
    })
]

const pacman = new Pacman({
    position:{
        x : Boundary.width + Boundary.width / 2,
        y : Boundary.height + Boundary.height / 2
    },
    velocity:{
        x:0,
        y:0
    }
})

const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

let lastKey = ""
let score = 0

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src){
    const image = new Image()
    image.src = src
    return image
}

map.forEach((row,index_row)=>{
    row.forEach((symbol, index_column)=>{
        switch (symbol){
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/pipeHorizontal.png')
                }))
                break
            case '|':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/pipeVertical.png')
                }))
                break
            case '1':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/pipeCorner1.png')
                }))
                break
            case '2':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/pipeCorner2.png')
                }))
                break
            case '3':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/pipeCorner3.png')
                }))
                break
            case '4':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/pipeCorner4.png')
                }))
                break
            case 'b':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index_column,
                        y: Boundary.height * index_row
                    },
                    image: createImage('./img/block.png')
                }))
                break
            case '[':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        image: createImage('./img/capLeft.png')
                    })
                )
                break
            case ']':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        image: createImage('./img/capRight.png')
                    })
                )
                break
            case '_':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        image: createImage('./img/capBottom.png')
                    })
                )
                break
            case '^':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        image: createImage('./img/capTop.png')
                    })
                )
                break
            case '+':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        image: createImage('./img/pipeCross.png')
                    })
                )
                break
            case '5':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        color: 'blue',
                        image: createImage('./img/pipeConnectorTop.png')
                    })
                )
                break
            case '6':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        color: 'blue',
                        image: createImage('./img/pipeConnectorRight.png')
                    })
                )
                break
            case '7':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        color: 'blue',
                        image: createImage('./img/pipeConnectorBottom.png')
                    })
                )
                break
            case '8':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * index_column,
                            y: Boundary.height * index_row
                        },
                        image: createImage('./img/pipeConnectorLeft.png')
                    })
                )
                break
            case '.':
                pellets.push(
                    new Pellet({
                        position: {
                            x: Boundary.width * index_column + Boundary.width / 2,
                            y: Boundary.height * index_row  + Boundary.height / 2
                        }
                    })
                )
                break
            case 'p':
                powerup.push(
                    new PowerUp({
                        position: {
                            x: Boundary.width * index_column + Boundary.width / 2,
                            y: Boundary.height * index_row  + Boundary.height / 2
                        }
                    })
                )
                break
        }
    })
})

function circleCollideRect({circle,rectangle}) {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)
}

let animationID
function animate(){
    animationID = requestAnimationFrame(animate)
    context.clearRect(0,0, canvas.width,canvas.height)

    if(keys.ArrowUp.pressed && lastKey === "ArrowUp"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollideRect({
                circle: {
                    ...pacman, velocity: {
                        x: 0,
                        y: -5
                    }
                },
                rectangle: boundary
            })) {
                pacman.velocity.y = 0
                break
            } else {
                pacman.velocity.y = -5
            }
        }
    }else if(keys.ArrowDown.pressed && lastKey === "ArrowDown"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollideRect({
                circle: {
                    ...pacman, velocity: {
                        x: 0,
                        y: 5
                    }
                },
                rectangle: boundary
            })) {
                pacman.velocity.y = 0
                break
            } else {
                pacman.velocity.y = 5
            }
        }
    }else if(keys.ArrowRight.pressed && lastKey === "ArrowRight"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollideRect({
                circle: {
                    ...pacman, velocity: {
                        x: 5,
                        y: 0
                    }
                },
                rectangle: boundary
            })) {
                pacman.velocity.x = 0
                break
            } else {
                pacman.velocity.x = 5
            }
        }
    }else if(keys.ArrowLeft.pressed && lastKey === "ArrowLeft"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollideRect({
                circle: {
                    ...pacman, velocity: {
                        x: -5,
                        y: 0
                    }
                },
                rectangle: boundary
            })) {
                pacman.velocity.x = 0
                break
            } else {
                pacman.velocity.x = -5
            }
        }
    }
    for(let i = ghost.length - 1 ; i >= 0; i--) {
        const ghost1 = ghost[i]
        if (Math.hypot(ghost1.position.x - pacman.position.x,
            ghost1.position.y - pacman.position.y) < ghost1.radius + pacman.radius)
        {
            if(ghost1.scared){
                ghost.splice(i,1)
            }
            else
                cancelAnimationFrame(animationID)
        }

        if(ghost1.scared){
            if(context.fillStyle === '#0000ff')
                ghost1.bluewhite = 'white'
            else if(context.fillStyle === '#ffffff')
                ghost1.bluewhite = 'blue'
        }

    }
    //win condition
    if (pellets.length === 1)
        cancelAnimationFrame(animationID)

    //power up go
    for(let i = powerup.length - 1 ; i >= 0; i--){
        const powerUp = powerup[i]
        powerUp.draw()

        if(Math.hypot(powerUp.position.x - pacman.position.x,
            powerUp.position.y - pacman.position.y) < powerUp.radius + pacman.radius)
        {
            powerup.splice(i,1)
            //make ghost scared
            ghost.forEach(g=>{
                g.scared = true

                setTimeout(()=>{
                    g.scared = false
                }, 3000)
            })
        }


    }
    //collect pellet
    for(let i = pellets.length - 1; i > 0; i--) {
        const pellet = pellets[i]
        pellet.draw()

        if(Math.hypot(pellet.position.x - pacman.position.x,
            pellet.position.y - pacman.position.y) < pellet.radius + pacman.radius)
        {
            pellets.splice(i,1)
            score += 10
            current_score.innerHTML = score
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw()

        if(circleCollideRect({
            circle: pacman,
            rectangle: boundary
        })){
            pacman.velocity.y = 0
            pacman.velocity.x = 0
        }
    })
    pacman.update()

    ghost.forEach(ghost => {
        ghost.update()

        //ghost touch player
        const collision = []
        if(Math.hypot(ghost.position.x - pacman.position.x,
            ghost.position.y - pacman.position.y) < ghost.radius + pacman.radius && !ghost.scared) {
            cancelAnimationFrame(animationID)
        }

        boundaries.forEach(boundary =>{

            if (!collision.includes("right") && circleCollideRect({
                circle: {
                    ...ghost, velocity: {
                        x: ghost.speed,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ){
                collision.push('right')
            }

            if (!collision.includes("left") && circleCollideRect({
                circle: {
                    ...ghost, velocity: {
                        x: -ghost.speed,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ){
                collision.push('left')
            }

            if (!collision.includes("up") && circleCollideRect({
                circle: {
                    ...ghost, velocity: {
                        x: 0,
                        y: -ghost.speed
                    }
                },
                rectangle: boundary
            })
            ){
                collision.push('up')
            }

            if (!collision.includes("down") && circleCollideRect({
                circle: {
                    ...ghost, velocity: {
                        x: 0,
                        y: ghost.speed
                    }
                },
                rectangle: boundary
            })
            ){
                collision.push('down')
            }
        })

        if(collision.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collision

        if (JSON.stringify(collision) !== JSON.stringify(ghost.prevCollisions)) {

            if (ghost.velocity.x > 0)
                ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0)
                ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0)
                ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0)
                ghost.prevCollisions.push('down')

            const pathways = ghost.prevCollisions.filter(collot => {
                return !collision.includes(collot)
            })

            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break
                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
                    break
            }
            ghost.prevCollisions = []
        }
    })
    if(pacman.velocity.x > 0) pacman.rotation = 0
    else if (pacman.velocity.x < 0) pacman.rotation = Math.PI
    else if (pacman.velocity.y < 0) pacman.rotation = Math.PI * 1.5
    else if (pacman.velocity.y > 0) pacman.rotation = Math.PI / 2
}



animate()

window.addEventListener('keydown', ({key})=>{
    switch (key){
        case "ArrowUp":
            keys.ArrowUp.pressed = true
            lastKey = "ArrowUp"
            break
        case "ArrowDown":
            keys.ArrowDown.pressed = true
            lastKey = "ArrowDown"
            break
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            lastKey = "ArrowRight"
            break
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            lastKey = "ArrowLeft"
            break
    }
})

window.addEventListener('keyup', ({key})=>{
    switch (key){
        case "ArrowUp":
            keys.ArrowUp.pressed = false
            break
        case "ArrowDown":
            keys.ArrowDown.pressed = false
            break
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break
    }
})
