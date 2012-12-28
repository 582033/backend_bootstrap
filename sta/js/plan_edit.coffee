window.TARGET_WB = -1
window.DEFAULT_CITY_ID = "36" # beijing

_.mixin
  groupOneBy: (list, iterator) ->
    id2arr = _.groupBy list, iterator
    id2obj = {}
    _.each _.keys(id2arr), (id) -> id2obj[id] = id2arr[id][0]
    id2obj

PlanEditor = (pland) ->
  @enable_logging = (enabled) ->
    if typeof window.console is "undefined"
      window.console =
        log: ->
        error: ->
    else unless enabled and window.console.log? and window.console.error?
      window.console.log = window.console.error = ->

  @init = ->
    @enable_logging pland.debugging
    @id2ac_attr = _.groupOneBy pland.activities, 'id'
    @uid2place = _.groupOneBy pland.places, 'uid'
    @is_author = pland.is_author
    @plan_id = pland.plan_info.id
    @schedule = new Schedule pland.days
    @wishlist = new WishList pland.wish_places
    @info = new PlanInfo pland.plan_info

    @wishlist.classify_wps()
    @info.reset_all_acs()

    @gs = new GoogleService()

    @plan_info_view = new PlanInfoView model: @info
    @schedule_view = new ScheduleView model: @schedule
    @widget_view = new WidgetView
    @main_view = new PlanEditorView()
    @main_view.initialize()
    if google_is_defined()
      @schedule_map_view = new ScheduleMapView
      $(@schedule_map_view.el).appendTo($(".schedule-map-container"))
    else
      console.log 'google map loading failed'
      @schedule_map_view =
        render_acs: ->
        render: ->
    @wishlist_view = new WishListView model: @wishlist
    @mini_wishlist_view = new MiniWishListView model: @wishlist

    @plan_info_view.render()
    @wishlist_view.render()
    @mini_wishlist_view.render()
    @schedule_view.addAll()

  @get_current_offset = -> @schedule_view.currentOffset

  @unload = ->
    b = "/plans/" + pland.plan_id + "/api/cleanup/"
    $.ajax
      type: "POST"
      url: b
      async: not 1

  @show_autosave_indicator = -> @plan_info_view.show_autosave_indicator()
  @show_autosave_error = ->
    console.error.apply console, arguments
    @widget_view.widget_error_blocker.propagate()
  @ajax_save = (op_name, ajax_opts) ->
    me = this
    ajax_opts.contentType ?= 'application/json'
    $.ajax(ajax_opts)
      .done(->
        console.log "#{op_name} done", ajax_opts
        me.show_autosave_indicator()
      )
      .fail (err) -> me.show_autosave_error "Fail to #{op_name}, #{err.status} #{err.statusText}: #{err.responseText}"

  @change_day_city = (day_index, city_index) ->
    acs_res = this.schedule.get_render_acs(day_index, city_index)
    if city_index?
      editor.main_view.toggle_current_day false
    @schedule_view.calendar_to acs_res.day_index
    @schedule_map_view.render_acs day_index, acs_res.city_indexes, acs_res.days

  @create_ac_by_place = (place) ->
    @uid2place[place.uid] ?= place
    new Activity
      place_id: place.id
      place_type: place.type
      auto: place.auto or false


  @confirm_box = ($btn, text, callback) ->
    $btn.jgrowl
      text: text
      title: "请确认"
      persistent: true
      confirm: true
      el: $btn
      callback: -> callback()

  this


window.PlanInfo = Backbone.Model.extend(
  initialize: ->
    @schedule = window.editor.schedule
    @wishlist = editor.wishlist
    @plan_id = window.editor.plan_id
    @url = "/api/plans/" + window.editor.plan_id
    @activities = {}
    @legs = {}
    @save_detail = _.debounce(@_save_detail, 200)
    @schedule.bind 'remove add change reset', @save_detail, this
    @wishlist.bind 'remove add change reset', @save_detail, this

  reset_all_acs: ->
    @wishlist.map (wp) -> wp.set 'uses_count', 0, silent: true
    @activities = {}
    @schedule.add_all_acs silent: true
  remove_ac: (ac, options) ->
    if @activities[ac.id]
      delete @activities[ac.id]
      wp = @wishlist.get ac.get_place().uid
      wp.set 'uses_count', Math.max(0, wp.get('uses_count') - 1), options
  add_ac: (ac, options) ->
    unless @activities[ac.id]
      place = ac.get_place()
      @activities[ac.id] = ac
      wp = @wishlist.add_place place, options
      wp.set 'uses_count', wp.get('uses_count') + 1, options

  get_place_acs: (place_uid) ->
    _.filter _.values(@activities), (ac) -> ac.get_place_uid() is place_uid

  get_city_acs: (city_id) ->
    _.filter _.values(@activities), (ac) -> ac.get_place().city_id is city_id

  cities: ->
    citys = {}
    _.each @activities, (a) ->
      place = a.get_place()
      city_id = place.city_id
      city_name = place.city_name
      return  if citys[city_id]
      citys[city_id] =
        slug: city_id
        value: city_id
        name: city_name
        label: city_name
        name_en: city_name
        place_class: "Area"

    citys

  _save_detail: ->
    detail =
      days: @schedule.toJSON()
      wish_places: @wishlist.toJSON()
    no_empty_aid = _.every detail.days, (day) ->
      _.every day.aids, (aid) -> aid?
    unless no_empty_aid
      console.log 'Skip save plan detail due to undefined ac id'
      return
    editor.ajax_save 'save plan detail'
      type: "PUT"
      url: @url
      data: JSON.stringify(detail: detail)
)

window.Activity = Backbone.Model.extend(
  defaults:
    id: null
    note: ''
    place_id: null
    place_type: null
    stay_hours: null
    auto: false # auto recommended or manual added

  get_container: -> @collection?.day.get 'container'

  get_stay_hours: ->
    if @get('place_type') is 'hotel'
      0
    else
      @get('stay_hours') or parseFloat(@get_place().stay_hours or 2)
  get_place: ->
    uid = @get_place_uid()
    editor.uid2place[uid]

  get_place_uid: ->
    uid = "#{@get('place_type')}_#{@get('place_id')}"

  is_hotel: -> @get('place_type') is 'hotel'


  methodUrl: (a) ->
    switch a
      when "create"
        @url
      else
        @url + @get("id")


  initialize: ->
    @url = "/api/plans/" + window.editor.plan_id + "/activities/"
    @bind "change", -> editor.show_autosave_indicator()
    @bind 'destroy', (m) -> editor.info.remove_ac m


  sync: (a, b, c) ->
    b.methodUrl and b.methodUrl(a.toLowerCase()) and (c = c or {}
    c.url = b.methodUrl(a.toLowerCase())
    )
    Backbone.sync(a, b, c)
)

window.ActivityLeg = Backbone.Model.extend(
  defaults:
    id: null
    distance: null
    duration: null
    steps: {}
)

window.ActivityList = Backbone.Collection.extend(model: Activity)

