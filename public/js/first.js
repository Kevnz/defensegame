const SPEED = 0.25;
var buildOutsideWalls = function(){

    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 31; j++) {
            if(i === 0 || i === 39 || j === 0 || j === 29){
                Crafty.e("2D, Canvas, solid, block, Collision," +i + "_" + j )
                    .attr({ x: i * 16, y: j * 16, z: 2 });
            }
        }
    }
};

var _buildVerticalPath = function (lineLeft, lineRight, leftStart, rightStart, endLeft, endRight) {
    for (var i = leftStart; i > endLeft; i--) {
        Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineLeft )
            .attr({ y: i * 16, x: lineLeft * 16, z: 2 });
    };
    for (var i = rightStart; i > endRight; i--) {
        Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineRight )
            .attr({ y: i * 16, x: lineRight * 16, z: 2 });
    };
}

var _buildHorizontalPath = function (lineTop, lineBottom, start, end) {
    for (var i = start; i < end; i++) {
        Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineTop )
                    .attr({ x: i * 16, y: lineTop * 16, z: 2 });
        Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineBottom )
            .attr({ x: i * 16, y: lineBottom * 16, z: 2 });
    }
}
var buildFirstPartOfPath = function () {
    var lineTop = 13, lineBottom = 15; 

    _buildHorizontalPath(lineTop, lineBottom, 1,  6);
    Crafty.e("2D, Canvas, solid, block, Collision," + 6 + "_" + lineBottom )
            .attr({ x: 6 * 16, y: lineBottom * 16, z: 2 });
};
var buildSecondPartOfPath =function () {
    var lineLeft = 5, lineRight = 7;
    var leftStart = 12, rightStart=15

    _buildVerticalPath(lineLeft, lineRight, leftStart, rightStart, 3, 5);

};
var buildThirdPartOfPath = function () {
    var lineTop = 4, lineBottom = 6, start = 7, end = 30; 

    Crafty.e("2D, Canvas, solid, block, Collision," + 4 + "_" + lineTop )
            .attr({ x: (lineTop + 2) * 16, y: lineTop * 16, z: 2 });
    _buildHorizontalPath(lineTop, lineBottom, 7, end);
    Crafty.e("2D, Canvas, solid, block, Collision," + 4 + "_" + lineTop )
            .attr({ x: (end ) * 16, y: lineTop * 16, z: 2 });

}
var buildFourthParthOfPath = function () {
    var lineLeft = 31, lineRight = 29;
    var leftStart = 12, rightStart = 14

    _buildVerticalPath(lineLeft, lineRight, leftStart, rightStart, 3, 5);
}
 var buildFifthPartOfPath = function () {
    var lineTop = 13, lineBottom = 15; 

    _buildHorizontalPath(lineTop, lineBottom, 31,  40);
    Crafty.e("2D, Canvas, solid, block, Collision," + 30 + "_" + lineBottom )
        .attr({ x: 30 * 16, y: lineBottom * 16, z: 2, });
    Crafty.e("2D, Canvas, solid, block, Collision," + 29 + "_" + lineBottom )
        .attr({ x: 29 * 16, y: lineBottom * 16, z: 2 });
 }
var AddTriggers = function () {
    //6_14
    Crafty.e('Actor,Collision, up, trig, 7_14')
        .attr({x:7*16, y: 14*16,z:2}).collision();
    
    Crafty.e('Actor,Collision, right, trig, 6_4')
        .attr({x:6*16, y: 4*16,z:2}).collision();
    Crafty.e('Actor,Collision, down, trig, 6_14')
        .attr({x:31*16, y: 5*16,z:2}).collision();
    Crafty.e('Actor,Collision, right, trig, 6_14')
        .attr({x:30*16, y: 15*16,z:2}).collision();
};
var AddEnemy = function(){   
    
    Crafty.e('Actor, enemy')
        .attr({ x: 0, y: (16*14), hp: 10,z: 2, xspeed:SPEED, yspeed:0 })
        .bind("EnterFrame", function (e) { 
            this.x += this.xspeed;
            this.y += this.yspeed;
        })
        .onHit('up', function (e) {
            var currentX = this.x;
            this.x = this.x - this.xspeed;
            this.y = this.y - this.yspeed;
            this._rotation = 180;
            this.xspeed = 0;
            this.yspeed = -SPEED;
        }).
        onHit('right', function(e){
            this.x = this.x - this.xspeed;
            this.y = this.y - this.yspeed;
            this._rotation = 180;
            this.yspeed = 0;
            this.xspeed = SPEED;
        })
        .onHit('down', function(e){
            this.x = this.x - this.xspeed;
            this.y = this.y - this.yspeed;
            this._rotation = 180;
            this.yspeed = SPEED;
            this.xspeed = 0;
        })
        .collision()
        ;
}
var AddEnemies = function () {
    for (var i = 1; i < 1000; i++) { 
        if(i % 100 === 0) {
            console.log(i)
            setTimeout(AddEnemy, i* 30);
        }
    };
}
Crafty.scene('first', function () {
    buildOutsideWalls();
    Crafty("0_14").destroy();
    Crafty("39_14").destroy();
    buildFirstPartOfPath();
    buildSecondPartOfPath();
    buildThirdPartOfPath();
    buildFourthParthOfPath();
    buildFifthPartOfPath();
    AddTriggers();
    AddEnemies();
});