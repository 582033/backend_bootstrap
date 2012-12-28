util =
  sum: (list) -> _.reduce(list, ((sum, n) -> sum + n), 0)
  average: (list) -> this.sum(list) / list.length
  rotate_arr_to: (arr, i) -> arr[i..].concat arr[0...i]
  partition_by: (arr, iterator = _.identity) ->
    # partition_by [1,1,2,2,1] == [[1,1], [2,2], [1]]
    if _.isString(iterator)
      k = iterator
      iterator = (x) -> x[k]
    arrs = []
    suba = []
    lastv = null
    for x, i in arr
      newv = iterator x
      if i is 0 or lastv isnt newv # start a new sub array
        suba = [x]
        arrs.push suba
      else
        suba.push x
      lastv = newv
    return arrs
  uniq_stable: (arr, iterator = _.identity) ->
    if _.isString(iterator)
      k = iterator
      iterator = (x) -> x[k]
    visited = []
    narr = []
    _.each arr, (e) ->
      new_e = iterator e
      if not _.contains visited, new_e
        visited.push new_e
        narr.push e
    return narr
  rejectFirst: (list, iterator) ->
    new_list = list
    for e, i in list
      if iterator e
        new_list = list[...i].concat list[i + 1..]
        break
    new_list
  toPrecisionFixed: (num, prec) ->
    if isNaN(num) then return "NaN"
    absv = if num < 0 then -num else num
    sign = if num < 0 then "-" else ""
    if absv is 0
      e = "0."
      e += "0" while prec--
      return e
    d = Math.ceil(Math.log(absv) * Math.LOG10E)
    e = String(Math.round(absv * Math.pow(10, prec - d)))
    if d > 0
      l = d - e.length
      e += "0" while l-- > 0
      if d < e.length
        e = e.slice(0, d) + "." + e.slice(d)
    else
      e = "0" + e while d++ < 0
      e = "0." + e
    return sign + e
  toReadableHour: (seconds) -> (seconds/3600).toFixed(2)
  toReadableDistance: (meters) ->
    if meters < 1000 then "#{meters} 米" else "#{(meters / 1000).toFixed(2)} 千米"
  toReadableDuration: (seconds) ->
    if seconds < 3600 then "#{parseInt(seconds / 60)} 分钟" else "#{(seconds / 3600).toFixed(2)} 小时"