window.DayActivity = Backbone.Model.extend(
  defaults:
    id: null
    container: 0
    note: ""
    aids: []

  parse: (attrs) ->
    _.pick attrs, (_.keys @defaults)

  methodUrl: (a) ->
    @url + @get("id")

  initialize: (attrs, options) ->
    me = this
    attrs ?= aids: []
    @url = "/api/plans/" + window.editor.plan_id + "/days/"
    acs = _.map attrs.aids, (aid) -> editor.id2ac_attr[aid]
    @activities = new ActivityList acs
    @activities.day = this
    @activities.bind 'reset', @add_all_acs, this
    @activities.bind 'add', @add_ac, this
    @bind("remove", @remove, this)
    @bind("change", ->
      editor.show_autosave_indicator()
    )
    @activities.bind 'reset add remove', ->
      me.reset_aids()
      me.change_activities()
    @change_activities()

  change_activities: ->
    non_hotel_i = 0
    @activities.each (ac, i) ->
      if ac.is_hotel()
        ac.pin_letter = 'H'
      else
        ac.pin_letter = non_hotel_i + 1
        non_hotel_i += 1
  add_ac: (ac, options) ->
    if not editor.info.activities[ac.id]
      if ac.is_hotel() and not ac.get('auto') # if manual added, change all corresponding hotel acs to manual
        hotel_id = ac.get('place_id')
        _.each editor.info.activities, (ac) ->
          if ac.is_hotel() and ac.get('place_id') is hotel_id
            ac.set('auto', false, silent: true)
            if ac.hasChanged('auto')
              ac.save({}, silent: true)
      editor.info.add_ac ac, options

  add_all_acs: (options) ->
    me = this
    @activities.each (ac) -> me.add_ac ac, options


  reset_activities: (acs, silent_level = 0) ->
    # don't call Collection.reset directly, call this method instead
    # @param silent_level: 0 - not silent, 1 - only silent ac reset, 2 - full silent, also silent change:aids
    silent_ac = (if silent_level > 0 then true else false)
    silent_aid = (if silent_level is 2 then true else false)
    @activities.reset acs, silent: silent_ac
    if silent_ac # or else will fire 'reset' event and call reset_aids
      @reset_aids silent: silent_aid
      @change_activities()

  reset_aids: (options) ->
    aids = @activities.pluck 'id'
    @set 'aids', @activities.pluck('id'), options


  remove: ->
    console.log "remove model " + @id
    @destroy()

  sync: (method, model, options) ->
    model.methodUrl and model.methodUrl(method.toLowerCase()) and (options = options or {}
    options.url = model.methodUrl(method.toLowerCase())
    )
    Backbone.sync method, model, options
)

window.WishPlace = Backbone.Model.extend(
  defaults:
    id: null
    place_type: null
    place_id: null
    uses_count: 0

  get_place: -> Activity::get_place.apply(this, arguments)
  get_place_uid: -> Activity::get_place_uid.apply(this, arguments)
  create_ac: (options = {}) ->
    options.success ?= (model) ->
    options.error ?= (model) ->
      console.log 'Fail to create activity, destroy'
      model.destroy()

    me = this
    ac = new Activity
      place_type: @get 'place_type'
      place_id: @get 'place_id'
    ac.save({}, options).done ->
      day = ac.collection?.day
      if not day
        console.log 'ac created but not in any day, ignore'
        return
      console.log "Activity created, reset aids for day #{day.get 'container'} and add to info.activities"
      day.add_ac ac # will incr wp.uses_count
      day.reset_aids()

    return ac
        
)
window.WishList = Backbone.Collection.extend(
  model: WishPlace
  cities_wps: []
  city_count: 0
  place_count: 0
  initialize: ->
    @bind 'add remove reset', @classify_wps, this

  add_place: (place, options) ->
    wp = @get place.uid
    unless wp
      wp = new WishPlace
        id: place.uid
        place_type: place.type
        place_id: place.id
        uses_count: 0
      editor.uid2place[place.uid] ?= place
      @add wp, options
    wp


  classify_wps: ->
    console.log 're classify wish places', @models
    cities_wps = _.values @groupBy (wp) -> wp.get_place().city_id
    console.log cities_wps
    @cities_wps = _.map cities_wps, (city_wps) ->
      _.extend {
        city_id: city_wps[0].get_place().city_id
        city_name: city_wps[0].get_place().city_name
        count: city_wps.length
        hotels: []
        attractions: []
        restaurants: []
      }, _.groupBy(city_wps, (wp) -> wp.get('place_type') + 's')

    @city_count = @cities_wps.length
    @place_count = _.sum _.map @cities_wps, (city_wps) -> city_wps.count
    console.log @cities_wps

  get_city_wish_places: (city_id) ->
    city_wps = _.find @cities_wps, (city) -> city.city_id is city_id

  get_city_wish_places_by_type: (city_id, place_type) ->
    city_wps = _.find @cities_wps, (city) -> city.city_id is city_id
    if city_wps then city_wps["#{place_type}s"] else []

  remove_city_wps: (city_id) ->
    wps = @reject (wp) -> wp.get_place().city_id is city_id
    @reset wps

)

