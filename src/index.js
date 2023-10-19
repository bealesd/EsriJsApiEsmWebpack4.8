import EsriMapView from "../dist/mapView.js";
import "../dist/mapView.js";

// use this if webpack cannot output modules
// const EsriMapViewInstance = new window.EsriMapView();

const EsriMapViewInstance = new EsriMapView();

EsriMapViewInstance.AddClickHandler();

document.querySelector('#count-bookmarks-button').addEventListener("click", (event) => {
    alert(EsriMapViewInstance.CountBookmarks());
});
