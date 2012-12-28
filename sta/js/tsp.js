// Generated by CoffeeScript 1.3.3
var GoogleService, LatLgt, TspSolver;

window.TSP_MODE_ROUND = 0;

window.TSP_MODE_ATOZ = 1;

window.DRIVING_SPEED = 60;

TspSolver = (function() {

  function TspSolver() {
    this.maxTripSentry = 2000000000;
  }

  TspSolver.prototype.make1dArray = function(n, val) {
    var i, _i, _ref, _results;
    if (val == null) {
      val = null;
    }
    _results = [];
    for (i = _i = 0, _ref = n - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push(val);
    }
    return _results;
  };

  TspSolver.prototype.make2dArray = function(n1, n2, val) {
    var i, j, _i, _results;
    if (val == null) {
      val = null;
    }
    _results = [];
    for (i = _i = 0; 0 <= n1 ? _i < n1 : _i > n1; i = 0 <= n1 ? ++_i : --_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (j = _j = 0; 0 <= n2 ? _j < n2 : _j > n2; j = 0 <= n2 ? ++_j : --_j) {
          _results1.push(val);
        }
        return _results1;
      })());
    }
    return _results;
  };

  TspSolver.prototype.calcDistance = function(p0, p1) {
    return p0.distanceTo(p1);
  };

  TspSolver.prototype.nextSetOf = function(num, nextSet) {
    var count, firstOne, firstZero, i, k, numActive, ret, x, _i, _j, _k, _l, _len, _m, _n;
    ret = 0;
    numActive = nextSet.length;
    count = 0;
    for (_i = 0, _len = nextSet.length; _i < _len; _i++) {
      x = nextSet[_i];
      count += x;
    }
    if (count < num) {
      for (i = _j = 0; 0 <= num ? _j < num : _j > num; i = 0 <= num ? ++_j : --_j) {
        nextSet[i] = 1;
      }
      for (i = _k = num; num <= numActive ? _k < numActive : _k > numActive; i = num <= numActive ? ++_k : --_k) {
        nextSet[i] = 0;
      }
    } else {
      firstOne = nextSet.indexOf(1);
      firstZero = nextSet.indexOf(0, firstOne + 1);
      if (firstZero < 0) {
        return -1;
      }
      nextSet[firstZero] = 1;
      k = firstZero - firstOne - 1;
      for (i = _l = 0; 0 <= k ? _l < k : _l > k; i = 0 <= k ? ++_l : --_l) {
        nextSet[i] = 1;
      }
      for (i = _m = k; k <= firstZero ? _m < firstZero : _m > firstZero; i = k <= firstZero ? ++_m : --_m) {
        nextSet[i] = 0;
      }
    }
    for (i = _n = 0; 0 <= numActive ? _n < numActive : _n > numActive; i = 0 <= numActive ? ++_n : --_n) {
      ret += nextSet[i] << i;
    }
    return ret;
  };

  TspSolver.prototype.tspDynamic = function(dur, mode) {
    /*
        Solves the TSP problem to optimality. Memory requirement is
        O(numActive * 2^numActive)
    
        Return
         bestPath[]
    
        If mode is 1, it will return the optimal solution to the related
        problem of finding a path from node 0 to node this.numActive - 1, visiting
        the in-between nodes in the best order.
    */

    var C, bestPath, bestTrip, currNode, i, index, k, m, nextSet, numActive, numCombos, parent, prevIndex, s, visited, _i, _j, _k, _l, _m, _n, _o, _ref;
    numActive = dur.length;
    nextSet = this.make1dArray(numActive, 0);
    visited = this.make1dArray(numActive, false);
    bestPath = this.make1dArray(numActive, 0);
    bestTrip = 10000000;
    numCombos = 1 << numActive;
    parent = this.make2dArray(numCombos, numActive, 0);
    C = this.make2dArray(numCombos, numActive, 0.0);
    for (k = _i = 1; 1 <= numActive ? _i < numActive : _i > numActive; k = 1 <= numActive ? ++_i : --_i) {
      index = 1 + (1 << k);
      C[index][k] = dur[0][k];
    }
    for (s = _j = 3; 3 <= numActive ? _j <= numActive : _j >= numActive; s = 3 <= numActive ? ++_j : --_j) {
      for (i = _k = 0; 0 <= numActive ? _k < numActive : _k > numActive; i = 0 <= numActive ? ++_k : --_k) {
        nextSet[i] = 0;
      }
      index = this.nextSetOf(s, nextSet);
      while (index >= 0) {
        for (k = _l = 1; 1 <= numActive ? _l < numActive : _l > numActive; k = 1 <= numActive ? ++_l : --_l) {
          if (!nextSet[k]) {
            continue;
          }
          prevIndex = index - (1 << k);
          C[index][k] = this.maxTripSentry;
          for (m = _m = 1; 1 <= numActive ? _m < numActive : _m > numActive; m = 1 <= numActive ? ++_m : --_m) {
            if (!(nextSet[m] && m !== k)) {
              continue;
            }
            if (C[prevIndex][m] + dur[m][k] < C[index][k]) {
              C[index][k] = C[prevIndex][m] + dur[m][k];
              parent[index][k] = m;
            }
          }
        }
        index = this.nextSetOf(s, nextSet);
      }
    }
    index = (1 << numActive) - 1;
    if (mode === TSP_MODE_ROUND) {
      currNode = -1;
      bestPath[numActive] = 0;
      for (i = _n = 1; 1 <= numActive ? _n < numActive : _n > numActive; i = 1 <= numActive ? ++_n : --_n) {
        if (C[index][i] + dur[i][0] < bestTrip) {
          bestTrip = C[index][i] + dur[i][0];
          currNode = i;
        }
      }
      bestPath[numActive - 1] = currNode;
    } else {
      currNode = numActive - 1;
      bestPath[numActive - 1] = numActive - 1;
      bestTrip = C[index][numActive - 1];
    }
    for (i = _o = _ref = numActive - 1; _ref <= 0 ? _o < 0 : _o > 0; i = _ref <= 0 ? ++_o : --_o) {
      currNode = parent[index][currNode];
      index -= 1 << bestPath[i];
      bestPath[i - 1] = currNode;
    }
    return bestPath;
  };

  TspSolver.prototype.solve = function(points, mode) {
    var bestPath, dur, i, j, numActive;
    numActive = points.length;
    dur = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= numActive ? _i < numActive : _i > numActive; i = 0 <= numActive ? ++_i : --_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (j = _j = 0; 0 <= numActive ? _j < numActive : _j > numActive; j = 0 <= numActive ? ++_j : --_j) {
            _results1.push(this.calcDistance(points[i].location, points[j].location));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }).call(this);
    this.durations = dur;
    if (points.length < 3) {
      return bestPath = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = points.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(i);
        }
        return _results;
      })();
    } else {
      console.log('tsp: geo points', points, 'line distances', dur);
      bestPath = this.tspDynamic(dur, mode);
      if (mode === TSP_MODE_ROUND) {
        bestPath = bestPath.slice(0, bestPath.length - 1);
      }
      return bestPath;
    }
  };

  TspSolver.prototype.solveRoundTrip = function(points, best_break) {
    var bestPath, i, len, maxd, maxi, me, new_points;
    if (best_break == null) {
      best_break = true;
    }
    me = this;
    bestPath = this.solve(points, TSP_MODE_ROUND);
    if (best_break) {
      maxd = -1;
      maxi = 0;
      len = bestPath.length;
      _.each(bestPath, function(i0, i) {
        var d, last_i0;
        last_i0 = bestPath[(i - 1 + len) % len];
        d = me.durations[last_i0][i0];
        if (maxd < d) {
          maxd = d;
          return maxi = i;
        }
      });
      bestPath = util.rotate_arr_to(bestPath, maxi);
    }
    return new_points = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bestPath.length; _i < _len; _i++) {
        i = bestPath[_i];
        _results.push(points[i]);
      }
      return _results;
    })();
  };

  TspSolver.prototype.solveAtoZ = function(points) {
    var bestPath, i, new_points;
    bestPath = this.solve(points, TSP_MODE_ATOZ);
    return new_points = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bestPath.length; _i < _len; _i++) {
        i = bestPath[_i];
        _results.push(points[i]);
      }
      return _results;
    })();
  };

  TspSolver.prototype.getDurations = function() {
    return this.durations;
  };

  return TspSolver;

})();

