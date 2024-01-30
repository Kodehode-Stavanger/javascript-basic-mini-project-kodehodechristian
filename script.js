const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.getElementById("gameContainer");
const jumpCounterDisplay = document.getElementById("jumpCounter");

let playerJumping = false;
let jumpCounted = false; // Flag to check if jump is already counted
let obstacleInterval;
let gameSpeed = 3;
let obstacleDirection = 1; // 1 for right, -1 for left
let gameOver = false;
let successfulJumps = 0;

function jump() {
  if (!playerJumping && !gameOver) {
    playerJumping = true;
    let jumpHeight = 0;
    let jumpVelocity = 30;
    let gravity = 2;

    let jumpInterval = setInterval(function () {
      jumpHeight += jumpVelocity;
      jumpVelocity -= gravity;

      if (jumpHeight < 0) {
        player.style.bottom = "0px";
        playerJumping = false;
        clearInterval(jumpInterval);
      } else {
        player.style.bottom = jumpHeight + "px";
      }
    }, 20);
  }
}

function updateJumpCounter() {
  jumpCounterDisplay.innerText = "Successful Jumps: " + successfulJumps;
}

function startObstacle() {
  obstacleInterval = setInterval(function () {
    let obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );
    let playerLeft = parseInt(
      window.getComputedStyle(player).getPropertyValue("left")
    );
    let playerBottom = parseInt(
      window.getComputedStyle(player).getPropertyValue("bottom")
    );

    if ((obstacleLeft > 600 - 30 || obstacleLeft < 0) && !gameOver) {
      obstacleDirection *= -1;
      gameSpeed += 0.5;
      jumpCounted = false; // Reset the jump counted flag
    }

    obstacle.style.left = obstacleLeft + gameSpeed * obstacleDirection + "px";

    // Check if the player successfully jumped over the obstacle
    if (
      playerJumping &&
      obstacleLeft < playerLeft &&
      obstacleLeft + 30 > playerLeft &&
      !jumpCounted
    ) {
      successfulJumps++;
      updateJumpCounter();
      jumpCounted = true; // Set the flag to avoid multiple counts
    }

    if (
      obstacleLeft < playerLeft + 50 &&
      obstacleLeft > playerLeft - 30 &&
      playerBottom < 30 &&
      !gameOver
    ) {
      alert("You've lost");
      gameOver = true;
      clearInterval(obstacleInterval);
    }
  }, 20);
}

document.body.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

restartButton.addEventListener("click", function() {
    window.location.reload(); // Reloads the current page
});

startObstacle();
