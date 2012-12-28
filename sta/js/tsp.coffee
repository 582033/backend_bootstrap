window.TSP_MODE_ROUND = 0
window.TSP_MODE_ATOZ =  1
window.DRIVING_SPEED = 60 # km/h
class TspSolver
  constructor: ->
    @maxTripSentry = 2000000000 # Approx. 63 years., this long a route should not be reached...
  make1dArray: (n, val=null) ->
    val for i in [0..n-1]
  make2dArray: (n1, n2, val=null) ->
    for i in [0...n1]
      for j in [0...n2]
        val
  calcDistance: (p0, p1) -> p0.distanceTo p1
  # Finds the next integer that has num bits set to 1.
  nextSetOf: (num, nextSet) ->
    ret = 0
    numActive = nextSet.length

    count = 0
    count += x for x in nextSet
    if count < num
      nextSet[i] = 1 for i in [0...num]
      nextSet[i] = 0 for i in [num...numActive]
    else
      firstOne = nextSet.indexOf(1)
      firstZero = nextSet.indexOf(0, firstOne + 1)
      return -1  if firstZero < 0
      # Increment the first zero with ones behind it
      nextSet[firstZero] = 1
      # Set the part behind that one to its lowest possible value
      k = firstZero - firstOne - 1
      nextSet[i] = 1 for i in [0...k]
      nextSet[i] = 0 for i in [k...firstZero]

	# Return the index for this set
    for i in [0...numActive]
      ret += (nextSet[i] << i)
    ret

  tspDynamic: (dur, mode) ->
    ###
    Solves the TSP problem to optimality. Memory requirement is
    O(numActive * 2^numActive)

    Return
     bestPath[]

    If mode is 1, it will return the optimal solution to the related
    problem of finding a path from node 0 to node this.numActive - 1, visiting
    the in-between nodes in the best order.
    ###
    
    numActive = dur.length
    nextSet = @make1dArray(numActive, 0)
    visited = @make1dArray(numActive, false)
    bestPath = @make1dArray(numActive, 0)
    bestTrip = 10000000

    numCombos = 1 << numActive
    parent = @make2dArray(numCombos, numActive, 0)
    C = @make2dArray(numCombos, numActive, 0.0)

    for k in [1...numActive]
      index = 1 + (1 << k)
      C[index][k] = dur[0][k]

    for s in [3..numActive]
      nextSet[i] = 0 for i in [0...numActive]
      index = @nextSetOf(s, nextSet)
      while index >= 0
        for k in [1...numActive]
          continue if not nextSet[k]
          prevIndex = index - (1 << k)
          C[index][k] = @maxTripSentry
          for m in [1...numActive]
            continue unless nextSet[m] and m isnt k
            if C[prevIndex][m] + dur[m][k] < C[index][k]
              C[index][k] = C[prevIndex][m] + dur[m][k]
              parent[index][k] = m
        index = @nextSetOf(s, nextSet)

    index = (1 << numActive) - 1
    if mode is TSP_MODE_ROUND
      currNode = -1
      bestPath[numActive] = 0

      for i in [1...numActive]
        if C[index][i] + dur[i][0] < bestTrip
          bestTrip = C[index][i] + dur[i][0]
          currNode = i
      bestPath[numActive - 1] = currNode
    else
      currNode = numActive - 1
      bestPath[numActive - 1] = numActive - 1
      bestTrip = C[index][numActive - 1]

    for i in [numActive - 1...0]
      currNode = parent[index][currNode]
      index -= (1 << bestPath[i])
      bestPath[i - 1] = currNode

    bestPath

  solve: (points, mode) ->
    numActive = points.length
    dur = for i in [0...numActive]
      for j in [0...numActive]
        @calcDistance(points[i].location, points[j].location)
    @durations = dur
    if points.length < 3
      bestPath = (i for i in [0...points.length])
    else
      console.log 'tsp: geo points', points, 'line distances', dur
      bestPath = @tspDynamic(dur, mode)
      if mode is TSP_MODE_ROUND
        bestPath = bestPath[...bestPath.length - 1]
      bestPath

  solveRoundTrip: (points, best_break = true) ->
    me = this
    bestPath = @solve(points, TSP_MODE_ROUND)
    if best_break # cut the longest edge
      maxd = -1
      maxi = 0
      len = bestPath.length
      _.each bestPath, (i0, i) ->
        last_i0 = bestPath[(i - 1 + len) % len]
        d = me.durations[last_i0][i0]
        if maxd < d
          maxd = d
          maxi = i
      bestPath = util.rotate_arr_to bestPath, maxi

    new_points = (points[i] for i in bestPath)

  solveAtoZ: (points) ->
    bestPath = @solve(points, TSP_MODE_ATOZ)
    new_points = (points[i] for i in bestPath)
  getDurations: -> @durations


