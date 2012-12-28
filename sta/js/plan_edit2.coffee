_.mixin
  sum: (list) -> _.reduce list, ((memo, num) -> memo + num), 0

class PlanEditorView
  curr_day: null
  days: 0
  wl_popup_top0: 63
  initialize: ->
    me = this
    unless window.editor
      window.console ?=
        log: ->
        error: ->

    $("li.done")
      .mouseenter ->
        $(this).find(".moveTip").show()
      .mouseleave ->
        $(this).find(".moveTip").hide()

    $('.days').on 'click', 'dl.day dt span.open', ->
      i = $(this).parents('.day').index('.days dl.day')
      me.change_day i
    unless window.editor
      $('.nextDay').click -> me.change_day me.curr_day + 1
      $('.prevDay').click -> me.change_day me.curr_day - 1

    onScrollStop = _.debounce((->
      me.change_day me.curr_day, false
    ), 600)
    lastScrollLeft = 0
    lastScrollTop = 0
    window.onscroll = (ev) ->
      sLeft  = $(window).scrollLeft()
      sTop = $(window).scrollTop()
      if sLeft isnt lastScrollLeft
        lastScrollLeft = sLeft
        if me.has_current_day()
          me.toggle_current_day false
          me.update_day_top()
        me.update_current_day()
        onScrollStop()
      if sTop isnt lastScrollTop
        lastScrollTop = sTop
        me.update_day_top()


    window.onresize = _.debounce(->
      me.update_map_height()
      me.set_days_position()
      me.re_move_day()
    , 300, false)

    @change_curr_day = _.debounce(_.bind(@_change_curr_day, this), 300)
    @reinit()

  change_day: (i, immediate = true) ->
    me = this
    @toggle_current_day true
    @scroll_to_day i, immediate, ->
      me.change_curr_day me.curr_day

  scroll_to_day: (i, immediate, callback = ->) ->
    me = this
    do_show_day = ->
      me.update_current_day()
      dtop = me.get_day_top()
      if immediate
        $('.days dl.day.current').css top: dtop.curr + 'px'
        me.show_day_nav()
        callback()
      else
        $('.days dl.day.current').animate top: dtop.curr + 'px', 200, 'easeOutCubic', ->
          me.show_day_nav()
          callback()

    sleft = @get_offset_by_day i
    if $(window).scrollLeft() isnt sleft
      old_onscroll = window.onscroll
      scrolling = true
      window.onscroll = ->
        if scrolling and $(document).scrollLeft() isnt sleft then return
        window.onscroll = old_onscroll
        if $(document).scrollLeft() is sleft
          do_show_day()
        else
          console.log "#{$(document).scrollLeft()} isnt #{sleft}"
      duration = if immediate then 0 else 100
      $('body').animate scrollLeft: sleft, duration, ->
        scrolling = false
    else
      do_show_day()

  reinit: ->
    @curr_day = null
    @update_map_height()
    @set_days_position()
    curr_day = @get_day_by_offset $(document).scrollLeft()
    @change_day curr_day
    @update_day_top()
    @re_move_day()

  _change_curr_day: ->
    console.log "change day to #{@curr_day}"
    if window.editor and @curr_day isnt editor.schedule_view.currentOffset
      editor.change_day_city @curr_day

  get_day_by_offset: (offset) ->
    tolerance = 5
    day_width = 150 + 10
    curr_left = 30
    curr_day = parseInt Math.max(0,offset - tolerance - 1 + curr_left) / day_width

  get_offset_by_day: (day) -> day * 160


  update_current_day: ->
    curr_day = @get_day_by_offset $(document).scrollLeft()
    old_curr_day = @curr_day
    @curr_day = curr_day
    if old_curr_day is @curr_day then return

    dtop = @get_day_top()
    $('.days dl.day.current').removeClass('current')
    $('.days dl.day').eq(curr_day).addClass('current')
    $('.days dl.day').css('top', dtop.other + 'px')

    curr_day_left = $('.days dl.day.current').css('left')
    curr_day_left = parseInt curr_day_left
    navp =
      prev: curr_day_left - 20
      next: curr_day_left + 150
    $('.plan .prevDay').css 'left', navp.prev + 'px'
    $('.plan .nextDay').css 'left', navp.next + 'px'

    @show_day_nav()

  show_day_nav: ->
    $(".plan .prevDay").hide()
    $(".plan .nextDay").hide()
    if @has_current_day() && $(document).scrollTop() < 10
      $(".plan .prevDay").show() if @curr_day isnt 0
      $(".plan .nextDay").show()  if @curr_day isnt @days() - 1

  days: -> $('.days dl.day').length

  has_current_day: -> not $('div.plan').hasClass 'no-current-day'
  toggle_current_day: (onoff) ->
    $('div.plan').toggleClass 'no-current-day', not onoff
    $('div.plan').toggleClass 'has-current-day', onoff

  update_day_top: ->
    dtop = @get_day_top()
    $('.days dl.day.current').css 'top', dtop.curr + 'px'
    $('.headerw').css 'top', dtop.header + 'px'
    $('.days').toggleClass 'hide-mini', $(document).scrollTop() > 5
    $('.plan .cityChoose').css 'top', dtop.city + 'px'
    $('.plan_title').css 'top', dtop.title + 'px'
    $('.bigMap').css 'top', dtop.map + 'px'
    
    @show_day_nav()


  update_map_height: ->
    header_h = $('.headerw').outerHeight true
    title_h = $('.plan_title').outerHeight true
    mapd =
      height: $(window).height() - header_h - title_h
      top: header_h + title_h + $(document).scrollTop()

    $('.bigMap')
      .height(mapd.height + 'px')
      .css('top', mapd.top + 'px')

  get_day_top: ->
    dstop = $(document).scrollTop()
    curr_day_top0 = 77 
    other_day_top = $(window).height() - $('.days dl.day dt').outerHeight(true) - $('.days dl.day').offsetParent().offset().top
    curr_day_top = unless @has_current_day() then other_day_top else Math.min other_day_top, dstop + curr_day_top0
    header_h = $('.header').outerHeight(true)
    wishlist_h = $('.wl_popup .tab_bar').outerHeight true
    headerw_h = $('.headerw').outerHeight(true)
    title_h = $('.plan_title').outerHeight(true)

    header_top = Math.min header_h + wishlist_h, dstop
    city_top = Math.max 155 - dstop, 40
    title_top = Math.max 98 - dstop, 0
    map_top = 135 - dstop
    
    curr: curr_day_top
    other: other_day_top
    header: -header_top
    city: city_top
    title: title_top
    map: map_top

  re_move_day: ->
    dtop = @get_day_top()
    $('.plan dl.day').not('.current').css 'top', dtop.other + "px"
    #$('.days dl.day').not('.current').animate top: dtop.other + "px", 'slow'

  set_days_position: ->
    maxH = 0
    dayLeft = 0
    $('.plan dl.day').each (i, e) ->
      dayLeft = (150 + 10) * i + 30
      $(this).css "left", dayLeft + "px"

    max_dayh = _.max $('.days dl.day').map -> $(this).outerHeight true
    pland =
      width: dayLeft + $(window).width() - 180
      height: max_dayh + $(window).height() - $(".days dl.day dt").outerHeight(true)
    $(".plan").width(pland.width).height(0)
    $('.main-content').height(pland.height)
