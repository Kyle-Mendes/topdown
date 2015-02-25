var TopDownGame = TopDownGame || {};

//loading game assets
TopDownGame.Preload = function() {};

TopDownGame.Preload.prototype = {
	preload: function() {
		//load game assets
		this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/images/tiles.png');
		this.load.image('redGem', 'assets/images/redGem.png');
		this.load.image('blueGem', 'assets/images/blueGem.png');
		this.load.image('player', 'assets/images/player.png');
	},
	create: function() {
		this.state.start('Game');
	}
};