LatLgt = (function() {

  function LatLgt(lat, lgt, radius) {
    if (radius == null) {
      radius = 6371;
    }
    this.lat = parseFloat(lat);
    this.lgt = parseFloat(lgt);
    this.latr = this.toRad(this.lat);
    this.lgtr = this.toRad(this.lgt);
    this.radius = parseFloat(radius);
  }

  LatLgt.prototype.toRad = function(deg) {
    return deg * Math.PI / 180;
  };

  LatLgt.prototype.toDeg = function(rad) {
    return rad * 180 / Math.PI;
  };

  LatLgt.prototype.distanceTo = function(latlgt, prec) {
    var dx, dy, j, k, x0, x1, y0, y1;
    if (prec == null) {
      prec = 4;
    }
    x0 = this.latr;
    y0 = this.lgtr;
    x1 = latlgt.latr;
    y1 = latlgt.lgtr;
    dx = x1 - x0;
    dy = y1 - y0;
    j = Math.pow(Math.sin(dx / 2), 2) + Math.cos(x0) * Math.cos(x1) * Math.pow(Math.sin(dy / 2), 2);
    k = 2 * Math.atan2(Math.sqrt(j), Math.sqrt(1 - j));
    return this.radius * k;
  };

  LatLgt.prototype.midpointTo = function(latlgt) {
    var c, d, dlgt, lat1, lat2, lat3, lgt1, lgt2, lgt3;
    lat1 = this.latr;
    lgt1 = this.lgtr;
    lat2 = latlgt.latr;
    lgt2 = latlgt.lgtr;
    dlgt = lgt2 - lgt1;
    c = Math.cos(lat2) * Math.cos(dlgt);
    d = Math.cos(lat2) * Math.sin(dlgt);
    lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + c) * (Math.cos(lat1) + c) + d * d));
    lgt3 = lgt1 + Math.atan2(d, Math.cos(lat1) + c);
    return new LatLgt(this.toDeg(lat3), this.toDeg(lgt3));
  };

  return LatLgt;

})();

