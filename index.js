import 'ol/ol.css'
import GPX from 'ol/format/GPX.js'
import Point from 'ol/geom/Point.js'
import XYZ from 'ol/source/XYZ.js'
import ImageWMS from 'ol/source/ImageWMS.js'
import TileWMS from 'ol/source/TileWMS.js'
import Feature from 'ol/Feature.js'
import Geolocation from 'ol/Geolocation.js'
import { Map, View } from 'ol'
import { Control } from 'ol/control.js'
import { getNetwerkSld, getKnooppuntSld } from './sld'
import { Vector as VectorSource } from 'ol/source.js'
import { Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'

const state = {
  'sideBarVisible': false,
  'knooppuntenVisible': true,
  'backgroundMap': 'hikebike'
}

const lineStringStyle = [ new Style({
  stroke: new Stroke({
    color: '#ffffff',
    width: 4
  })
}),new Style({
  stroke: new Stroke({
    color: '#D46A6A',
    width: 2
  })
})]

const gpxStyle = {
  'LineString': lineStringStyle,
  'MultiLineString': lineStringStyle
}
const reader = new FileReader()
const map = new Map({
  target: 'map',
})
const tileBackgroundLayer2 = new TileLayer()

const wmsLayer = new TileLayer({
  source: new TileWMS({
    url: 'https://geodata.nationaalgeoregister.nl/fietsknooppuntennetwerk/wms',
    params: { 'LAYERS': 'netwerken', 'TILED': true, STYLES: undefined, SLD_BODY: getNetwerkSld('#55AA55') },
    serverType: 'geoserver'
  })
})

const wmsLayerKP = new ImageLayer({
  source: new ImageWMS({
    url: 'https://geodata.nationaalgeoregister.nl/fietsknooppuntennetwerk/wms',
    params: { 'LAYERS': 'knooppunten', STYLES: undefined, SLD_BODY: getKnooppuntSld('fietsknooppuntennetwerk:knooppunten','16', '#55AA55') },
    serverType: 'geoserver'
  })
})

// const wmsLayerBelgie = new ImageLayer({
//   source: new ImageWMS({
//     url: 'http://trip.toerismevlaanderen.be/arcgis/services/routes/fietsnetwerk/MapServer/WmsServer',
//     params: { 'LAYERS': 'wegdek fietstraject,fietsknoop', 'STYLES': 'default,default'  }
//   })
// })

const positionFeature = new Feature()
positionFeature.setStyle(new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#226666'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2
    })
  })
}))

const accuracyFeature = new Feature()

const geoPositionLayer = new VectorLayer({
  source: new VectorSource({
    features: [accuracyFeature, positionFeature]
  })
})

const geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: map.getView().getProjection()
})
geolocation.setTracking(true)

var gpxLayer = new VectorLayer({
  source: new VectorSource({
    format: new GPX()
  }),
  style: function (feature) {
    return gpxStyle[feature.getGeometry().getType()]
  }
})

const backgroundLayers = {
  'hikebike': {
    'url':'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
    'attributions': ['achtergrondkaart OSM Hike & Bike: © OpenStreetMap contributors']
  },
  'brtgrijs': {'url': 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartgrijs/EPSG:3857/{z}/{x}/{y}.png'}
}

function getMenuControl(){
  let button = document.createElement('button')
  button.innerHTML = '<i class="fas fa-bars"></i>'
  let element = document.createElement('div')
  element.className = 'ol-control custom-control'
  element.id = 'showMenu'
  element.appendChild(button)
  let myControl = new Control({ element: element })
  return myControl
}

function setVisibilitySidebar(visible) {
  if (visible) {
    document.getElementById('sidebar').style.display = 'block'
    document.getElementById('sidebar').style.height = '70vh'
    document.getElementById('map').style.height = '30vh'
    document.getElementById('showMenu').style.visibility = 'hidden'
    document.getElementById('closeMenu').style.visibility = 'visible'
  } else {
    document.getElementById('sidebar').style.display = 'none'
    document.getElementById('sidebar').style.height = '0vh'
    document.getElementById('map').style.height = '100vh'
    document.getElementById('showMenu').style.visibility = 'visible'
    document.getElementById('closeMenu').style.visibility = 'hidden'

  }
  map.updateSize()
}

function zoomToGPX() {
  let extent = gpxLayer.getSource().getExtent()
  map.getView().fit(extent, map.getSize())
}

function setSourceBackgroundLayer(key) {
  tileBackgroundLayer2.setSource(new XYZ({
    url: backgroundLayers[key].url,
    attributions: backgroundLayers[key].attributions,
  }))
}



function onZoomEnd(evt) {
  let zLevel = map.getView().getZoom()
  let boundary = 11
  if (zLevel < boundary) {
    wmsLayer.setVisible(false)
    wmsLayerKP.setVisible(false)
  }
  if (zLevel >= boundary) {
    wmsLayer.setVisible(true)
    wmsLayerKP.setVisible(true)
  }
}

function filenameToTrackName(filename) {
  let startIndex = (filename.indexOf('\\') >= 0 ? filename.lastIndexOf('\\') : filename.lastIndexOf('/'))
  filename = filename.substring(startIndex)
  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    filename = filename.substring(1)
  }
  filename = filename.slice(0, filename.lastIndexOf('.'))
  filename = filename.replace('_', ' ')
  filename = filename.replace('-', ' ')
  let trackName = capitalizeString(filename)
  return trackName
}

