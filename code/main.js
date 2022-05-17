import kaboom from "kaboom";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 1000;
const topscores = []
let highscore = 0;
let attempts = 0;
let doublejump = 0;
// initialize context
kaboom({
  // global: true,
  // fullscreen: true,
  // scale: 1,
  debug: false,
  // clearColor: [0, 0, 0, 1],
  background: [134, 135, 247],
  //width: 1280,
  //height: 960,
  // scale: 1,
});
loadSprite("shop", "sprites/shop.jpg");
loadPedit("pentagon", "sprites/Pentagon.pedit");
loadPedit("andrew", "sprites/andrew.pedit");
loadPedit("cloud", "sprites/cloud.pedit");
loadSprite("sky","sprites/windows-95-desktop-background.jpg");
loadPedit("coin", "sprites/coin.pedit");
loadPedit("rock", "sprites/rock.pedit");
loadPedit("ground", "sprites/ground.pedit");
loadSound("score", "sounds/score.mp3")
loadSound("timewarp", "sounds/timewarp.ogg")
loadPedit("portal", "sprites/portal.pedit");
loadPedit("portal2", "sprites/portal2.pedit");
function startGame()
{
// load assets
loadSprite("bean", "sprites/bean.png");
loadPedit("pentagon", "sprites/Pentagon.pedit");
loadSprite("shop", "sprites/shop.jpg");
//         loadSprite("bean", "sprites/bean.png");
//         loadPedit("beanl", "sprites/beanl.pedit");
//         loadPedit("ghosty", "sprites/ghosty.pedit");
//         loadPedit("spike", "sprites/spike.pedit");
loadPedit("cloud", "sprites/cloud.pedit");
loadPedit("rock", "sprites/rock.pedit");
//         loadPedit("box", "sprites/box.pedit");
//         loadPedit("monster", "sprites/monster.pedit");
//         loadPedit("grass", "sprites/grass.pedit");
loadPedit("ground", "sprites/ground.pedit");
//         loadPedit("birdr", "sprites/birdr.pedit");
//         loadPedit("birdl", "sprites/birdl.pedit");
//         loadPedit("prize", "sprites/prize.pedit");
//         loadPedit("apple", "sprites/apple.pedit");
//         
//         
//loadPedit("andrew", "sprites/andrew.pedit");
//         loadPedit("bottle", "sprites/bottle.pedit");


scene("game", () => {


  
layers([
    "background",
  "midground",
    "game",
  "ui"
], "game");

add([
    sprite("sky"),
    layer("background"),
    scale(2),
  pos(width() / 2, height() / 2),
  origin("center"),
]);

//   async function init() {
//   let bgImage = await loadSprite("background", "https://www.paulwheeler.us/files/windows-95-desktop-background.jpg");

//   let background = add([
//     sprite("background"),
//     // Make the background centered on the screen
//     pos(width() / 2, height() / 2),
//     origin("center"),
//     // Allow the background to be scaled
//     scale(1),
//     // Keep the background position fixed even when the camera moves
//     fixed()
//   ]);
//   // Scale the background to cover the screen
//   background.scaleTo(Math.max(
//     width() / bgImage.tex.width,
//     height() / bgImage.tex.height
//   ));
// }

// init();

  
	// define gravity
	gravity(2400);
  let SPEED = 1000
  doublejump = 0

	// add a game object to screen
	const player = add([
		// list of components
	  sprite("pentagon"),
    //player.frame = 0,
		pos(80, 40),
		area(),
		body(),
    outview({ hide: true, pause: false}),
	]);

	// floor
	add([
		rect(width(), FLOOR_HEIGHT),
		outline(4),
		pos(0, height()),
		origin("botleft"),
		area(),
		solid(),
		color(127, 200, 255),
	]);

   function walkLeft(){
     player.move(-500,0);
   }

  onKeyDown("left",(walkLeft))
  onKeyDown("a", (walkLeft))

  // onKeyDown("left", () => {
  //               //player.use(sprite('beanl'))
  //               player.move(-MOVE_SPEED, 0)
  //           })

  function walkRight(){
    player.move(500,0);
  }
  
  onKeyDown("right",(walkRight))
  onKeyDown("d", (walkRight))
  
	function jump() {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE);
      if (doublejump == 0) {
        doublejump += 1
      }
      jumpMeter.text = doublejump
		}
    else {
      if (doublejump >= 1) {
        addKaboom(player.pos)
        player.jump(JUMP_FORCE / 1.5);
        doublejump = doublejump - 1
        jumpMeter.text = doublejump
      }
    }
	}

  function fall() {
    if (player.isFalling) {
      player.jump(JUMP_FORCE * -2);
    }
  }

  onKeyPress("down", fall);
	// jump when user press space
	onKeyPress("space", jump);
	onClick(jump);

  //left wall barrier
add([
			rect(48, 2000),
			area(),
			outline(4),
			pos(-48, height() - FLOOR_HEIGHT),
			origin("botleft"),
			color(131, 106, 36),
			//move(LEFT, SPEED*0.5),
			"tree",
		]);
  // floating platforms
  function spawnPlatforms() {
  add([
		rect(rand(48,320), FLOOR_HEIGHT),
		outline(4),
		pos(width(), rand(height() - FLOOR_HEIGHT, height() / 2 + 100)),
		origin("botright"),
		area(),
		solid(),
    move(LEFT, rand(500,(SPEED*rand(0.01, 0.8)))),
		color(127, 0, 255),
    cleanup(),
	]);
    wait(rand(15, 86), spawnPlatforms);
  }
	function spawnTree() {

		// add tree obj
		add([
			rect(48, rand(32, 96)),
			area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			origin("botleft"),
			color(131, 106, 36),
			move(LEFT, (SPEED*0.2)),
			"tree",
      cleanup(),
		]);

		// wait a random amount of time to spawn next tree
		wait(rand(0.8, 1.3), spawnTree);
    

	}

  function spawnClouds() {

		// add tree obj
		const BB = add([
			sprite("cloud"),
			area(),
      layer("ui"),
      scale(rand(.001, 4.5)),
			//outline(4),
			pos(width(), rand(height() - FLOOR_HEIGHT)),
			origin("botleft"),
			move(LEFT, (SPEED*0.2*rand(.05,2))),
			"andrew",
      cleanup(),
		]);

		// wait a random amount of time to spawn next tree
		wait(rand(0,(Math.abs(4 - (SPEED * .00001)))), spawnClouds);
    

	}
function spawnCoins() {

		// add tree obj
		add([
			sprite("coin"),
      layer("midground"),
			area(),
      scale(1),
			outline(4),
			pos(width(), rand(height() - 40, height() - 200)),
			origin("botleft"),
			move(LEFT, rand(700,(SPEED*rand(.01,.4)))),
      "coin",
      cleanup(),
		]);

		// wait a random amount of time to spawn next tree
		wait(rand(10, 30), spawnCoins);
    

	}
function spawnRocks() {
  add([
			sprite("rock"),
			area(),
      scale(1),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			origin("botleft"),
			move(LEFT, rand(400,(SPEED*.05))),
      "tree",
    cleanup(),
		]);
    wait(rand(10,34), spawnRocks);
}
  function spawnWarps() {
    add([
      sprite("portal"),
      layer("midground"),
			area(),
      scale(1),
			outline(4),
			pos(width(), rand(height() - 40, height() - 200)),
			origin("botleft"),
			move(LEFT, 400),
      "warp",
      cleanup(),
		]);
    wait(rand(120, 200), spawnWarps)
  }
  function spawnBonusLeaps() {
    add([
      sprite("portal2"),
      layer("midground"),
			area(),
      scale(1),
			outline(4),
			pos(width(), rand(height() - 40, height() - 200)),
			origin("botleft"),
			move(LEFT, rand(400,1000)),
      "bleap",
      cleanup(),
		]);
    wait(rand(45, 60), spawnBonusLeaps)
  }
function cloudyMode() {
  add([
    text("The air is getting foggy..."), origin("center"),
    layer("ui"),
    pos(width() / 2, height() / 2 ),
    color(255, 0, 0),
    "hardmodeText",
    lifespan(5, { fade: 1 }),
  ])
  spawnCoins();
  spawnClouds();
  spawnClouds();
  spawnClouds();
  spawnClouds();
  spawnClouds();
}
	// start spawning trees
	spawnTree();
  spawnClouds();
  spawnCoins();
  spawnBonusLeaps();
  wait(60, spawnWarps);
  wait(rand(30,60),spawnPlatforms);
  wait(rand(60,85), spawnRocks);
  wait(240, cloudyMode)
	// lose if player collides with any game obj with tag "tree"
	player.onCollide("tree", () => {
		// go to "lose" scene and pass the score
		go("lose", score, highscore);
		addKaboom(player.pos);
    shake(50)
	});
  
  player.onCollide("coin", (coin) => {
    score = score + 200
    play("score")
    destroy(coin)
  });

  player.onCollide("warp", (warp) => {
    SPEED = (SPEED - (SPEED * .5))
    play("timewarp")
    destroy(warp)
  })
  player.onCollide("bleap", (bleap) => {
    doublejump = doublejump + 1
    jumpMeter.text = doublejump
    destroy(bleap)
  })
	// keep track of score
	let score = 0;
	const scoreLabel = add([
		text(score),
		pos(100, 24),
    layer("ui"),
	]);
  const scoreUI = add([
    text("Score"),
    layer("ui"),
    pos(100, 4),
    scale(.5)
  ])
  const highscoreLabel = add([
    text(highscore),
    layer("ui"),
    pos(300, 24),
    color(0, 0, 0)
  ])
  const recordUI = add([
    text("Record"),
    layer("ui"),
    pos(300, 4),
    scale(.5)
  ])
  const attemptLabel = add([
    text(attempts),
    layer("ui"),
    pos(500, 24),
  ])
  const attemptUI = add([
    text("Attempt"),
    layer("ui"),
    pos(500, 4),
    scale(.5)
  ])
  const jumpMeter = add([
    text(doublejump),
    layer("ui"),
    pos(700, 24),
    scale(.5)
  ])
  const leapLabel = add([
    text("Leaps"),
    layer("ui"),
    pos(700, 4),
    scale(.5),
    "leapLabel",
    lifespan(4, { fade: 0.5 })
  ])
  if (highscore >= 10000) {
    scoreLabel.moveTo(100, 24)
    scoreUI.moveTo(100, 4)
    highscoreLabel.moveTo(400,24)
    recordUI.moveTo(400,4)
    attemptLabel.moveTo(700,24)
    attemptUI.moveTo(700,4)
  }
	// increment score every frame
  attempts = attempts + 1;
  attemptLabel.text = attempts;
	onUpdate(() => {
		score++;
		scoreLabel.text = score;
    SPEED++;
    if (score > highscore) {
      highscore = score;
      highscoreLabel.text = highscore;
      highscoreLabel.color = rgb(255, 196, 0)
    }
    if (doublejump >= 1) {
      jumpMeter.color = rgb(0, 255, 0)
    }
    else {
      jumpMeter.color = rgb(255, 255, 255)
    }
    jumpMeter.moveTo(player.pos, 600)
    leapLabel.moveTo(player.pos, 300)
    if (score >= 10000) {
    scoreLabel.moveTo(100, 24, 30)
    scoreUI.moveTo(100, 4, 30)
    highscoreLabel.moveTo(400,24, 30)
    recordUI.moveTo(400,4, 30)
    attemptLabel.moveTo(700,24, 50)
    attemptUI.moveTo(700,4, 50)
  }
	});
//debug
//score = 9990
//SPEED = 9998
onKeyPress("r", () => { go("lose", score, highscore) })
});

