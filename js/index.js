let hero = {
  left: 575,
  top: 650,
};

let end = false;

let missiles = [];

let score = 0;

let highScore = localStorage.getItem("userhighscore") || 0;

let gameSound, hitSound, gameOverSound;

let enemies = [
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
  {
    left: Math.ceil(Math.random() * 1000),
    top: Math.ceil(Math.random() * 100),
  },
];

document.onkeydown = function (e) {
  if (e.keyCode === 37) {
    // Left
    hero.left -= 20;
  }
  if (e.keyCode === 39) {
    // Right
    hero.left += 20;
  }

  // keep hero in frame
  if (hero.left < 0) {
    hero.left = 1200;
  }

  if (hero.left > 1200) {
    hero.left = 0;
  }

  if (e.keyCode === 32) {
    // Spacebar (fire)
    missiles.push({
      left: hero.left + 20,
      top: hero.top - 20,
    });
    drawMissiles();
  }
  drawHero();
};

function drawHero() {
  document.getElementById("hero").style.left = hero.left + "px";
  document.getElementById("hero").style.top = hero.top + "px";
}

function drawMissiles() {
  document.getElementById("missiles").innerHTML = "";
  for (let i = 0; i < missiles.length; i++) {
    document.getElementById(
      "missiles"
    ).innerHTML += `<div class='missile1' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
  }
}

function moveMissiles() {
  for (let i = 0; i < missiles.length; i++) {
    missiles[i].top = missiles[i].top - 40;
  }
}

function drawEnemies() {
  document.getElementById("enemies").innerHTML = "";
  for (let i = 0; i < enemies.length; i++) {
    document.getElementById(
      "enemies"
    ).innerHTML += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
  }
}

function moveEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].top = enemies[i].top + 3;
  }
}

function collisionDetection() {
  for (let enemy = 0; enemy < enemies.length; enemy++) {
    for (let missile = 0; missile < missiles.length; missile++) {
      if (
        missiles[missile].left >= enemies[enemy].left &&
        missiles[missile].left <= enemies[enemy].left + 50 &&
        missiles[missile].top <= enemies[enemy].top + 50 &&
        missiles[missile].top >= enemies[enemy].top
      ) {
        // remove enemies when hit
        enemies.splice(enemy, 1);
        missiles.splice(missile, 1);

        document.getElementById("hitSound").play();

        score++;
      }
    }
  }
}

function heroCollisionDetection() {
  for (let enemy = 0; enemy < enemies.length; enemy++) {
    if (
      enemies[enemy].left >= hero.left &&
      enemies[enemy].left <= hero.left + 50 &&
      enemies[enemy].top <= hero.top + 50 &&
      enemies[enemy].top >= hero.top
    ) {
      console.log("Game over!");
      document.getElementById("gameSound").pause();
      document.getElementById("gameOverSound").play();
      document.getElementById("hero").style.transform = "rotate(90deg)";
      gameOver();
    }
  }
}

function enemyCatchup() {
  for (let enemy = 0; enemy < enemies.length; enemy++) {
    if (enemies[enemy].top > 600) {
      console.log("Game over!");
      document.getElementById("gameSound").pause();
      document.getElementById("gameOverSound").play();
      document.getElementById("hero").style.transform = "rotate(90deg)";
      gameOver();
    }
  }
}

function gameLoop() {
  if (!end) setTimeout(gameLoop, 100);

  document.getElementById("gameSound").play();

  moveMissiles();
  drawMissiles();
  moveEnemies();
  drawEnemies();
  drop_enemies();
  enemyCatchup();
  collisionDetection();
  heroCollisionDetection();

  document.getElementById("scoreIndex").innerHTML = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("userhighscore", highScore);
  }

  document.getElementById("highScoreIndex").innerHTML = highScore;
}

function drop_enemies() {
  if (enemies.length < 10) {
    enemies.push({
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    });
  }
}

function gameOver() {
  end = true;
  document.getElementById("gameOver").style.display = "block";

  setTimeout(playAgain, 3000);
}

function playAgain() {
  document.getElementById("gameOver").style.display = "none";

  document.getElementById("newGame").style.display = "block";
}

function quitGame() {
  document.getElementById("newGame").style.display = "none";

  document.getElementById("seeYa").style.display = "block";
}

function newGame() {
  hero = {
    left: 575,
    top: 650,
  };

  end = false;

  missiles = [];

  score = 0;

  enemies = [
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
    {
      left: Math.ceil(Math.random() * 1000),
      top: Math.ceil(Math.random() * 100),
    },
  ];

  document.getElementById("newGame").style.display = "none";
  gameLoop();
}

gameLoop();
