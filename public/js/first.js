Crafty.scene('first', function () {
    for (var i = 0; i < 41; i++) {
        for (var j = 0; j < 31; j++) {
            if(i === 0 || i === 39 || j === 0 || j === 29){
                Crafty.e("2D, Canvas, solid, block")
                    .attr({ x: i * 16, y: j * 16, z: 2 });
            }
        }
    }
});