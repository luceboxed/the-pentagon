import kaboom from "kaboom";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
let highscore = 0;
let attempts = 0;
// initialize context
kaboom({
  // global: true,
  // fullscreen: true,
  // scale: 1,
  // debug: true,
  // clearColor: [0, 0, 0, 1],
  background: [134, 135, 247],
  // width: 1280,
  // height: 960,
  // scale: 1,
});
loadSprite("shop", "sprites/shop.jpg");
loadPedit("pentagon", "sprites/Pentagon.pedit");
loadPedit("andrew", "sprites/andrew.pedit");
loadPedit("cloud", "sprites/cloud.pedit");
loadSprite("sky","https://www.paulwheeler.us/files/windows-95-desktop-background.jpg");
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
//         loadPedit("rock", "sprites/rock.pedit");
//         loadPedit("box", "sprites/box.pedit");
//         loadPedit("monster", "sprites/monster.pedit");
//         loadPedit("grass", "sprites/grass.pedit");
//         loadPedit("ground", "sprites/ground.pedit");
//         loadPedit("birdr", "sprites/birdr.pedit");
//         loadPedit("birdl", "sprites/birdl.pedit");
//         loadPedit("prize", "sprites/prize.pedit");
//         loadPedit("apple", "sprites/apple.pedit");
//         loadPedit("portal", "sprites/portal.pedit");
//         loadPedit("portal2", "sprites/portal2.pedit");
//         loadPedit("coin", "sprites/coin.pedit");
//loadPedit("andrew", "sprites/andrew.pedit");
//         loadPedit("bottle", "sprites/bottle.pedit");
//   const LEVELS = [
//             [ //0
//                 "                          c $ ",
//                 "       c                c   $ ",
//                 "             c        c     $ ",
//                 "   cc       ~       c       $ ",
//                 "      c                     $ ",
//                 "          $$$     c         $ ",
//                 "         ====         =     $ ",
//                 "                      g     $ ",
//                 "                      g       ",
//                 "      ^^  m   =  m b  g      @",
//                 "==============g=======g=======",
//             ]]

//   // define what each symbol means in the level graph
//         const levelConf = {
//             // grid size
//             width: 64,
//             height: 64,
//             // define each object as a list of components
//             "=": () => [
//                 sprite("grass"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//             ],
//             "c": () => [
//                 sprite("cloud"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//                 "cloud",
//             ],
//             "g": () => [
//                 sprite("ground"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//             ],
//             "r": () => [
//                 sprite("rock"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//             ],
//             "x": () => [
//                 sprite("box"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//             ],
//             "$": () => [
//                 sprite("coin"),
//                 area(),
//                 pos(0, -9),
//                 origin("bot"),
//                 "coin",
//             ],
//             "%": () => [
//                 sprite("prize"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//                 "prize",
//             ],
//             "b": () => [
//                 sprite("bottle"),
//                 area(),
//                 origin("bot"),
//                 body(),
//                 "bottle",
//             ],
//             "^": () => [
//                 sprite("spike"),
//                 area(),
//                 solid(),
//                 origin("bot"),
//                 "danger",
//             ],
//             "#": () => [
//                 sprite("apple"),
//                 area(),
//                 origin("bot"),
//                 body(),
//                 "apple",
//             ],
//             ">": () => [
//                 sprite("ghosty"),
//                 area(),
//                 origin("bot"),
//                 body(),
//                 patrol(),
//                 "enemy",
//             ],
//             "m": () => [
//                 sprite("monster"),
//                 area(),
//                 origin("bot"),
//                 body(),
//                 patrol(),
//                 "enemy",
//             ],
//             "~": () => [
//                 sprite('birdl'),
//                 area(),
//                 origin("bot"),
//                 patrolbird(),
//                 "bird",
//             ],
//             "a": () => [
//                 sprite("andrew"),
//                 area(),
//                 origin("bot"),
//                 body(),
//                 patrol(),
//                 "enemy",
//             ],
//             "@": () => [
//                 sprite("portal"),
//                 area({
//                     scale: 0.5,
//                 }),
//                 origin("bot"),
//                 pos(0, -12),
//                 "portal",
//             ],
//             "e": () => [
//                 sprite("portal2"),
//                 area({
//                     scale: 0.5,
//                 }),
//                 origin("bot"),
//                 pos(0, -12),
//                 "portal",
//             ],
//         }


