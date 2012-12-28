class PlanView
  constructor: (days) ->
    _.map days, (day) -> new DayMapView(day.mps, "MapCanvas_#{day.container}")

class DayMapView
  constructor: (mps, canvas) ->
    mapOptions =
      zoom: 8
      #zoomControl: false //放大缩小控件
      streetViewControl: false #街景控件
      center: new google.maps.LatLng(0, 0)
      mapTypeId: google.maps.MapTypeId.ROADMAP

    @mps = mps
    @map = new google.maps.Map $(".#{canvas}")[0], mapOptions
    @dirRenderers = []
    @show()

  get_icon_url: (pos) -> #
    pos_str = (if pos is -1 then "" else pos)
    url = "https://chart.googleapis.com/chart?chst=d_map_pin_letter_withshadow&chld=#{pos_str}|3b8d1f|000000"
    "http://thumb.wowpad.cn/thumb?format=png&src=#{encodeURIComponent(url)}"

  render_directions: (directionsResults) ->
    dr.setMap null for dr in @dirRenderers
    @dirRenderers = for directionsResult in directionsResults
      dirRenderer = new google.maps.DirectionsRenderer
        directions: directionsResult
        hideRouteList: true
        map: @map
        panel: null
        preserveViewport: true
        suppressInfoWindows: true
        suppressMarkers: true
        suppressBicyclingLayer: true
        polylineOptions:
          strokeWeight: 3
          strokeColor: '#3c8dc5'

  fitBounds: (markers, pan) ->
    map = @map
    if markers.length > 1
      bounds = new google.maps.LatLngBounds
      bounds.extend m.position for m in markers
      if pan
        map.panToBounds bounds
      else
        map.fitBounds bounds
    else if markers.length is 1
        map.setCenter markers[0].position
        zoom = if markers[0].type == 'city' then 7 else 12
        map.setZoom zoom

  draw_polyline: (markers, color) ->
    polyline = new google.maps.Polyline(
      path: _.pluck(markers, "position")
      strokeColor: color
      strokeOpacity: 1
      strokeWeight: 3
    )
    polyline.setMap @map
    polyline


  show: ->
    me = this

    markers = _.map @mps, (mp, i) ->
      icon = new google.maps.MarkerImage me.get_icon_url(i + 1)
      marker = new google.maps.Marker(
        map: me.map
        position: new google.maps.LatLng(mp.lat, mp.lgt)
        icon: icon
        title: mp.name
      )

    @fitBounds markers

    points = _.map @mps, (mp) ->
      location: new LatLgt(mp.lat, mp.lgt)
    gs = new GoogleService()
    gs.get_routes_promise(points, google.maps.TravelMode.DRIVING)
      .done (result) ->
        me.render_directions result.dirsResults
      .fail ->
        console.log "Fail to draw routes, draw polyline instead"
        me.draw_polyline markers, '#000'
