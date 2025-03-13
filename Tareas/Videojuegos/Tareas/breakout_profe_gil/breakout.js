/*
 * Implementación del juego Breakout (adaptado del codigo del Pong)
 *
 * Eder Jezrael 12-03-2025
 */

"use strict";

// Variables Globales
const canvasWidth = 800;
const canvasHeight = 600;
let oldTime;
const paddleVelocity = 1;
const speedIncrease = 1.01;

let score = 0;
let lives = 3;

let ctx;

// Variable para rastrear el ID de animación
let animationFrameId;

// Variable para controlar si el juego está activo
let gameActive = true;

// Configuración de los bloques
const blockRows = 5;
const blockCols = 9;
const blockWidth = 75;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 50;
const blockOffsetLeft = 25;

// Array para almacenar los bloques
let blocks = [];

// Crear los bloques
function createBlocks() {
    blocks = [];
    for (let r = 0; r < blockRows; r++) {
        blocks[r] = [];
        for (let c = 0; c < blockCols; c++) {
            
            let blockColor;
            switch (r) {
                case 0: blockColor = "red"; break;
                case 1: blockColor = "yellow"; break;
                case 2: blockColor = "orange"; break;
                case 3: blockColor = "green"; break;
                case 4: blockColor = "blue"; break;
                default: blockColor = "purple";
            }
            
            const x = c * (blockWidth + blockPadding) + blockOffsetLeft;
            const y = r * (blockHeight + blockPadding) + blockOffsetTop;
            blocks[r][c] = new GameObject(
                new Vec(x, y),
                blockWidth,
                blockHeight,
                blockColor,
                "block"
            );
            blocks[r][c].active = true; // Para saber si el bloque está activo o ya ha sido destruido
        }
    }
}

//Clases para el juego
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.velocity = new Vec(0, 0); // Velocidad inicial cero
        this.reset();
    }

    //regresar la bola a la posicion inicial
    reset() {
        this.position = new Vec(canvasWidth / 2 - this.width / 2, canvasHeight - 60);
        
        // Velocidad inicial hacia arriba con un ángulo aleatorio
        const angle = Math.PI / 4 + Math.random() * Math.PI / 2;
        const speed = 0.5; // Velocidad inicial
        this.velocity = new Vec(Math.cos(angle) * speed, -Math.sin(angle) * speed);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        
        // fisica de colisiones a los bordes de los lados
        if (this.position.x <= 0 || this.position.x + this.width >= canvasWidth) {
            this.velocity.x *= -1;
        }
        
        //fisica de colisiones al borde de abajo
        if (this.position.y <= 0) {
            this.velocity.y *= -1;
        }
        
        // Logica para perder vida, si todas las bolas tocan el borde inferior
        if (this.position.y > canvasHeight) {
            balls = balls.filter(b => b.position.y <= canvasHeight);
            if (balls.length === 0) {
                lives--;
                if (lives > 0) {
                    this.reset();
                    paddle.reset();
                    balls.push(this);
                } else {
                    // Game over :(
                    gameActive = false;
                    alert("Has perdido :( Reinicia la pagina para jugar de nuevo ");
                    return; // Detener la actualización de la escena
                }
            }
        }
    }
}

// Clase para la barra pala
class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0, 0);
    }
    
    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        
        // Limitar el movimiento de la pala
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
    
    reset() {
        this.position = new Vec(canvasWidth / 2 - this.width / 2, canvasHeight - 30);
        this.velocity = new Vec(0, 0);
    }
}

// Crear objetos del juego
let ball;
let paddle;
let topWall;
let leftWall;
let rightWall;

let balls = []; 

function spawnExtraBalls(position) {
    // Crear dos nuevas bolas en la posición del bloque destruido
    let ball1 = new Ball(new Vec(position.x, position.y), 15, 15, "red");
    let ball2 = new Ball(new Vec(position.x, position.y), 15, 15, "red");
    
    // Asignar velocidades aleatorias a las nuevas bolas
    const angle1 = Math.PI / 4 + Math.random() * Math.PI / 2;
    const angle2 = Math.PI / 4 + Math.random() * Math.PI / 2;
    const speed = 0.5;
    
    ball1.velocity = new Vec(Math.cos(angle1) * speed, -Math.sin(angle1) * speed);
    ball2.velocity = new Vec(Math.cos(angle2) * speed, -Math.sin(angle2) * speed);
    
    // Agregar las nuevas bolas a la lista de bolas activas
    balls.push(ball1, ball2);
}


function createGame() {
    
    ball = new Ball(new Vec(0, 0), 15, 15, "red");
    paddle = new Paddle(new Vec(canvasWidth / 2 - 75, canvasHeight - 30), 150, 15, "blue");


    topWall = new GameObject(new Vec(0, 0), canvasWidth, 10, "black", "wall");
    leftWall = new GameObject(new Vec(0, 0), 10, canvasHeight, "black", "wall");
    rightWall = new GameObject(new Vec(canvasWidth - 10, 0), 10, canvasHeight, "black", "wall");
    
    // Crear los bloques
    createBlocks();
    
    // Reiniciar variables de juego
    score = 0;
    lives = 3;
    gameActive = true;
    oldTime = undefined;

    
    balls.push(ball);
}

