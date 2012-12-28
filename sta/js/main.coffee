_.mixin
  sum: (list) -> _.reduce list, ((memo, num) -> memo + num), 0
  groupOneBy: (list, iterator) ->
    id2arr = _.groupBy list, iterator
    id2obj = {}
    _.each _.keys(id2arr), (id) -> id2obj[id] = id2arr[id][0]
    id2obj

enable_logging = (enabled) ->
  if typeof window.console is "undefined"
    window.console =
      log: ->
      error: ->
  else unless enabled and window.console.log? and window.console.error?
    window.console.log = window.console.error = ->

initUserInfo = (user) ->
  $ui = undefined
  avatar = undefined
  img_host = $("#img_host").val()
  avatar = img_host + "/travelavatar/" + user.userId + "/" + user.avatar + ".jpg!50"
  url = "/user/" + user.userId
  $infoContainer = $("div.user_switch")
  $loginContainer = $("div.dologin")
  $(".user>img", $infoContainer).attr("src","#{avatar}").attr("alt", "#{user.nickName}").attr("title", user.nickName).next().text(user.nickName).parent().attr "href", url + "/planlist"
  #$(".user>img", $infoContainer).attr("src","#{avatar}").attr("title", user.nickName).parent().attr("href", url + "/planlist").next().text(user.nickName)
  $(".user", $infoContainer).attr "href", url
  $(".road", $infoContainer).attr "href", url + "/planlist"
  $(".want", $infoContainer).attr "href", url + "/want"
  $(".got", $infoContainer).attr "href", url + "/gone"
  $("div.user_switch").show()
  $("div.wl_switch").css('visibility', 'visible')
  $("div.head_wrapper li.btn_plan button").show()
  $("div.login").hide()

magSns = init: ($links) ->
  return  if typeof $links is "undefined"
  $links.each ->
    @onclick = ->
      if window.location.href.match('return=')
        user_view.openSnsSigninWindow "#{@href}"
      else
        user_view.openSnsSigninWindow "#{@href}&return=#{encodeURIComponent(window.location.href)}"

user =
  userId: null
  nickName: null
  avatar: null
  sessionId: null

user_view =
  openSnsSigninWindow: (url) ->
      window.open url, "_blank", "width=615,height=505,left=" + ($(window).width() / 4) + "px,top=100px"
      false
  showSigninBox: ->
    $.colorbox
      initialWidth: 440
      initialHeight: 180
      overlayClose: false
      fixed: true
      opacity: 0.5
      scrolling: false
      href: '/user/signinbox'
  checkSignedIn: ->
    if $.cookie('uid') then return true
    else
      this.showSigninBox()
      return false

wishList = (obj, type, appendFunc) ->
  @jq = $(obj)
  @type = type
  if typeof appendFunc is "function"
    @appendFunc = appendFunc
  else
    @appendFunc = ->
  return

wishList::commit = ->
  return unless user_view.checkSignedIn()
  url = null
  afterPostFunc = null
  o = this
  if @type is "want"
    if @jq.hasClass("want_ed")
      afterPostFunc = ->
        o.jq.removeClass "want_ed"

      url = "/api/want/cancle"
    else
      afterPostFunc = ->
        o.jq.addClass "want_ed"

      url = "/api/want/add"
  else
    if o.jq.hasClass("got_ed")
      afterPostFunc = ->
        o.jq.removeClass "got_ed"

      url = "/api/gone/cancle"
    else
      afterPostFunc = ->
        o.jq.addClass "got_ed"

      url = "/api/gone/add"
  $.post url,
    scenic_id: @jq.data("id")
    comment: ""
  , ((data) ->
    if data.state isnt `undefined` and data.state
      afterPostFunc()
      o.appendFunc data
  ), "json"