scene("lose", (score, highscore) => {
	add([
		sprite("pentagon"),
		pos(width() / 2, height() / 3 + 150),
		scale(2),
		origin("center"),
	]);
	// display score
	const finalscoreLabel = add([
		text(score),
		pos(width() / 2, height() / 3 + 80),
		scale(2),
		origin("center"),
    color(255,255,255)  
	]);
  
  if (score == highscore) {
      add([
        text("New record!"),
        pos(width() / 2, height() / 3),
        scale(1),
        origin("center"),
        color(255,196,0),
        finalscoreLabel.color = rgb(255, 196, 0),
      ]);
    topscores.push(score)
    }
  add([
    text("Click to play again.\nPress M to return to MENU.\nScore"),
    pos(width() / 2, height() / 3 - 100),
    scale(.7),
    origin("center")
  ])
  topscores.sort(function(a, b){return b - a});
  add([
		text("Top scores:\n" + topscores.join("\n")),
		pos(width() / 2, height() / 2 + 100),
		scale(.5),
		origin("center"),
    color(255,255,255)  
	]);
	// go back to game with space is pressed
	onKeyPress("space", () => go("game"));
	onClick(() => go("game"));
  onKeyPress("m", () => go("menu"));


});

go("game");
}




scene("shop", () => {});