window.MiniWishListView = Backbone.View.extend(
  el: '.wl_switch'
  events:
    'click #add-place': 'add_wish_place'
  initialize: ->
    @wishlist = @model
    @$city_count = @$('#city_count')
    @$place_count = @$('#place_count')
    @model.bind 'reset add remove', @render, this
  add_wish_place: ->
    console.log 'add wish place'
    wl_view = editor.wishlist_view
    editor.widget_view.widget_city.propagate(wl_view.current_city_id, wl_view.current_place_type)
  render: ->
    console.log 'mini wishlist view render'
    @$city_count.text @wishlist.city_count
    @$place_count.text @wishlist.place_count

)
window.WishListView = Backbone.View.extend(
  el: '.wl_popup'
  current_city_id: null
  current_place_type: 'attraction'
  events:
    'click ul.tab.city li': 'switch_city'
    'click ul.tab.type li': 'switch_type'
    'click ul.tab.city span.remove': 'delete_city'

  initialize: ->
    @wishlist = @model
    @$city_tab_template = _.template $('#wishlist-city-tab-template').html()
    @$type_tab_template = _.template $('#wishlist-type-tab-template').html()
    @$wps_container = @$('.city-places ul.list')
    @$city_tab = @$('ul.tab.city')
    @$type_tab = @$('ul.tab.type')
    @add_to_draggable()
    @model.bind 'reset add remove', @render, this

  switch_city: (ev) ->
    @current_city_id = $(ev.currentTarget).data('city_id') + ''
    @render()
  switch_type: (ev) ->
    @current_place_type = $(ev.currentTarget).data('place_type')
    @render()

  delete_city: (ev) ->
    $btn = $(ev.currentTarget)
    city_id = $btn.parent().data('city_id') + ''
    city_name = $btn.parent().data('city_name') + ''
    editor.confirm_box $btn, "删除#{city_name}的所有景点和活动？", ->
      acs = editor.info.get_city_acs(city_id)
      _.each acs, (ac) -> ac.destroy()
      editor.wishlist.remove_city_wps city_id
      console.log "city #{city_id}, wps, and #{acs.length} acs removed"
    return false

  render_summary: ->
    me = this
    type2name =
      attraction: '景点'
      hotel: '酒店'
      restaurant: '餐饮'

    if not @current_city_id and @wishlist.cities_wps.length
      @current_city_id = @wishlist.cities_wps[0].city_id

    cities_stats = _.map @wishlist.cities_wps, (city_wps) ->
      city_stat =
        city_id: city_wps.city_id
        city_name: city_wps.city_name
        class_name: if city_wps.city_id is me.current_city_id then 'sel' else ''
        wp_count: city_wps.count

    city_wps = @wishlist.get_city_wish_places(@current_city_id) or {}
    types_stats = _.map ['attraction', 'hotel', 'restaurant'], (place_type) ->
      place_type: place_type
      place_type_name: type2name[place_type]
      class_name: if place_type is me.current_place_type then 'sel' else ''
      wp_count: city_wps["#{place_type}s"]?.length or 0

    @$city_tab.html @$city_tab_template cities_stats: cities_stats
    @$type_tab.html @$type_tab_template types_stats: types_stats

  add_to_draggable: ->
    me = this
    console.log 'wishlist add to draggable'
    @$wps_container.find('> li').draggable
      connectToSortable: 'dl.day ul.acs'
      appendTo: 'body'
      helper: 'clone'
      zIndex: 1000
      revert: 'invalid'
      revertDuration: 200

  add_wp_view: (wp) ->
    acv = new ActivityView(
      model: wp
      id: wp.cid
      is_wp: true
    )
    @$wps_container.append acv.render().el

  render_wps: ->
    me = this
    acs = @wishlist.get_city_wish_places_by_type @current_city_id, @current_place_type
    console.log "render wish places for city #{@current_city_id}, type #{@current_place_type}, count #{acs.length}"
    @$wps_container.empty()
    _.each acs, (ac) ->
      me.add_wp_view ac
    @$wps_container.width acs.length * 150
    @add_to_draggable()
   
  render: ->
    @render_summary()
    @render_wps()
)
WidgetView = Backbone.View.extend(
  el: ".widget-container"
  events:
    "click .widget": "propagate"

  query_names:
    1: "餐饮"
    2: "娱乐"
    4: "景点"
    5: "购物"
    restaurant: "餐饮"
    hotel: "酒店"
    entertainment: "娱乐"
    attraction: "景点"
    shopping: "购物"


  search_api: "/api/cities/search"
  nav_history: []
  initialize: ->
    a = this
    @search_place_cache = {}
    @widget_city = new WidgetCityView
    @widget_place = new WidgetPlaceView
    @widget_error_blocker = new WidgetErrorBlockerView
    window.editor.is_author or @$(".invite").remove()
    @$backdrop = $("<div id=\"widget-backdrop\" />").appendTo("body").click(->
      a.presenting.close_on_blur and a.close()
    ).on("DOMMouseScroll", (b) ->
      a.scroll b
    ).on("mousewheel", (b) ->
      a.scroll b
    )
    @$busy_overlay = $("<div class=\"busy-overlay\" />").appendTo("#widget-overlay")
    @$overlay = $("#widget-overlay").on("click", ".close", ->
      a.close()
    ).on("DOMMouseScroll", (b) ->
      a.scroll b
    ).on("mousewheel", (b) ->
      a.scroll b
    )


  propagate: (ev) ->
    @query_type = $(ev.currentTarget).data("type")
    if @query_type is "activity"
      @query_type = "attraction"
      @widget_custom_activity.propagate()
      return
    if @query_type is 0
      @widget_hotel.propagate()
      return
    @query_name = @query_names[@query_type]
    @widget_searchform.query_name = @query_type
    @widget_searchform.propagate()


  search_place: (a, b) ->
    c = a.term
    if c is ""
      b _.values(window.editor.info.cities())
      return
    if c of @search_place_cache
      b @search_place_cache[c]
      return
    d = this
    @lastXhr = $.getJSON(@search_api, a).success((a, e, f) ->
      console.log "search_place success", a
      a = _.reject(a, (a) ->
        a.place_class is "Continent"
      )
      d.search_place_cache[c] = a
      d.lastXhr is f and b(a)
    ).error((a) ->
      console.error("search_place error", a)
      data =
        name: "查询失败，请检查网络连接。"
        error: "error"

      d.lastXhr is a and b([data])
    )


  _renderAutocompleteItem: (a, b) ->
    if typeof b.parent_name is "undefined" or not b.parent_name? or b.parent_name is ""
      c = "<a>" + b.name + "</a>"
    else
      c = "<a>" + b.name + ", " + b.parent_name + "</a>"
    $("<li />").data("item.autocomplete", b).append(c).appendTo a


  close: ->
    @loaded()
    @scrolling = 0
    @$backdrop.hide()

    @hide @presenting, "down"
    @presenting = null
    @nav_history = []


  loading: ->
    @$busy_overlay.show()

  loaded: ->
    @$busy_overlay.hide()

  scroll: (a) ->
    return  unless @presenting.scrollable
    @scrolling = ++@scrolling or 1
    b = a.originalEvent
    c = (if b.wheelDelta then b.wheelDelta * ((if window.opera then -1 else 1)) else b.detail * -1)
    c = (if c > 0 then 1 else -1)
    if @scrolling > 1
      @scroll_dir and @scroll_dir isnt c and (@scroll_dir = 0)
      return
    @scroll_dir = c
    @do_scroll()


  do_scroll: ->
    a = @scroll_dir
    unless a
      @scrolling = 0
      return
    b = this
    c = $(b.presenting.el)
    (if c.offset().top > 30 and a is 1 or c.offset().top < $(window).height() - c.height() - 60 and a is -1 then b.scrolling = 0 else c.animate(
      "margin-top": "+=" + 60 * a
    , 100, "linear", ->
      --b.scrolling and b.do_scroll()
    ))


  slideIn: (view, dir) ->
    dir = dir or "up"
    @$backdrop.show()
    @presenting and @hide(@presenting, dir)
    @show view, dir
    @presenting = view


  slideDir:
    up: [0, -600]
    down: [0, 600]
    left: [-900, 0]
    right: [900, 0]


  nav_prev: ->
    @nav_history.pop()
    a = @nav_history.pop()
    return  unless a
    (if a.slug then a.view.propagate(a.slug, "right") else a.activity_id and a.view.edit(a.activity_id, "right"))


  show: (view, b) ->
    c = @slideDir[b][0]
    d = @slideDir[b][1]
    _.isFunction(view.show) and view.show()
    marginTop = (-Math.min($(view.el).height(), $(window).height()) / 2 + 20)
    $(view.el).fadeTo(0, 0).css(
      left: $(window).width() / 2 + "px"
      top: $(window).height() / 2 + "px"
    ).animate(
      left: "-=" + c
      top: "-=" + d
    , 0).animate(
      left: "+=" + c
      top: "+=" + d
      opacity: 1
    , 600, "linear").animate
      left: "50%"
      top: "50%"
      "margin-top": marginTop
    , 0


  hide: (view, b) ->
    return  unless view
    c = @slideDir[b][0]
    d = @slideDir[b][1]
    $(view.el).css(
      left: $(window).width() / 2 + "px"
      top: $(window).height() / 2 + "px"
    ).animate(
      left: "+=" + c
      top: "+=" + d
      opacity: 0
    , 600, "linear").animate
      left: "-9999px"
      top: "-9999px"
    , 0, ->
      _.isFunction(view.hide) and view.hide()
      view.scrollable and $(view.el).css("margin-top": "-300px")
)

