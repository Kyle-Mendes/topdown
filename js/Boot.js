var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function() {};

//setting game config
TopDownGame.Boot.prototype = {
	create: function() {
		// the loading screen BG is white
		this.game.stage.backgroundColor = '#fff';

		//scaling options
		this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//center the game
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//screen size is set to be slightly zoomed in.
		this.scale.setupScale(480, 480);

		//adding the physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.state.start('Preload');
	}
};