// Función para inicializar objetos del juego (ahora usa buildScene)
function initGameObjects() {
    ball = new Ball(new Vec(0, 0), 15, 15, "red");
    paddle = new Paddle(new Vec(canvasWidth / 2 - 75, canvasHeight - 30), 150, 15, "blue");

    // Paredes del juego (solo necesitamos los bordes superior y laterales)
    topWall = new GameObject(new Vec(0, 0), canvasWidth, 10, "black", "wall");
    leftWall = new GameObject(new Vec(0, 0), 10, canvasHeight, "black", "wall");
    rightWall = new GameObject(new Vec(canvasWidth - 10, 0), 10, canvasHeight, "black", "wall");
}

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    
    // Construir la escena completa
    createGame();
    
    // Configurar controles
    createEventListeners();
    
    // Iniciar el juego
    drawScene(0);
}

function createEventListeners() {
    // Control con teclado (izquierda/derecha)
    window.addEventListener('keydown', (event) => {
        if (!gameActive) return;
        
        if (event.key == 'ArrowLeft' || event.key == 'a') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key == 'ArrowRight' || event.key == 'd') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
    });
    
    window.addEventListener('keyup', (event) => {
        if (!gameActive) return;
        
        if ((event.key == 'ArrowLeft' || event.key == 'a') && paddle.velocity.x < 0) {
            paddle.velocity = new Vec(0, 0);
        } else if ((event.key == 'ArrowRight' || event.key == 'd') && paddle.velocity.x > 0) {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Dibujar y actualizar la bola y el paddle
    balls.forEach(ball => ball.draw(ctx));
    paddle.draw(ctx);
    
    // Dibujar las paredes
    topWall.draw(ctx);
    leftWall.draw(ctx);
    rightWall.draw(ctx);
    
    // Dibujar los bloques
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockCols; c++) {
            if (blocks[r][c].active) {
                blocks[r][c].draw(ctx);
            }
        }
    }
    
    // Dibujar puntuación y vidas
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    ctx.fillText("Lives: " + lives, canvasWidth - 65, 20);
    
    // Actualizar posiciones
    balls.forEach(ball => ball.update(deltaTime));
    paddle.update(deltaTime);
    
    // Detectar colisiones con los bloques
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockCols; c++) {
            if (blocks[r][c].active) {
                balls.forEach(ball => {
                    if (boxOverlap(ball, blocks[r][c])) {
                        ball.velocity.y *= -1; // Invertir dirección vertical
                        blocks[r][c].active = false; // Desactivar el bloque
                        score += 1; // Incrementar la puntuación en 1
                        
                        // Probabilidad de generar nuevas bolas 10% solo en la 3a y 4a columna
                        if ((c === 2 || c === 3) && Math.random() < 0.1) {
                            spawnExtraBalls(blocks[r][c].position);
                        }
                        
                        // Comprobar si se destruyeron todos los bloques
                        let allBlocksDestroyed = true;
                        for (let r = 0; r < blockRows; r++) {
                            for (let c = 0; c < blockCols; c++) {
                                if (blocks[r][c].active) {
                                    allBlocksDestroyed = false;
                                    break;
                                }
                            }
                            if (!allBlocksDestroyed) break;
                        }
                        
                        if (allBlocksDestroyed) {
                            gameActive = false;
                            alert("Felicidades, completaste el juego :)");
                            return; 
                        }
                    }
                });
            }
        }
    }
    
    // Colisión con el paddle
    balls.forEach(ball => {
        if (boxOverlap(ball, paddle)) {
            // Calcular dónde golpeó la bola en el paddle para determinar el ángulo de rebote
            const hitPoint = (ball.position.x + ball.width / 2) - (paddle.position.x + paddle.width / 2);
            const normalizedHitPoint = hitPoint / (paddle.width / 2); // Valor entre -1 y 1
            
            // Calcular nuevo ángulo basado en dónde golpeó la bola
            const bounceAngle = normalizedHitPoint * Math.PI / 3; //limite de angulo
            const speed = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
            
            // Establecer nueva velocidad con el ángulo calculado
            ball.velocity.x = Math.sin(bounceAngle) * speed;
            ball.velocity.y = -Math.cos(bounceAngle) * speed;
            
            // Aumentar ligeramente la velocidad en cada rebote
            ball.velocity = ball.velocity.times(speedIncrease);
        }
    });
    
    // Colisiones con las paredes
    balls.forEach(ball => {
        if (boxOverlap(ball, topWall)) {
            ball.velocity.y *= -1;
        }
        if (boxOverlap(ball, leftWall) || boxOverlap(ball, rightWall)) {
            ball.velocity.x *= -1;
        }
    });
    
    oldTime = newTime;
  
    animationFrameId = requestAnimationFrame(drawScene);
}