class LatLgt
  constructor: (lat, lgt, radius = 6371) ->
    @lat = parseFloat lat
    @lgt = parseFloat lgt
    @latr = @toRad @lat
    @lgtr = @toRad @lgt
    @radius = parseFloat radius # earth radius, in kmm
  toRad: (deg) -> deg * Math.PI / 180 # 弧度
  toDeg: (rad) -> rad * 180 / Math.PI
  distanceTo: (latlgt, prec = 4) ->
    x0 = @latr
    y0 = @lgtr
    x1 = latlgt.latr
    y1 = latlgt.lgtr
    dx = x1 - x0
    dy = y1 - y0
    j = Math.pow(Math.sin(dx / 2), 2) + Math.cos(x0) * Math.cos(x1) * Math.pow(Math.sin(dy / 2), 2)
    k = 2 * Math.atan2(Math.sqrt(j), Math.sqrt(1 - j))
    @radius * k
  midpointTo: (latlgt) ->
    lat1 = @latr
    lgt1 = @lgtr
    lat2 = latlgt.latr
    lgt2 = latlgt.lgtr

    dlgt = lgt2 - lgt1
    c = Math.cos(lat2) * Math.cos(dlgt)
    d = Math.cos(lat2) * Math.sin(dlgt)
    lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + c) * (Math.cos(lat1) + c) + d * d))
    lgt3 = lgt1 + Math.atan2(d, Math.cos(lat1) + c)
    new LatLgt(this.toDeg(lat3), this.toDeg(lgt3))
    
