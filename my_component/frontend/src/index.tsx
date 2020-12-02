import { Streamlit } from "./streamlit"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"

const CAN_CENTER_LON = -95.6016
const CAN_CENTER_LAT = 65.1759
const INIT_ZOOM_LEVEL = 3

const map = document.createElement("div")
map.style.height = "600px"
map.setAttribute("id", "mapid")
document.body.appendChild(map)
var mymap = L.map("mapid").setView([CAN_CENTER_LAT, CAN_CENTER_LON], INIT_ZOOM_LEVEL)


/*var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});
var streets   = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});*/


/*L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "use.your.mapbox.token",
  }
).addTo(mymap)
*/

const base_geogratis_url = 'http://maps.geogratis.gc.ca/wms'
const base_geogratis_url_ESRI = 'https://geoappext.nrcan.gc.ca/arcgis/services/BaseMaps/CBMT3978/MapServer/WMSServe'
const wms_url_CBMT = base_geogratis_url + "/CBMT"
const base_url_images = "https://datacube-dev-tmp.s3.ca-central-1.amazonaws.com/features"
const url_centroides_images = base_url_images + "/images_centroid.json"
const url_empreintes_images = base_url_images + "/images_polygon.json"
const qc_geojson = 'http://polygons.openstreetmap.fr/get_geojson.py?id=61549&params=0'
const us_outline_500k = 'https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_outline_500k.json'

/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);*/

/*
var CanadaBaseMap = L.tileLayer.wms(wms_url_CBMT, {
    layers: 'National,Sub_national,Regional,Sub_regional'
}).addTo(mymap)
*/
var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap, Tiles courtesy of Humanitarian OpenStreetMap Team'
  }).addTo(mymap);

/*L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    layers: 'TOPO-OSM-WMS'
}).addTo(mymap)
*/
function onMapClick(e: any) {
  /*L.popup()
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap)*/
  Streamlit.setComponentValue(e.latlng)
  Streamlit.setFrameHeight()
}

function onMapMoveEnd(e: any) {
  /*L.popup()
    .setLatLng(mymap.getCenter())
    .setContent("Map Extent [south, north, west, east] = " + mymap.getBounds().getSouth() + ", " + mymap.getBounds().getNorth() +
                ", " + mymap.getBounds().getWest() +", " + mymap.getBounds().getEast())
    .openOn(mymap)*/
 /* Streamlit.setComponentValue("Map Extent [south, north, west, east] = " + mymap.getBounds().getSouth() + ", " + mymap.getBounds().getNorth() +
              ", " + mymap.getBounds().getWest() +", " + mymap.getBounds().getEast())*/
  Streamlit.setComponentValue(JSON.stringify(mymap.getBounds()))
  Streamlit.setFrameHeight()
}
mymap.on("click", onMapClick)
mymap.on("moveend", onMapMoveEnd)

function onRender(event: Event): void {
  Streamlit.setFrameHeight()
}
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

Streamlit.setComponentReady()
Streamlit.setFrameHeight()