list_page =
  select_place_type: ->
    place_type = $.cookie('place_type')
    if place_type == 'restaurant' then $('div.restaurantList').show()
    city_id = $('#city_cid').val()
    if place_type 
      $('.w750').load "/cities/#{city_id}/places_html/#{place_type}?page=1&target_id=0"
      $('.select_point ul.menu li').removeClass('sel')
      switch place_type
        when 'attraction' then $('a.sight').parent().addClass('sel')
        when 'hotel' then $('a.hotel').parent().addClass('sel')
        when 'restaurant' then $('a.restaurant').parent().addClass('sel')

  init: ->
    me = this
    $('#container').masonry itemSelector: 'dd.point'
    $('body').on('click', '.select_point ul.menu li', ->
      $('.select_point ul.menu li').removeClass('sel')
      $(this).addClass('sel')
      place_type = $(this).find('input').val()
      me.load_places place_type, 1
      $.cookie('place_type', place_type)
    ).on('click', 'div.slide_container li', ->
      $('div.slide_container').removeClass('sel')
      $(this).addClass('sel') 
      place_type = $('.select_point ul.menu li.sel').find('input').val()
      target_id = $(this).find('input').val()
      set_cookie('target_id', target_id)
      me.load_places place_type, 1, target_id
    )


    $('body').on('click', '.page_container ul.page li', ->
      default_page = parseInt($('div.page_container li.sel a').text())
      max_page = parseInt($('#page_total').val())
      page = switch $(this).attr('class')
        when 'prev' then  Math.max(1, default_page - 1)
        when 'next' then Math.min(max_page, default_page + 1)
        when 'begin' then 1
        when 'end' then max_page
        else parseInt($(this).find('a').text())

      place_type = $('.select_point ul.menu li.sel').find('input').val()
      target_id = $.cookie('target_id')
      target_id or= 0
      me.load_places place_type, page, target_id
    )
		
    $("div.main").on "click", "button.want", (event) ->
      event.preventDefault()
      o = this
      w = new wishList(this, "want", (data) ->
        $(o).parents(".bg").find(".use b").text data.num
      )
      w.commit()

    $("div.main").on "click", "button.got", (event) ->
      event.preventDefault()
      o = this
      w = new wishList(this, "gone", (data) ->
        $(o).parents(".bg").find(".view b").text data.num
      )
      w.commit()

    if window.location.hash
      $('#js-trip').css 'z-index',  9999999

  load_places: (place_type, page, target_id) ->
    page = Math.max(1, page)
    city_id = $('#city_cid').val()
    if target_id then target_id = "&target_id=#{target_id}"
    target_id or= ''
    url = "/cities/#{city_id}/places_html/#{place_type}?page=#{page}#{target_id}"
    $('div.places').load(url, -> wleditor.update_add_wishplace_buttons())
    switch place_type
      when 'attraction' then $('div.restaurantList').hide()
      when 'hotel' then $('div.restaurantList').hide() 
      when 'restaurant' then $('div.restaurantList').show()
    

set_cookie = ($a, $b) ->
  if $b != ''
    $.cookie($a, $b,{path:'/',domain:'in1001.com'})