scene("game", () => {


  
layers([
    "background",
  "midground",
    "game"
], "game");

add([
    sprite("sky"),
    layer("background")
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

	// add a game object to screen
	const player = add([
		// list of components
	  sprite("pentagon"),
		pos(80, 40),
		area(),
		body(),
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

  // onKeyDown("left", () => {
  //               //player.use(sprite('beanl'))
  //               player.move(-MOVE_SPEED, 0)
  //           })

  function walkRight(){
    player.move(500,0);
  }

  onKeyDown("right",(walkRight))
  
  
	function jump() {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE);
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
      solid(),
			outline(4),
			pos(-48, height() - FLOOR_HEIGHT),
			origin("botleft"),
			color(131, 106, 36),
			//move(LEFT, SPEED*0.5),
			"wall",
		]);
  
	function spawnTree() {

		// add tree obj
		add([
			rect(48, rand(32, 96)),
			area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			origin("botleft"),
			color(131, 106, 36),
			move(LEFT, SPEED*0.2),
			"tree",
		]);

		// wait a random amount of time to spawn next tree
		wait(rand(0.8, 1.3), spawnTree);
    

	}

  function spawnClouds() {

		// add tree obj
		const BB = add([
			sprite("cloud"),
      layer("midground"),
			area(),
      scale(rand(.5, 2)),
			//outline(4),
			pos(width(), rand(height() - FLOOR_HEIGHT, 0)),
			origin("botleft"),
			//color(131, 0, 0),
			move(LEFT, SPEED*0.2*rand(.5,1.5)),
			"andrew",
		]);

		// wait a random amount of time to spawn next tree
		wait(rand(0, 2), spawnClouds);
    

	}

  
	// start spawning trees
	spawnTree();
  spawnClouds();
  // wait(20, SPEED = SPEED + 10);
	// lose if player collides with any game obj with tag "tree"
	player.onCollide("tree", () => {
		// go to "lose" scene and pass the score
		go("lose", score);
		burp();
		addKaboom(player.pos);
	});

	// keep track of score
	let score = 0;
	const scoreLabel = add([
		text(score),
		pos(100, 24),
	]);
  add([
    text("Score"),
    pos(100, 4),
    scale(.5)
  ])
  const highscoreLabel = add([
    text(highscore),
    pos(300, 24),
    color(0, 0, 0)
  ])
  add([
    text("Record"),
    pos(300, 4),
    scale(.5)
  ])
  const attemptLabel = add([
    text(attempts),
    pos(500, 24),
  ])
  add([
    text("Attempt"),
    pos(500, 4),
    scale(.5)
  ])
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
	});

});

scene("lose", (score) => {

	add([
		sprite("pentagon"),
		pos(width() / 2, height() / 2 + 150),
		scale(2),
		origin("center"),
	]);
	// display score
	const finalscoreLabel = add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
		origin("center"),
    color(255,255,255)
	]);
  if (score >= highscore) {
      add([
        text("New record!"),
        pos(width() / 2, heght() / 2 + 40),
        scale(1),
        origin("center"),
        finalscoreLabel.color = rbg(255, 196, 0),
      ]);
    }
  add([
    text("Click to play again\nScore"),
    pos(width() / 2, height() / 2 - 100),
    scale(.7),
    origin("center")
  ])

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"));
	onClick(() => go("game"));
  onKeyPress("s", () => go("shop"));


});

go("game");
}




scene("shop", () => {});


scene("menu", () => {
	add([
		text("THE PENTAGON"), origin('center'),
		pos(width()/2, height() /2 - 150),
		scale(1.5),
    color(255, 0, 0)
	]);
  add([
		text("Click or press SPACE to start!"), origin('center'),
		pos(width()/2, height() /2 - 100),
		scale(1),
    color(0, 255, 0)
	]);
  add([text("AVOID obstacles!\nPress SPACE/CLICK to JUMP!\nPress ARROW KEYS to MOVE!\nPress DOWN ARROW while in the air to FAST FALL!\nBest played maximized."), origin('center'),
		pos(width()/2, height() /2 + 30),
		scale(.5),
    color(0, 255, 0)
  ]);
  add([
    sprite("pentagon"),
		pos(width() / 2, height() / 2 + 150),
		scale(2),
		origin("center"),
  ])
  onKeyPress("space", () => startGame());
  onClick(() => startGame());
});

go("menu")