function handleFileUpload(event) {
  let filename = event.target.files[0].name
  if (!filename) {
    return
  }
  let trackName = filenameToTrackName(filename)
  document.getElementById('fileUpload').style.display = 'none'
  document.getElementById('saveTrackDiv').style.display = 'block'
  document.getElementById('saveTrack').value = trackName
}

function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function generateUuid() {
  function randomDigit() {
      if (crypto && crypto.getRandomValues) {
          let rands = new Uint8Array(1)
          crypto.getRandomValues(rands)
          return (rands[0] % 16).toString(16)
      } else {
          return ((Math.random() * 16) | 0).toString(16)
      }
  }
  let crypto = window.crypto || window.msCrypto
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit)
}

function handleFileRead(event) {
  let fileContent = event.target.result
  let trackName = document.getElementById('saveTrack').value
  let trackId = `gpx.${generateUuid()}`
  document.getElementById('fileUpload').style.display = 'none'
  document.getElementById('saveTrackDiv').style.display = 'none'
  window.localStorage.setItem(trackId,  JSON.stringify({'fileContent':fileContent, 'trackName': trackName}))
  addTrack(trackId, true)
  changeGPX(fileContent)
  zoomToGPX()
}

function loadGPXJsonObject(trackId) {
  return JSON.parse(localStorage.getItem(trackId))
}

function changeGPX(gpx) {
  gpxLayer.getSource().clear()
  if (gpx) {
    let GPXfeatures = (new GPX()).readFeatures(gpx, { featureProjection: 'EPSG:3857' })
    gpxLayer.getSource().addFeatures(GPXfeatures)
  }
}

function addTracks() {
  for (var i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    if (key.startsWith('gpx.')) {
      addTrack(key)
    }
  }
}

function setCheckedTrackList (selectedTrackId) {
  let els = document.getElementsByClassName('gpxVisible')
  Array.prototype.forEach.call(els, function (el) {
    if (el.id !== selectedTrackId) {
      el.checked = false
    }
  })
}

function gpxVisibleChangedEventHandler(evt) {
  if (evt.srcElement.checked) {
    let trackId = evt.srcElement.id
    let gpxJson = loadGPXJsonObject(trackId)
    changeGPX(gpxJson.fileContent)
    zoomToGPX()
    setCheckedTrackList(evt.srcElement.id)
  }
}

function openTabEventHandler(evt) {
  let i, tabcontent, tablinks
  tabcontent = document.getElementsByClassName('tabcontent')
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }
  tablinks = document.getElementsByClassName('tablinks')
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }
  let activateTab = evt.srcElement.getAttribute('tab')
  document.getElementById(activateTab).style.display = 'block'
  evt.srcElement.className += ' active'
}

function deleteTrackEvenHandler(evt){
  let trackId = evt.srcElement.getAttribute('trackId')
  let trackName = loadGPXJsonObject(trackId).trackName
  if (confirm(`Are you sure you want to delete track: ${trackName}?`)) {
    localStorage.removeItem(trackId)
    let cells = document.querySelectorAll('#trackTable tbody td')
    Array.prototype.forEach.call(cells, function(cell) {
      let currentTrackId = cell.getAttribute('trackId')
      if (currentTrackId === trackId){
        cell.parentNode.removeChild(cell)
        return
      }
    })
    gpxLayer.getSource().clear()
  }
}