class GoogleService
  routes_defer_cache: {}
  constructor: ->
    @DIR_STATUS_MSG = {}
    if google?
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.INVALID_REQUEST] = "The DirectionsRequest provided was invalid."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED] = "Too many DirectionsWaypoints were provided in the DirectionsRequest. The total allowed waypoints is 8, plus the origin and destination."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.NOT_FOUND] = "At least one of the origin, destination, or waypoints could not be geocoded."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.OK] = "The response contains a valid DirectionsResult."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.OVER_QUERY_LIMIT] = "The webpage has gone over the requests limit in too short a period of time."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.REQUEST_DENIED] = "The webpage is not allowed to use the directions service."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.UNKNOWN_ERROR] = "A directions request could not be processed due to a server error. The request may succeed if you try again."
      @DIR_STATUS_MSG[google.maps.DirectionsStatus.ZERO_RESULTS] = "No route could be found between the origin and destination."

  get_line_directions_result: (latlons, dirsResult0) ->
    latlgts = _.map latlons, (x) -> new LatLgt(x.lat(), x.lng())
    legs = for i in [1...latlons.length]
      last_latlon = latlons[i-1]
      latlon = latlons[i]
      distance = parseInt(latlgts[i-1].distanceTo latlgts[i]) * 1000
      duration = parseInt(distance / 1000 * 3600 / DRIVING_SPEED) # seconds
      step =
        distance:
          value: distance
          text: util.toReadableDistance(distance)
        duration:
          value: duration
          text: util.toReadableDuration(duration)
        start_location: last_latlon
        end_location: latlon
        path: [last_latlon, latlon],
        travel_mode: google.maps.TravelMode.DRIVING
      leg = _.extend {},
        _.pick(step, ['distance', 'duration', 'start_location', 'end_location'])
        start_address: ''
        end_address: ''
        steps: [step]
        via_waypoints: []

    bounds = new google.maps.LatLngBounds
    _.each latlons, (latlon) -> bounds.extend latlon
    route =
      bounds: bounds
      copyrights: 'Map data ©2012 AutoNavi, Google'
      legs: legs
      overview_path: latlons
      warnings: []

    directionsResult = _.extend {}, dirsResult0, routes: [route]

  get_routes_promise: (points, travelMode = google.maps.TravelMode.DRIVING, maxSize = 0, abs_start = 0) ->
    maxSize = if travelMode is google.maps.TravelMode.TRANSIT then 2 else (maxSize or 10)

    compute_hash_key = ->
      lat_lgts = points.map (p) -> "#{p.location.lat},#{p.location.lgt}"
      "#{travelMode}(#{maxSize}):#{lat_lgts.join ';'}"
    hash_key = compute_hash_key()
    if @routes_defer_cache[hash_key]
      console.log "get routes between #{points.length} points, travel model: #{travelMode}, hit cache"
      return @routes_defer_cache[hash_key]

    me = this
    routes_defer = $.Deferred()
    @routes_defer_cache[hash_key] = routes_defer

    myGebDirections = new google.maps.DirectionsService()
    get_route_promise = (start, end) ->
      route_defer = $.Deferred()
      sub_points = points[start..end]
      latlons = _.map sub_points, (p) -> new google.maps.LatLng(p.location.lat, p.location.lgt)
      waypoints = _.map latlons[1...latlons.length-1], (p) ->
        location: p, stopover: true
      myGebDirections.route
        origin: latlons[0]
        destination: _.last(latlons)
        waypoints: waypoints
        avoidHighways: true
        travelMode: travelMode
        , (directionsResult, directionsStatus) ->
          msgse = "#{abs_start + start} - #{abs_start + end}"
          switch directionsStatus
            when google.maps.DirectionsStatus.OK
              console.log "routes done: #{msgse}"
              route_defer.resolve directionsResult
            when google.maps.DirectionsStatus.ZERO_RESULTS
              split_size = Math.max(2, parseInt(sub_points.length / 3) + 1)
              emsg = "routes zero results: #{msgse}"
              if sub_points.length <= split_size
                console.log "#{emsg}. use line instead"
                route_defer.resolve me.get_line_directions_result latlons, directionsResult
              else
                console.log "#{emsg}. retry (#{split_size}) after 500ms"
                _.delay (->
                  me.get_routes_promise(sub_points, travelMode, split_size, abs_start + start)
                    .done (result) ->
                      route_defer.resolve result.dirsResults
                    .fail (err) ->
                      route_defer.reject err
                ), 500
            else
              errorMsg = me.DIR_STATUS_MSG[directionsStatus]
              console.log "routes failed: #{msgse}, #{errorMsg}"
              route_defer.reject errorMsg
      return route_defer

    if points.length > 1
      route_defers = for start in [0...points.length-1] by maxSize - 1
        end = Math.min(start + maxSize, points.length) - 1
        get_route_promise start, end
    else
      route_defers = []

    emsg = "#{abs_start} - #{abs_start + points.length - 1} / #{maxSize}"
    $.when(route_defers...)
      .done ->
        dirsResults = _.flatten arguments
        legs = _.flatten(dr.routes[0].legs for dr in dirsResults)
        durations = (leg.duration.value for leg in legs)
        distances = (leg.distance.value for leg in legs)

        result =
          dirsResults: dirsResults
          durations: durations
          distances: distances
          legs: legs
        console.log "get routes done, #{emsg}, result", result
        routes_defer.resolve result
      .fail (err) ->
        console.log "get routes fail, #{emsg}"
        routes_defer.reject(err)
        delete me.routes_defer_cache[hash_key] # don't cache fail

    return routes_defer
