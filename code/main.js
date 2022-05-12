import kaboom from "kaboom";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
let SPEED = 450;
let highscore = 0;
let attempts = 0;

// initialize context
kaboom();

// load assets
loadSprite("bean", "sprites/bean.png");
loadPedit("pentagon", "sprites/Pentagon.pedit");
//         loadSprite("bean", "sprites/bean.png");
//         loadPedit("beanl", "sprites/beanl.pedit");
//         loadPedit("ghosty", "sprites/ghosty.pedit");
//         loadPedit("spike", "sprites/spike.pedit");
//         loadPedit("cloud", "sprites/cloud.pedit");
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
//         loadPedit("andrew", "sprites/andrew.pedit");
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


  
	// define gravity
	gravity(2400);

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
		if (player.grounded()) {
			player.jump(JUMP_FORCE);
		}
	}

	// jump when user press space
	onKeyPress("space", jump);
	onClick(jump);

	function spawnTree() {

		// add tree obj
		add([
			rect(48, rand(32, 96)),
			area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			origin("botleft"),
			color(255, 180, 255),
			move(LEFT, SPEED*0.5),
			"tree",
		]);

		// wait a random amount of time to spawn next tree
		wait(rand(0.8, 1.5), spawnTree);
    
    

	}

	// start spawning trees
	spawnTree();
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
  const highscoreLabel = add([
    text(highscore),
    pos(300, 24),
  ])
  const attemptLabel = add([
    text(attempts),
    pos(500, 24),
  ])
	// increment score every frame
    
  attempts = attempts + 1;
  attemptLabel.text = attempts;
	onUpdate(() => {
		score++;
		scoreLabel.text = score;
    if (score > highscore) {
      highscore = score;
      highscoreLabel.text = highscore;
    }
	});

});

scene("lose", (score) => {

	add([
		sprite("pentagon"),
		pos(width() / 2, height() / 2 - 80),
		scale(2),
		origin("center"),
	]);

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
		origin("center"),
	]);

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"));
	onClick(() => go("game"));

});

go("game");