scene("menu", () => {
	add([
		text("THE PENTAGON"), origin('center'),
		pos(width()/2, height() /2 - 200),
		scale(1.5),
    color(255, 0, 0)
	]);
  add([
		text("Press SPACE to start!"), origin('center'),
		pos(width()/2, height() /2 - 150),
		scale(1),
    color(0, 255, 0)
	]);
  add([text("AVOID obstacles!\nPress SPACE/CLICK to JUMP! Press again to LEAP!\nPress ARROW KEYS to MOVE!\nPress DOWN ARROW while in the air to FAST FALL!\nSpeed increases over time!\nPress R to give up."), origin('center'),
		pos(width()/2, height() /2 + 10),
		scale(.5),
    color(0, 255, 0)
  ]);
  add([
    sprite("pentagon"),
    area(),
		pos(width() / 2, height() / 2 + 150),
		scale(2),
		origin("center"),
    "olist",
  ])
  add([
		text("Click the pentagon for the list of obstacles!"), origin('center'),
    area(),
		pos(width()/2, height() /2 + 200),
		scale(.5),
    color(0, 0, 255),
    "olist",
	]);
  add([
		text("made with <3\nby very cool kaboom team 2022"),
		pos(0, 0),
		scale(.3),
    color(255, 0, 0),
	]);
  if (height() < 600) {
    add([
      text("The size of your window is smaller than recommended.\nYou should resize it bigger if possible and refresh."),
  scale(0.3),
  pos(0, height() / 2 + 100),
  outline(6),
  shake(10),
  color(108, 1, 11),
    ])
  }
  if (width() < 1000) {
    add([
      text("The size of your window is smaller than recommended.\nYou should resize it bigger if possible and refresh."),
  scale(0.3),
  pos(0, height() / 2 + 100),
  outline(6),
  shake(10),
  color(208, 11, 11),
    ])
  }
  onKeyPress("space", () => startGame());
  onKeyPress("o", () => go("obstacles"));
  onClick("olist", (olist) => go("obstacles"));
});
scene("obstacles", () => {
  add([
		text("OBSTACLES\nPage 1/2"), origin('center'),
		pos(width()/2, height() /2 - 300),
		scale(1.5),
    color(255, 0, 0)
  ])
  add([
    sprite("pentagon"),
		pos(width() / 5, height() / 2 - 150),
		scale(1.5),
		origin("center"),
  ])
  add([
		text("PENTAGON\nIts you!\nThe player character."), origin('center'),
		pos(width()/ 5, height() /2 - 100),
		scale(.3),
    color(0, 255, 0)
  ])
  add([
    sprite("coin"),
    pos(width() / 2.25, height() /2 - 150),
    scale(1.5),
    origin("center"),
  ])
  add([
		text("COIN\nUncommon item.\nGrab it for 200 points!"), origin('center'),
		pos(width()/ 2.25, height() /2 - 100),
		scale(.3),
    color(0, 255, 0)
  ])
  add([
			sprite("cloud"), origin("center"),
      scale(3),
			pos(width() / 1.5, height() / 2 - 150),
		]);
  add([
		text("CLOUD\nCommon obstacle.\nObscures vision."), origin('center'),
		pos(width()/ 1.5, height() /2 - 100),
		scale(.3),
    color(0, 255, 0)
  ])
  add([
			sprite("rock"), origin('center'),
			outline(4),
			pos(width() / 1.5, height() /2 + 100),
			"tree",
		]);
  add([
		text("ROCK\nUncommon obstacle.\nSlow moving. \nHitting it results in game over."), origin('center'),
		pos(width() / 1.5, height() /2 + 150),
		scale(.3),
    color(255, 0, 0)
  ])
  add([
			rect(48, 48), origin('center'),
			outline(4),
			pos(width() / 5, height() /2 + 100),
			color(131, 106, 36),
			"tree",
		]);
  add([
		text("TREE\nCommon obstacle.\nHitting it results in game over."), origin('center'),
		pos(width()/ 5, height() /2 + 150),
		scale(.3),
    color(255, 0, 0)
  ])
  add([
		text("Click to return to menu.\nPress 1/2 to switch pages."), origin('center'),
		pos(width()/2, height() /2 + 300),
		scale(1),
    color(0, 0, 255)
  ])
  add([
		rect(48,48), origin("center"),
		outline(4),
		pos(width() / 2.25, height() / 2 + 100),
    color(127, 0, 255),
		]);
  add([
		text("Platform\nUncommon obstacle.\nCan be stood on."), origin('center'),
		pos(width()/ 2.25, height() /2 + 150),
		scale(.3),
    color(0, 255, 0)
  ])
  onClick(() => go("menu"));
  onKeyPress("2", () => go("obstacles2"));
})
scene("obstacles2", () => {
  add([
		text("OBSTACLES\nPage 2/2"), origin('center'),
		pos(width()/2, height() /2 - 300),
		scale(1.5),
    color(255, 0, 0)
  ])
  add([
    sprite("portal"),
		pos(width() / 5, height() / 2 - 150),
		scale(1.5),
		origin("center"),
  ])
  add([
		text("TIME WARP\nRare item.\nA spaital rift moving at a constant speed,\ncollect it to slow down all objects!"), origin('center'),
		pos(width()/ 5, height() /2 - 100),
		scale(.3),
    color(0, 255, 0)
  ])
  add([
			sprite("portal2"), origin("center"),
      scale(3),
			pos(width() / 1.5, height() / 2 - 150),
		]);
  add([
		text("LEAP BALL\nUncommon item.\nGrants you an extra leap to use in midair."), origin('center'),
		pos(width()/ 1.5, height() /2 - 100),
		scale(.3),
    color(0, 255, 0)
  ])
  add([
		text("Click to return to menu.\nPress 1/2 to switch pages."), origin('center'),
		pos(width()/2, height() /2 + 300),
		scale(1),
    color(0, 0, 255)
  ])
  onClick(() => go("menu"));
  onKeyPress("1", () => go("obstacles"));
})
go("menu")
