
game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
//            This calls our images and loads them into our project so we can use them
         {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
         {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
         {name: "player", type:"image", src: "data/img/orcSpear.png"},
         {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
         {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
         {name: "title-screen", type:"image", src: "data/img/title.png"},
         {name: "exp-screen", type:"image", src: "data/img/loadpic.png"},
         {name: "gold-screen", type:"image", src: "data/img/spend.png"},
         {name: "load-screen", type:"image", src: "data/img/loadpic.png"},
         {name: "new-screen", type:"image", src: "data/img/newpic.png"},
         {name: "spear", type:"image", src: "data/img/spear.png"},
         {name: "minimap", type:"image", src: "data/img/minimapCORRECT.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
//            This calls on my map from tiled and allows me to laod it in the game
         {name: "level01", type: "tmx", src: "data/map/test.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];