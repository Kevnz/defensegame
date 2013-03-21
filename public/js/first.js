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
var buildFirstPartOfPath = function () {
    var lineTop = 13, lineBottom = 15;
    for (var i = 1; i < 6; i++) {
        Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineTop )
                    .attr({ x: i * 16, y: lineTop * 16, z: 2 });
        Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineBottom )
            .attr({ x: i * 16, y: lineBottom * 16, z: 2 });
    }
    Crafty.e("2D, Canvas, solid, block, Collision," + i + "_" + lineBottom )
            .attr({ x: i * 16, y: lineBottom * 16, z: 2 });
};
var buildSecondPartOfPath =function () {

};
Crafty.scene('first', function () {
    buildOutsideWalls();
    Crafty("0_14").destroy();
    Crafty("39_14").destroy();
    buildFirstPartOfPath();
    buildSecondPartOfPath();
});