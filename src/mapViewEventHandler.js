function MapViewClickEventHandler(view) {
    view.on("click", (event) => {
        // you must overwrite default click-for-popup
        // behavior to display your own popup
        view.popupEnabled = false;

        // Get the coordinates of the click on the view
        const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

        view.openPopup({
            // Set the popup's title to the coordinates of the location
            title: "Reverse geocode: [" + lon + ", " + lat + "]",
            location: event.mapPoint, // Set the location of the popup to the clicked location
            content: "This is a point of interest"  // content displayed in the popup
        });
    });
}

export default MapViewClickEventHandler;