home_page =
  init: ->
    me = this
    @init_gallery()
    @init_choose_city()
    @init_cover()

    $('.chooseCity_popup a').click ->
      from_city = $(this).text()
      $cwrapper = $(this).parents('.choose-city')
      $input = $('input', $cwrapper)
      city = $(this).text()
      $input.val(city)
      $cwrapper.removeClass('open')

      set_cookie('from_city', from_city)
      set_cookie('to_city', null)
      callback = ->
        me.load_places('result')
        me.load_places('main')
        price_min = $('li.result b').text()+"元"
        $('li.price').text(price_min)
      me.load_places('filter', null, callback)

    $('body').on('click', 'li.result a', ->
      $('li.result a').removeClass('sel')
      $(this).addClass('sel')
      to_city = $(this).text()
      set_cookie('to_city', to_city)
      me.load_places('main')
    ).on('click', '.page_container ul.page li', ->
      default_page = parseInt($('#list_page').val())
      max_page = parseInt($('#page_total').val())
      if $(this).attr('class') == 'prev'
        if default_page > 1
          page = default_page - 1
        else page = default_page
      else if $(this).attr('class') == 'next'
        if default_page < max_page
          page = default_page + 1
        else page = default_page
      else if $(this).attr('class') == 'begin'
        page = 1
      else if $(this).attr('class') == 'end'
        page = max_page
      else
        page = $(this).find('a').text().replace(/(^\s*)|(\s*$)/g, "")
      $('#list_page').val(page)
      me.load_places('main', page)
    )
    $.Placeholder.init()
    
  init_gallery: ->
    $(".choose").backstretch [
      "/sta/images/header_bg/1.jpg"
      "/sta/images/header_bg/2.jpg"
      "/sta/images/header_bg/3.jpg"
      "/sta/images/header_bg/4.jpg"
      ],
      fade: 3000
      duration: 4000

  init_choose_city: ->
    $choosecw = $("div.choose-city")
    $(".target_btn", $choosecw).click (event) ->
      $cwrapper = $(this).parents(".choose-city")
      $cwrapper.toggleClass "open"
      false
    $(document).click (e) ->
      if $(e.target).parent(".chooseCity_popup").size() is 0
        $("div.choose-city").removeClass "open"
  init_cover: ->
    $("body").on("mouseover", "div.bg a", ->
      $(this).find(".description").show()
    ).on "mouseout", "div.bg a", ->
      $(this).find(".description").hide()

  load_places: (position, page=1, callback) ->
    me = this
    from_city = $('div.choose-city input').val()
    to_city = $.cookie('to_city')
    to_city or= ''
    to_price = parseInt($('.price').text().replace('元', ''))
    set_cookie('to_price', to_price)
    set_cookie('from_city', from_city)
    url = "/pagehome/attractions_by_price?from_city=#{encodeURIComponent(from_city)}&to_city=#{encodeURIComponent(to_city)}&from_price=0&to_price=#{to_price}"
    if position == 'filter'
      set_cookie('to_price', null)
      if callback
        $('ul.filter').load "#{url}&view_type=lib_filter", callback
      else 
        $('ul.filter').load "#{url}&view_type=lib_filter"
    else if position == 'result'
      if callback
        $('li.result').load "#{url}&view_type=lib_result", callback
      else
        $('li.result').load "#{url}&view_type=lib_result"
    else if position == 'main'
      if callback
        $('div.main').load "#{url}&page=#{page}", callback
      else
        $('div.main').load "#{url}&page=#{page}"

init_choose_city = ($choosecw) ->
  $choosecw or= $('div.choose-city')
  $('.target_btn', $choosecw).click ->
    $document_width = $(document).width()
    $change_div_left = (left) -> $('div.rightBox div.chooseCity_popup').attr('style', 'left:'+left+'px')
    if $document_width < 2550 then $change_div_left(-216) else $change_div_left(0)
    $cwrapper = $(this).parents('.choose-city')
    $cwrapper.toggleClass('open')

  $(".input_target", $choosecw).focusin(->
    if $(this).val() == $(this).attr('placeholder')
      $(this).val("")
  ).focusout(->
    if $(this).val() == ""
      $(this).val($(this).attr('placeholder'))
  )
  
  $('.chooseCity_popup a', $choosecw).click ->
    $cwrapper = $(this).parents('.choose-city')
    if $cwrapper.hasClass('from_city')
      from_city = $(this).text()
      set_cookie('from_city', from_city)
      set_cookie('to_city', null)
      if $('body').attr('id') == 'places'
        location.reload()
    $input = $('input', $cwrapper)
    city = $(this).text()
    $input.val(city).change()
    $cwrapper.removeClass('open')

plan_view =
  init: ->
    boxAuto ".box", ""
    $(".header_review").backstretch "/sta/images/temp/gallery/1.jpg"
    $(".bg img, .bg .info, .description").hover (->
      $(this).parent().find(".description").show()
    ), ->
      $(this).parent().find(".description").hide()

  save_plan: ->
    plan_id = $('#plan_id').val()
    title = $('#diglogBox .saveRoadDialog input.roadname').val()
    $.ajax
      url: "/api/plans/#{plan_id}"
      type: 'PUT'
      data: $.toJSON(title: title, is_temp: 0)
      dataType: 'json'
      contentType: 'application/json'
      processData: false
      success: (plan) ->
        window.location = "/user/#{plan.author.id}/planlist"

