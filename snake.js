const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

//create snake
let snake=[];
snake[0]={
	x : 9 * box,
	y : 10 * box
}

let food = {
	x : Math.floor(Math.random()*17+1) * box,
	y : Math.floor(Math.random()*15+3) * box
}

let score = 0;

//control the snake
let d;
document.addEventListener("keydown",direction);

function direction(event){
	let key = event.keyCode;
	if(event.keyCode==37 && d!= "RIGHT"){
		d = "LEFT";
	}else if(event.keyCode==38 && d!="DOWN"){
		d = "UP";
	}else if(event.keyCode==39 && d!="LEFT"){
		d = "RIGHT";
	}else if(event.keyCode==40 && d!="UP"){
		d = "DOWN";
	}
}

//check collision function
function collision(head, array){
	for(let i=0;i<array.length;i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}
//draw everything to the canvas
function draw(){
	ctx.drawImage(ground,0,0);
	for(let i=0;i<snake.length;i++){
		ctx.fillStyle = (i==0)? "green" : "white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}
	//old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;



	//which direction
	if(d == "LEFT") snakeX -= box;
	if(d == "UP") snakeY -= box;
	if(d == "RIGHT") snakeX += box;
	if(d == "DOWN") snakeY += box;

	//if the snake eats the food
	if(snakeX==food.x && snakeY == food.y){
		score++;
		food= {
			x : Math.floor(Math.random()*17+1) * box,
			y : Math.floor(Math.random()*15+3) * box
		}
		//we don't remove the tail
	}else{
		//remove the tail
		snake.pop();		
	}
	let newHead = {
		x : snakeX,
		y : snakeY
	}
	//game over 
	if(snakeX < box || snakeX > 17*box || 
		snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
		clearInterval(game);
	}



	snake.unshift(newHead);

	ctx.drawImage(foodImg, food.x, food.y);
	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score,2*box,1.6*box);
}

//call draw function every 100 ms
let game = setInterval(draw,100);
