// Generated by CoffeeScript 1.3.3
var init_choose_city, init_jipiao, jipiao_config, load_attractions, plan_view, set_cookie;

$(function() {
  switch ($('body').attr('id')) {
    case 'index':
      init_jipiao();
      break;
    case 'plan-view':
      plan_view.init();
  }
  init_choose_city();
  return $(".w1000").height($(".full").height() + 20);
});

jipiao_config = {
  url: {
    by_price: '/pagehome/attractions_by_price'
  }
};

init_jipiao = function() {
  $('.page_container ul.page li a').attr("href", "javascript:void(0);");
  $('.choose-city.from_city input').change(function() {
    return load_attractions();
  });
  return $('body').on('click', '.filter li a', function() {
    var i, left, to_price;
    $('#list_page').val("1");
    $('.filter a').removeClass("sel");
    $(this).addClass("sel");
    to_price = $('.sel').next().val();
    load_attractions(null, to_price);
    i = $('.filter a').index($(this));
    left = 72 + (i - 1) * 138;
    return $('.filter .cursor').css('left', left);
  }).on('click', '.filter_city a', function() {
    var to_city;
    $('#list_page').val("1");
    to_city = $(this).find('strong').text();
    return load_attractions(to_city);
  }).on('click', '.page_container ul.page li', function() {
    var default_page, max_page, page;
    default_page = parseInt($('#list_page').val());
    max_page = parseInt($('#page_total').val());
    if ($(this).attr('class') === 'prev') {
      if (default_page > 1) {
        page = default_page - 1;
      } else {
        page = default_page;
      }
    } else if ($(this).attr('class') === 'next') {
      if (default_page < max_page) {
        page = default_page + 1;
      } else {
        page = default_page;
      }
    } else if ($(this).attr('class') === 'begin') {
      page = 1;
    } else if ($(this).attr('class') === 'end') {
      page = max_page;
    } else {
      page = $(this).find('a').text().replace(/(^\s*)|(\s*$)/g, "");
    }
    $('#list_page').val(page);
    return load_attractions(null, null, page);
  });
};

set_cookie = function($a, $b) {
  if ($b !== '') {
    return $.cookie($a, $b, {
      path: '/',
      domain: 'in1001.com'
    });
  }
};

load_attractions = function(to_city, to_price, page) {
  var from_city, from_price, url;
  from_city = $('.choose-city.from_city input').val();
  to_price || (to_price = $('ul.filter .sel').next().val());
  to_city || (to_city = $('.filter_city span.sel a').text());
  from_price = Math.min(6000, parseInt(to_price) - 1000);
  set_cookie('from_price', from_price);
  set_cookie('to_price', to_price);
  set_cookie('to_city', to_city);
  url = "" + jipiao_config.url.by_price + "?from_city=" + from_city + "&to_city=" + to_city + "&from_price=" + from_price + "&to_price=" + to_price;
  if (parseInt(page) > 1) {
    url = "" + url + "&page=" + page;
  }
  return $('div.main').load(url, function() {
    return $(".w1000").height($(".full").height() + 20);
  });
};

init_choose_city = function($choosecw) {
  $choosecw || ($choosecw = $('div.choose-city'));
  $('.target_btn', $choosecw).click(function() {
    var $cwrapper;
    $cwrapper = $(this).parents('.choose-city');
    return $cwrapper.toggleClass('open');
  });
  $(".input_target", $choosecw).focusin(function() {
    if ($(this).val() === $(this).attr('placeholder')) {
      return $(this).val("");
    }
  }).focusout(function() {
    if ($(this).val() === "") {
      return $(this).val($(this).attr('placeholder'));
    }
  });
  $('.chooseCity_popup a', $choosecw).click(function() {
    var $cwrapper, $input, city;
    $cwrapper = $(this).parents('.choose-city');
    $input = $('input', $cwrapper);
    city = $(this).text();
    $input.val(city).change();
    return $cwrapper.removeClass('open');
  });
  return $('.from_city a').click(function() {
    var from_city;
    from_city = $(this).text();
    set_cookie('from_city', from_city);
    if ($('body').attr('id') === 'places') {
      return location.reload();
    }
  });
};

plan_view = {
  init: function() {},
  save_plan: function() {
    var plan_id, title;
    plan_id = $('#plan_id').val();
    title = $('#diglogBox .saveRoadDialog input.roadname').val();
    return $.ajax({
      url: "/api/plans/" + plan_id,
      type: 'PUT',
      data: $.toJSON({
        title: title,
        is_temp: 0
      }),
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      success: function(plan) {
        return window.location.reload();
      }
    });
  }
};
