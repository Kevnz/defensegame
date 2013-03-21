var Game = function (config) {
    this.dimensions = {
        width:640, //40 tiles
        height:480, //30 tiles
        tile_size: 16
    }
}
var GAME_TYPE = 'Canvas';

Game.prototype.init = function() {

    Crafty.init(this.dimensions.width,this.dimensions.height);
    Crafty.canvas.init();
    Crafty.background("#CCC");
};

Game.prototype.load = function() {
    Crafty.load(['/img/block.png', '/img/enemy.png', '/img/player.png', '/img/turret.png'], function () {
        Crafty.sprite(16, '/img/block.png', {
            block: [0,0]
        });
        Crafty.sprite(16, '/img/enemy.png', {
            enemy: [0, 0] 
        });
        Crafty.sprite(16, '/img/player.png', {
            player: [0,0] 
        });
        Crafty.sprite(16, '/img/turret.png', {
            turrent: [0,0] 
        });
        Crafty.trigger('GameLoaded');
    });
};
Game.prototype.start = function() {
    Crafty.scene('first')
};




document.addEventListener( "DOMContentLoaded", function(){ 
    var game = new Game();

    game.init();
    game.load();

    Crafty.bind('GameLoaded', function(){ 
        game.start();
    })

}, false );