WidgetCityView = Backbone.View.extend(
  el: "#widget-city-view"
  events:
    "click .tab": "switch_tab"
    "click .result-frame .prev": "scroll_up"
    "click .result-frame .next": "scroll_down"
    "click .place-add": "place_add"
 
    #"click .place-item .captain": "next",
    "click .chooseCity_popup a": "city_switch"
    "click .info .prev": "prev"
    "click .info .country": "nav_up"
    "click .info .desc .expand": "desc_expand"
    "click .info .desc .shrink": "desc_shrink"


  api_base: "/api/cities/"
  scrollable: not 0
  initialize: ->
    me = this
    @cache = cities: {}
    @$name_city = @$(".chooseCity input")
    @$name_country_zh = @$(".info .country .name-zh")
    @$name_country_en = @$(".info .country .name-en")
    @$name_city_zh = @$(".info .city .name-zh")
    @$name_city_en = @$(".info .city .name-en")
    @$city_link = @$(".info .city me")
    @$desc = @$(".info .desc")
    @$nav_prev = @$(".info .prev")
    @$tabs = @$(".tab")
    @$div = @$(".results")
    @$prev = @$(".result-frame .prev")
    @$next = @$(".result-frame .next")
    @$theme = @$(".types .suggest-theme")
    @$add_place = @$(".types .add-place")
    @place_template = _.template($("#widget-city-items-template").html())
 
    @$searchbox = @$(".searchbox input").autocomplete(
      appendTo: @el
      delay: 500
      minLength: 0
      source: (me, b) ->
        window.editor.widget_view.search_place me, b

      search: (me, b) ->
        if $(this).data("autocomplete").preventAC
          $(this).data("autocomplete").preventAC = not 1
          not 1

      focus: (me, b) ->
        $(this).data("autocomplete").preventAC = not 0
        $(this).val(b.item.name)
        not 1

      select: (b, c) ->
        me.jump(c.item)
        not 1
    ).focus(->
      $(this).autocomplete "search"
    ).keyup(->
      $(this).autocomplete "search"
    )
 
    $(@el).height "auto"

  propagate: (city_id, place_type, dir) ->
    city_id = city_id or DEFAULT_CITY_ID
    window.editor.widget_view.loading()
    dir = dir or "up"
    window.editor.widget_view.slideIn this, dir
    window.editor.widget_view.nav_history.push
      slug: city_id
      view: this

    @current_city = city_id # city id
    @current_type = place_type
    @render()


  render: ->
    me = this
    city = @cache.cities[@current_city]
    cpd = @cache[@current_city] or (@cache[@current_city] = {})
    cpd = cpd[@current_type] # city places data
    if editor.widget_view.nav_history.length > 1
      @$nav_prev.show()
    else
      @$nav_prev.hide()
    @$div.empty()
    if not city or not cpd
      @fetch()
      return
    @$name_city.val city.name
    @$city_link.attr "href", "/place/" + cpd.slug + "/"
    @$desc.html city.intro_short
    @$tabs.each  ->
      $(this).toggleClass "selected", $(this).data("type") is me.current_type
    @render_place_list()
    @scroll_to()
    window.editor.widget_view.loaded()


  render_place_list: (places) ->
    places = places or @cache[@current_city][@current_type].items
    @cache.uid2place = _.groupOneBy places, 'uid'
    $places_html = $(@place_template list: places)
    window.editor.is_author or $(".place-add", $places_html).hide()
    $(".place-exists", $places_html).each ->
      place_uid = $(this).parents(".place-item").data("uid")
      if editor.wishlist.get(place_uid)
        $(this).addClass("shown")

    @$div.append $places_html


  fetch: ->
    me = this
    $.get(@api_base + @current_city).success((city) ->
      city.intro_short = city.intro.slice(0, 75) + " ... <span class=\"expand\">(展开)</span>"
      city.intro = city.intro + "<span class=\"shrink\"> (收起)</span>"
      me.cache.cities[me.current_city] = city
      $.get(me.api_base + me.current_city + "/" + me.current_type + "s",
        limit: 9
      ).success((data) ->
        data.pages = 1
        data.next_page = 2
        me.cache[me.current_city][me.current_type] = data
        me.render()
      ).error (b) ->
        console.error "fetch cities error", b
        me.connection_error()

    ).error (b) ->
      console.error "fetch city error", b
      me.connection_error()


  # desc_expand/shrink, scroll {{{
  desc_expand: ->
    city = @cache.cities[@current_city]
    @$desc.html city.intro

  desc_shrink: ->
    city = @cache.cities[@current_city]
    @$desc.html city.intro_short

  scroll_up: ->
    return  if @current_page is 1
    @scroll_to --@current_page
    @current_page is 1 and @$prev.addClass("disabled")
    @$next.removeClass "disabled"

  scroll_down: ->
    a = @cache[@current_city][@current_type]
    unless @current_page is a.pages
      @scroll_to(++@current_page)
      @$prev.removeClass("disabled")
      @current_page is a.pages and not a.next_page and @$next.addClass("disabled")

      return
    @$next.addClass("disabled")
    a.next_page and @more()

  scroll_to: (a) ->
    b = 400
    a or (a = @current_page = 1
    b = 0
    @$prev.addClass("disabled")
    @$next.removeClass("disabled")
    )
    @$div.animate(
      top: (a - 1) * -540 + "px"
    , b)


  more: ->
    a = @cache[@current_city][@current_type]
    return  unless a.next_page
    b = this
    $.get(@api_base + @current_city + "/" + @current_type + "s",
      start: (a.next_page - 1) * 9
      limit: 9
    ).success((c) ->
      unless c.items.length
        a.next_page = 0
        return
      a.next_page++
      a.pages++
      a.items = a.items.concat(c.items)
      b.render_place_list c.items
      b.$next.removeClass "disabled"
      b.scroll_down()
    ).error (b) ->
      console.error("fetch more places error", b)
      a.next_page = 0


  connection_error: ->
    $("<h3/>").addClass("connection-error").html("连接失败，请检查网络。").appendTo(@$div)
    window.editor.widget_view.loaded()


  switch_tab: (ev) ->
    b = $(ev.target)
    return  if b.hasClass("selected")
    @$tabs.removeClass "selected"
    b.addClass "selected"
    @$div.empty()
    @scroll_to()
    me = this
    @current_type = b.data("type")
    d = @cache[@current_city]
    unless d[@current_type]
      $.get(@api_base + @current_city + "/" + @current_type + "s").success((res) ->
        res.pages = 1
        res.next_page = 2
        d[me.current_type] = res
        me.render_place_list res.items
      ).error (ev) ->
        console.error("fetch cities error", ev)
        me.connection_error()

      return
    @render_place_list d[@current_type].items


  city_switch: (ev) ->
    $a = $(ev.target)
    @current_city = $a.data("city_id")
    @render()
    false


  place_add: (ev) ->
    return unless window.editor.is_author
    $place = $(ev.currentTarget).parents(".place-item")
    place = @cache.uid2place[$place.data('uid')]
    wp = editor.wishlist.add_place place
    $(".place-exists", $place).addClass "shown"


  jump: (a) ->
    @$searchbox.val("").blur()
    @$(".ui-autocomplete").hide()

    return  if a.error
    switch a.place_class
      when "Country"
        window.editor.widget_view.widget_country.propagate a.slug, "right"
      when "Area"
        window.editor.widget_view.loading()
        window.editor.widget_view.nav_history.push
          slug: a.slug
          view: this

        @current_city = a.slug
        @render()
      when "Place"
        window.editor.widget_view.widget_place.propagate a.slug, "left"
      else
        console.error "unhandled place_class", a.place_class, a


  nav_up: ->
    window.editor.widget_view.widget_country.propagate @cache[@current_city][@current_type].parent_slug, "left"

  prev: ->
    window.editor.widget_view.nav_prev()

  next: (a) ->
    window.editor.widget_view.widget_place.propagate $(a.currentTarget).parents(".place-item").data("slug"), "left"
)
PlanInfoView = Backbone.View.extend(
  el: "#id-plan-info"
  events:
    "click #id-plan-edit": "showTitleEdit"
    "click #id-auto-plan": "autoPlan"
    "click #id-preview": "preview"
    "click #id-plan-report span": "report_unreasonable_plan"
    'change input[name="start_day"]': "changeValue"
    'blur input[name="title"]': "hideTitleEdit"

  initialize: ->
    @template = _.template($("#plan-info-template").html())
    @model.bind "change", (->
      @render()
      @show_autosave_indicator()
    ), this
    @$autosave_indicator = @$(".autosave-progress")

  report_unreasonable_plan: (ev) ->
    reason = $(ev.target).siblings('textarea').val()
    if not reason or reason is '请输入线路不合理原因'
      return alert '请输入线路不合理原因'

    editor.ajax_save('report unreasonable plan',
      type: "POST"
      url: "/api/plans/#{@model.plan_id}/copy"
      data: JSON.stringify(
        description: reason,
        title: "不合理快照: #{@model.get('title')}"
        is_temp: 0
        unreasonable: 1
      )
    ).then -> alert('反馈成功, 可在个人中心中查看到此条快照线路')

  preview: ->
    window.location.href = "/plan/#{editor.info.plan_id}/view"

  showTitleEdit: ->
    @$title_span.hide()
    @$title.show().focus()

  hideTitleEdit: ->
    title = @$title.val()
    @$title_span.text title if title
    @$title_span.show()
    @$title.hide()
    @changeValue()

  changeValue: ->
    @model.set
      start_day: @$start.val()
      title: @$title.val()
      , {silent: true}
    @model.save() if @model.hasChanged()

  render: ->
    a = @model.toJSON()
    a.is_author = window.editor.is_author
    $(@el).html @template(a)
    @$title = @$('input[name="title"]')
    @$title_span = @$("span#title")
    @$start = @$('input[name="start_day"]')
    @$start.datepicker
      dateFormat: "yy-mm-dd"
      minDate: 0
      maxDate: "+1Y"

    this

  show_autosave_indicator: ->
    a = (new Date).getTime()
    @$autosave_indicator.length < 1 and (@$autosave_indicator = @$(".autosave-progress"))
    @autosave_counter = @autosave_counter or
      count: 0
      timestamp: a


    b = a - @autosave_counter.timestamp
    if @autosave_counter.count++ > 5 and b > 1e4 or b > 3e4
      @$autosave_indicator.find("img").show().delay(2e3).fadeOut(100).end().find("p").delay(2100).fadeIn(100).delay(2e3).fadeOut(700)
      @autosave_counter.count = 0
      @autosave_counter.timestamp = a

  autoPlan: (ev) ->
    acs = _.values(window.editor.info.activities)
    unused_wps = editor.wishlist.filter (wp) -> wp.get('uses_count') is 0
    unused_acs = _.map unused_wps, (wp) ->
      new Activity _.pick(wp.toJSON(), ['place_type', 'place_id'])
    return autoplan.plan acs.concat(unused_acs), true
)

