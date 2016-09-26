var GeoChecker = function (o) {
  this.url = o
};
GeoChecker.JSON_PREFIX = ")]}'\n", GeoChecker.HTTP_SUCCESS_CODE = 200, GeoChecker.DEFAULT_TIMEOUT = 5e3, GeoChecker.prototype.check = function (o, t) {
  this.makeRequest_(this.url, function (e) {
    "true" === e ? o() : t()
  }, o)
}, GeoChecker.prototype.makeRequest_ = function (o, t, e) {
  var r = new XMLHttpRequest;
  r.open("GET", o, !0), r.timeout = GeoChecker.DEFAULT_TIMEOUT, r.onload = function (o) {
    r.status === GeoChecker.HTTP_SUCCESS_CODE ? (o = r.responseText.replace(GeoChecker.JSON_PREFIX, ""), t(o)) : e()
  }, r.onerror = e, r.ontimeout = e, r.send()
};

contributor.main.geodetect_ = function () {
  var o = function (o) {
      (o = document.querySelectorAll(o)) && [].forEach.call(o, function (o) {
        o.classList.remove("js-geo-hidden")
      })
    },
    t = new goog.Uri(location.href);
  goog.isDef(t.getParameterValue("waitlist")) ? o(".js-geo-waitlist") : goog.isDef(t.getParameterValue("signin")) ? o(".js-geo-sign-in") : new GeoChecker("https://contributor.google.com/GeoLookup").check(function () {
    o(".js-geo-sign-in")
  }, function () {
    o(".js-geo-waitlist")
  })
}