GoogleService = (function() {

  GoogleService.prototype.routes_defer_cache = {};

  function GoogleService() {
    this.DIR_STATUS_MSG = {};
    if (typeof google !== "undefined" && google !== null) {
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.INVALID_REQUEST] = "The DirectionsRequest provided was invalid.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED] = "Too many DirectionsWaypoints were provided in the DirectionsRequest. The total allowed waypoints is 8, plus the origin and destination.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.NOT_FOUND] = "At least one of the origin, destination, or waypoints could not be geocoded.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.OK] = "The response contains a valid DirectionsResult.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.OVER_QUERY_LIMIT] = "The webpage has gone over the requests limit in too short a period of time.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.REQUEST_DENIED] = "The webpage is not allowed to use the directions service.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.UNKNOWN_ERROR] = "A directions request could not be processed due to a server error. The request may succeed if you try again.";
      this.DIR_STATUS_MSG[google.maps.DirectionsStatus.ZERO_RESULTS] = "No route could be found between the origin and destination.";
    }
  }

  GoogleService.prototype.get_line_directions_result = function(latlons, dirsResult0) {
    var bounds, directionsResult, distance, duration, i, last_latlon, latlgts, latlon, leg, legs, route, step;
    latlgts = _.map(latlons, function(x) {
      return new LatLgt(x.lat(), x.lng());
    });
    legs = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 1, _ref = latlons.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        last_latlon = latlons[i - 1];
        latlon = latlons[i];
        distance = parseInt(latlgts[i - 1].distanceTo(latlgts[i])) * 1000;
        duration = parseInt(distance / 1000 * 3600 / DRIVING_SPEED);
        step = {
          distance: {
            value: distance,
            text: util.toReadableDistance(distance)
          },
          duration: {
            value: duration,
            text: util.toReadableDuration(duration)
          },
          start_location: last_latlon,
          end_location: latlon,
          path: [last_latlon, latlon],
          travel_mode: google.maps.TravelMode.DRIVING
        };
        _results.push(leg = _.extend({}, _.pick(step, ['distance', 'duration', 'start_location', 'end_location']), {
          start_address: '',
          end_address: '',
          steps: [step],
          via_waypoints: []
        }));
      }
      return _results;
    })();
    bounds = new google.maps.LatLngBounds;
    _.each(latlons, function(latlon) {
      return bounds.extend(latlon);
    });
    route = {
      bounds: bounds,
      copyrights: 'Map data ©2012 AutoNavi, Google',
      legs: legs,
      overview_path: latlons,
      warnings: []
    };
    return directionsResult = _.extend({}, dirsResult0, {
      routes: [route]
    });
  };

  GoogleService.prototype.get_routes_promise = function(points, travelMode, maxSize, abs_start) {
    var compute_hash_key, emsg, end, get_route_promise, hash_key, me, myGebDirections, route_defers, routes_defer, start;
    if (travelMode == null) {
      travelMode = google.maps.TravelMode.DRIVING;
    }
    if (maxSize == null) {
      maxSize = 0;
    }
    if (abs_start == null) {
      abs_start = 0;
    }
    maxSize = travelMode === google.maps.TravelMode.TRANSIT ? 2 : maxSize || 10;
    compute_hash_key = function() {
      var lat_lgts;
      lat_lgts = points.map(function(p) {
        return "" + p.location.lat + "," + p.location.lgt;
      });
      return "" + travelMode + "(" + maxSize + "):" + (lat_lgts.join(';'));
    };
    hash_key = compute_hash_key();
    if (this.routes_defer_cache[hash_key]) {
      console.log("get routes between " + points.length + " points, travel model: " + travelMode + ", hit cache");
      return this.routes_defer_cache[hash_key];
    }
    me = this;
    routes_defer = $.Deferred();
    this.routes_defer_cache[hash_key] = routes_defer;
    myGebDirections = new google.maps.DirectionsService();
    get_route_promise = function(start, end) {
      var latlons, route_defer, sub_points, waypoints;
      route_defer = $.Deferred();
      sub_points = points.slice(start, end + 1 || 9e9);
      latlons = _.map(sub_points, function(p) {
        return new google.maps.LatLng(p.location.lat, p.location.lgt);
      });
      waypoints = _.map(latlons.slice(1, latlons.length - 1), function(p) {
        return {
          location: p,
          stopover: true
        };
      });
      myGebDirections.route({
        origin: latlons[0],
        destination: _.last(latlons),
        waypoints: waypoints,
        avoidHighways: true,
        travelMode: travelMode
      }, function(directionsResult, directionsStatus) {
        var emsg, errorMsg, msgse, split_size;
        msgse = "" + (abs_start + start) + " - " + (abs_start + end);
        switch (directionsStatus) {
          case google.maps.DirectionsStatus.OK:
            console.log("routes done: " + msgse);
            return route_defer.resolve(directionsResult);
          case google.maps.DirectionsStatus.ZERO_RESULTS:
            split_size = Math.max(2, parseInt(sub_points.length / 3) + 1);
            emsg = "routes zero results: " + msgse;
            if (sub_points.length <= split_size) {
              console.log("" + emsg + ". use line instead");
              return route_defer.resolve(me.get_line_directions_result(latlons, directionsResult));
            } else {
              console.log("" + emsg + ". retry (" + split_size + ") after 500ms");
              return _.delay((function() {
                return me.get_routes_promise(sub_points, travelMode, split_size, abs_start + start).done(function(result) {
                  return route_defer.resolve(result.dirsResults);
                }).fail(function(err) {
                  return route_defer.reject(err);
                });
              }), 500);
            }
            break;
          default:
            errorMsg = me.DIR_STATUS_MSG[directionsStatus];
            console.log("routes failed: " + msgse + ", " + errorMsg);
            return route_defer.reject(errorMsg);
        }
      });
      return route_defer;
    };
    if (points.length > 1) {
      route_defers = (function() {
        var _i, _ref, _ref1, _results;
        _results = [];
        for (start = _i = 0, _ref = points.length - 1, _ref1 = maxSize - 1; 0 <= _ref ? _i < _ref : _i > _ref; start = _i += _ref1) {
          end = Math.min(start + maxSize, points.length) - 1;
          _results.push(get_route_promise(start, end));
        }
        return _results;
      })();
    } else {
      route_defers = [];
    }
    emsg = "" + abs_start + " - " + (abs_start + points.length - 1) + " / " + maxSize;
    $.when.apply($, route_defers).done(function() {
      var dirsResults, distances, dr, durations, leg, legs, result;
      dirsResults = _.flatten(arguments);
      legs = _.flatten((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = dirsResults.length; _i < _len; _i++) {
          dr = dirsResults[_i];
          _results.push(dr.routes[0].legs);
        }
        return _results;
      })());
      durations = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = legs.length; _i < _len; _i++) {
          leg = legs[_i];
          _results.push(leg.duration.value);
        }
        return _results;
      })();
      distances = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = legs.length; _i < _len; _i++) {
          leg = legs[_i];
          _results.push(leg.distance.value);
        }
        return _results;
      })();
      result = {
        dirsResults: dirsResults,
        durations: durations,
        distances: distances,
        legs: legs
      };
      console.log("get routes done, " + emsg + ", result", result);
      return routes_defer.resolve(result);
    }).fail(function(err) {
      console.log("get routes fail, " + emsg);
      routes_defer.reject(err);
      return delete me.routes_defer_cache[hash_key];
    });
    return routes_defer;
  };

  return GoogleService;

})();