BaseActivityView = Backbone.View.extend(
  initialize: ->
    @model.bind("change", @render, this)
    @model.bind("destroy", @remove, this)

  remove: -> @$el.remove()

  deleteActivity: ->
    return unless window.editor.is_author
    is_wp = @options.is_wp
    m = @model
    if is_wp
      console.log "remove wish place #{m.id}"
    else
      console.log "remove ac #{m.id}"

    confirm_text = if is_wp then '真的要删除此地点？将删除所有关联的活动' else "真的要删除此活动？"
    editor.confirm_box @$btn_remove, confirm_text, ->
      if is_wp
        acs = editor.info.get_place_acs(m.id)
        _.each acs, (ac) -> ac.destroy()
        editor.wishlist.remove m
        console.log "wp #{m.id} and corresponding #{acs.length} acs removed"
      else
        m.destroy # handle uses_count in Activity destroy event handler
          error: ->
            console.log "Fail to remove ac #{m.id}"

  activityMouseEnter: (a) ->
    b = @model.get("id")
    b and $("div.map").trigger("activity_enter",
      aid: b
    )

  activityMouseLeave: (a) ->
    b = @model.get("id")
    b and $("div.map").trigger("activity_leave",
      aid: b
    )

  render: ->
    ac = @model.toJSON()
    ac.place = @model.get_place()
    ac.is_author = window.editor.is_author
    ac.place.url = "/" + ac.place_type + "/" + ac.place.city_id + "/detail/" + ac.place_id
    if not @options.is_wp
      ac.pin_letter = @model.pin_letter
      ac.stay_hours = @model.get_stay_hours()
    @$el.addClass ac.place_type
    @$el.toggleClass('wp', @options.is_wp is true)
    @$el.attr 'data-cid', @model.cid
    @$el.html @template(activity: ac)
    @$btn_remove = @$('span.remove')
    this
)
ActivityView = BaseActivityView.extend(
  tagName: "li"
  className: 'ac normal'
  events:
    #"click .btn.show_info": "openEditDialog",
    "click span.remove": "deleteActivity"
    "mouseenter": "activityMouseEnter"
    "mouseleave": "activityMouseLeave"
    'click div.info p.text.stay a': 'showStayHoursEdit'
    'blur div.info p.text.stay input': 'hideStayHoursEdit'

  initialize: ->
    BaseActivityView::initialize.apply this, arguments
    @template = _.template($("#activity-template").html())

  render: ->
    BaseActivityView::render.apply this, arguments
    @$stay_hours_span = @$('div.info p.text.stay span')
    @$stay_hours_input = @$('div.info p.text.stay input')
    @$stay_hours_a = @$('div.info p.text.stay a')
    this

  showStayHoursEdit: (ev) ->
    @$stay_hours_span.hide()
    @$stay_hours_input.show().focus()
    @$stay_hours_a.hide()
    # to fix input blur can't trigger. see http://bugs.jqueryui.com/ticket/7941
    $('dl.day ul').sortable("option", "disabled", true)
    false

  hideStayHoursEdit: (ev) ->
    stay_hours = parseFloat @$stay_hours_input.val()
    @$stay_hours_span.find('b').text stay_hours + '' if stay_hours and not isNaN(stay_hours)
    @$stay_hours_span.show()
    @$stay_hours_input.hide()
    @$stay_hours_a.show()
    $('dl.day ul').sortable("option", "disabled", false)

    @model.set
      stay_hours: parseFloat @$stay_hours_span.find('b').text()
      , {silent: true}
    @model.save() if @model.hasChanged()


  openEditDialog: ->
    a = @model.get("cls")
    (if a is "AnyActivity" then window.editor.is_author and window.editor.widget_view.widget_custom_activity.propagate(@model.id) else (if a is "HotelActivity" then window.editor.is_author and window.editor.widget_view.widget_hotel.propagate(@model.id) else window.editor.widget_view.widget_place.edit(@model.id)))


)
MiniActivityView = BaseActivityView.extend(
  tagName: "li"
  className: 'ac mini'
  events:
    "click span.remove": "deleteActivity"
    "mouseenter": "activityMouseEnter"
    "mouseleave": "activityMouseLeave"
  initialize: ->
    BaseActivityView::initialize.apply this, arguments
    @template = _.template($("#mini-activity-template").html())
)

ActivityLegView = Backbone.View.extend(
  tagName: 'li'
  className: 'moveTime'
  initialize: ->
    @template = _.template($("#activity-leg-template").html())
    @model.bind("change", @render, this)
    @model.bind("destroy", @remove, this)
  render: ->
    leg = @model.toJSON()
    @$el.html @template(leg: leg)
    me = this
    @$('.traffic-summary a').click ->
      me.$el.toggleClass 'expanded'
      
    this

  remove: -> @$el.remove()
)


Schedule = Backbone.Collection.extend(
  model: DayActivity
  initialize: ->
    @url = "/api/plans/" + window.editor.plan_id + "/days/"
    @bind "reset", @add_all_acs, this

  add_all_acs: -> @each (day) -> day.add_all_acs()

  getDay: (container, create) ->
    day = @find (day) -> day.get("container") is container
    if not day and create
      day = new DayActivity(
        id: _.uniqueId "#{editor.plan_id}-"
        container: container
        note: ""
      ,
        silent: true
      )
      @add day
    day

  addDay: ->
    last_day = @max (day) -> day.get('container')
    last_container = last_day?.get('container') ? -1
    @getDay last_container + 1, true

  removeDay: (day) ->
    console.log "delete day #{day.get 'container'} and corresponding #{day.activities.length} acs"
    day.activities.each (ac) -> ac.destroy()
    @remove day, silent: true
    @map (day, i) -> day.set 'container', i, silent: true
    @reset @models


  reorder: ->
    a = @pluck("id")
    $.ajax
      type: "PUT"
      url: @url + "?type=reorder"
      data: JSON.stringify(a)
      success: (a) ->
        window.editor.plan_info_view.show_autosave_indicator()

      error: (a) ->
        console.error("schedule reorder error", a)
        window.editor.widget_view.widget_error_blocker.propagate()

  hasNoActivity: ->
    @every (dayAc) ->
      dayAc.activities.isEmpty()

  comparator: (day) ->
    day.get "container"

  get_scheduled_acs: ->
    _.flatten @map (day) -> day.activities.models

  get_cities_acs: ->
    acs = @get_scheduled_acs()
    cities_acs = util.partition_by acs, (ac) -> ac.get_place().city_id
    for city_acs, cityi in cities_acs
      _.each city_acs, (ac) -> ac.city_index = cityi
    cities_acs

  get_scheduled_cities: ->
    cities_acs = @get_cities_acs()
    _.map cities_acs, (city_acs, cityi) ->
      ac0 = city_acs[0]
      place = ac0.get_place()
      id: place.city_id
      name: place.city_name
      index: cityi
      acs: city_acs
      acs_num: city_acs.length

  get_full_cities_promise: ->
    basic_cities = @get_scheduled_cities()
    city_ids = _.map basic_cities, (city) -> city.id
    autoplan.get_cities_promise(city_ids).pipe (cities) ->
      _.map cities, (city, i) -> _.extend {}, city, basic_cities[i]

  get_render_acs: (day_index, city_index = null)->
    cities_acs = @get_cities_acs()
    sel_acs = []

    flags = (if day_index is null then 0 else 1) + "" + (if city_index is null then 0 else 1)
    switch flags
      when '00', '11'
        console.error 'Bad args, day_index and city_index are both missing or both exist'
        return
      when '01'
        cacs = cities_acs[city_index]
        day_index = cacs[0].get_container() # first ac's day
        city_indexes = [city_index]
        sel_acs = cacs
      when '10'
        day = @getDay(day_index)
        if day and day.activities.length
          day_acs = day.activities.models
          city_indexes = [day_acs[0].city_index.._.last(day_acs).city_index]
          sel_acs = day_acs
        else
          city_indexes = []

    days_acs = util.partition_by sel_acs, (ac) -> ac.get_container()
    days = _.map days_acs, (acs) ->
      day =
        index: acs[0].get_container()
        acs: acs

    day_index: day_index
    city_indexes: city_indexes
    days: days

)