function addTrack(trackId, checked = false) {
  let trackName = loadGPXJsonObject(trackId).trackName
  let tBody = document.querySelector('#trackTable tbody')
  let toggle = document.createElement('input')
  toggle.type = 'checkbox'
  toggle.style.cssFloat = 'left'
  toggle.className = 'gpxVisible checkVisible'
  toggle.id = trackId
  toggle.checked  = checked
  if (checked) setCheckedTrackList(trackId)
  toggle.addEventListener('change', gpxVisibleChangedEventHandler, false)
  let row = document.createElement('tr')
  let cell = document.createElement('td')
  cell.setAttribute('trackId', trackId)
  cell.innerHTML = trackName
  row.appendChild(cell)
  tBody.appendChild(row)
  let btnWrap = document.createElement('div')
  btnWrap.className += 'ol-control custom-control'
  btnWrap.style.display = 'inline-block'
  btnWrap.style.cssFloat = 'right'
  btnWrap.style.position = 'unset'
  btnWrap.setAttribute('trackId', trackId)
  let btn = document.createElement('button')
  btn.setAttribute('trackId', trackId)
  let i = document.createElement('i')
  i.setAttribute('trackId', trackId)
  i.className += 'fas fa-trash'
  btnWrap.appendChild(btn)
  btn.appendChild(i)
  cell.appendChild(btnWrap)
  cell.appendChild(toggle)
  btnWrap.addEventListener('click', deleteTrackEvenHandler, false)
}

function selectAchtergrondChangedEventHandler(evt){
    state.backgroundMap = evt.target.value
    setSourceBackgroundLayer(state.backgroundMap)
}

function saveTrackEventHandler(evt){
    let file = document.getElementById('fileUpload').files[0]
    reader.readAsText(file)
}

function geoLocationChangedEventHandler(evt){
    let coordinates = geolocation.getPosition()
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null)
    map.getView().setCenter(geolocation.getPosition())
    map.getView().setZoom(13)
}

function geoLocationChangedOnceEventHandler () {
  map.getView().setCenter(geolocation.getPosition())
  map.getView().setZoom(13)
}

function geoAccuracyChangeEventHanlder (evt) {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
}

function toggleMenuEventHandler(){
  state.sideBarVisible = !state.sideBarVisible
  setVisibilitySidebar(state.sideBarVisible)
}

function visilityKnooppuntenEventHandler () {
    state.knooppuntenVisible = !state.knooppuntenVisible
    wmsLayerKP.setVisible(state.knooppuntenVisible)
    wmsLayer.setVisible(state.knooppuntenVisible)
}

function registerEventHandlers() {
  reader.onload = handleFileRead
  var els = document.getElementsByClassName('tablinks')
  Array.prototype.forEach.call(els, function (el) {
    el.addEventListener('click', openTabEventHandler)
  })
  document.getElementById('selectAchtergrond').addEventListener('change', selectAchtergrondChangedEventHandler)
  document.getElementById('saveTrackBtn').addEventListener('click', saveTrackEventHandler)
  document.getElementById('fileUpload').addEventListener('change', handleFileUpload)
  geolocation.on('change:position', geoLocationChangedEventHandler)
  geolocation.on('change:accuracyGeometry', geoAccuracyChangeEventHanlder)
  geolocation.once('change:position', geoLocationChangedOnceEventHandler)
  document.getElementById('closeMenu').addEventListener('click', toggleMenuEventHandler)
  document.getElementById('showMenu').addEventListener('click', toggleMenuEventHandler)
  document.getElementById('knooppuntenVisible').addEventListener('click', visilityKnooppuntenEventHandler)
  map.on('moveend', onZoomEnd)
}

function initApp(){
  map.addControl(getMenuControl())
  map.setView(new View({
    center: [631064.105522, 6829189.855111],
    zoom: 7
  }))
  addTracks()
  map.addLayer(tileBackgroundLayer2)
  map.addLayer(wmsLayer)
  map.addLayer(wmsLayerKP)
  map.addLayer(geoPositionLayer)
  map.addLayer(gpxLayer)
  document.getElementById('selectAchtergrond').value = 'hikebike'
  setSourceBackgroundLayer(state.backgroundMap)
  registerEventHandlers()
}

initApp()