autoplan =
  HOTEL_COVER_RADIUS: 40 # 酒店的覆盖范围, in km
  AREA_DISTANCE_THRESHOLD: 50 # 更换酒店的阈值
  dirRenderers: []
  partition_days: (city, durations, distances) ->
    zones = city.zones
    days = []
    dur_acc = 0
    maxSeconds = 8 * 3600
    maxSeconds2 = 10 * 3600
    meters_threshold = 5000
    day = null
    _.each zones, (zone, i) ->
      zone.index = i
      _.each zone.points, (p) ->
        p.ac.area_index = zone.area_index
    _.each zones, (zone, i) ->
      stay_hours = zone.stay_hours
      dur = (if i is 0 then 0 else durations[i - 1])
      zone.duration = dur
      dur_acc += dur + stay_hours * 3600
      if i is 0 or dur_acc > maxSeconds2 or (dur_acc > maxSeconds and distances[i - 1] > meters_threshold)
        dur_acc = stay_hours * 3600
        day =
          zones: [zone]
          duration: dur_acc

        days.push day
      else
        day.zones.push zone
        day.duration = dur_acc


    days = @re_partition_days days, durations

    _.each days, (day) ->
      _.extend day,
        acs: _.flatten _.map(day.zones, (zone, i) ->
          zone.duration = 0 if i is 0
          _.map zone.points, (p) -> p.ac
        )
        start_area: day.zones[0].area
        end_area: _.last(day.zones).area


    _.each days, (day, i) ->
      zone_logs = _.map day.zones, (zone) ->
        names = _.map zone.points, (p) ->
          "#{p.ac.get_place().name}(#{p.ac.get_stay_hours()})"
        durs = ["#{util.toReadableHour zone.duration}", zone.stay_hours]
        name: names.join(',')
        dur: durs.join('+')
      names = _.map zone_logs, (zl) -> zl.name
      durs = _.map zone_logs, (zl) -> zl.dur
      console.log "#{city.name} day #{i}, #{util.toReadableHour day.duration} = #{durs.join ' + '}: #{names.join(' -> ')}"

    return days

  re_partition_days: (days, durations) ->
    calc_zones_duration = (zones) ->
      util.sum _.map(zones, (zone, i) ->
        zone.stay_hours * 3600 + if i is 0 then 0 else durations[zone.index - 1]
      )

    _.each days, (day, i) ->
      if i is 0 then return
      last_day = days[i - 1]
      dur0 = last_day.duration
      dur1 = day.duration
      if dur1 >= dur0 then return

      min_d = dur0 - dur1
      min_day_pair = [last_day, day]

      for i in [last_day.zones.length - 1...0]
        zones0 = last_day.zones[...i]
        zones1 = last_day.zones[i..].concat day.zones
        dur0 = calc_zones_duration(zones0)
        dur1 = calc_zones_duration(zones1)
        d = Math.abs(dur1 - dur0)
        if min_d > d
          min_d = d
          min_day_pair = [
            {zones: zones0, duration: dur0}
            {zones: zones1, duration: dur1}
          ]
        else
          break

      _.extend last_day, min_day_pair[0]
      _.extend day, min_day_pair[1]

    return days

  reset_days: (days, remaining_hotel_acs) ->
    editor.schedule.each (day) -> day.reset_activities [], 2 # clear schedule first to avoid ac.collection being null after following cross reset

    day_models = _.map days, (d, i) ->
      day = editor.schedule.getDay(i, true)
      day.reset_activities d.acs, 2
      day
    editor.schedule.reset day_models, silent: true

    editor.info.reset_all_acs()
    _.each remaining_hotel_acs, (ac) ->
      editor.wishlist.add_place ac.get_place(), silent: true
    editor.wishlist.classify_wps()
    editor.info.save_detail()
    editor.schedule_view.addAll()
    editor.wishlist_view.render()
    editor.change_day_city 0

  center_location: (locations) ->
    tlat = 0
    tlgt = 0
    for loc in locations
      tlat += loc.lat
      tlgt += loc.lgt
    new LatLgt(tlat/locations.length, tlgt/locations.length)

  get_nearest_pair: (points0, points1) ->
    nearest_pair = [0, 0]
    min_dist = 100000000
    for p0, i in points0
      for p1, j in points1
        d = p0.location.distanceTo p1.location
        if min_dist > d
          nearest_pair = [i, j]
          min_dist = d
    return nearest_pair

  get_nearest_point: (point, points1) ->
    min_dist = 10000000
    nearest_i = 0
    for p1, i in points1
      d = point.location.distanceTo p1.location
      if min_dist > d
        min_dist = d
        nearest_i = i
    return nearest_i
  plan_clusters2: (city, points, clusters2) ->
    for clusters, clusteri in clusters2
      names = for cluster in clusters
        sub_names = for i in cluster
          ac = points[i].ac
          "#{ac.get_place().name}(#{ac.get_stay_hours()})"
        sub_names.join ','
      console.log "#{city.name} area #{clusteri}", names.join(' - ')

    me = this
    tsp = @tsp2
    areas = for clusters, areai in clusters2
      area = {}
      zones = for cluster in clusters
        zone_points = (points[i] for i in cluster)
        zone_points = tsp.solveRoundTrip zone_points
        zone =
          city_id: city.id
          location: this.center_location (p.location for p in zone_points)
          stay_hours: util.sum(for p in zone_points
            stay_hours = parseFloat(p.ac.get_place().stay_hours)
            stay_hours = if isNaN stay_hours then 2 else stay_hours
          )
          points: zone_points
          area_index: areai
          area: area
      zones = tsp.solveRoundTrip zones
      if zones.length > 1
        [start_i, j] = me.get_nearest_pair zones[0].points, zones[1].points
        zones[0].points = util.rotate_arr_to zones[0].points, start_i
        for zone, i in zones[1..]
          last_point = _.last(zones[i].points)
          nearest_i = me.get_nearest_point last_point, zone.points
          zone.points = util.rotate_arr_to zone.points, nearest_i
      _.extend area,
        city_id: city.id
        location: me.center_location (z.location for z in zones)
        zones: zones
        points: _.flatten([x.points for x in zones])
    areas = tsp.solveRoundTrip areas
    city_location = new LatLgt(city.lat, city.lgt)
    min_i = _.chain(areas)
      .map((area, i) -> i: i, area: area)
      .min((x) -> x.area.location.distanceTo city_location)
      .value()
      .i
    areas = util.rotate_arr_to areas, min_i
    return areas
  get_city_promise: (city_id) ->
    get_cities_promise([city_id]).pipe((cities) -> cities[0])
  get_cities_promise: (city_ids) ->
    me = this
    deferred = $.Deferred()
    do_resolve = ->
      cities = (me.id2city[id] for id in city_ids)
      deferred.resolve cities
    @id2city = @id2city or {}
    missing_ids = _.difference(city_ids, _.keys @id2city)
    if missing_ids.length > 0
      $.getJSON "/api/cities?ids=#{city_ids.join(',')}", (res) ->
        for city in res.items
          me.id2city[city.id] = city
        do_resolve()
    else
      do_resolve()
    return deferred
  plan_tsp_promise: (acs) ->
    me = this
    tsp_defer = $.Deferred()
    tsp = @tsp2 = @tsp2 or new TspSolver()
    points = _.map(acs, (ac) ->
      place = ac.get_place()
      point =
        location: new LatLgt(place.glat, place.glgt)
        ac: ac
    )
    city_ids = _.uniq(ac.get_place().city_id for ac in acs)
    cid2points = _.groupBy points, (p) -> p.ac.get_place().city_id
    me.get_cities_promise(city_ids).then((raw_cities) ->
      jqXHRs = for c in raw_cities
        city_points = cid2points[c.id]
        lgtlats = ([p.ac.get_place().glgt, p.ac.get_place().glat] for p in city_points)
        $.ajax
          type: 'POST'
          url: "/cluster2?threshold=30,1"
          data: JSON.stringify lgtlats
          dataType: 'json'

      $.when.apply(null, jqXHRs).done( ->
        all_args = if jqXHRs.length > 1 then arguments else [arguments]
        cities = for args, i in all_args
          clusters2 = args[0]
          c = raw_cities[i]
          city_points = cid2points[c.id]
          areas = me.plan_clusters2 c, city_points, clusters2
          city =
            id: c.id
            name: c.name
            location: new LatLgt(c.glat, c.glgt)
            areas: areas
            zones: _.flatten([x.zones for x in areas])
            points: _.flatten([x.points for x in areas])
        cities = tsp.solveRoundTrip cities, false
        tsp_defer.resolve(cities)
      ).fail((err) ->
        console.error "Fail to cluster #{err}"
        tsp_defer.reject(err)
      )
    )

    return tsp_defer

  get_recommended_hotel_promise: (location, city_id) ->
    $.get("/api/recommend/hotel",
      lat: location.lat
      lgt: location.lgt
      city_id: city_id
      r: 5
    ).pipe (hotel) ->
      hotel.auto = true
      hotel # a must to avoid problom for $.when with only one defer

  get_place_location: (place) ->
    place.location or (place.location = new LatLgt(place.lat, place.lgt))

  match_recommend_hotels_promise: (cities, hotels) ->
    # match or recommend a hotel for each area, set as area.hotel
    # return - cities promise
  
    me = this
    hotels_defer = $.Deferred()

    find_nearest_hotel = (area, hotels) ->
      city_hotels = _.filter hotels, (h) -> h.city_id is area.city_id
      nearest_hotel = _.min city_hotels, (hotel) -> me.placeDistance(hotel, area)
      nearest_hotel ? null

    find_nearest_hotels = (areas, hotels) ->
      areas_hotels = _.map areas, (area) -> find_nearest_hotel area, hotels

    hotels = _.uniq hotels, false, (h) -> h.id
    hotels = _.reject hotels, (h) -> h.auto
    _.each hotels, (h) -> h.location = me.get_place_location h
    areas = _.flatten _.pluck(cities, 'areas')

    hotel_defers = _.map areas, (area) ->
      area.hotels = []
      nearest_hotel = find_nearest_hotel area, hotels
      if not nearest_hotel
        me.get_recommended_hotel_promise(area.location, area.city_id)
      else
        if me.placeDistance(nearest_hotel, area) > me.HOTEL_COVER_RADIUS
          area.hotels.push nearest_hotel
          me.get_recommended_hotel_promise(area.location, area.city_id)
        else
          nearest_hotel

    $.when(hotel_defers...)
      .done (hotels...) ->
         # use the same object for duplicated hotel (prefer manual hotel)
        id2hotels = _.groupBy((_.sortBy hotels, (h) -> if h.auto then 1 else 0), 'id')
        hotels = _.map hotels, (h) -> id2hotels[h.id][0]

        hotel_names = []
        _.each hotels, (h, i) ->
          areas[i].hotels.push h
          am = if h.auto then 'a' else 'm'
          names = _.map areas[i].hotels, (h) -> "#{h.name}(#{h.id},#{am},#{me.placeDistance(h, areas[i]).toFixed(1)})"
          hotel_names.push(names.join ',')
        console.log "area hotels: #{hotel_names.join '; '}"
        hotels_defer.resolve cities
      .fail (err) -> hotels_defer.reject err

    hotels_defer

  partition_all_days_promise: (cities) ->
    me = this
    days_defer = $.Deferred()

    routes_deferreds = for city in cities
      editor.gs.get_routes_promise city.zones, google.maps.TravelMode.DRIVING
    $.when(routes_deferreds...)
      .fail (err) ->
        days_defer.reject err
      .done ->
        days = []
        for args, i in arguments
          city = cities[i]
          _days = me.partition_days city, args.durations, args.distances
          days = days.concat _days
        days_defer.resolve days
    days_defer


  placeDistance: (p1, p2) ->
    this.get_place_location(p1).distanceTo this.get_place_location(p2)

  add_hotel_promise: (days, hotel_acs0) ->
    ###
    area.manual_hotel - user chosen nearest hotel
    area.matched_auto_hotel - matched not-so-near recommended hotel
    area.auto_hotel - recommended nearby hotel
    each area has one or two hotel candidates (area.hotels)
    choose day starting hotel
        first day - choose starting area's first candidate hotel
        other day - last day's ending hotel
    choose day ending hotel
        starting hotel
        ending area's first candidate
        next day's starting area's first candidate

        first day

        other day
            == # the same area with prev and next day
                starting hotel
            =!  # the same area with prev day
            !!
                if start_hotel in end_area
                    start_hotel
                else if not next_day or (next_day !! and distance(end_area, next_day.start_area) < 40)
                  # starting hotel
                  ending area's first candidate
                else
                  next day's starting area's first candidate
            !=
                end_area.first_candidate
    ###
    
    defer = $.Deferred()
    me = this

    do_add_hotels = (new_hotel_acs) ->
      hotel2acs = _.groupBy hotel_acs0.concat(new_hotel_acs),
        (ac) -> ac.get('place_id')
      _.each days, (day) ->
        day_acs = _.map [day.start_hotel, day.end_hotel], (hotel) ->
          if not hotel then return null
          if not hotel2acs[hotel.id]
            console.log "can not find ac for hotel", hotel, hotel2acs
            return null
          hotel2acs[hotel.id].pop()
        if day_acs[0] then day.acs.unshift day_acs[0]
        if day_acs[1] then day.acs.push day_acs[1]

      remaining_hotel_acs = _.flatten _.values hotel2acs
      defer.resolve days, remaining_hotel_acs

    get_cross_day_flag = (day1, day2) ->
      if day1?.end_area is day2?.start_area then '=' else '!'

    _.each days, (day, i) ->
      prev_day = days[i-1] if i > 0
      next_day = days[i+1] if i < days.length - 1
      flag = get_cross_day_flag(prev_day, day) + get_cross_day_flag(day, next_day)

      start_hotel = if day.start_area.city_id is prev_day?.end_area.city_id
        prev_day?.end_hotel or day.start_area.hotels[0]
      else
        day.start_area.hotels[0]
      day.start_hotel = start_hotel
      day.end_hotel = switch flag
        when '=='
          start_hotel
        when '=!', '!!'
          if start_hotel is day.end_area.hotels[0]
            start_hotel
          else
            next_next_day = days[i+2] if i < days.length - 2
            flag1 = get_cross_day_flag(next_day, next_next_day)
            if not next_day \
            or day.end_area.city_id isnt next_day.start_area.city_id \
            or (flag1 is '!' and me.placeDistance(day.end_area, next_day.start_area) < me.AREA_DISTANCE_THRESHOLD)
              day.end_area.hotels[0]
            else
              next_day.start_area.hotels[0]
        when '!='
            day.end_area.hotels[0]

    # get hotels to create activity
    new_hotels = _.compact _.flatten _.map(days, (day) -> [day.start_hotel, day.end_hotel])
    _.each hotel_acs0, (ac) ->
      new_hotels = util.rejectFirst new_hotels, (h) -> h.id is ac.get('place_id')

    new_hotel_acs = _.map new_hotels, (h) ->
      editor.create_ac_by_place h
    do_add_hotels new_hotel_acs

    defer

  sync_acs_promise: (days, remaining_hotel_acs) ->
    sync_defer = $.Deferred()

    new_acs = _.map days, (day) ->
      _.filter day.acs, (ac) -> ac.isNew()
    new_acs = _.flatten new_acs

    _done = (acs_attrs) ->
      _.each new_acs, (ac, i) -> ac.set acs_attrs[i], silent: true
      _.each remaining_hotel_acs, (ac) ->
        ac.destroy silent: true
      sync_defer.resolve days, remaining_hotel_acs

    if new_acs.length
      new_core_acs_attrs = _.map new_acs, (ac) ->
        place_id: ac.get 'place_id'
        place_type: ac.get 'place_type'
        auto: ac.get 'auto'

      editor.ajax_save("batch create #{new_acs.length} activities",
        type: 'POST'
        url: "/api/plans/#{editor.info.plan_id}/activities/batch"
        data: JSON.stringify new_core_acs_attrs
      )
        .fail (err) ->
          sync_defer.reject err
        .done (acs_attrs) ->
          _done acs_attrs
    else
      _done []

    return sync_defer


  split_acs: (acs) ->
    non_hotel_acs = _.filter(acs, (ac) ->
      ac.get("place_type") isnt "hotel"
    )
    hotel_acs = _.difference acs, non_hotel_acs
    [hotel_acs, non_hotel_acs]

  plan: (acs, cluster_times) ->
    me = this
    [hotel_acs, non_hotel_acs] = me.split_acs acs
    console.log "optimizing starts: do tsp for #{hotel_acs.length} + #{non_hotel_acs.length} acs (hotel + other)"
    me.plan_tsp_promise(non_hotel_acs)
      .pipe (cities) ->
        console.log 'optimizing: match/recommend hotel for each area', cities
        hotels = _.map hotel_acs, (ac) ->
          p = ac.get_place()
          p.auto = ac.get('auto') or false
          p
        me.match_recommend_hotels_promise(cities, hotels)
          .fail (err) -> 'optimizing: Fail to match/recommend hotel'
      .pipe (cities) ->
        console.log 'optimizing: partition days for all cities', cities
        me.partition_all_days_promise(cities)
          .fail -> console.log 'optimizing: Fail to partition days'
      .pipe (days) ->
        console.log 'optimizing: arrange hotel for each day', days
        me.add_hotel_promise(days, hotel_acs)
          .fail -> 'optimizing: Fail to arrange hotel'
      .pipe (days, remaining_hotel_acs) ->
        console.log 'optimizing: save new created acs and destroy redundant hotel acs', days, remaining_hotel_acs
        me.sync_acs_promise(days, remaining_hotel_acs)
          .fail -> 'optimizing: fail to sync acs'
      .done (days, remaining_hotel_acs) ->
        console.log 'optimizing: reset plan schedule', days, remaining_hotel_acs
        me.reset_days days, remaining_hotel_acs


  plan_day_promise: (acs) ->
    me = this
    plan_defer = $.Deferred()

    [hotel_acs, non_hotel_acs] = me.split_acs acs
    console.log "optimizing day starts: do tsp for #{hotel_acs.length} + #{non_hotel_acs.length} acs (hotel + other)"
    me.plan_tsp_promise(non_hotel_acs)
      .fail (err) ->
        plan_defer.reject(err)
      .done (cities) ->
        points = _.flatten _.pluck cities, 'points'
        new_acs = _.pluck points, 'ac'
        if hotel_acs.length > 0
          new_acs.unshift hotel_acs[0]
        new_acs = new_acs.concat hotel_acs[1..]
        plan_defer.resolve(new_acs)
    return plan_defer