DayView = Backbone.View.extend(
  tagName: 'dl'
  className: 'day'
  initialize: ->
    @$el.html $('#day-template').html()
    @$no_hotel = @$('li.no-hotel').detach()
    @$el.data 'model', @model

    @info = window.editor.info
    @$info_container = @$('dt')
    @$day_container = @$("dd > ul.acs")
    @$mini_container = @$('div.mini ul.acs')
    @$btn_remove = @$('a.del')

    @info.bind 'change:start_day', @render_info, this
    @model.bind "change:aids", @render_acs, this

    if window.editor.is_author
      @$("#schedule-read-note").remove()
    else
      @$("#schedule-edit-note").remove()
      @$("#schedule-auto-arrange").remove()
    
    @addToSortable()

  events:
    "click .optimize": "autoArrange"
    "click #schedule-zoom-day span": "zoom_day"
    'click a.del': 'deleteDay'

  autoArrange: ->
    day = @model
    acs = day.activities.models
    autoplan.plan_day_promise(acs)
      .done (new_acs) -> day.reset_activities new_acs, 1

  update_collection: ($ul) ->
    me = this
    acs = _.map $('> li.ac', $ul), (li) ->
      $li = $(li)
      if $li.hasClass 'wp'
        wp = editor.wishlist.getByCid $li.data 'cid'
        ac = wp.create_ac()
      else
        ac = me.model.activities.getByCid $li.attr 'id'
    @model.reset_activities acs, 1
    console.log acs
    @render()

  get_day_stat: ->
    day_acs = @model.activities
    missing_leg_acs = day_acs.filter (ac, i) ->
      i > 0 and not ac.leg.get('distance')
    if missing_leg_acs.length then return null

    durations = day_acs.map (ac, i) ->
      if i is 0 then 0 else ac.leg.get('duration').value
    distances = day_acs.map (ac, i) ->
      if i is 0 then 0 else ac.leg.get('distance').value

    traffic_duration = util.sum durations
    stay_hours = util.sum(day_acs.map (ac) -> ac.get_stay_hours())
    duration =  traffic_duration + stay_hours * 3600
    distance = util.sum distances

    duration:
      value: duration
      text: util.toReadableHour(duration) + '小时'
    distance:
      value: distance
      text: util.toReadableDistance distance

  get_day_stat_promise: ->
    me = this
    stat_defer = $.Deferred()
    stat = @get_day_stat()
    if stat
      stat_defer.resolve stat
      return stat_defer

    day = @model
    points = day.activities.map (ac) ->
      place = ac.get_place()
      location: new LatLgt(place.glat, place.glgt)
      ac: ac

    console.log "getting day #{day.get('container')} routing stats, #{points.length} acs"
    editor.gs.get_routes_promise(points, google.maps.TravelMode.DRIVING)
      .done (result) ->
        _.each result.legs, (gleg, i) ->
          leg = me.get_activity_leg points[i].ac, points[i+1].ac
          leg.set me.gleg2leg_attr gleg

        stat = me.get_day_stat()
        if stat
          stat_defer.resolve stat
        else
          stat_defer.reject 'stat: missing some legs'
      .fail (err) ->
        stat_defer.reject err

    return stat_defer


  update_day_distance: ->
    me = this
    @get_day_stat_promise()
      .done (stat) ->
        me.$(".schedule-day-distance span").html stat.duration.text
      .fail (err) ->
        console.log err
        me.$(".schedule-day-distance span").html '未知'

  deleteDay: ->
    day = @model
    if editor.schedule.length is 1
      alert '不能删除最后一天'
      return
    editor.confirm_box @$btn_remove, '真的要删除此天？将删除此天的所有活动', ->
      editor.schedule.removeDay day

  zoom_day_or_cancel: ->
    if $("#schedule-zoom-day").hasClass("zoomed")
      window.editor.schedule_map_view.zoom_day window.editor.schedule_view.currentOffset
    else
      window.editor.schedule_map_view.cancel_zoom_day window.editor.schedule_view.currentOffset

  zoom_day: (ev) ->
    $("#schedule-zoom-day").toggleClass "zoomed"
    @zoom_day_or_cancel()


  refreshSortable: ->
    @$('ul.acs').sortable 'refresh'

  addToSortable: ->
    return unless window.editor.is_author
    console.log "day #{@model.get('container')} add to sortable"
    me = this
    @$('ul.acs').sortable
      items: 'li.ac'
      connectWith: "dl.day ul.acs"
      placeholder: "empty"
      helper: "clone"
      appendTo: "body"
      containment: "div.plan"

      beforeStop: (ev, ui) ->
        $ul0 = $(ev.target) # from connected list
        $ul1 = ui.placeholder.parent() # to connected list
        if $ul0.get(0) isnt $ul1.get(0) and $ul0.parents('dl.day').get(0) is $ul1.parents('dl.day').get(0)
          return false # cancel the sort

      update: (ev, ui) ->
        if ui.item.hasClass 'ui-draggable' then return # skip drag from wishlist
        if ui.sender or ev.target isnt ui.item.parent().get 0 # skip receive and remove, only handle sort
          return
        me.update_collection $(ev.target)
        console.log "day #{me.model.get 'container'} sorted done"

      remove: (ev, ui) ->
        ac = me.model.activities.getByCid ui.item.attr("id")
        ui.item.data "model", ac
        me.update_collection $(ev.target)
        console.log "day #{me.model.get 'container'} removed an item"

      receive: (ev, ui) ->
        if ui.item.hasClass 'ui-draggable' # drag from wishlist
          me.update_collection $(ev.target)
          console.log "day #{me.model.get 'container'} received wp done"
        else
          ac = ui.item.data("model")
          me.model.activities.add ac, silent: true
          me.update_collection $(ev.target)
          console.log "day #{me.model.get 'container'} received done"


  render_info: ->
    start_day = editor.info.get "start_day"
    day = NewDate(start_day)
    day.setDate(day.getDate() + @model.get('container'))
    day_info =
      container: @model.get('container') + 1
      date: "#{day.getFullYear()}-#{day.getMonth() + 1}-#{day.getDate()}"
    @$info_container.find('.day').text day_info.container
    @$info_container.find('.date').text day_info.date

  add_activity_view: (ac) ->
    av = new ActivityView(
      model: ac
      id: ac.cid
    )
    mini_av = new MiniActivityView(
      model: ac
      id: ac.cid
    )
    if ac.leg
      legv = new ActivityLegView(
        model: ac.leg
        id: ac.leg.cid
      )
      @$day_container.append legv.render().el
    @$day_container.append av.render().el
    @$mini_container.append mini_av.render().el
    @refreshSortable()

  get_activity_leg: (ac0, ac1) ->
    get_leg_id = (ac0, ac1) ->
      ids = _.map [ac0, ac1], (ac) ->
        p = ac.get_place()
        (new google.maps.LatLng(p.glat, p.glgt)).toUrlValue()
      ids.join ';'

    leg_id = get_leg_id ac0, ac1
    leg = editor.info.legs[leg_id]
    if not leg
      leg = editor.info.legs[leg_id] = new ActivityLeg id: leg_id
    leg

  gleg2leg_attr: (gleg) ->
    steps = _.map gleg.steps, (step) ->
      _.pick step, 'instructions', 'travel_model'

    attrs =
      distance: gleg.distance
      duration: gleg.duration
      steps: steps

  render_acs: ->
    me = this
    @$day_container.empty()
    @$mini_container.empty()
    last_ac = null
    @model.activities.each (ac, i) ->
      ac.leg = if last_ac then me.get_activity_leg(last_ac, ac) else null
      me.add_activity_view ac
      last_ac = ac
    @update_day_distance()
    @refreshSortable()

  render: ->
    console.log "DayView #{@model.get 'container'} render", arguments
    @render_info()
    @render_acs()
    this
)
ScheduleView = Backbone.View.extend(
  el: ".plan"
  currentOffset: null
  currentDayActivity: null
  initialize: ->
    @info = window.editor.info
    @collection = window.editor.schedule
    @collection.bind "reset", @addAll, this
    @collection.bind "add", @addOne, this
    @$wb_container = $(".whiteboard-container")
    @$map_container = $(".schedule-map-container")
    @$days_container = @$('.days')
    @$place_filter = $(".place-filter", @$wb_container)
    @$source_filter = $(".source-filter", @$wb_container)
    if window.editor.is_author
      @$("#schedule-read-note").remove()
    else
      @$("#schedule-edit-note").remove()
      @$("#schedule-auto-arrange").remove()
    

  events:
    "click .prevDay": "calendar_prev"
    "click .nextDay": "calendar_next"
    'click .dayAdd': 'addDay'

  addDayView: (day) ->
    day_view = new DayView model: day, id: day.cid
    @$days_container.append day_view.render().el

  addAll: ->
    console.log "Reset all #{@collection.length} day views"
    @$days_container.empty()
    @collection.each @addDayView, this
    editor.main_view.reinit()

  addOne: (day) ->
    console.log "Add day view #{day.get 'container'}"
    @addDayView day
    editor.main_view.reinit()

  addDay: -> @collection.addDay()


  calendar_to: (offset) ->
    return if offset < 0

    @currentOffset = offset
    editor.main_view.scroll_to_day offset, true
    #@zoom_day_or_cancel()

  calendar_prev: ->
    editor.change_day_city @currentOffset - 1

  calendar_next: ->
    editor.change_day_city @currentOffset + 1

)
ScheduleMapView = Backbone.View.extend(
  tagName: "div"
  className: "map"
  events:
    activity_enter: "activityMouseEnter"
    activity_leave: "activityMouseLeave"

  _get_marker: (aid) -> _.find @markers, (m) -> m.aid is aid
  activityMouseEnter: (a, b) ->
    @_get_marker(b.aid)?.setAnimation(google.maps.Animation.BOUNCE)
  activityMouseLeave: (a, b) -> @_get_marker(b.aid)?.setAnimation(null)
  initialize: ->
    me = this
    @schedule = editor.schedule
    @markers = []
    @polylines = []
    @dirRenderers = []
    @points = []
    @day_points = []
    map_options =
      zoom: 13
      center: new google.maps.LatLng(0, 0)
      mapTypeId: google.maps.MapTypeId.ROADMAP
      scrollwheel: false
      scaleControl: true
      zoomControlOptions:
        position: google.maps.ControlPosition.RIGHT_TOP
      panControlOptions:
        position: google.maps.ControlPosition.RIGHT_TOP
      scaleControlOptions:
        position: google.maps.ControlPosition.RIGHT_TOP
      streetView: new google.maps.StreetViewPanorama(@$el[0],
        clickToGo: true
        linksControl: true
        addressControlOptions:
          position: google.maps.ControlPosition.RIGHT_TOP
        zoomControlOptions:
          position: google.maps.ControlPosition.RIGHT_TOP
        panControlOptions:
          position: google.maps.ControlPosition.RIGHT_TOP
        enableCloseButton: true
        visible: false
      )


    @map = new google.maps.Map(@$el[0], map_options)
    @info_template = _.template($("#schedule-map-info-template").html())
    @schedule.bind 'reset change:aids', _.debounce(_.bind(@reload, this), 1000)
    $(".cityChoose").on "click", "a", ->
      city_index = $(this).data("index")
      if city_index < 0
        me.render_cities()
      else
        editor.change_day_city null, city_index
      return false
  clearMap: ->
    m.setMap null for m in @markers
    p.setMap null for p in @polylines
    dr.setMap null for dr in @dirRenderers
    @markers = []
    @polylines = []
    @dirRenderers = []
  renderMarkers: ->
    me = this
    @clearMap()
    @markers = (@draw_marker mp for mp in @points)
    last_marker = null
    for day in @day_points
      unless day.points.length
        last_marker = null
        continue
      markers = (@draw_marker mp for mp in day.points)
      color = get_color if day.highlight then 0 else -1
      if last_marker
        @polylines.push @drawPolyline([last_marker, markers[0]], get_color(-1))
      last_marker = _.last markers
      if not day.highlight
        @polylines.push @drawPolyline(markers, color)
      else
        points = for mp in day.points
          point =
            location: new LatLgt(mp.lat, mp.lgt)
            mp: mp
        console.log "render: getting routes, #{points.length} points"
        editor.gs.get_routes_promise(points, google.maps.TravelMode.DRIVING).then (result) ->
          me.render_directions result.dirsResults

      @markers = @markers.concat markers
  draw_marker: (mp) ->
    me = this
    get_icon = (pin_letter, color_index) ->
      color = get_color(color_index)
      color = color.substr(1)
      icon_url = get_icon_url(pin_letter, color)
      icon = new google.maps.MarkerImage(icon_url, new google.maps.Size(40, 37), new google.maps.Point(0, 0), new google.maps.Point(10, 34))

    marker_opts = _.extend({}, mp,
      map: @map
      position: new google.maps.LatLng(mp.lat, mp.lgt)
    )
    marker = new google.maps.Marker marker_opts
    switch mp.type
      when 'city'
        icon = get_icon(mp.pin_letter, -1)
        google.maps.event.addListener marker, "click", ->
          editor.change_day_city null, this.index
      else
        icon = get_icon(mp.pin_letter, if mp.highlight then 1 else -1)
        google.maps.event.addListener marker, "click", ->
          console.log 'click', this
    marker.setIcon icon
    if mp.highlight then marker.setZIndex 1000
    marker
  drawPolyline: (markers, color) ->
    polyline = new google.maps.Polyline(
      path: _.pluck(markers, "position")
      strokeColor: color
      strokeOpacity: 1
      strokeWeight: 3
    )
    polyline.setMap @map
    polyline
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
          strokeColor: get_color 0
  render: ->
    console.log 'map render'
    @resize()
    @renderInfo null
    @renderMarkers()
    @fitBounds(@markers)
  renderInfo: (day) ->
    me = this

    cities = @schedule.get_scheduled_cities()
    city_items = _.map cities, (city) -> _.pick city, ['name', 'index', 'acs_num']
    total_acs_num = util.sum _.pluck(cities, 'acs_num')
    city_items = [name: '全国', index: -1, acs_num: total_acs_num].concat city_items
    for ci in me.city_indexes or []
      city_items[ci+1].class = 'sel'

    $('.cityChoose').empty().append me.info_template(items: city_items)

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
  resize: ->
    console.log 'resize map'
    google.maps.event.trigger(@map, "resize")
  get_city_mp: (city, city_index) ->
    mp =
      type: 'city'
      lat: city.glat
      lgt: city.glgt
      title: city.name
      slug: city.id
      pin_letter: city_index + 1 + ''
      index: city_index
  get_ac_mp: (ac, highlight) ->
    container = ac.get_container()
    place = ac.get_place()
    mp =
      lat: place.glat
      lgt: place.glgt
      title: place.name
      aid: ac.get('id')
      slug: place.id
      container: container # day index
      pin_letter: ac.pin_letter
      highlight: highlight
  render_cities: ->
    me = this
    @schedule.get_full_cities_promise().then (cities) ->
      new_cities = util.uniq_stable cities, 'id'
      me.day_points = []
      me.points = _.map new_cities, (city, i) -> me.get_city_mp city, i
      me.city_indexes = [-1]
      me.render()
  render_acs: (hl_day_index, hl_city_indexes, days) ->
    me = this
    console.log 'map render_acs', 'day', hl_day_index, 'city', hl_city_indexes
    @points = []
    @day_points = _.map days, (day) ->
      day_index = day.index
      highlight: day_index is hl_day_index
      day_index: day_index
      points: _.map(day.acs, (ac) ->
        highlight = day_index is hl_day_index and _.contains hl_city_indexes, ac.city_index
        me.get_ac_mp ac, highlight
      )
    @city_indexes = hl_city_indexes
    @render()
  zoom_day: (day_index) ->
    day_markers = _.filter @markers, (m) -> m.container == day_index
    console.log 'zoom_day', day_index, 'markers', day_markers
    @fitBounds day_markers
  cancel_zoom_day: -> @fitBounds @markers
  reload: ->
    acs_res = @schedule.get_render_acs editor.get_current_offset()
    @render_acs acs_res.day_index, acs_res.city_indexes, acs_res.days
)