search_page =
  init: ->
    $('body').on('hover', '.bg a', (e) ->
      if e.type == 'mouseenter'
        $(this).find(".description").show()
      else if e.type == 'mouseleave'
        $(this).find(".description").hide()
    )
    $(".wrapper_left").height($(".w850").outerHeight(true) - parseInt($(".wrapper_left").css("padding-top").substring(0,$(".wrapper_left").css("padding-top").lastIndexOf('px'))))
  list_page: ->
    $('body').on('click', '.page_container ul.page li', ->
      default_page = parseInt($('#list_page').val())
      max_page = parseInt($('#page_total').val())
      if $(this).attr('class') == 'prev'
        if default_page > 1
          page = default_page - 1
        else page = default_page
      else if $(this).attr('class') == 'next'
        if default_page < max_page
          page = default_page + 1
        else page = default_page
      else if $(this).attr('class') == 'begin'
        page = 1
      else if $(this).attr('class') == 'end'
        page = max_page
      else
        page = $(this).find('a').text().replace(/(^\s*)|(\s*$)/g, "")
      $('#list_page').val(page)
      keyword = $('div.main div.title span').text()
      placetype = $('div.main ul.wrapper_left li.sel a').attr('class').replace(' sel', '')
      uri = '/search/search_main?q=' + keyword + '&placetype=' + placetype + '&p=' + page
      $('div.w850').load uri
    )

user_places_page =
  init: ->
    boxAuto ".nocontent", ""
    boxAuto ".sideBarBox", ""
    $(".bg a").hover (->
      $(this).find(".description").show()
    ), ->
      $(this).find(".description").hide()

    $(".w1000").height $(".full").height() + 20

header =
  init_search: ->
    $("li.search_bar").each ->
      default_val = "搜索景点、酒店、餐饮..."
      $q = $(this).find("input")
      $q.blur(->
        @value = default_val  unless @value
      ).focus ->
        @value = ""  if @value is default_val

      $(this).submit ->
        return false  if $q.val() is "" or $q.val() is default_val
        regexp = /[^a-zA-Z0-9-_\u4e00-\u9fa5]/g
        if $q.val().match(regexp)
          alert "请不要搜索特殊符号", "error"
          return false
        window.location.href = "/search?q=" + encodeURI($q.val())
        false
  init: ->
    @init_search()
    $(".list a").hover ->
      $(this).find("button").toggle()

    $(".menu li:eq(1)").hover ->
      $(".target_explorer").toggle()
      $(this).toggleClass "sel"

    $(".wl_toggle").click ->
      $(".wl_popup").toggle()
      $(this).parent().toggleClass "sel"

    $(".user_switch").hover ->
      $(".user_switch ul").toggle()
      $(this).toggleClass "sel"

