function zlidez() {

    var x = document.getElementById("sliderImg");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

    var layerz = viewer.imageryLayers;
    var leftie = layerz.addImageryProvider(
        new Cesium.TileMapServiceImageryProvider({
            url: '../Tileset/Maps/Sandvik2020',
        })
     );
    leftie.splitDirection = Cesium.ImagerySplitDirection.LEFT; // Only show to the left of the sliderImg.
    

    // Sync the position of the sliderImg with the split position
    var sliderImg = document.getElementById("sliderImg");
    viewer.scene.imagerySplitPosition =
        sliderImg.offsetLeft / sliderImg.parentElement.offsetWidth;

    var handler4 = new Cesium.ScreenSpaceEventHandler(sliderImg);

    var moveActive = false;

    function move(movement) {
        if (!moveActive) {
            return;
        }

        var relativeOffset = movement.endPosition.x;
        var splitPosition =
            (sliderImg.offsetLeft + relativeOffset) /
            sliderImg.parentElement.offsetWidth;
        sliderImg.style.left = 100.0 * splitPosition + "%";
        viewer.scene.imagerySplitPosition = splitPosition;
    }

    handler4.setInputAction(function () {
        moveActive = true;
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler4.setInputAction(function () {
        moveActive = true;
    }, Cesium.ScreenSpaceEventType.PINCH_START);

    handler4.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler4.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

    handler4.setInputAction(function () {
        moveActive = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
    handler4.setInputAction(function () {
        moveActive = false;
    }, Cesium.ScreenSpaceEventType.PINCH_END);

}