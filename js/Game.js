var TopDownGame = TopDownGame || {};

TopDownGame.Game = function() {};

//title screen
TopDownGame.Game.prototype = {
	create: function() {
		this.map = this.game.add.tilemap('map');
		//the first parameter is the tileset as specified in Tiled, second is the key to the asset
		this.map.addTilesetImage('BaseLine', 'gameTiles');

		//create layer
		this.backgroundLayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.foregroundLayer = this.map.createLayer('foregroundLayer');

		//collision on blockedLayer
		//start, stop, collides, layer, recalculate
		this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

		//resize the gameworld to match the layer dimensions
		this.backgroundLayer.resizeWorld();

		this.createGems();

		//the player
		var result = this.findObjectsByType('playerStart', this.map, 'objectLayer');

		this.player = this.game.add.sprite(64, 64, 'player');
		this.game.physics.arcade.enable(this.player);

		//setting the camera to follow our player
		this.game.camera.follow(this.player);

		//allowing character to move
		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	createGems: function() {
		//create gems
		this.gems = this.game.add.group();
		this.gems.enableBody = true;

		var gems;
		result = this.findObjectsByType('gem', this.map, 'objectLayer');
		result.forEach(function(element){
			this.createFromTiledObject(element, this.gems);
		}, this);
	},

	//find objects in a Tiled layer that containt a property called "type" equal to a certain value
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element){
			if(element.properties.type === type) {
				//Phaser uses top left, Tiled bottom left so we have to adjust
				//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
				//so they might not be placed in the exact position as in Tiled
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
		return result;
	},

	//create a sprite from an object
	createFromTiledObject: function(element, group) {
		var sprite = group.create(element.x, element.y, element.properties.sprite);

		//copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key){
			sprite[key] = element.properties[key];
		});
	},
	collect: function(player, collectable) {
		collectable.destroy();
	},
	update: function() {
		//player movement
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if(this.cursors.up.isDown) {
			this.player.body.velocity.y -= 130;
		}
		else if(this.cursors.down.isDown) {
			this.player.body.velocity.y += 130;
		}
		if(this.cursors.left.isDown) {
			this.player.body.velocity.x -= 130;
		}
		else if(this.cursors.right.isDown) {
			this.player.body.velocity.x += 130;
		}

		//Collision
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.overlap(this.player, this.gems, this.collect, null, this);

		//Win condition
		if(this.gems.length === 0) {
			console.log('You win!');
		}
	}
};