WishListEditor = (->
  WishPlace = Backbone.Model.extend(
    get_place: ->
      uid = "#{@get('place_type')}_#{@get('place_id')}"
      wleditor.uid2place[uid]
  )
  WishList = Backbone.Collection.extend(
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
        wleditor.uid2place[place.uid] ?= place
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

    get_city_wps: (city_id) ->
      wps = @filter (wp) -> wp.get_place().city_id is city_id
  )
  WishPlaceView = Backbone.View.extend(
    tagName: "li"
    className: 'ac normal wp'
    events:
      "click span.remove": "deleteActivity"

    initialize: ->
      @template = _.template($("#activity-template").html())

    deleteActivity: ->
      m = @model
      confirm_text = '真的要删除此地点？将删除所有关联的活动'
      wleditor.confirm_box @$btn_remove, confirm_text, ->
        wleditor.remove_wps [m]
        console.log "wp #{m.id} and corresponding acs removed"

    render: ->
      ac = @model.toJSON()
      ac.place = @model.get_place()
      ac.place.url = "/" + ac.place_type + "/" + ac.place.city_id + "/detail/" + ac.place_id
      @$el.addClass ac.place_type
      @$el.attr 'data-cid', @model.cid
      @$el.html @template(activity: ac)
      @$btn_remove = @$('span.remove')
      this
  )
  MiniWishListView = Backbone.View.extend(
    el: '.wl_switch'
    initialize: ->
      @wishlist = @model
      @$city_count = @$('#city_count')
      @$place_count = @$('#place_count')
      @model.bind 'reset add remove', @render, this
    render: ->
      console.log 'mini wishlist view render'
      @$city_count.text @wishlist.city_count
      @$place_count.text @wishlist.place_count
  )
  WishListView = Backbone.View.extend(
    el: '.wl_popup'
    current_city_id: null
    current_place_type: 'attraction'
    events:
      'click ul.tab.city li': 'switch_city'
      'click ul.tab.type li': 'switch_type'
      'click ul.tab.city span.remove': 'delete_city'
      'click .tab-bar .btn_plan': 'to_editor_page'

    initialize: ->
      @wishlist = @model
      @$city_tab_template = _.template $('#wishlist-city-tab-template').html()
      @$type_tab_template = _.template $('#wishlist-type-tab-template').html()
      @$wps_container = @$('.city-places ul.list')
      @$city_tab = @$('ul.tab.city')
      @$type_tab = @$('ul.tab.type')
      if window.js_params
        @current_city_id = js_params.city_id or $.cookie 'wl_city_id'
        @current_place_type = js_params.place_type or $.cookie('wl_place_type') or 'attraction'
      $("body").delegate "button.remove, .box a.add", "click", ->
        return unless user_view.checkSignedIn()
        wleditor.wishlist_view.toggle_place $(this).data()
        return false

      @model.bind 'reset add remove', @render, this

    to_editor_page: ->
      window.location.href = "/plan/#{wleditor.id}/edit"

    toggle_place: (place) ->
      place.id = place.id + ''
      place.city_id = place.city_id + ''
      wp = wleditor.wishlist.get place.uid
      if wp
        wleditor.remove_wps [wp]
      else
        @add_place place

    add_place: (place) ->
      @current_city_id = place.city_id
      @current_place_type = place.type
      @wishlist.add_place place

    switch_city: (ev) ->
      @current_city_id = $(ev.currentTarget).data('city_id') + ''
      $.cookie 'wl_city_id', @current_city_id
      @render()
    switch_type: (ev) ->
      @current_place_type = $(ev.currentTarget).data('place_type')
      $.cookie 'wl_place_type', @current_place_type
      @render()

    delete_city: (ev) ->
      $btn = $(ev.currentTarget)
      city_id = $btn.parent().data('city_id') + ''
      city_name = $btn.parent().data('city_name') + ''
      wleditor.confirm_box $btn, "删除#{city_name}的所有景点和活动？", ->
        wps = wleditor.wishlist.get_city_wps city_id
        wleditor.remove_wps wps
      return false

    render_summary: ->
      me = this
      type2name =
        attraction: '景点'
        hotel: '酒店'
        restaurant: '餐饮'

      city_ids = _.map @wishlist.cities_wps, (city_wps) -> city_wps.city_id
      if city_ids.length and not  _.contains city_ids, @current_city_id
        @current_city_id = city_ids[0]

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

    add_wp_view: (wp) ->
      acv = new WishPlaceView(
        model: wp
        id: wp.cid
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
      wleditor.update_add_wishplace_buttons()

    render: ->
      console.log 'wishlist view render'
      @render_summary()
      @render_wps()
  )
  @_save_plan_detail = ->
    url = "/api/plans/#{@id}"
    detail =
      days: @days
      wish_places: @wishlist.toJSON()
    wleditor.ajax_save "save plan detail, #{@days.length} days, #{detail.wish_places.length} wps",
      type: "PUT"
      url: url
      data: JSON.stringify(detail: detail)
  @ajax_save = (op_name, ajax_opts) ->
    me = this
    ajax_opts.contentType ?= 'application/json'
    $.ajax(ajax_opts)
      .done ->
        console.log "#{op_name} done", ajax_opts
      .fail (err) ->
        console.error "Fail to #{op_name}, #{err.status} #{err.statusText}: #{err.responseText}"

  @remove_wps = (wps) ->
    me = this
    place_uids = _.map wps, (wp) -> wp.id
    acs_remove = _.map wps, (wp) ->
      acs = me.place_uid2acs[wp.id]
      if acs
        delete me.place_uid2acs[wp.id]
      acs ? []
    acs_remove = _.flatten acs_remove
    aids = _.map acs_remove, (ac) -> ac.id

    _done = ->
      me.wishlist.remove wps, silent: true
      _.each me.days, (day) ->
        day.aids = _.difference day.aids, aids
      me.wishlist.reset me.wishlist.models

    if aids.length
      aidstr = aids.join ','
      wleditor.ajax_save("batch remove #{aids.length} acs for #{wps.length} wps",
        type: 'DELETE'
        url: "/api/plans/#{me.id}/activities/#{aidstr}?force=1",
      ).done -> _done()
    else
      console.log "remove #{wps.length} wps with no acs"
      _done()

  @update_add_wishplace_buttons = ->
    me = this
    added_count = 0
    $('button.remove, .box a.add').each ->
      place = $(this).data()
      if me.wishlist.get place.uid
        $(this).addClass('remove_ed').text('移除清单')
        added_count += 1
      else
        $(this).removeClass('remove_ed').text('加入清单')
    console.log "#{added_count} place in this page added to wishlist"

  @init = ->
    me = this
    @save_plan_detail = _.debounce(@_save_plan_detail, 200)
    @userId = $.cookie 'uid'
    @uid2place = {}
    @wishlist = new WishList
    @wishlist.bind 'add remove reset', -> me.save_plan_detail()
    @wishlist_view = new WishListView model: @wishlist
    @mini_wishlist_view = new MiniWishListView model: @wishlist
    @render_view()

  @set_plan = (plan) ->
    @id = plan.id
    @name = plan.name
    @uid2place = _.groupOneBy plan.places, 'uid'
    acs = _.map plan.activities, (ac) ->
      ac.place_uid = "#{ac.place_type}_#{ac.place_id}"
      ac
    @place_uid2acs = _.groupBy acs, 'place_uid'
    @days = plan.detail.days
    @wishlist.reset plan.detail.wish_places, silent: true
    @wishlist.classify_wps()
    @render_view()
  @render_view = ->
    @wishlist_view.render()
    @mini_wishlist_view.render()
  @fetch = ->
    return unless @userId
    me = this
    $.get "/api/collections/",
      user_id: @userId
      _:Math.random()
    , ((plan) ->
        return unless plan.id
        me.set_plan plan
    ), "json"
  @confirm_box = ($btn, text, callback) ->
    console.log text
    callback()

  return this
)

$ ->
  enable_logging true
  userId = $.cookie("uid")
  nickName = $.cookie("nickname")
  avatar = $.cookie("avatar")
  sessionId = $.cookie("session_id")
  if userId and nickName and avatar and sessionId
    user.userId = userId
    user.nickName = nickName
    user.avatar = avatar
    user.sessionId = sessionId
    initUserInfo user
  magSns.init $("a.header-snslogin")
  header.init()


  body_id = $('body').attr('id')
  switch body_id
    when 'places'
      init_choose_city()
      list_page.init()
      list_page.select_place_type()
    when 'index'
      home_page.init()
    when 'plan-view' then plan_view.init()
    when 'plan-editor'
      init_choose_city()
    when 'search'
      search_page.init()
      search_page.list_page()
    when 'user-places'
      user_places_page.init()
  
  if body_id isnt 'plan-editor'
    window.wleditor = new WishListEditor()
    wleditor.init()
    wleditor.fetch()