WidgetPlaceView = Backbone.View.extend(
  el: "#widget-place-view"
  events:
    "click .info .city": "nav_up"
    "click .info .prev": "prev"
    "click .info .desc .expand": "desc_expand"
    "click .info .desc .shrink": "desc_shrink"
    "click .place-add": "next"
    "click .place-recommend": "create_recommendation"
    "click .recommend button": "create_recommendation"
    "click .note .btn": "update_info"
    "click .comment-collapse": "toggle_comments"
    "click .recommend .label_radio": "changge_ron_roff"
    "mouseenter .comment-icon-index > div": "slide_photo"

  api_base: "/api/"
  img_base: "http://img.tukeq.com/"
  scrollable: not 0
  initialize: ->
    @cache = {}
    @$error_page = $("<h3 class=\"connection-error\">连接失败，请检查网络。</h3><div class=\"close\"></div>")
    @place_template = _.template($("#widget-place-inner-template").html())
    @recommendation_template = _.template($("#widget-place-recommendation-template").html())
    $(@el).height "auto"
    window.editor.is_author and $(@el).addClass("is-author")


  propagate: (place_id, b) ->
    window.editor.widget_view.loading()
    b = b or "up"
    window.editor.widget_view.slideIn(this, b)

    (if @current_activity then window.editor.widget_view.nav_history.push(
      activity_id: @current_activity.id
      view: this
    ) else window.editor.widget_view.nav_history.push(
      slug: place_id
      view: this
    ))
    @current_place = place_id
    @current_place_type = @current_activity.get("place_type")
    @render()


  edit: (aid, b) ->
    b = b or "up"
    ac = window.editor.info.activities[aid]
    @current_activity = ac
    @propagate ac.get("place_id"), b


  hide: ->
    a = @cache[@current_place]
    a and a.el.detach()
    @$error_page.detach()
    @current_activity = null

  changge_ron_roff: (a) ->
    @$(".recommend .label_radio").removeClass("r_on")
    $(a.currentTarget).addClass("r_on")

  render: ->
    a = this
    b = @cache[@current_place]
    unless b
      @fetch()
      return
    c = $(".note textarea", b.el)
    d = $(".info .prev", b.el)
    e = window.editor.info.places()[@current_place]
    (if window.editor.widget_view.nav_history.length > 1 then d.show() else d.hide())
    (if e then $(@el).addClass("is-activity") else $(@el).removeClass("is-activity"))
    @current_activity and c.val(@current_activity.get("note"))
    $(@el).append b.el
    f = @$(".comment-photo-item img").attr("src") or ""
    $("<img/>").attr("src", f).load ->
      a.slide_photo()

    @update_recommendation()
    window.editor.widget_view.loaded()


  fetch: ->
    me = this
    $.get(@api_base + @current_place_type + "s/" + @current_place).success((b) ->
      b.comments = []
      b.comments = _.filter(b.comments, (me) ->
        me.photo_name
      ).splice(0, 12)
      _.each b.comments, (b) ->
        b.photo_url = me.img_base + b.photo_name

      b.intro_short = b.intro.slice(0, 75) + " ... <span class=\"expand\">(展开)</span>"
      b.intro = b.intro + "<span class=\"shrink\"> (收起)</span>"
      b.tourist_info = me.prepare_tourist_info(b)
      me.cache[me.current_place] =
        data: b
        el: $(me.place_template(place: b))

      me.render()
    ).error (b) ->
      console.error("fetch place error", b)
      me.connection_error()



  connection_error: ->
    @$error_page.appendTo($(@el))
    window.editor.widget_view.loaded()

  prepare_tourist_info: (a) ->
    b = []
    a.address and b.push(
      title: "地址"
      info: a.address
    )
    a.website and b.push(
      title: "相关网站"
      info: a.website
    )
    a.price and b.push(
      title: "价格"
      info: a.price
    )
    a.arrival and b.push(
      title: "如何抵达"
      info: a.arrival
    )
    a.opentime and b.push(
      title: "开放时间"
      info: a.opentime
    )
    a.phone and b.push(
      title: "电话号码"
      info: a.phone
    )
    b


  desc_expand: ->
    a = @cache[@current_place].data
    @$(".info .desc").html a.intro

  desc_shrink: ->
    a = @cache[@current_place].data
    @$(".info .desc").html a.intro_short

  update_info: ->
    a = this
    @current_activity.save
      note: $.trim(@$(".note textarea").val())
    ,
      success: ->
        a.$(".note .message").html("已保存").show().delay(3e3).fadeOut 1e3


  reload: (a) ->
    b = window.editor.info.activities[a]
    window.editor.widget_view.nav_history.pop()
    window.editor.widget_view.nav_history.push(
      activity_id: a
      view: this
    )
    @current_activity = b
    @$(".recommend textarea").val("")
    @update_recommendation()


  toggle_comments: (a) ->
    (if a is "up" then @$(".comment-container, .comment-photo-container, .comment-icon-index").slideUp() else (if a is "down" then @$(".comment-container, .comment-photo-container, .comment-icon-index").slideDown() else @$(".comment-container, .comment-photo-container, .comment-icon-index").slideToggle()))
    b = this
    setTimeout (->
      return  if b.$(".comment-container").data("init")
      b.$(".comment-container").data("init", not 0)
      b.slide_photo()
    ), 100


  slide_photo: (a) ->
    idx = (if a then $(a.currentTarget).data("index") else 0)
    a and $(a.currentTarget).siblings().removeClass("active").end().addClass("active")
    @$(".comment-item").hide().eq(idx).show()

    b = @$(".comment-photo-item").eq(idx)
    return  unless b.length
    c = @$(".comment-photo-container").width() / 2 - b.width() / 2 - b.position().left
    @$(".comment-photos").clearQueue().animate
      left: c + "px"
    , 300, "linear"


  update_recommendation: ->
    a = @$(".recommendation-frame")
    (if @current_activity then ($(".recommendation-container", a).empty().append(@recommendation_template(list: @current_activity.recommendations.toJSON())).show()
    (if @current_activity.recommendations.length > 0 or not window.editor.is_author then ($(".recommend .label_radio", a).show()
    a.show()
    ) else a.hide())
    ) else (if window.editor.is_author then @$(".recommendation-frame").hide() else (@$(".recommend .label_radio", a).hide()
    a.show()
    )))


  create_recommendation: (a) ->
    b = this
    c = @$(".recommend textarea")
    d = $(@$(".recommend .message"))
    e = $.trim(c.val())
    @toggle_comments "up"
    unless e
      c.focus()
      d.html("请输入推荐理由").show().delay(2e3).fadeOut(1e3)

      return
    f =
      place_slug: @current_place
      content: e
      recommend: @$(".r_on").hasClass("rec")

    (if @current_activity then @current_activity.recommendations.create(f,
      success: (a, d, e) ->
        c.val("")
        b.update_recommendation()
    ) else @create_activity(f))


  nav_up: ->
    switch @cache[@current_place].data.place_class
      when "Country"
        window.editor.widget_view.widget_country.propagate @current_place, "left"
      when "Area"
        window.editor.widget_view.widget_city.propagate @current_place, "left"
      when "Place"
        window.editor.widget_view.widget_city.propagate @cache[@current_place].data.parent_slug, "left"
      else
        console.error "place class not supported", @current_place


  prev: ->
    window.editor.widget_view.nav_prev()


  next: ->
    @create_activity()


  create_activity: (a) ->
    b = this
    c = @cache[@current_place].data
    d =
      plan_day_id: window.editor.wb_day_id
      cls: c.activity_class
      place_slug: c.slug
      place_name: c.name_zh
      place_name_en: c.name_en
      place_parent_slug: c.parent_slug

    a and (d.recommendation = [a])
    (window.editor.is_author or a) and window.editor.whiteboard.create(d,
      success: (a) ->
        b.reload a.id
    )
    $(@el).addClass("is-activity")
    @$(".column-right .msg span").html("已成功添加！").show().delay(2e3).fadeOut(1e3)
)
WidgetErrorBlockerView = Backbone.View.extend(
  el: "#widget-error-blocker"
  events:
    "click .refresh": "refresh_page"
    "click .cancel": "countdown_stop"

  initialize: ->
    @$countdown = @$(".countdown")

  propagate: ->
    window.editor.widget_view.slideIn(this, "down")
    @render()

  render: ->
    a = this
    @time_left = 20
    @ticker = window.setInterval(->
      a.countdown_tick()
    , 1e3)

  countdown_tick: ->
    @$countdown.html(@time_left--)
    @time_left < 0 and @refresh_page()

  countdown_stop: ->
    window.clearInterval(@ticker)
    window.editor.widget_view.close()

  refresh_page: ->
    window.location.reload()

  hide: ->
    window.clearInterval @ticker
)
