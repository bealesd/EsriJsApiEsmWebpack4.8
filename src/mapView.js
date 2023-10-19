import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

import MapViewClickEventHandler from './mapViewEventHandler'

import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = "./dist/assets";

/**
 * Creates a map.
 * Renders map on screen.
 * Add bookmarks to map.
 * Add map click handler.
 */
class EsriMapView {
  webmap;
  view;

  #container = "viewDiv";
  #portalId = "aa1d3f80270146208328cf66d022e09c";

  constructor() {
    // get map
    this.webmap = new WebMap({
      portalItem: {
        id: this.#portalId
      }
    });

    // add map tp view
    this.view = new MapView({
      container: this.#container,
      map: this.webmap
    });

    const bookmarks = new Bookmarks({
      view: this.view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true
    });

    const bkExpand = new Expand({
      view: this.view,
      content: bookmarks,
      expanded: true
    });

    // Add the widget to the top-right corner of the view
    this.view.ui.add(bkExpand, "top-right");
  }

  AddClickHandler() {
    MapViewClickEventHandler(this.view);
  }

  CountBookmarks() {
    return this.webmap.bookmarks?.length;
  }
}

//global export if this is not a module due to webpack
window.EsriMapView = EsriMapView;

// esm export
export default EsriMapView;
