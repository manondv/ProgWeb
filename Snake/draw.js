var drawModule = (function () { 
	
  var body = document.getElementsByTagName("body")[0];	
  var button = document.getElementById("btn1");
  //button.innerHTML = "Pause";
  //button.setAttribute('style', 'float:left; font-weight:bold');
	
  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var apple = function(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, height-5);
  }
  
  var levelText = function() {
    var level_text = "Level: " + level;
    ctx.fillStyle = 'blue';
    ctx.fillText(level_text, 145, 15);
  }

  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  }
    
  var paint = function(){
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, width, height);

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }

      if (snakeX == -1 || snakeX == width/snakeSize || snakeY == -1 || snakeY == height/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //restart game
		  
          btn.removeAttribute('disabled', true);
		  body.removeChild(button);
          ctx.clearRect(0,0,width,height);
          gameloop = clearInterval(gameloop);
		  alert("Game over. Try again?");
          return;          
        }
        
        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          score ++;
          
          createFood(); //Create new food
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        } 
        
        apple(food.x, food.y); 
        scoreText();
		levelText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          createFood();
		  break;
        }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
	  
	body.appendChild(button);
	button.addEventListener ("click", function() {
	  alert("Resume game?");
	});
	  
	  
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, snakeSpeed);
  }


    return {
      init : init
    };

    
}());