! function () {
  "use strict";

  function e(e, t) {
    if (e) {
      if (t.element_.classList.contains(t.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
        var s = document.createElement("span");
        s.classList.add(t.CssClasses_.MDL_RIPPLE_CONTAINER), s.classList.add(t.CssClasses_.MDL_JS_RIPPLE_EFFECT);
        var i = document.createElement("span");
        i.classList.add(t.CssClasses_.MDL_RIPPLE), s.appendChild(i), e.appendChild(s)
      }
      e.addEventListener("click", function (s) {
        s.preventDefault();
        var i = e.href.split("#")[1],
          n = t.element_.querySelector("#" + i);
        t.resetTabState_(), t.resetPanelState_(), e.classList.add(t.CssClasses_.ACTIVE_CLASS), n.classList.add(t.CssClasses_.ACTIVE_CLASS)
      })
    }
  }

  function t(e, t, s, i) {
    if (i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)) {
      var n = document.createElement("span");
      n.classList.add(i.CssClasses_.RIPPLE_CONTAINER), n.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);
      var a = document.createElement("span");
      a.classList.add(i.CssClasses_.RIPPLE), n.appendChild(a), e.appendChild(n)
    }
    e.addEventListener("click", function (n) {
      n.preventDefault();
      var a = e.href.split("#")[1],
        l = i.content_.querySelector("#" + a);
      i.resetTabState_(t), i.resetPanelState_(s), e.classList.add(i.CssClasses_.IS_ACTIVE), l.classList.add(i.CssClasses_.IS_ACTIVE)
    })
  }
  var s = {
    upgradeDom: function (e, t) {},
    upgradeElement: function (e, t) {},
    upgradeElements: function (e) {},
    upgradeAllRegistered: function () {},
    registerUpgradedCallback: function (e, t) {},
    register: function (e) {},
    downgradeElements: function (e) {}
  };
  s = function () {
    function e(e, t) {
      for (var s = 0; s < p.length; s++)
        if (p[s].className === e) return "undefined" != typeof t && (p[s] = t), p[s];
      return !1
    }

    function t(e) {
      var t = e.getAttribute("data-upgraded");
      return null === t ? [""] : t.split(",")
    }

    function s(e, s) {
      var i = t(e);
      return -1 !== i.indexOf(s)
    }

    function i(t, s) {
      if ("undefined" == typeof t && "undefined" == typeof s)
        for (var a = 0; a < p.length; a++) i(p[a].className, p[a].cssClass);
      else {
        var l = t;
        if ("undefined" == typeof s) {
          var o = e(l);
          o && (s = o.cssClass)
        }
        for (var r = document.querySelectorAll("." + s), d = 0; d < r.length; d++) n(r[d], l)
      }
    }

    function n(i, n) {
      if (!("object" == typeof i && i instanceof Element)) throw new Error("Invalid argument provided to upgrade MDL element.");
      var a = t(i),
        l = [];
      if (n) s(i, n) || l.push(e(n));
      else {
        var o = i.classList;
        p.forEach(function (e) {
          o.contains(e.cssClass) && -1 === l.indexOf(e) && !s(i, e.className) && l.push(e)
        })
      }
      for (var r, d = 0, _ = l.length; _ > d; d++) {
        if (r = l[d], !r) throw new Error("Unable to find a registered component for the given class.");
        a.push(r.className), i.setAttribute("data-upgraded", a.join(","));
        var h = new r.classConstructor(i);
        h[C] = r, c.push(h);
        for (var u = 0, m = r.callbacks.length; m > u; u++) r.callbacks[u](i);
        r.widget && (i[r.className] = h);
        var E = document.createEvent("Events");
        E.initEvent("mdl-componentupgraded", !0, !0), i.dispatchEvent(E)
      }
    }

    function a(e) {
      Array.isArray(e) || (e = "function" == typeof e.item ? Array.prototype.slice.call(e) : [e]);
      for (var t, s = 0, i = e.length; i > s; s++) t = e[s], t instanceof HTMLElement && (n(t), t.children.length > 0 && a(t.children))
    }

    function l(t) {
      var s = "undefined" == typeof t.widget && "undefined" == typeof t.widget,
        i = !0;
      s || (i = t.widget || t.widget);
      var n = {
        classConstructor: t.constructor || t.constructor,
        className: t.classAsString || t.classAsString,
        cssClass: t.cssClass || t.cssClass,
        widget: i,
        callbacks: []
      };
      if (p.forEach(function (e) {
          if (e.cssClass === n.cssClass) throw new Error("The provided cssClass has already been registered: " + e.cssClass);
          if (e.className === n.className) throw new Error("The provided className has already been registered")
        }), t.constructor.prototype.hasOwnProperty(C)) throw new Error("MDL component classes must not have " + C + " defined as a property.");
      var a = e(t.classAsString, n);
      a || p.push(n)
    }

    function o(t, s) {
      var i = e(t);
      i && i.callbacks.push(s)
    }

    function r() {
      for (var e = 0; e < p.length; e++) i(p[e].className)
    }

    function d(e) {
      for (var t = 0; t < c.length; t++) {
        var s = c[t];
        if (s.element_ === e) return s
      }
    }

    function _(e) {
      if (e && e[C].classConstructor.prototype.hasOwnProperty(u)) {
        e[u]();
        var t = c.indexOf(e);
        c.splice(t, 1);
        var s = e.element_.getAttribute("data-upgraded").split(","),
          i = s.indexOf(e[C].classAsString);
        s.splice(i, 1), e.element_.setAttribute("data-upgraded", s.join(","));
        var n = document.createEvent("Events");
        n.initEvent("mdl-componentdowngraded", !0, !0), e.element_.dispatchEvent(n)
      }
    }

    function h(e) {
      var t = function (e) {
        _(d(e))
      };
      if (e instanceof Array || e instanceof NodeList)
        for (var s = 0; s < e.length; s++) t(e[s]);
      else {
        if (!(e instanceof Node)) throw new Error("Invalid argument provided to downgrade MDL nodes.");
        t(e)
      }
    }
    var p = [],
      c = [],
      u = "mdlDowngrade",
      C = "mdlComponentConfigInternal_";
    return {
      upgradeDom: i,
      upgradeElement: n,
      upgradeElements: a,
      upgradeAllRegistered: r,
      registerUpgradedCallback: o,
      register: l,
      downgradeElements: h
    }
  }(), s.ComponentConfigPublic, s.ComponentConfig, s.Component, s.upgradeDom = s.upgradeDom, s.upgradeElement = s.upgradeElement, s.upgradeElements = s.upgradeElements, s.upgradeAllRegistered = s.upgradeAllRegistered, s.registerUpgradedCallback = s.registerUpgradedCallback, s.register = s.register, s.downgradeElements = s.downgradeElements, window.componentHandler = s, window.componentHandler = s, window.addEventListener("load", function () {
    "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach ? (document.documentElement.classList.add("mdl-js"), s.upgradeAllRegistered()) : (s.upgradeElement = function () {}, s.register = function () {})
  }), Date.now || (Date.now = function () {
    return (new Date).getTime()
  }, Date.now = Date.now);
  for (var i = ["webkit", "moz"], n = 0; n < i.length && !window.requestAnimationFrame; ++n) {
    var a = i[n];
    window.requestAnimationFrame = window[a + "RequestAnimationFrame"], window.cancelAnimationFrame = window[a + "CancelAnimationFrame"] || window[a + "CancelRequestAnimationFrame"], window.requestAnimationFrame = window.requestAnimationFrame, window.cancelAnimationFrame = window.cancelAnimationFrame
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var l = 0;
    window.requestAnimationFrame = function (e) {
      var t = Date.now(),
        s = Math.max(l + 16, t);
      return setTimeout(function () {
        e(l = s)
      }, s - t)
    }, window.cancelAnimationFrame = clearTimeout, window.requestAnimationFrame = window.requestAnimationFrame, window.cancelAnimationFrame = window.cancelAnimationFrame
  }
  var o = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialButton = o, o.prototype.Constant_ = {}, o.prototype.CssClasses_ = {
    RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_CONTAINER: "mdl-button__ripple-container",
    RIPPLE: "mdl-ripple"
  }, o.prototype.blurHandler_ = function (e) {
    e && this.element_.blur()
  }, o.prototype.disable = function () {
    this.element_.disabled = !0
  }, o.prototype.disable = o.prototype.disable, o.prototype.enable = function () {
    this.element_.disabled = !1
  }, o.prototype.enable = o.prototype.enable, o.prototype.init = function () {
    if (this.element_) {
      if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
        var e = document.createElement("span");
        e.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleElement_ = document.createElement("span"), this.rippleElement_.classList.add(this.CssClasses_.RIPPLE), e.appendChild(this.rippleElement_), this.boundRippleBlurHandler = this.blurHandler_.bind(this), this.rippleElement_.addEventListener("mouseup", this.boundRippleBlurHandler), this.element_.appendChild(e)
      }
      this.boundButtonBlurHandler = this.blurHandler_.bind(this), this.element_.addEventListener("mouseup", this.boundButtonBlurHandler), this.element_.addEventListener("mouseleave", this.boundButtonBlurHandler)
    }
  }, o.prototype.mdlDowngrade_ = function () {
    this.rippleElement_ && this.rippleElement_.removeEventListener("mouseup", this.boundRippleBlurHandler), this.element_.removeEventListener("mouseup", this.boundButtonBlurHandler), this.element_.removeEventListener("mouseleave", this.boundButtonBlurHandler)
  }, o.prototype.mdlDowngrade = o.prototype.mdlDowngrade_, o.prototype.mdlDowngrade = o.prototype.mdlDowngrade, s.register({
    constructor: o,
    classAsString: "MaterialButton",
    cssClass: "mdl-js-button",
    widget: !0
  });
  var r = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialCheckbox = r, r.prototype.Constant_ = {
    TINY_TIMEOUT: .001
  }, r.prototype.CssClasses_ = {
    INPUT: "mdl-checkbox__input",
    BOX_OUTLINE: "mdl-checkbox__box-outline",
    FOCUS_HELPER: "mdl-checkbox__focus-helper",
    TICK_OUTLINE: "mdl-checkbox__tick-outline",
    RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    RIPPLE_CONTAINER: "mdl-checkbox__ripple-container",
    RIPPLE_CENTER: "mdl-ripple--center",
    RIPPLE: "mdl-ripple",
    IS_FOCUSED: "is-focused",
    IS_DISABLED: "is-disabled",
    IS_CHECKED: "is-checked",
    IS_UPGRADED: "is-upgraded"
  }, r.prototype.onChange_ = function (e) {
    this.updateClasses_()
  }, r.prototype.onFocus_ = function (e) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
  }, r.prototype.onBlur_ = function (e) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
  }, r.prototype.onMouseUp_ = function (e) {
    this.blur_()
  }, r.prototype.updateClasses_ = function () {
    this.checkDisabled(), this.checkToggleState()
  }, r.prototype.blur_ = function () {
    window.setTimeout(function () {
      this.inputElement_.blur()
    }.bind(this), this.Constant_.TINY_TIMEOUT)
  }, r.prototype.checkToggleState = function () {
    this.inputElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
  }, r.prototype.checkToggleState = r.prototype.checkToggleState, r.prototype.checkDisabled = function () {
    this.inputElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
  }, r.prototype.checkDisabled = r.prototype.checkDisabled, r.prototype.disable = function () {
    this.inputElement_.disabled = !0, this.updateClasses_()
  }, r.prototype.disable = r.prototype.disable, r.prototype.enable = function () {
    this.inputElement_.disabled = !1, this.updateClasses_()
  }, r.prototype.enable = r.prototype.enable, r.prototype.check = function () {
    this.inputElement_.checked = !0, this.updateClasses_()
  }, r.prototype.check = r.prototype.check, r.prototype.uncheck = function () {
    this.inputElement_.checked = !1, this.updateClasses_()
  }, r.prototype.uncheck = r.prototype.uncheck, r.prototype.init = function () {
    if (this.element_) {
      this.inputElement_ = this.element_.querySelector("." + this.CssClasses_.INPUT);
      var e = document.createElement("span");
      e.classList.add(this.CssClasses_.BOX_OUTLINE);
      var t = document.createElement("span");
      t.classList.add(this.CssClasses_.FOCUS_HELPER);
      var s = document.createElement("span");
      if (s.classList.add(this.CssClasses_.TICK_OUTLINE), e.appendChild(s), this.element_.appendChild(t), this.element_.appendChild(e), this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), this.rippleContainerElement_ = document.createElement("span"), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER), this.boundRippleMouseUp = this.onMouseUp_.bind(this), this.rippleContainerElement_.addEventListener("mouseup", this.boundRippleMouseUp);
        var i = document.createElement("span");
        i.classList.add(this.CssClasses_.RIPPLE), this.rippleContainerElement_.appendChild(i), this.element_.appendChild(this.rippleContainerElement_)
      }
      this.boundInputOnChange = this.onChange_.bind(this), this.boundInputOnFocus = this.onFocus_.bind(this), this.boundInputOnBlur = this.onBlur_.bind(this), this.boundElementMouseUp = this.onMouseUp_.bind(this), this.inputElement_.addEventListener("change", this.boundInputOnChange), this.inputElement_.addEventListener("focus", this.boundInputOnFocus), this.inputElement_.addEventListener("blur", this.boundInputOnBlur), this.element_.addEventListener("mouseup", this.boundElementMouseUp), this.updateClasses_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
    }
  }, r.prototype.mdlDowngrade_ = function () {
    this.rippleContainerElement_ && this.rippleContainerElement_.removeEventListener("mouseup", this.boundRippleMouseUp), this.inputElement_.removeEventListener("change", this.boundInputOnChange), this.inputElement_.removeEventListener("focus", this.boundInputOnFocus), this.inputElement_.removeEventListener("blur", this.boundInputOnBlur), this.element_.removeEventListener("mouseup", this.boundElementMouseUp)
  }, r.prototype.mdlDowngrade = r.prototype.mdlDowngrade_, r.prototype.mdlDowngrade = r.prototype.mdlDowngrade, s.register({
    constructor: r,
    classAsString: "MaterialCheckbox",
    cssClass: "mdl-js-checkbox",
    widget: !0
  });
  var d = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialIconToggle = d, d.prototype.Constant_ = {
    TINY_TIMEOUT: .001
  }, d.prototype.CssClasses_ = {
    INPUT: "mdl-icon-toggle__input",
    JS_RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    RIPPLE_CONTAINER: "mdl-icon-toggle__ripple-container",
    RIPPLE_CENTER: "mdl-ripple--center",
    RIPPLE: "mdl-ripple",
    IS_FOCUSED: "is-focused",
    IS_DISABLED: "is-disabled",
    IS_CHECKED: "is-checked"
  }, d.prototype.onChange_ = function (e) {
    this.updateClasses_()
  }, d.prototype.onFocus_ = function (e) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
  }, d.prototype.onBlur_ = function (e) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
  }, d.prototype.onMouseUp_ = function (e) {
    this.blur_()
  }, d.prototype.updateClasses_ = function () {
    this.checkDisabled(), this.checkToggleState()
  }, d.prototype.blur_ = function () {
    window.setTimeout(function () {
      this.inputElement_.blur()
    }.bind(this), this.Constant_.TINY_TIMEOUT)
  }, d.prototype.checkToggleState = function () {
    this.inputElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
  }, d.prototype.checkToggleState = d.prototype.checkToggleState, d.prototype.checkDisabled = function () {
    this.inputElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
  }, d.prototype.checkDisabled = d.prototype.checkDisabled, d.prototype.disable = function () {
    this.inputElement_.disabled = !0, this.updateClasses_()
  }, d.prototype.disable = d.prototype.disable, d.prototype.enable = function () {
    this.inputElement_.disabled = !1, this.updateClasses_()
  }, d.prototype.enable = d.prototype.enable, d.prototype.check = function () {
    this.inputElement_.checked = !0, this.updateClasses_()
  }, d.prototype.check = d.prototype.check, d.prototype.uncheck = function () {
    this.inputElement_.checked = !1, this.updateClasses_()
  }, d.prototype.uncheck = d.prototype.uncheck, d.prototype.init = function () {
    if (this.element_) {
      if (this.inputElement_ = this.element_.querySelector("." + this.CssClasses_.INPUT), this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), this.rippleContainerElement_ = document.createElement("span"), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER), this.boundRippleMouseUp = this.onMouseUp_.bind(this), this.rippleContainerElement_.addEventListener("mouseup", this.boundRippleMouseUp);
        var e = document.createElement("span");
        e.classList.add(this.CssClasses_.RIPPLE), this.rippleContainerElement_.appendChild(e), this.element_.appendChild(this.rippleContainerElement_)
      }
      this.boundInputOnChange = this.onChange_.bind(this), this.boundInputOnFocus = this.onFocus_.bind(this), this.boundInputOnBlur = this.onBlur_.bind(this), this.boundElementOnMouseUp = this.onMouseUp_.bind(this), this.inputElement_.addEventListener("change", this.boundInputOnChange), this.inputElement_.addEventListener("focus", this.boundInputOnFocus), this.inputElement_.addEventListener("blur", this.boundInputOnBlur), this.element_.addEventListener("mouseup", this.boundElementOnMouseUp), this.updateClasses_(), this.element_.classList.add("is-upgraded")
    }
  }, d.prototype.mdlDowngrade_ = function () {
    this.rippleContainerElement_ && this.rippleContainerElement_.removeEventListener("mouseup", this.boundRippleMouseUp), this.inputElement_.removeEventListener("change", this.boundInputOnChange), this.inputElement_.removeEventListener("focus", this.boundInputOnFocus), this.inputElement_.removeEventListener("blur", this.boundInputOnBlur), this.element_.removeEventListener("mouseup", this.boundElementOnMouseUp)
  }, d.prototype.mdlDowngrade = d.prototype.mdlDowngrade_, d.prototype.mdlDowngrade = d.prototype.mdlDowngrade, s.register({
    constructor: d,
    classAsString: "MaterialIconToggle",
    cssClass: "mdl-js-icon-toggle",
    widget: !0
  });
  var _ = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialMenu = _, _.prototype.Constant_ = {
    TRANSITION_DURATION_SECONDS: .3,
    TRANSITION_DURATION_FRACTION: .8,
    CLOSE_TIMEOUT: 150
  }, _.prototype.Keycodes_ = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    UP_ARROW: 38,
    DOWN_ARROW: 40
  }, _.prototype.CssClasses_ = {
    CONTAINER: "mdl-menu__container",
    OUTLINE: "mdl-menu__outline",
    ITEM: "mdl-menu__item",
    ITEM_RIPPLE_CONTAINER: "mdl-menu__item-ripple-container",
    RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    RIPPLE: "mdl-ripple",
    IS_UPGRADED: "is-upgraded",
    IS_VISIBLE: "is-visible",
    IS_ANIMATING: "is-animating",
    BOTTOM_LEFT: "mdl-menu--bottom-left",
    BOTTOM_RIGHT: "mdl-menu--bottom-right",
    TOP_LEFT: "mdl-menu--top-left",
    TOP_RIGHT: "mdl-menu--top-right",
    UNALIGNED: "mdl-menu--unaligned"
  }, _.prototype.init = function () {
    if (this.element_) {
      var e = document.createElement("div");
      e.classList.add(this.CssClasses_.CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_), this.container_ = e;
      var t = document.createElement("div");
      t.classList.add(this.CssClasses_.OUTLINE), this.outline_ = t, e.insertBefore(t, this.element_);
      var s = this.element_.getAttribute("for"),
        i = null;
      s && (i = document.getElementById(s), i && (this.forElement_ = i, i.addEventListener("click", this.handleForClick_.bind(this)), i.addEventListener("keydown", this.handleForKeyboardEvent_.bind(this))));
      var n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM);
      this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this), this.boundItemClick_ = this.handleItemClick_.bind(this);
      for (var a = 0; a < n.length; a++) n[a].addEventListener("click", this.boundItemClick_), n[a].tabIndex = "-1", n[a].addEventListener("keydown", this.boundItemKeydown_);
      if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))
        for (this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), a = 0; a < n.length; a++) {
          var l = n[a],
            o = document.createElement("span");
          o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
          var r = document.createElement("span");
          r.classList.add(this.CssClasses_.RIPPLE), o.appendChild(r), l.appendChild(o), l.classList.add(this.CssClasses_.RIPPLE_EFFECT)
        }
      this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT) && this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT), this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) && this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT), this.element_.classList.contains(this.CssClasses_.TOP_LEFT) && this.outline_.classList.add(this.CssClasses_.TOP_LEFT), this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) && this.outline_.classList.add(this.CssClasses_.TOP_RIGHT), this.element_.classList.contains(this.CssClasses_.UNALIGNED) && this.outline_.classList.add(this.CssClasses_.UNALIGNED), e.classList.add(this.CssClasses_.IS_UPGRADED)
    }
  }, _.prototype.handleForClick_ = function (e) {
    if (this.element_ && this.forElement_) {
      var t = this.forElement_.getBoundingClientRect(),
        s = this.forElement_.parentElement.getBoundingClientRect();
      this.element_.classList.contains(this.CssClasses_.UNALIGNED) || (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) ? (this.container_.style.right = s.right - t.right + "px", this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + "px") : this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ? (this.container_.style.left = this.forElement_.offsetLeft + "px", this.container_.style.bottom = s.bottom - t.top + "px") : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? (this.container_.style.right = s.right - t.right + "px", this.container_.style.bottom = s.bottom - t.top + "px") : (this.container_.style.left = this.forElement_.offsetLeft + "px", this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + "px"))
    }
    this.toggle(e)
  }, _.prototype.handleForKeyboardEvent_ = function (e) {
    if (this.element_ && this.container_ && this.forElement_) {
      var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
      t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) && (e.keyCode === this.Keycodes_.UP_ARROW ? (e.preventDefault(), t[t.length - 1].focus()) : e.keyCode === this.Keycodes_.DOWN_ARROW && (e.preventDefault(), t[0].focus()))
    }
  }, _.prototype.handleItemKeyboardEvent_ = function (e) {
    if (this.element_ && this.container_) {
      var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
      if (t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        var s = Array.prototype.slice.call(t).indexOf(e.target);
        if (e.keyCode === this.Keycodes_.UP_ARROW) e.preventDefault(), s > 0 ? t[s - 1].focus() : t[t.length - 1].focus();
        else if (e.keyCode === this.Keycodes_.DOWN_ARROW) e.preventDefault(), t.length > s + 1 ? t[s + 1].focus() : t[0].focus();
        else if (e.keyCode === this.Keycodes_.SPACE || e.keyCode === this.Keycodes_.ENTER) {
          e.preventDefault();
          var i = new MouseEvent("mousedown");
          e.target.dispatchEvent(i), i = new MouseEvent("mouseup"), e.target.dispatchEvent(i), e.target.click()
        } else e.keyCode === this.Keycodes_.ESCAPE && (e.preventDefault(), this.hide())
      }
    }
  }, _.prototype.handleItemClick_ = function (e) {
    e.target.hasAttribute("disabled") ? e.stopPropagation() : (this.closing_ = !0, window.setTimeout(function (e) {
      this.hide(), this.closing_ = !1
    }.bind(this), this.Constant_.CLOSE_TIMEOUT))
  }, _.prototype.applyClip_ = function (e, t) {
    this.element_.classList.contains(this.CssClasses_.UNALIGNED) ? this.element_.style.clip = "" : this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) ? this.element_.style.clip = "rect(0 " + t + "px 0 " + t + "px)" : this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ? this.element_.style.clip = "rect(" + e + "px 0 " + e + "px 0)" : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? this.element_.style.clip = "rect(" + e + "px " + t + "px " + e + "px " + t + "px)" : this.element_.style.clip = ""
  }, _.prototype.addAnimationEndListener_ = function () {
    var e = function () {
      this.element_.removeEventListener("transitionend", e), this.element_.removeEventListener("webkitTransitionEnd", e), this.element_.classList.remove(this.CssClasses_.IS_ANIMATING)
    }.bind(this);
    this.element_.addEventListener("transitionend", e), this.element_.addEventListener("webkitTransitionEnd", e)
  }, _.prototype.show = function (e) {
    if (this.element_ && this.container_ && this.outline_) {
      var t = this.element_.getBoundingClientRect().height,
        s = this.element_.getBoundingClientRect().width;
      this.container_.style.width = s + "px", this.container_.style.height = t + "px", this.outline_.style.width = s + "px", this.outline_.style.height = t + "px";
      for (var i = this.Constant_.TRANSITION_DURATION_SECONDS * this.Constant_.TRANSITION_DURATION_FRACTION, n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), a = 0; a < n.length; a++) {
        var l = null;
        l = this.element_.classList.contains(this.CssClasses_.TOP_LEFT) || this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? (t - n[a].offsetTop - n[a].offsetHeight) / t * i + "s" : n[a].offsetTop / t * i + "s", n[a].style.transitionDelay = l
      }
      this.applyClip_(t, s), window.requestAnimationFrame(function () {
        this.element_.classList.add(this.CssClasses_.IS_ANIMATING), this.element_.style.clip = "rect(0 " + s + "px " + t + "px 0)", this.container_.classList.add(this.CssClasses_.IS_VISIBLE)
      }.bind(this)), this.addAnimationEndListener_();
      var o = function (t) {
        t === e || this.closing_ || t.target.parentNode === this.element_ || (document.removeEventListener("click", o), this.hide())
      }.bind(this);
      document.addEventListener("click", o)
    }
  }, _.prototype.show = _.prototype.show, _.prototype.hide = function () {
    if (this.element_ && this.container_ && this.outline_) {
      for (var e = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), t = 0; t < e.length; t++) e[t].style.transitionDelay = null;
      var s = this.element_.getBoundingClientRect(),
        i = s.height,
        n = s.width;
      this.element_.classList.add(this.CssClasses_.IS_ANIMATING), this.applyClip_(i, n), this.container_.classList.remove(this.CssClasses_.IS_VISIBLE), this.addAnimationEndListener_()
    }
  }, _.prototype.hide = _.prototype.hide, _.prototype.toggle = function (e) {
    this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) ? this.hide() : this.show(e)
  }, _.prototype.toggle = _.prototype.toggle, _.prototype.mdlDowngrade_ = function () {
    for (var e = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), t = 0; t < e.length; t++) e[t].removeEventListener("click", this.boundItemClick_), e[t].removeEventListener("keydown", this.boundItemKeydown_)
  }, _.prototype.mdlDowngrade = _.prototype.mdlDowngrade_, _.prototype.mdlDowngrade = _.prototype.mdlDowngrade, s.register({
    constructor: _,
    classAsString: "MaterialMenu",
    cssClass: "mdl-js-menu",
    widget: !0
  });
  var h = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialProgress = h, h.prototype.Constant_ = {}, h.prototype.CssClasses_ = {
    INDETERMINATE_CLASS: "mdl-progress__indeterminate"
  }, h.prototype.setProgress = function (e) {
    this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS) || (this.progressbar_.style.width = e + "%")
  }, h.prototype.setProgress = h.prototype.setProgress, h.prototype.setBuffer = function (e) {
    this.bufferbar_.style.width = e + "%", this.auxbar_.style.width = 100 - e + "%"
  }, h.prototype.setBuffer = h.prototype.setBuffer, h.prototype.init = function () {
    if (this.element_) {
      var e = document.createElement("div");
      e.className = "progressbar bar bar1", this.element_.appendChild(e), this.progressbar_ = e, e = document.createElement("div"), e.className = "bufferbar bar bar2", this.element_.appendChild(e), this.bufferbar_ = e, e = document.createElement("div"), e.className = "auxbar bar bar3", this.element_.appendChild(e), this.auxbar_ = e, this.progressbar_.style.width = "0%", this.bufferbar_.style.width = "100%", this.auxbar_.style.width = "0%", this.element_.classList.add("is-upgraded")
    }
  }, h.prototype.mdlDowngrade_ = function () {
    for (; this.element_.firstChild;) this.element_.removeChild(this.element_.firstChild)
  }, h.prototype.mdlDowngrade = h.prototype.mdlDowngrade_, h.prototype.mdlDowngrade = h.prototype.mdlDowngrade, s.register({
    constructor: h,
    classAsString: "MaterialProgress",
    cssClass: "mdl-js-progress",
    widget: !0
  });
  var p = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialRadio = p, p.prototype.Constant_ = {
    TINY_TIMEOUT: .001
  }, p.prototype.CssClasses_ = {
    IS_FOCUSED: "is-focused",
    IS_DISABLED: "is-disabled",
    IS_CHECKED: "is-checked",
    IS_UPGRADED: "is-upgraded",
    JS_RADIO: "mdl-js-radio",
    RADIO_BTN: "mdl-radio__button",
    RADIO_OUTER_CIRCLE: "mdl-radio__outer-circle",
    RADIO_INNER_CIRCLE: "mdl-radio__inner-circle",
    RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    RIPPLE_CONTAINER: "mdl-radio__ripple-container",
    RIPPLE_CENTER: "mdl-ripple--center",
    RIPPLE: "mdl-ripple"
  }, p.prototype.onChange_ = function (e) {
    for (var t = document.getElementsByClassName(this.CssClasses_.JS_RADIO), s = 0; s < t.length; s++) {
      var i = t[s].querySelector("." + this.CssClasses_.RADIO_BTN);
      i.getAttribute("name") === this.btnElement_.getAttribute("name") && t[s].MaterialRadio.updateClasses_()
    }
  }, p.prototype.onFocus_ = function (e) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
  }, p.prototype.onBlur_ = function (e) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
  }, p.prototype.onMouseup_ = function (e) {
    this.blur_()
  }, p.prototype.updateClasses_ = function () {
    this.checkDisabled(), this.checkToggleState()
  }, p.prototype.blur_ = function () {
    window.setTimeout(function () {
      this.btnElement_.blur()
    }.bind(this), this.Constant_.TINY_TIMEOUT)
  }, p.prototype.checkDisabled = function () {
    this.btnElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
  }, p.prototype.checkDisabled = p.prototype.checkDisabled, p.prototype.checkToggleState = function () {
    this.btnElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
  }, p.prototype.checkToggleState = p.prototype.checkToggleState, p.prototype.disable = function () {
    this.btnElement_.disabled = !0, this.updateClasses_()
  }, p.prototype.disable = p.prototype.disable, p.prototype.enable = function () {
    this.btnElement_.disabled = !1, this.updateClasses_()
  }, p.prototype.enable = p.prototype.enable, p.prototype.check = function () {
    this.btnElement_.checked = !0, this.updateClasses_()
  }, p.prototype.check = p.prototype.check, p.prototype.uncheck = function () {
    this.btnElement_.checked = !1, this.updateClasses_()
  }, p.prototype.uncheck = p.prototype.uncheck, p.prototype.init = function () {
    if (this.element_) {
      this.btnElement_ = this.element_.querySelector("." + this.CssClasses_.RADIO_BTN), this.boundChangeHandler_ = this.onChange_.bind(this), this.boundFocusHandler_ = this.onChange_.bind(this), this.boundBlurHandler_ = this.onBlur_.bind(this), this.boundMouseUpHandler_ = this.onMouseup_.bind(this);
      var e = document.createElement("span");
      e.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);
      var t = document.createElement("span");
      t.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE), this.element_.appendChild(e), this.element_.appendChild(t);
      var s;
      if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), s = document.createElement("span"), s.classList.add(this.CssClasses_.RIPPLE_CONTAINER), s.classList.add(this.CssClasses_.RIPPLE_EFFECT), s.classList.add(this.CssClasses_.RIPPLE_CENTER), s.addEventListener("mouseup", this.boundMouseUpHandler_);
        var i = document.createElement("span");
        i.classList.add(this.CssClasses_.RIPPLE), s.appendChild(i), this.element_.appendChild(s)
      }
      this.btnElement_.addEventListener("change", this.boundChangeHandler_), this.btnElement_.addEventListener("focus", this.boundFocusHandler_), this.btnElement_.addEventListener("blur", this.boundBlurHandler_), this.element_.addEventListener("mouseup", this.boundMouseUpHandler_), this.updateClasses_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
    }
  }, p.prototype.mdlDowngrade_ = function () {
    var e = this.element_.querySelector("." + this.CssClasses_.RIPPLE_CONTAINER);
    this.btnElement_.removeEventListener("change", this.boundChangeHandler_), this.btnElement_.removeEventListener("focus", this.boundFocusHandler_), this.btnElement_.removeEventListener("blur", this.boundBlurHandler_), this.element_.removeEventListener("mouseup", this.boundMouseUpHandler_), e && (e.removeEventListener("mouseup", this.boundMouseUpHandler_), this.element_.removeChild(e))
  }, p.prototype.mdlDowngrade = p.prototype.mdlDowngrade_, p.prototype.mdlDowngrade = p.prototype.mdlDowngrade, s.register({
    constructor: p,
    classAsString: "MaterialRadio",
    cssClass: "mdl-js-radio",
    widget: !0
  });
  var c = function (e) {
    this.element_ = e, this.isIE_ = window.navigator.msPointerEnabled, this.init()
  };
  window.MaterialSlider = c, c.prototype.Constant_ = {}, c.prototype.CssClasses_ = {
    IE_CONTAINER: "mdl-slider__ie-container",
    SLIDER_CONTAINER: "mdl-slider__container",
    BACKGROUND_FLEX: "mdl-slider__background-flex",
    BACKGROUND_LOWER: "mdl-slider__background-lower",
    BACKGROUND_UPPER: "mdl-slider__background-upper",
    IS_LOWEST_VALUE: "is-lowest-value",
    IS_UPGRADED: "is-upgraded"
  }, c.prototype.onInput_ = function (e) {
    this.updateValueStyles_()
  }, c.prototype.onChange_ = function (e) {
    this.updateValueStyles_()
  }, c.prototype.onMouseUp_ = function (e) {
    e.target.blur()
  }, c.prototype.onContainerMouseDown_ = function (e) {
    if (e.target === this.element_.parentElement) {
      e.preventDefault();
      var t = new MouseEvent("mousedown", {
        target: e.target,
        buttons: e.buttons,
        clientX: e.clientX,
        clientY: this.element_.getBoundingClientRect().y
      });
      this.element_.dispatchEvent(t)
    }
  }, c.prototype.updateValueStyles_ = function () {
    var e = (this.element_.value - this.element_.min) / (this.element_.max - this.element_.min);
    0 === e ? this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE) : this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE), this.isIE_ || (this.backgroundLower_.style.flex = e, this.backgroundLower_.style.webkitFlex = e, this.backgroundUpper_.style.flex = 1 - e, this.backgroundUpper_.style.webkitFlex = 1 - e)
  }, c.prototype.disable = function () {
    this.element_.disabled = !0
  }, c.prototype.disable = c.prototype.disable, c.prototype.enable = function () {
    this.element_.disabled = !1
  }, c.prototype.enable = c.prototype.enable, c.prototype.change = function (e) {
    "undefined" != typeof e && (this.element_.value = e), this.updateValueStyles_()
  }, c.prototype.change = c.prototype.change, c.prototype.init = function () {
    if (this.element_) {
      if (this.isIE_) {
        var e = document.createElement("div");
        e.classList.add(this.CssClasses_.IE_CONTAINER),
          this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_)
      } else {
        var t = document.createElement("div");
        t.classList.add(this.CssClasses_.SLIDER_CONTAINER), this.element_.parentElement.insertBefore(t, this.element_), this.element_.parentElement.removeChild(this.element_), t.appendChild(this.element_);
        var s = document.createElement("div");
        s.classList.add(this.CssClasses_.BACKGROUND_FLEX), t.appendChild(s), this.backgroundLower_ = document.createElement("div"), this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER), s.appendChild(this.backgroundLower_), this.backgroundUpper_ = document.createElement("div"), this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER), s.appendChild(this.backgroundUpper_)
      }
      this.boundInputHandler = this.onInput_.bind(this), this.boundChangeHandler = this.onChange_.bind(this), this.boundMouseUpHandler = this.onMouseUp_.bind(this), this.boundContainerMouseDownHandler = this.onContainerMouseDown_.bind(this), this.element_.addEventListener("input", this.boundInputHandler), this.element_.addEventListener("change", this.boundChangeHandler), this.element_.addEventListener("mouseup", this.boundMouseUpHandler), this.element_.parentElement.addEventListener("mousedown", this.boundContainerMouseDownHandler), this.updateValueStyles_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
    }
  }, c.prototype.mdlDowngrade_ = function () {
    this.element_.removeEventListener("input", this.boundInputHandler), this.element_.removeEventListener("change", this.boundChangeHandler), this.element_.removeEventListener("mouseup", this.boundMouseUpHandler), this.element_.parentElement.removeEventListener("mousedown", this.boundContainerMouseDownHandler)
  }, c.prototype.mdlDowngrade = c.prototype.mdlDowngrade_, c.prototype.mdlDowngrade = c.prototype.mdlDowngrade, s.register({
    constructor: c,
    classAsString: "MaterialSlider",
    cssClass: "mdl-js-slider",
    widget: !0
  });
  var u = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialSpinner = u, u.prototype.Constant_ = {
    MDL_SPINNER_LAYER_COUNT: 4
  }, u.prototype.CssClasses_ = {
    MDL_SPINNER_LAYER: "mdl-spinner__layer",
    MDL_SPINNER_CIRCLE_CLIPPER: "mdl-spinner__circle-clipper",
    MDL_SPINNER_CIRCLE: "mdl-spinner__circle",
    MDL_SPINNER_GAP_PATCH: "mdl-spinner__gap-patch",
    MDL_SPINNER_LEFT: "mdl-spinner__left",
    MDL_SPINNER_RIGHT: "mdl-spinner__right"
  }, u.prototype.createLayer = function (e) {
    var t = document.createElement("div");
    t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER), t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + "-" + e);
    var s = document.createElement("div");
    s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER), s.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);
    var i = document.createElement("div");
    i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);
    var n = document.createElement("div");
    n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER), n.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);
    for (var a = [s, i, n], l = 0; l < a.length; l++) {
      var o = document.createElement("div");
      o.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE), a[l].appendChild(o)
    }
    t.appendChild(s), t.appendChild(i), t.appendChild(n), this.element_.appendChild(t)
  }, u.prototype.createLayer = u.prototype.createLayer, u.prototype.stop = function () {
    this.element_.classList.remove("is-active")
  }, u.prototype.stop = u.prototype.stop, u.prototype.start = function () {
    this.element_.classList.add("is-active")
  }, u.prototype.start = u.prototype.start, u.prototype.init = function () {
    if (this.element_) {
      for (var e = 1; e <= this.Constant_.MDL_SPINNER_LAYER_COUNT; e++) this.createLayer(e);
      this.element_.classList.add("is-upgraded")
    }
  }, s.register({
    constructor: u,
    classAsString: "MaterialSpinner",
    cssClass: "mdl-js-spinner",
    widget: !0
  });
  var C = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialSwitch = C, C.prototype.Constant_ = {
    TINY_TIMEOUT: .001
  }, C.prototype.CssClasses_ = {
    INPUT: "mdl-switch__input",
    TRACK: "mdl-switch__track",
    THUMB: "mdl-switch__thumb",
    FOCUS_HELPER: "mdl-switch__focus-helper",
    RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    RIPPLE_CONTAINER: "mdl-switch__ripple-container",
    RIPPLE_CENTER: "mdl-ripple--center",
    RIPPLE: "mdl-ripple",
    IS_FOCUSED: "is-focused",
    IS_DISABLED: "is-disabled",
    IS_CHECKED: "is-checked"
  }, C.prototype.onChange_ = function (e) {
    this.updateClasses_()
  }, C.prototype.onFocus_ = function (e) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
  }, C.prototype.onBlur_ = function (e) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
  }, C.prototype.onMouseUp_ = function (e) {
    this.blur_()
  }, C.prototype.updateClasses_ = function () {
    this.checkDisabled(), this.checkToggleState()
  }, C.prototype.blur_ = function () {
    window.setTimeout(function () {
      this.inputElement_.blur()
    }.bind(this), this.Constant_.TINY_TIMEOUT)
  }, C.prototype.checkDisabled = function () {
    this.inputElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
  }, C.prototype.checkDisabled = C.prototype.checkDisabled, C.prototype.checkToggleState = function () {
    this.inputElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
  }, C.prototype.checkToggleState = C.prototype.checkToggleState, C.prototype.disable = function () {
    this.inputElement_.disabled = !0, this.updateClasses_()
  }, C.prototype.disable = C.prototype.disable, C.prototype.enable = function () {
    this.inputElement_.disabled = !1, this.updateClasses_()
  }, C.prototype.enable = C.prototype.enable, C.prototype.on = function () {
    this.inputElement_.checked = !0, this.updateClasses_()
  }, C.prototype.on = C.prototype.on, C.prototype.off = function () {
    this.inputElement_.checked = !1, this.updateClasses_()
  }, C.prototype.off = C.prototype.off, C.prototype.init = function () {
    if (this.element_) {
      this.inputElement_ = this.element_.querySelector("." + this.CssClasses_.INPUT);
      var e = document.createElement("div");
      e.classList.add(this.CssClasses_.TRACK);
      var t = document.createElement("div");
      t.classList.add(this.CssClasses_.THUMB);
      var s = document.createElement("span");
      if (s.classList.add(this.CssClasses_.FOCUS_HELPER), t.appendChild(s), this.element_.appendChild(e), this.element_.appendChild(t), this.boundMouseUpHandler = this.onMouseUp_.bind(this), this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), this.rippleContainerElement_ = document.createElement("span"), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER), this.rippleContainerElement_.addEventListener("mouseup", this.boundMouseUpHandler);
        var i = document.createElement("span");
        i.classList.add(this.CssClasses_.RIPPLE), this.rippleContainerElement_.appendChild(i), this.element_.appendChild(this.rippleContainerElement_)
      }
      this.boundChangeHandler = this.onChange_.bind(this), this.boundFocusHandler = this.onFocus_.bind(this), this.boundBlurHandler = this.onBlur_.bind(this), this.inputElement_.addEventListener("change", this.boundChangeHandler), this.inputElement_.addEventListener("focus", this.boundFocusHandler), this.inputElement_.addEventListener("blur", this.boundBlurHandler), this.element_.addEventListener("mouseup", this.boundMouseUpHandler), this.updateClasses_(), this.element_.classList.add("is-upgraded")
    }
  }, C.prototype.mdlDowngrade_ = function () {
    this.rippleContainerElement_ && this.rippleContainerElement_.removeEventListener("mouseup", this.boundMouseUpHandler), this.inputElement_.removeEventListener("change", this.boundChangeHandler), this.inputElement_.removeEventListener("focus", this.boundFocusHandler), this.inputElement_.removeEventListener("blur", this.boundBlurHandler), this.element_.removeEventListener("mouseup", this.boundMouseUpHandler)
  }, C.prototype.mdlDowngrade = C.prototype.mdlDowngrade_, C.prototype.mdlDowngrade = C.prototype.mdlDowngrade, s.register({
    constructor: C,
    classAsString: "MaterialSwitch",
    cssClass: "mdl-js-switch",
    widget: !0
  });
  var m = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialTabs = m, m.prototype.Constant_ = {}, m.prototype.CssClasses_ = {
    TAB_CLASS: "mdl-tabs__tab",
    PANEL_CLASS: "mdl-tabs__panel",
    ACTIVE_CLASS: "is-active",
    UPGRADED_CLASS: "is-upgraded",
    MDL_JS_RIPPLE_EFFECT: "mdl-js-ripple-effect",
    MDL_RIPPLE_CONTAINER: "mdl-tabs__ripple-container",
    MDL_RIPPLE: "mdl-ripple",
    MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events"
  }, m.prototype.initTabs_ = function () {
    this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT) && this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS), this.tabs_ = this.element_.querySelectorAll("." + this.CssClasses_.TAB_CLASS), this.panels_ = this.element_.querySelectorAll("." + this.CssClasses_.PANEL_CLASS);
    for (var t = 0; t < this.tabs_.length; t++) new e(this.tabs_[t], this);
    this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)
  }, m.prototype.resetTabState_ = function () {
    for (var e = 0; e < this.tabs_.length; e++) this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)
  }, m.prototype.resetPanelState_ = function () {
    for (var e = 0; e < this.panels_.length; e++) this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)
  }, m.prototype.init = function () {
    this.element_ && this.initTabs_()
  }, s.register({
    constructor: m,
    classAsString: "MaterialTabs",
    cssClass: "mdl-js-tabs"
  });
  var E = function (e) {
    this.element_ = e, this.maxRows = this.Constant_.NO_MAX_ROWS, this.init()
  };
  window.MaterialTextfield = E, E.prototype.Constant_ = {
    NO_MAX_ROWS: -1,
    MAX_ROWS_ATTRIBUTE: "maxrows"
  }, E.prototype.CssClasses_ = {
    LABEL: "mdl-textfield__label",
    INPUT: "mdl-textfield__input",
    IS_DIRTY: "is-dirty",
    IS_FOCUSED: "is-focused",
    IS_DISABLED: "is-disabled",
    IS_INVALID: "is-invalid",
    IS_UPGRADED: "is-upgraded"
  }, E.prototype.onKeyDown_ = function (e) {
    var t = e.target.value.split("\n").length;
    13 === e.keyCode && t >= this.maxRows && e.preventDefault()
  }, E.prototype.onFocus_ = function (e) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
  }, E.prototype.onBlur_ = function (e) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
  }, E.prototype.updateClasses_ = function () {
    this.checkDisabled(), this.checkValidity(), this.checkDirty()
  }, E.prototype.checkDisabled = function () {
    this.input_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
  }, E.prototype.checkDisabled = E.prototype.checkDisabled, E.prototype.checkValidity = function () {
    this.input_.validity && (this.input_.validity.valid ? this.element_.classList.remove(this.CssClasses_.IS_INVALID) : this.element_.classList.add(this.CssClasses_.IS_INVALID))
  }, E.prototype.checkValidity = E.prototype.checkValidity, E.prototype.checkDirty = function () {
    this.input_.value && this.input_.value.length > 0 ? this.element_.classList.add(this.CssClasses_.IS_DIRTY) : this.element_.classList.remove(this.CssClasses_.IS_DIRTY)
  }, E.prototype.checkDirty = E.prototype.checkDirty, E.prototype.disable = function () {
    this.input_.disabled = !0, this.updateClasses_()
  }, E.prototype.disable = E.prototype.disable, E.prototype.enable = function () {
    this.input_.disabled = !1, this.updateClasses_()
  }, E.prototype.enable = E.prototype.enable, E.prototype.change = function (e) {
    this.input_.value = e || "", this.updateClasses_()
  }, E.prototype.change = E.prototype.change, E.prototype.init = function () {
    if (this.element_ && (this.label_ = this.element_.querySelector("." + this.CssClasses_.LABEL), this.input_ = this.element_.querySelector("." + this.CssClasses_.INPUT), this.input_)) {
      this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE) && (this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10), isNaN(this.maxRows) && (this.maxRows = this.Constant_.NO_MAX_ROWS)), this.boundUpdateClassesHandler = this.updateClasses_.bind(this), this.boundFocusHandler = this.onFocus_.bind(this), this.boundBlurHandler = this.onBlur_.bind(this), this.input_.addEventListener("input", this.boundUpdateClassesHandler), this.input_.addEventListener("focus", this.boundFocusHandler), this.input_.addEventListener("blur", this.boundBlurHandler), this.maxRows !== this.Constant_.NO_MAX_ROWS && (this.boundKeyDownHandler = this.onKeyDown_.bind(this), this.input_.addEventListener("keydown", this.boundKeyDownHandler));
      var e = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
      this.updateClasses_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED), e && this.element_.classList.add(this.CssClasses_.IS_INVALID)
    }
  }, E.prototype.mdlDowngrade_ = function () {
    this.input_.removeEventListener("input", this.boundUpdateClassesHandler), this.input_.removeEventListener("focus", this.boundFocusHandler), this.input_.removeEventListener("blur", this.boundBlurHandler), this.boundKeyDownHandler && this.input_.removeEventListener("keydown", this.boundKeyDownHandler)
  }, E.prototype.mdlDowngrade = E.prototype.mdlDowngrade_, E.prototype.mdlDowngrade = E.prototype.mdlDowngrade, s.register({
    constructor: E,
    classAsString: "MaterialTextfield",
    cssClass: "mdl-js-textfield",
    widget: !0
  });
  var L = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialTooltip = L, L.prototype.Constant_ = {}, L.prototype.CssClasses_ = {
    IS_ACTIVE: "is-active"
  }, L.prototype.handleMouseEnter_ = function (e) {
    e.stopPropagation();
    var t = e.target.getBoundingClientRect(),
      s = t.left + t.width / 2,
      i = -1 * (this.element_.offsetWidth / 2);
    0 > s + i ? (this.element_.style.left = 0, this.element_.style.marginLeft = 0) : (this.element_.style.left = s + "px", this.element_.style.marginLeft = i + "px"), this.element_.style.top = t.top + t.height + 10 + "px", this.element_.classList.add(this.CssClasses_.IS_ACTIVE), window.addEventListener("scroll", this.boundMouseLeaveHandler, !1), window.addEventListener("touchmove", this.boundMouseLeaveHandler, !1)
  }, L.prototype.handleMouseLeave_ = function (e) {
    e.stopPropagation(), this.element_.classList.remove(this.CssClasses_.IS_ACTIVE), window.removeEventListener("scroll", this.boundMouseLeaveHandler), window.removeEventListener("touchmove", this.boundMouseLeaveHandler, !1)
  }, L.prototype.init = function () {
    if (this.element_) {
      var e = this.element_.getAttribute("for");
      e && (this.forElement_ = document.getElementById(e)), this.forElement_ && (this.forElement_.hasAttribute("tabindex") || this.forElement_.setAttribute("tabindex", "0"), this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this), this.boundMouseLeaveHandler = this.handleMouseLeave_.bind(this), this.forElement_.addEventListener("mouseenter", this.boundMouseEnterHandler, !1), this.forElement_.addEventListener("click", this.boundMouseEnterHandler, !1), this.forElement_.addEventListener("blur", this.boundMouseLeaveHandler), this.forElement_.addEventListener("touchstart", this.boundMouseEnterHandler, !1), this.forElement_.addEventListener("mouseleave", this.boundMouseLeaveHandler))
    }
  }, L.prototype.mdlDowngrade_ = function () {
    this.forElement_ && (this.forElement_.removeEventListener("mouseenter", this.boundMouseEnterHandler, !1), this.forElement_.removeEventListener("click", this.boundMouseEnterHandler, !1), this.forElement_.removeEventListener("touchstart", this.boundMouseEnterHandler, !1), this.forElement_.removeEventListener("mouseleave", this.boundMouseLeaveHandler))
  }, L.prototype.mdlDowngrade = L.prototype.mdlDowngrade_, L.prototype.mdlDowngrade = L.prototype.mdlDowngrade, s.register({
    constructor: L,
    classAsString: "MaterialTooltip",
    cssClass: "mdl-tooltip"
  });
  var I = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialLayout = I, I.prototype.Constant_ = {
    MAX_WIDTH: "(max-width: 1024px)",
    TAB_SCROLL_PIXELS: 100,
    MENU_ICON: "menu",
    CHEVRON_LEFT: "chevron_left",
    CHEVRON_RIGHT: "chevron_right"
  }, I.prototype.Mode_ = {
    STANDARD: 0,
    SEAMED: 1,
    WATERFALL: 2,
    SCROLL: 3
  }, I.prototype.CssClasses_ = {
    CONTAINER: "mdl-layout__container",
    HEADER: "mdl-layout__header",
    DRAWER: "mdl-layout__drawer",
    CONTENT: "mdl-layout__content",
    DRAWER_BTN: "mdl-layout__drawer-button",
    ICON: "material-icons",
    JS_RIPPLE_EFFECT: "mdl-js-ripple-effect",
    RIPPLE_CONTAINER: "mdl-layout__tab-ripple-container",
    RIPPLE: "mdl-ripple",
    RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    HEADER_SEAMED: "mdl-layout__header--seamed",
    HEADER_WATERFALL: "mdl-layout__header--waterfall",
    HEADER_SCROLL: "mdl-layout__header--scroll",
    FIXED_HEADER: "mdl-layout--fixed-header",
    OBFUSCATOR: "mdl-layout__obfuscator",
    TAB_BAR: "mdl-layout__tab-bar",
    TAB_CONTAINER: "mdl-layout__tab-bar-container",
    TAB: "mdl-layout__tab",
    TAB_BAR_BUTTON: "mdl-layout__tab-bar-button",
    TAB_BAR_LEFT_BUTTON: "mdl-layout__tab-bar-left-button",
    TAB_BAR_RIGHT_BUTTON: "mdl-layout__tab-bar-right-button",
    PANEL: "mdl-layout__tab-panel",
    HAS_DRAWER: "has-drawer",
    HAS_TABS: "has-tabs",
    HAS_SCROLLING_HEADER: "has-scrolling-header",
    CASTING_SHADOW: "is-casting-shadow",
    IS_COMPACT: "is-compact",
    IS_SMALL_SCREEN: "is-small-screen",
    IS_DRAWER_OPEN: "is-visible",
    IS_ACTIVE: "is-active",
    IS_UPGRADED: "is-upgraded",
    IS_ANIMATING: "is-animating",
    ON_LARGE_SCREEN: "mdl-layout--large-screen-only",
    ON_SMALL_SCREEN: "mdl-layout--small-screen-only"
  }, I.prototype.contentScrollHandler_ = function () {
    this.header_.classList.contains(this.CssClasses_.IS_ANIMATING) || (this.content_.scrollTop > 0 && !this.header_.classList.contains(this.CssClasses_.IS_COMPACT) ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.header_.classList.add(this.CssClasses_.IS_COMPACT), this.header_.classList.add(this.CssClasses_.IS_ANIMATING)) : this.content_.scrollTop <= 0 && this.header_.classList.contains(this.CssClasses_.IS_COMPACT) && (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.header_.classList.remove(this.CssClasses_.IS_COMPACT), this.header_.classList.add(this.CssClasses_.IS_ANIMATING)))
  }, I.prototype.screenSizeHandler_ = function () {
    this.screenSizeMediaQuery_.matches ? this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN) : (this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN), this.drawer_ && (this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN), this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN)))
  }, I.prototype.drawerToggleHandler_ = function () {
    this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN), this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN)
  }, I.prototype.headerTransitionEndHandler_ = function () {
    this.header_.classList.remove(this.CssClasses_.IS_ANIMATING)
  }, I.prototype.headerClickHandler_ = function () {
    this.header_.classList.contains(this.CssClasses_.IS_COMPACT) && (this.header_.classList.remove(this.CssClasses_.IS_COMPACT), this.header_.classList.add(this.CssClasses_.IS_ANIMATING))
  }, I.prototype.resetTabState_ = function (e) {
    for (var t = 0; t < e.length; t++) e[t].classList.remove(this.CssClasses_.IS_ACTIVE)
  }, I.prototype.resetPanelState_ = function (e) {
    for (var t = 0; t < e.length; t++) e[t].classList.remove(this.CssClasses_.IS_ACTIVE)
  }, I.prototype.init = function () {
    if (this.element_) {
      var e = document.createElement("div");
      e.classList.add(this.CssClasses_.CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_);
      for (var s = this.element_.childNodes, i = s.length, n = 0; i > n; n++) {
        var a = s[n];
        a.classList && a.classList.contains(this.CssClasses_.HEADER) && (this.header_ = a), a.classList && a.classList.contains(this.CssClasses_.DRAWER) && (this.drawer_ = a), a.classList && a.classList.contains(this.CssClasses_.CONTENT) && (this.content_ = a)
      }
      this.header_ && (this.tabBar_ = this.header_.querySelector("." + this.CssClasses_.TAB_BAR));
      var l = this.Mode_.STANDARD;
      if (this.header_ && (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED) ? l = this.Mode_.SEAMED : this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL) ? (l = this.Mode_.WATERFALL, this.header_.addEventListener("transitionend", this.headerTransitionEndHandler_.bind(this)), this.header_.addEventListener("click", this.headerClickHandler_.bind(this))) : this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL) && (l = this.Mode_.SCROLL, e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)), l === this.Mode_.STANDARD ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)) : l === this.Mode_.SEAMED || l === this.Mode_.SCROLL ? (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)) : l === this.Mode_.WATERFALL && (this.content_.addEventListener("scroll", this.contentScrollHandler_.bind(this)), this.contentScrollHandler_())), this.drawer_) {
        var o = this.element_.querySelector("." + this.CssClasses_.DRAWER_BTN);
        if (!o) {
          o = document.createElement("div"), o.classList.add(this.CssClasses_.DRAWER_BTN);
          var r = document.createElement("i");
          r.classList.add(this.CssClasses_.ICON), r.textContent = this.Constant_.MENU_ICON, o.appendChild(r)
        }
        this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN) ? o.classList.add(this.CssClasses_.ON_LARGE_SCREEN) : this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN) && o.classList.add(this.CssClasses_.ON_SMALL_SCREEN), o.addEventListener("click", this.drawerToggleHandler_.bind(this)), this.element_.classList.add(this.CssClasses_.HAS_DRAWER), this.element_.classList.contains(this.CssClasses_.FIXED_HEADER) ? this.header_.insertBefore(o, this.header_.firstChild) : this.element_.insertBefore(o, this.content_);
        var d = document.createElement("div");
        d.classList.add(this.CssClasses_.OBFUSCATOR), this.element_.appendChild(d), d.addEventListener("click", this.drawerToggleHandler_.bind(this)), this.obfuscator_ = d
      }
      if (this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH), this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)), this.screenSizeHandler_(), this.header_ && this.tabBar_) {
        this.element_.classList.add(this.CssClasses_.HAS_TABS);
        var _ = document.createElement("div");
        _.classList.add(this.CssClasses_.TAB_CONTAINER), this.header_.insertBefore(_, this.tabBar_), this.header_.removeChild(this.tabBar_);
        var h = document.createElement("div");
        h.classList.add(this.CssClasses_.TAB_BAR_BUTTON), h.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
        var p = document.createElement("i");
        p.classList.add(this.CssClasses_.ICON), p.textContent = this.Constant_.CHEVRON_LEFT, h.appendChild(p), h.addEventListener("click", function () {
          this.tabBar_.scrollLeft -= this.Constant_.TAB_SCROLL_PIXELS
        }.bind(this));
        var c = document.createElement("div");
        c.classList.add(this.CssClasses_.TAB_BAR_BUTTON), c.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
        var u = document.createElement("i");
        u.classList.add(this.CssClasses_.ICON), u.textContent = this.Constant_.CHEVRON_RIGHT, c.appendChild(u), c.addEventListener("click", function () {
          this.tabBar_.scrollLeft += this.Constant_.TAB_SCROLL_PIXELS
        }.bind(this)), _.appendChild(h), _.appendChild(this.tabBar_), _.appendChild(c);
        var C = function () {
          this.tabBar_.scrollLeft > 0 ? h.classList.add(this.CssClasses_.IS_ACTIVE) : h.classList.remove(this.CssClasses_.IS_ACTIVE), this.tabBar_.scrollLeft < this.tabBar_.scrollWidth - this.tabBar_.offsetWidth ? c.classList.add(this.CssClasses_.IS_ACTIVE) : c.classList.remove(this.CssClasses_.IS_ACTIVE)
        }.bind(this);
        this.tabBar_.addEventListener("scroll", C), C(), this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT) && this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
        for (var m = this.tabBar_.querySelectorAll("." + this.CssClasses_.TAB), E = this.content_.querySelectorAll("." + this.CssClasses_.PANEL), L = 0; L < m.length; L++) new t(m[L], m, E, this)
      }
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
    }
  }, s.register({
    constructor: I,
    classAsString: "MaterialLayout",
    cssClass: "mdl-js-layout"
  });
  var f = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialDataTable = f, f.prototype.Constant_ = {}, f.prototype.CssClasses_ = {
    DATA_TABLE: "mdl-data-table",
    SELECTABLE: "mdl-data-table--selectable",
    SELECT_ELEMENT: "mdl-data-table__select",
    IS_SELECTED: "is-selected",
    IS_UPGRADED: "is-upgraded"
  }, f.prototype.selectRow_ = function (e, t, s) {
    return t ? function () {
      e.checked ? t.classList.add(this.CssClasses_.IS_SELECTED) : t.classList.remove(this.CssClasses_.IS_SELECTED)
    }.bind(this) : s ? function () {
      var t, i;
      if (e.checked)
        for (t = 0; t < s.length; t++) i = s[t].querySelector("td").querySelector(".mdl-checkbox"), i.MaterialCheckbox.check(), s[t].classList.add(this.CssClasses_.IS_SELECTED);
      else
        for (t = 0; t < s.length; t++) i = s[t].querySelector("td").querySelector(".mdl-checkbox"), i.MaterialCheckbox.uncheck(), s[t].classList.remove(this.CssClasses_.IS_SELECTED)
    }.bind(this) : void 0
  }, f.prototype.createCheckbox_ = function (e, t) {
    var i = document.createElement("label"),
      n = ["mdl-checkbox", "mdl-js-checkbox", "mdl-js-ripple-effect", this.CssClasses_.SELECT_ELEMENT];
    i.className = n.join(" ");
    var a = document.createElement("input");
    return a.type = "checkbox", a.classList.add("mdl-checkbox__input"), a.addEventListener("change", this.selectRow_(a, e, t)), i.appendChild(a), s.upgradeElement(i, "MaterialCheckbox"), i
  }, f.prototype.init = function () {
    if (this.element_) {
      var e = this.element_.querySelector("th"),
        t = this.element_.querySelector("tbody").querySelectorAll("tr");
      if (this.element_.classList.contains(this.CssClasses_.SELECTABLE)) {
        var s = document.createElement("th"),
          i = this.createCheckbox_(null, t);
        s.appendChild(i), e.parentElement.insertBefore(s, e);
        for (var n = 0; n < t.length; n++) {
          var a = t[n].querySelector("td");
          if (a) {
            var l = document.createElement("td"),
              o = this.createCheckbox_(t[n]);
            l.appendChild(o), t[n].insertBefore(l, a)
          }
        }
      }
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
    }
  }, s.register({
    constructor: f,
    classAsString: "MaterialDataTable",
    cssClass: "mdl-js-data-table"
  });
  var b = function (e) {
    this.element_ = e, this.init()
  };
  window.MaterialRipple = b, b.prototype.Constant_ = {
    INITIAL_SCALE: "scale(0.0001, 0.0001)",
    INITIAL_SIZE: "1px",
    INITIAL_OPACITY: "0.4",
    FINAL_OPACITY: "0",
    FINAL_SCALE: ""
  }, b.prototype.CssClasses_ = {
    RIPPLE_CENTER: "mdl-ripple--center",
    RIPPLE_EFFECT_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
    RIPPLE: "mdl-ripple",
    IS_ANIMATING: "is-animating",
    IS_VISIBLE: "is-visible"
  }, b.prototype.downHandler_ = function (e) {
    if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
      var t = this.element_.getBoundingClientRect();
      this.boundHeight = t.height, this.boundWidth = t.width, this.rippleSize_ = 2 * Math.sqrt(t.width * t.width + t.height * t.height) + 2, this.rippleElement_.style.width = this.rippleSize_ + "px", this.rippleElement_.style.height = this.rippleSize_ + "px"
    }
    if (this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE), "mousedown" === e.type && this.ignoringMouseDown_) this.ignoringMouseDown_ = !1;
    else {
      "touchstart" === e.type && (this.ignoringMouseDown_ = !0);
      var s = this.getFrameCount();
      if (s > 0) return;
      this.setFrameCount(1);
      var i, n, a = e.currentTarget.getBoundingClientRect();
      if (0 === e.clientX && 0 === e.clientY) i = Math.round(a.width / 2), n = Math.round(a.height / 2);
      else {
        var l = e.clientX ? e.clientX : e.touches[0].clientX,
          o = e.clientY ? e.clientY : e.touches[0].clientY;
        i = Math.round(l - a.left), n = Math.round(o - a.top)
      }
      this.setRippleXY(i, n), this.setRippleStyles(!0), window.requestAnimationFrame(this.animFrameHandler.bind(this))
    }
  }, b.prototype.upHandler_ = function (e) {
    e && 2 !== e.detail && this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE), window.setTimeout(function () {
      this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE)
    }.bind(this), 0)
  }, b.prototype.init = function () {
    if (this.element_) {
      var e = this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);
      this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS) || (this.rippleElement_ = this.element_.querySelector("." + this.CssClasses_.RIPPLE), this.frameCount_ = 0, this.rippleSize_ = 0, this.x_ = 0, this.y_ = 0, this.ignoringMouseDown_ = !1, this.boundDownHandler = this.downHandler_.bind(this), this.element_.addEventListener("mousedown", this.boundDownHandler), this.element_.addEventListener("touchstart", this.boundDownHandler), this.boundUpHandler = this.upHandler_.bind(this), this.element_.addEventListener("mouseup", this.boundUpHandler), this.element_.addEventListener("mouseleave", this.boundUpHandler), this.element_.addEventListener("touchend", this.boundUpHandler), this.element_.addEventListener("blur", this.boundUpHandler), this.getFrameCount = function () {
        return this.frameCount_
      }, this.setFrameCount = function (e) {
        this.frameCount_ = e
      }, this.getRippleElement = function () {
        return this.rippleElement_
      }, this.setRippleXY = function (e, t) {
        this.x_ = e, this.y_ = t
      }, this.setRippleStyles = function (t) {
        if (null !== this.rippleElement_) {
          var s, i, n, a = "translate(" + this.x_ + "px, " + this.y_ + "px)";
          t ? (i = this.Constant_.INITIAL_SCALE, n = this.Constant_.INITIAL_SIZE) : (i = this.Constant_.FINAL_SCALE, n = this.rippleSize_ + "px", e && (a = "translate(" + this.boundWidth / 2 + "px, " + this.boundHeight / 2 + "px)")), s = "translate(-50%, -50%) " + a + i, this.rippleElement_.style.webkitTransform = s, this.rippleElement_.style.msTransform = s, this.rippleElement_.style.transform = s, t ? this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING) : this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING)
        }
      }, this.animFrameHandler = function () {
        this.frameCount_-- > 0 ? window.requestAnimationFrame(this.animFrameHandler.bind(this)) : this.setRippleStyles(!1)
      })
    }
  }, b.prototype.mdlDowngrade_ = function () {
    this.element_.removeEventListener("mousedown", this.boundDownHandler), this.element_.removeEventListener("touchstart", this.boundDownHandler), this.element_.removeEventListener("mouseup", this.boundUpHandler), this.element_.removeEventListener("mouseleave", this.boundUpHandler), this.element_.removeEventListener("touchend", this.boundUpHandler), this.element_.removeEventListener("blur", this.boundUpHandler)
  }, b.prototype.mdlDowngrade = b.prototype.mdlDowngrade_, b.prototype.mdlDowngrade = b.prototype.mdlDowngrade, s.register({
    constructor: b,
    classAsString: "MaterialRipple",
    cssClass: "mdl-js-ripple-effect",
    widget: !1
  })
}();
! function () {
  var COMPILED = !0,
    goog = goog || {};
  goog.global = this, goog.isDef = function (o) {
    return void 0 !== o
  }, goog.exportPath_ = function (o, t, e) {
    o = o.split("."), e = e || goog.global, o[0] in e || !e.execScript || e.execScript("var " + o[0]);
    for (var r; o.length && (r = o.shift());) !o.length && goog.isDef(t) ? e[r] = t : e = e[r] ? e[r] : e[r] = {}
  }, goog.define = function (o, t) {
    var e = t;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, o) ? e = goog.global.CLOSURE_UNCOMPILED_DEFINES[o] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, o) && (e = goog.global.CLOSURE_DEFINES[o])), goog.exportPath_(o, e)
  }, goog.DEBUG = !0, goog.LOCALE = "en", goog.TRUSTED_SITE = !0, goog.STRICT_MODE_COMPATIBLE = !1, goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG, goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1, goog.provide = function (o) {
    if (goog.isInModuleLoader_()) throw Error("goog.provide can not be used within a goog.module.");
    if (!COMPILED && goog.isProvided_(o)) throw Error('Namespace "' + o + '" already declared.');
    goog.constructNamespace_(o)
  }, goog.constructNamespace_ = function (o, t) {
    if (!COMPILED) {
      delete goog.implicitNamespaces_[o];
      for (var e = o;
        (e = e.substring(0, e.lastIndexOf("."))) && !goog.getObjectByName(e);) goog.implicitNamespaces_[e] = !0
    }
    goog.exportPath_(o, t)
  }, goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/, goog.module = function (o) {
    if (!goog.isString(o) || !o || -1 == o.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + o + " has been loaded incorrectly.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    if (goog.moduleLoaderState_.moduleName = o, !COMPILED) {
      if (goog.isProvided_(o)) throw Error('Namespace "' + o + '" already declared.');
      delete goog.implicitNamespaces_[o]
    }
  }, goog.module.get = function (o) {
    return goog.module.getInternal_(o)
  }, goog.module.getInternal_ = function (o) {
    return COMPILED ? void 0 : goog.isProvided_(o) ? o in goog.loadedModules_ ? goog.loadedModules_[o] : goog.getObjectByName(o) : null
  }, goog.moduleLoaderState_ = null, goog.isInModuleLoader_ = function () {
    return null != goog.moduleLoaderState_
  }, goog.module.declareLegacyNamespace = function () {
    if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
  }, goog.setTestOnly = function (o) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw o = o || "", Error("Importing test-only code into non-debug environment" + (o ? ": " + o : "."))
  }, goog.forwardDeclare = function (o) {}, COMPILED || (goog.isProvided_ = function (o) {
    return o in goog.loadedModules_ || !goog.implicitNamespaces_[o] && goog.isDefAndNotNull(goog.getObjectByName(o))
  }, goog.implicitNamespaces_ = {
    "goog.module": !0
  }), goog.getObjectByName = function (o, t) {
    for (var e, r = o.split("."), g = t || goog.global; e = r.shift();) {
      if (!goog.isDefAndNotNull(g[e])) return null;
      g = g[e]
    }
    return g
  }, goog.globalize = function (o, t) {
    var e, r = t || goog.global;
    for (e in o) r[e] = o[e]
  }, goog.addDependency = function (o, t, e, r) {
    if (goog.DEPENDENCIES_ENABLED) {
      var g;
      o = o.replace(/\\/g, "/");
      var n = goog.dependencies_;
      r && "boolean" != typeof r || (r = r ? {
        module: "goog"
      } : {});
      for (var i = 0; g = t[i]; i++) n.nameToPath[g] = o, n.loadFlags[o] = r;
      for (r = 0; t = e[r]; r++) o in n.requires || (n.requires[o] = {}), n.requires[o][t] = !0
    }
  }, goog.ENABLE_DEBUG_LOADER = !0, goog.logToConsole_ = function (o) {
    goog.global.console && goog.global.console.error(o)
  }, goog.require = function (o) {
    if (!COMPILED) {
      if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(o), goog.isProvided_(o)) return goog.isInModuleLoader_() ? goog.module.getInternal_(o) : null;
      if (goog.ENABLE_DEBUG_LOADER) {
        var t = goog.getPathFromDeps_(o);
        if (t) return goog.writeScripts_(t), null
      }
      throw o = "goog.require could not find: " + o, goog.logToConsole_(o), Error(o)
    }
  }, goog.basePath = "", goog.nullFunction = function () {}, goog.abstractMethod = function () {
    throw Error("unimplemented abstract method")
  }, goog.addSingletonGetter = function (o) {
    o.getInstance = function () {
      return o.instance_ ? o.instance_ : (goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = o), o.instance_ = new o)
    }
  }, goog.instantiatedSingletons_ = [], goog.LOAD_MODULE_USING_EVAL = !0, goog.SEAL_MODULE_EXPORTS = goog.DEBUG, goog.loadedModules_ = {}, goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER, goog.TRANSPILE = "detect", goog.TRANSPILER = "transpile.js", goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
    loadFlags: {},
    nameToPath: {},
    requires: {},
    visited: {},
    written: {},
    deferred: {}
  }, goog.inHtmlDocument_ = function () {
    var o = goog.global.document;
    return null != o && "write" in o
  }, goog.findBasePath_ = function () {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH;
    else if (goog.inHtmlDocument_())
      for (var o = goog.global.document.getElementsByTagName("SCRIPT"), t = o.length - 1; t >= 0; --t) {
        var e = o[t].src,
          r = e.lastIndexOf("?"),
          r = -1 == r ? e.length : r;
        if ("base.js" == e.substr(r - 7, 7)) {
          goog.basePath = e.substr(0, r - 7);
          break
        }
      }
  }, goog.importScript_ = function (o, t) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(o, t) && (goog.dependencies_.written[o] = !0)
  }, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importProcessedScript_ = function (o, t, e) {
    goog.importScript_("", 'goog.retrieveAndExec_("' + o + '", ' + t + ", " + e + ");")
  }, goog.queuedModules_ = [], goog.wrapModule_ = function (o, t) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(t + "\n//# sourceURL=" + o + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + t + "\n;return exports});\n//# sourceURL=" + o + "\n"
  }, goog.loadQueuedModules_ = function () {
    var o = goog.queuedModules_.length;
    if (o > 0) {
      var t = goog.queuedModules_;
      goog.queuedModules_ = [];
      for (var e = 0; o > e; e++) goog.maybeProcessDeferredPath_(t[e])
    }
  }, goog.maybeProcessDeferredDep_ = function (o) {
    goog.isDeferredModule_(o) && goog.allDepsAreAvailable_(o) && (o = goog.getPathFromDeps_(o), goog.maybeProcessDeferredPath_(goog.basePath + o))
  }, goog.isDeferredModule_ = function (o) {
    var t = (o = goog.getPathFromDeps_(o)) && goog.dependencies_.loadFlags[o] || {};
    return o && ("goog" == t.module || goog.needsTranspile_(t.lang)) ? goog.basePath + o in goog.dependencies_.deferred : !1
  }, goog.allDepsAreAvailable_ = function (o) {
    if ((o = goog.getPathFromDeps_(o)) && o in goog.dependencies_.requires)
      for (var t in goog.dependencies_.requires[o])
        if (!goog.isProvided_(t) && !goog.isDeferredModule_(t)) return !1;
    return !0
  }, goog.maybeProcessDeferredPath_ = function (o) {
    if (o in goog.dependencies_.deferred) {
      var t = goog.dependencies_.deferred[o];
      delete goog.dependencies_.deferred[o], goog.globalEval(t)
    }
  }, goog.loadModuleFromUrl = function (o) {
    goog.retrieveAndExec_(o, !0, !1)
  }, goog.loadModule = function (o) {
    var t = goog.moduleLoaderState_;
    try {
      goog.moduleLoaderState_ = {
        moduleName: void 0,
        declareLegacyNamespace: !1
      };
      var e;
      if (goog.isFunction(o)) e = o.call(goog.global, {});
      else {
        if (!goog.isString(o)) throw Error("Invalid module definition");
        e = goog.loadModuleFromSource_.call(goog.global, o)
      }
      var r = goog.moduleLoaderState_.moduleName;
      if (!goog.isString(r) || !r) throw Error('Invalid module name "' + r + '"');
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(r, e) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(e), goog.loadedModules_[r] = e
    } finally {
      goog.moduleLoaderState_ = t
    }
  }, goog.loadModuleFromSource_ = function (a) {
    return eval(a), {}
  }, goog.writeScriptSrcNode_ = function (o) {
    goog.global.document.write('<script type="text/javascript" src="' + o + '"></script>')
  }, goog.appendScriptSrcNode_ = function (o) {
    var t = goog.global.document,
      e = t.createElement("script");
    e.type = "text/javascript", e.src = o, e.defer = !1, e.async = !1, t.head.appendChild(e)
  }, goog.writeScriptTag_ = function (o, t) {
    if (goog.inHtmlDocument_()) {
      var e = goog.global.document;
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == e.readyState) {
        if (/\bdeps.js$/.test(o)) return !1;
        throw Error('Cannot write "' + o + '" after document load')
      }
      if (void 0 === t)
        if (goog.IS_OLD_IE_) {
          var r = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
          e.write('<script type="text/javascript" src="' + o + '"' + r + "></script>")
        } else goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(o) : goog.writeScriptSrcNode_(o);
      else e.write('<script type="text/javascript">' + t + "</script>");
      return !0
    }
    return !1
  }, goog.needsTranspile_ = function (a) {
    if ("always" == goog.TRANSPILE) return !0;
    if ("never" == goog.TRANSPILE) return !1;
    if (!goog.transpiledLanguages_) {
      goog.transpiledLanguages_ = {
        es5: !0,
        es6: !0,
        "es6-impl": !0
      };
      try {
        goog.transpiledLanguages_.es5 = eval("[1,].length!=1"), eval('(()=>{"use strict";let a={};const X=class{constructor(){}x(z){return new Map([...arguments]).get(z[0])==3}};return new X().x([a,3])})()') && (goog.transpiledLanguages_["es6-impl"] = !1), eval('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()') && (goog.transpiledLanguages_.es6 = !1)
      } catch (b) {}
    }
    return !!goog.transpiledLanguages_[a]
  }, goog.transpiledLanguages_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function (o, t) {
    return "complete" == o.readyState && goog.lastNonModuleScriptIndex_ == t && goog.loadQueuedModules_(), !0
  }, goog.writeScripts_ = function (o) {
    function t(o) {
      if (!(o in g.written || o in g.visited)) {
        if (g.visited[o] = !0, o in g.requires)
          for (var n in g.requires[o])
            if (!goog.isProvided_(n)) {
              if (!(n in g.nameToPath)) throw Error("Undefined nameToPath for " + n);
              t(g.nameToPath[n])
            }
        o in r || (r[o] = !0, e.push(o))
      }
    }
    var e = [],
      r = {},
      g = goog.dependencies_;
    for (t(o), o = 0; o < e.length; o++) {
      var n = e[o];
      goog.dependencies_.written[n] = !0
    }
    var i = goog.moduleLoaderState_;
    for (goog.moduleLoaderState_ = null, o = 0; o < e.length; o++) {
      if (!(n = e[o])) throw goog.moduleLoaderState_ = i, Error("Undefined script input");
      var s = g.loadFlags[n] || {},
        a = goog.needsTranspile_(s.lang);
      "goog" == s.module || a ? goog.importProcessedScript_(goog.basePath + n, "goog" == s.module, a) : goog.importScript_(goog.basePath + n)
    }
    goog.moduleLoaderState_ = i
  }, goog.getPathFromDeps_ = function (o) {
    return o in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[o] : null
  }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")), goog.normalizePath_ = function (o) {
    o = o.split("/");
    for (var t = 0; t < o.length;) "." == o[t] ? o.splice(t, 1) : t && ".." == o[t] && o[t - 1] && ".." != o[t - 1] ? o.splice(--t, 2) : t++;
    return o.join("/")
  }, goog.loadFileSync_ = function (o) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(o);
    try {
      var t = new goog.global.XMLHttpRequest;
      return t.open("get", o, !1), t.send(), 0 == t.status || 200 == t.status ? t.responseText : null
    } catch (e) {
      return null
    }
  }, goog.retrieveAndExec_ = function (o, t, e) {
    if (!COMPILED) {
      var r = o;
      o = goog.normalizePath_(o);
      var g = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
        n = goog.loadFileSync_(o);
      if (null == n) throw Error('Load of "' + o + '" failed');
      e && (n = goog.transpile_.call(goog.global, n, o)), n = t ? goog.wrapModule_(o, n) : n + ("\n//# sourceURL=" + o), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[r] = n, goog.queuedModules_.push(r)) : g(o, n)
    }
  }, goog.transpile_ = function (a, b) {
    var c = goog.global.$jscomp;
    c || (goog.global.$jscomp = c = {});
    var d = c.transpile;
    if (!d) {
      var e = goog.basePath + goog.TRANSPILER,
        f = goog.loadFileSync_(e);
      f && (eval(f + "\n//# sourceURL=" + e), c = goog.global.$jscomp, d = c.transpile)
    }
    return d || (d = c.transpile = function (o, t) {
      return goog.logToConsole_(t + " requires transpilation but no transpiler was found."), o
    }), d(a, b)
  }, goog.typeOf = function (o) {
    var t = typeof o;
    if ("object" == t) {
      if (!o) return "null";
      if (o instanceof Array) return "array";
      if (o instanceof Object) return t;
      var e = Object.prototype.toString.call(o);
      if ("[object Window]" == e) return "object";
      if ("[object Array]" == e || "number" == typeof o.length && "undefined" != typeof o.splice && "undefined" != typeof o.propertyIsEnumerable && !o.propertyIsEnumerable("splice")) return "array";
      if ("[object Function]" == e || "undefined" != typeof o.call && "undefined" != typeof o.propertyIsEnumerable && !o.propertyIsEnumerable("call")) return "function"
    } else if ("function" == t && "undefined" == typeof o.call) return "object";
    return t
  }, goog.isNull = function (o) {
    return null === o
  }, goog.isDefAndNotNull = function (o) {
    return null != o
  }, goog.isArray = function (o) {
    return "array" == goog.typeOf(o)
  }, goog.isArrayLike = function (o) {
    var t = goog.typeOf(o);
    return "array" == t || "object" == t && "number" == typeof o.length
  }, goog.isDateLike = function (o) {
    return goog.isObject(o) && "function" == typeof o.getFullYear
  }, goog.isString = function (o) {
    return "string" == typeof o
  }, goog.isBoolean = function (o) {
    return "boolean" == typeof o
  }, goog.isNumber = function (o) {
    return "number" == typeof o
  }, goog.isFunction = function (o) {
    return "function" == goog.typeOf(o)
  }, goog.isObject = function (o) {
    var t = typeof o;
    return "object" == t && null != o || "function" == t
  }, goog.getUid = function (o) {
    return o[goog.UID_PROPERTY_] || (o[goog.UID_PROPERTY_] = ++goog.uidCounter_)
  }, goog.hasUid = function (o) {
    return !!o[goog.UID_PROPERTY_]
  }, goog.removeUid = function (o) {
    null !== o && "removeAttribute" in o && o.removeAttribute(goog.UID_PROPERTY_);
    try {
      delete o[goog.UID_PROPERTY_]
    } catch (t) {}
  }, goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0), goog.uidCounter_ = 0, goog.getHashCode = goog.getUid, goog.removeHashCode = goog.removeUid, goog.cloneObject = function (o) {
    var t = goog.typeOf(o);
    if ("object" == t || "array" == t) {
      if (o.clone) return o.clone();
      var e, t = "array" == t ? [] : {};
      for (e in o) t[e] = goog.cloneObject(o[e]);
      return t
    }
    return o
  }, goog.bindNative_ = function (o, t, e) {
    return o.call.apply(o.bind, arguments)
  }, goog.bindJs_ = function (o, t, e) {
    if (!o) throw Error();
    if (2 < arguments.length) {
      var r = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        return Array.prototype.unshift.apply(e, r), o.apply(t, e)
      }
    }
    return function () {
      return o.apply(t, arguments)
    }
  }, goog.bind = function (o, t, e) {
    return Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_, goog.bind.apply(null, arguments)
  }, goog.partial = function (o, t) {
    var e = Array.prototype.slice.call(arguments, 1);
    return function () {
      var t = e.slice();
      return t.push.apply(t, arguments), o.apply(this, t)
    }
  }, goog.mixin = function (o, t) {
    for (var e in t) o[e] = t[e]
  }, goog.now = goog.TRUSTED_SITE && Date.now || function () {
    return +new Date
  }, goog.globalEval = function (o) {
    if (goog.global.execScript) goog.global.execScript(o, "JavaScript");
    else {
      if (!goog.global.eval) throw Error("goog.globalEval not available");
      if (null == goog.evalWorksForGlobals_)
        if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_
          } catch (t) {}
          goog.evalWorksForGlobals_ = !0
        } else goog.evalWorksForGlobals_ = !1;
      if (goog.evalWorksForGlobals_) goog.global.eval(o);
      else {
        var e = goog.global.document,
          r = e.createElement("SCRIPT");
        r.type = "text/javascript", r.defer = !1, r.appendChild(e.createTextNode(o)), e.body.appendChild(r), e.body.removeChild(r)
      }
    }
  }, goog.evalWorksForGlobals_ = null, goog.getCssName = function (o, t) {
    var e = function (o) {
        return goog.cssNameMapping_[o] || o
      },
      r = function (o) {
        o = o.split("-");
        for (var t = [], r = 0; r < o.length; r++) t.push(e(o[r]));
        return t.join("-")
      },
      r = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? e : r : function (o) {
        return o
      };
    return t ? o + "-" + r(t) : r(o)
  }, goog.setCssNameMapping = function (o, t) {
    goog.cssNameMapping_ = o, goog.cssNameMappingStyle_ = t
  }, !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING), goog.getMsg = function (o, t) {
    return t && (o = o.replace(/\{\$([^}]+)}/g, function (o, e) {
      return null != t && e in t ? t[e] : o
    })), o
  }, goog.getMsgWithFallback = function (o, t) {
    return o
  }, goog.exportSymbol = function (o, t, e) {
    goog.exportPath_(o, t, e)
  }, goog.exportProperty = function (o, t, e) {
    o[t] = e
  }, goog.inherits = function (o, t) {
    function e() {}
    e.prototype = t.prototype, o.superClass_ = t.prototype, o.prototype = new e, o.prototype.constructor = o, o.base = function (o, e, r) {
      for (var g = Array(arguments.length - 2), n = 2; n < arguments.length; n++) g[n - 2] = arguments[n];
      return t.prototype[e].apply(o, g)
    }
  }, goog.base = function (o, t, e) {
    var r = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !r) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (r.superClass_) {
      for (var g = Array(arguments.length - 1), n = 1; n < arguments.length; n++) g[n - 1] = arguments[n];
      return r.superClass_.constructor.apply(o, g)
    }
    for (g = Array(arguments.length - 2), n = 2; n < arguments.length; n++) g[n - 2] = arguments[n];
    for (var n = !1, i = o.constructor; i; i = i.superClass_ && i.superClass_.constructor)
      if (i.prototype[t] === r) n = !0;
      else if (n) return i.prototype[t].apply(o, g);
    if (o[t] === r) return o.constructor.prototype[t].apply(o, g);
    throw Error("goog.base called from a method of one name to a method of a different name")
  }, goog.scope = function (o) {
    if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a goog.module.");
    o.call(goog.global)
  }, COMPILED || (goog.global.COMPILED = COMPILED), goog.defineClass = function (o, t) {
    var e = t.constructor,
      r = t.statics;
    return e && e != Object.prototype.constructor || (e = function () {
      throw Error("cannot instantiate an interface (no constructor defined).")
    }), e = goog.defineClass.createSealingConstructor_(e, o), o && goog.inherits(e, o), delete t.constructor, delete t.statics, goog.defineClass.applyProperties_(e.prototype, t), null != r && (r instanceof Function ? r(e) : goog.defineClass.applyProperties_(e, r)), e
  }, goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG, goog.defineClass.createSealingConstructor_ = function (o, t) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) return o;
    var e = !goog.defineClass.isUnsealable_(t),
      r = function () {
        var t = o.apply(this, arguments) || this;
        return t[goog.UID_PROPERTY_] = t[goog.UID_PROPERTY_], this.constructor === r && e && Object.seal instanceof Function && Object.seal(t), t
      };
    return r
  }, goog.defineClass.isUnsealable_ = function (o) {
    return o && o.prototype && o.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
  }, goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), goog.defineClass.applyProperties_ = function (o, t) {
    for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (o[e] = t[e]);
    for (var r = 0; r < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; r++) e = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[r], Object.prototype.hasOwnProperty.call(t, e) && (o[e] = t[e])
  }, goog.tagUnsealableClass = function (o) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (o.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
  }, goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable", goog.object = {}, goog.object.is = function (o, t) {
    return o === t ? 0 !== o || 1 / o === 1 / t : o !== o && t !== t
  }, goog.object.forEach = function (o, t, e) {
    for (var r in o) t.call(e, o[r], r, o)
  }, goog.object.filter = function (o, t, e) {
    var r, g = {};
    for (r in o) t.call(e, o[r], r, o) && (g[r] = o[r]);
    return g
  }, goog.object.map = function (o, t, e) {
    var r, g = {};
    for (r in o) g[r] = t.call(e, o[r], r, o);
    return g
  }, goog.object.some = function (o, t, e) {
    for (var r in o)
      if (t.call(e, o[r], r, o)) return !0;
    return !1
  }, goog.object.every = function (o, t, e) {
    for (var r in o)
      if (!t.call(e, o[r], r, o)) return !1;
    return !0
  }, goog.object.getCount = function (o) {
    var t, e = 0;
    for (t in o) e++;
    return e
  }, goog.object.getAnyKey = function (o) {
    for (var t in o) return t
  }, goog.object.getAnyValue = function (o) {
    for (var t in o) return o[t]
  }, goog.object.contains = function (o, t) {
    return goog.object.containsValue(o, t)
  }, goog.object.getValues = function (o) {
    var t, e = [],
      r = 0;
    for (t in o) e[r++] = o[t];
    return e
  }, goog.object.getKeys = function (o) {
    var t, e = [],
      r = 0;
    for (t in o) e[r++] = t;
    return e
  }, goog.object.getValueByKeys = function (o, t) {
    for (var e = goog.isArrayLike(t), r = e ? t : arguments, e = e ? 0 : 1; e < r.length && (o = o[r[e]], goog.isDef(o)); e++);
    return o
  }, goog.object.containsKey = function (o, t) {
    return null !== o && t in o
  }, goog.object.containsValue = function (o, t) {
    for (var e in o)
      if (o[e] == t) return !0;
    return !1
  }, goog.object.findKey = function (o, t, e) {
    for (var r in o)
      if (t.call(e, o[r], r, o)) return r
  }, goog.object.findValue = function (o, t, e) {
    return (t = goog.object.findKey(o, t, e)) && o[t]
  }, goog.object.isEmpty = function (o) {
    for (var t in o) return !1;
    return !0
  }, goog.object.clear = function (o) {
    for (var t in o) delete o[t]
  }, goog.object.remove = function (o, t) {
    var e;
    return (e = t in o) && delete o[t], e
  }, goog.object.add = function (o, t, e) {
    if (null !== o && t in o) throw Error('The object already contains the key "' + t + '"');
    goog.object.set(o, t, e)
  }, goog.object.get = function (o, t, e) {
    return null !== o && t in o ? o[t] : e
  }, goog.object.set = function (o, t, e) {
    o[t] = e
  }, goog.object.setIfUndefined = function (o, t, e) {
    return t in o ? o[t] : o[t] = e
  }, goog.object.setWithReturnValueIfNotSet = function (o, t, e) {
    return t in o ? o[t] : (e = e(), o[t] = e)
  }, goog.object.equals = function (o, t) {
    for (var e in o)
      if (!(e in t) || o[e] !== t[e]) return !1;
    for (e in t)
      if (!(e in o)) return !1;
    return !0
  }, goog.object.clone = function (o) {
    var t, e = {};
    for (t in o) e[t] = o[t];
    return e
  }, goog.object.unsafeClone = function (o) {
    var t = goog.typeOf(o);
    if ("object" == t || "array" == t) {
      if (goog.isFunction(o.clone)) return o.clone();
      var e, t = "array" == t ? [] : {};
      for (e in o) t[e] = goog.object.unsafeClone(o[e]);
      return t
    }
    return o
  }, goog.object.transpose = function (o) {
    var t, e = {};
    for (t in o) e[o[t]] = t;
    return e
  }, goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), goog.object.extend = function (o, t) {
    for (var e, r, g = 1; g < arguments.length; g++) {
      r = arguments[g];
      for (e in r) o[e] = r[e];
      for (var n = 0; n < goog.object.PROTOTYPE_FIELDS_.length; n++) e = goog.object.PROTOTYPE_FIELDS_[n], Object.prototype.hasOwnProperty.call(r, e) && (o[e] = r[e])
    }
  }, goog.object.create = function (o) {
    var t = arguments.length;
    if (1 == t && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (t % 2) throw Error("Uneven number of arguments");
    for (var e = {}, r = 0; t > r; r += 2) e[arguments[r]] = arguments[r + 1];
    return e
  }, goog.object.createSet = function (o) {
    var t = arguments.length;
    if (1 == t && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var e = {}, r = 0; t > r; r++) e[arguments[r]] = !0;
    return e
  }, goog.object.createImmutableView = function (o) {
    var t = o;
    return Object.isFrozen && !Object.isFrozen(o) && (t = Object.create(o), Object.freeze(t)), t
  }, goog.object.isImmutableView = function (o) {
    return !!Object.isFrozen && Object.isFrozen(o)
  }, goog.math = {}, goog.math.Size = function (o, t) {
    this.width = o, this.height = t
  }, goog.math.Size.equals = function (o, t) {
    return o == t ? !0 : o && t ? o.width == t.width && o.height == t.height : !1
  }, goog.math.Size.prototype.clone = function () {
    return new goog.math.Size(this.width, this.height)
  }, goog.DEBUG && (goog.math.Size.prototype.toString = function () {
    return "(" + this.width + " x " + this.height + ")"
  }), goog.math.Size.prototype.getLongest = function () {
    return Math.max(this.width, this.height)
  }, goog.math.Size.prototype.getShortest = function () {
    return Math.min(this.width, this.height)
  }, goog.math.Size.prototype.area = function () {
    return this.width * this.height
  }, goog.math.Size.prototype.perimeter = function () {
    return 2 * (this.width + this.height)
  }, goog.math.Size.prototype.aspectRatio = function () {
    return this.width / this.height
  }, goog.math.Size.prototype.isEmpty = function () {
    return !this.area()
  }, goog.math.Size.prototype.ceil = function () {
    return this.width = Math.ceil(this.width), this.height = Math.ceil(this.height), this
  }, goog.math.Size.prototype.fitsInside = function (o) {
    return this.width <= o.width && this.height <= o.height
  }, goog.math.Size.prototype.floor = function () {
    return this.width = Math.floor(this.width), this.height = Math.floor(this.height), this
  }, goog.math.Size.prototype.round = function () {
    return this.width = Math.round(this.width), this.height = Math.round(this.height), this
  }, goog.math.Size.prototype.scale = function (o, t) {
    var e = goog.isNumber(t) ? t : o;
    return this.width *= o, this.height *= e, this
  }, goog.math.Size.prototype.scaleToCover = function (o) {
    return o = this.aspectRatio() <= o.aspectRatio() ? o.width / this.width : o.height / this.height, this.scale(o)
  }, goog.math.Size.prototype.scaleToFit = function (o) {
    return o = this.aspectRatio() > o.aspectRatio() ? o.width / this.width : o.height / this.height, this.scale(o)
  }, goog.string = {}, goog.string.DETECT_DOUBLE_ESCAPING = !1, goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1, goog.string.Unicode = {
    NBSP: " "
  }, goog.string.startsWith = function (o, t) {
    return 0 == o.lastIndexOf(t, 0)
  }, goog.string.endsWith = function (o, t) {
    var e = o.length - t.length;
    return e >= 0 && o.indexOf(t, e) == e
  }, goog.string.caseInsensitiveStartsWith = function (o, t) {
    return 0 == goog.string.caseInsensitiveCompare(t, o.substr(0, t.length))
  }, goog.string.caseInsensitiveEndsWith = function (o, t) {
    return 0 == goog.string.caseInsensitiveCompare(t, o.substr(o.length - t.length, t.length))
  }, goog.string.caseInsensitiveEquals = function (o, t) {
    return o.toLowerCase() == t.toLowerCase()
  }, goog.string.subs = function (o, t) {
    for (var e = o.split("%s"), r = "", g = Array.prototype.slice.call(arguments, 1); g.length && 1 < e.length;) r += e.shift() + g.shift();
    return r + e.join("%s")
  }, goog.string.collapseWhitespace = function (o) {
    return o.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
  }, goog.string.isEmptyOrWhitespace = function (o) {
    return /^[\s\xa0]*$/.test(o)
  }, goog.string.isEmptyString = function (o) {
    return 0 == o.length
  }, goog.string.isEmpty = goog.string.isEmptyOrWhitespace, goog.string.isEmptyOrWhitespaceSafe = function (o) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(o))
  }, goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe, goog.string.isBreakingWhitespace = function (o) {
    return !/[^\t\n\r ]/.test(o)
  }, goog.string.isAlpha = function (o) {
    return !/[^a-zA-Z]/.test(o)
  }, goog.string.isNumeric = function (o) {
    return !/[^0-9]/.test(o)
  }, goog.string.isAlphaNumeric = function (o) {
    return !/[^a-zA-Z0-9]/.test(o)
  }, goog.string.isSpace = function (o) {
    return " " == o
  }, goog.string.isUnicodeChar = function (o) {
    return 1 == o.length && o >= " " && "~" >= o || o >= "" && "�" >= o
  }, goog.string.stripNewlines = function (o) {
    return o.replace(/(\r\n|\r|\n)+/g, " ")
  }, goog.string.canonicalizeNewlines = function (o) {
    return o.replace(/(\r\n|\r|\n)/g, "\n")
  }, goog.string.normalizeWhitespace = function (o) {
    return o.replace(/\xa0|\s/g, " ")
  }, goog.string.normalizeSpaces = function (o) {
    return o.replace(/\xa0|[ \t]+/g, " ")
  }, goog.string.collapseBreakingSpaces = function (o) {
    return o.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
  }, goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function (o) {
    return o.trim()
  } : function (o) {
    return o.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
  }, goog.string.trimLeft = function (o) {
    return o.replace(/^[\s\xa0]+/, "")
  }, goog.string.trimRight = function (o) {
    return o.replace(/[\s\xa0]+$/, "")
  }, goog.string.caseInsensitiveCompare = function (o, t) {
    var e = String(o).toLowerCase(),
      r = String(t).toLowerCase();
    return r > e ? -1 : e == r ? 0 : 1
  }, goog.string.numberAwareCompare_ = function (o, t, e) {
    if (o == t) return 0;
    if (!o) return -1;
    if (!t) return 1;
    for (var r = o.toLowerCase().match(e), g = t.toLowerCase().match(e), n = Math.min(r.length, g.length), i = 0; n > i; i++) {
      e = r[i];
      var s = g[i];
      if (e != s) return o = parseInt(e, 10), !isNaN(o) && (t = parseInt(s, 10), !isNaN(t) && o - t) ? o - t : s > e ? -1 : 1
    }
    return r.length != g.length ? r.length - g.length : t > o ? -1 : 1
  }, goog.string.intAwareCompare = function (o, t) {
    return goog.string.numberAwareCompare_(o, t, /\d+|\D+/g)
  }, goog.string.floatAwareCompare = function (o, t) {
    return goog.string.numberAwareCompare_(o, t, /\d+|\.\d+|\D+/g)
  }, goog.string.numerateCompare = goog.string.floatAwareCompare, goog.string.urlEncode = function (o) {
    return encodeURIComponent(String(o))
  }, goog.string.urlDecode = function (o) {
    return decodeURIComponent(o.replace(/\+/g, " "))
  }, goog.string.newLineToBr = function (o, t) {
    return o.replace(/(\r\n|\r|\n)/g, t ? "<br />" : "<br>")
  }, goog.string.htmlEscape = function (o, t) {
    if (t) o = o.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (o = o.replace(goog.string.E_RE_, "&#101;"));
    else {
      if (!goog.string.ALL_RE_.test(o)) return o; - 1 != o.indexOf("&") && (o = o.replace(goog.string.AMP_RE_, "&amp;")), -1 != o.indexOf("<") && (o = o.replace(goog.string.LT_RE_, "&lt;")), -1 != o.indexOf(">") && (o = o.replace(goog.string.GT_RE_, "&gt;")), -1 != o.indexOf('"') && (o = o.replace(goog.string.QUOT_RE_, "&quot;")), -1 != o.indexOf("'") && (o = o.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")), -1 != o.indexOf("\x00") && (o = o.replace(goog.string.NULL_RE_, "&#0;")), goog.string.DETECT_DOUBLE_ESCAPING && -1 != o.indexOf("e") && (o = o.replace(goog.string.E_RE_, "&#101;"))
    }
    return o
  }, goog.string.AMP_RE_ = /&/g, goog.string.LT_RE_ = /</g, goog.string.GT_RE_ = />/g, goog.string.QUOT_RE_ = /"/g, goog.string.SINGLE_QUOTE_RE_ = /'/g, goog.string.NULL_RE_ = /\x00/g, goog.string.E_RE_ = /e/g, goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/, goog.string.unescapeEntities = function (o) {
    return goog.string.contains(o, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(o) : goog.string.unescapePureXmlEntities_(o) : o
  }, goog.string.unescapeEntitiesWithDocument = function (o, t) {
    return goog.string.contains(o, "&") ? goog.string.unescapeEntitiesUsingDom_(o, t) : o
  }, goog.string.unescapeEntitiesUsingDom_ = function (o, t) {
    var e, r = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"'
    };
    return e = t ? t.createElement("div") : goog.global.document.createElement("div"), o.replace(goog.string.HTML_ENTITY_PATTERN_, function (o, t) {
      var g = r[o];
      if (g) return g;
      if ("#" == t.charAt(0)) {
        var n = Number("0" + t.substr(1));
        isNaN(n) || (g = String.fromCharCode(n))
      }
      return g || (e.innerHTML = o + " ", g = e.firstChild.nodeValue.slice(0, -1)), r[o] = g
    })
  }, goog.string.unescapePureXmlEntities_ = function (o) {
    return o.replace(/&([^;]+);/g, function (o, t) {
      switch (t) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if ("#" == t.charAt(0)) {
          var e = Number("0" + t.substr(1));
          if (!isNaN(e)) return String.fromCharCode(e)
        }
        return o
      }
    })
  }, goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g, goog.string.whitespaceEscape = function (o, t) {
    return goog.string.newLineToBr(o.replace(/  /g, " &#160;"), t)
  }, goog.string.preserveSpaces = function (o) {
    return o.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
  }, goog.string.stripQuotes = function (o, t) {
    for (var e = t.length, r = 0; e > r; r++) {
      var g = 1 == e ? t : t.charAt(r);
      if (o.charAt(0) == g && o.charAt(o.length - 1) == g) return o.substring(1, o.length - 1)
    }
    return o
  }, goog.string.truncate = function (o, t, e) {
    return e && (o = goog.string.unescapeEntities(o)), o.length > t && (o = o.substring(0, t - 3) + "..."), e && (o = goog.string.htmlEscape(o)), o
  }, goog.string.truncateMiddle = function (o, t, e, r) {
    if (e && (o = goog.string.unescapeEntities(o)), r && o.length > t) {
      r > t && (r = t);
      var g = o.length - r;
      o = o.substring(0, t - r) + "..." + o.substring(g)
    } else o.length > t && (r = Math.floor(t / 2), g = o.length - r, o = o.substring(0, r + t % 2) + "..." + o.substring(g));
    return e && (o = goog.string.htmlEscape(o)), o
  }, goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
  }, goog.string.jsEscapeCache_ = {
    "'": "\\'"
  }, goog.string.quote = function (o) {
    o = String(o);
    for (var t = ['"'], e = 0; e < o.length; e++) {
      var r = o.charAt(e),
        g = r.charCodeAt(0);
      t[e + 1] = goog.string.specialEscapeChars_[r] || (g > 31 && 127 > g ? r : goog.string.escapeChar(r))
    }
    return t.push('"'), t.join("")
  }, goog.string.escapeString = function (o) {
    for (var t = [], e = 0; e < o.length; e++) t[e] = goog.string.escapeChar(o.charAt(e));
    return t.join("")
  }, goog.string.escapeChar = function (o) {
    if (o in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[o];
    if (o in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[o] = goog.string.specialEscapeChars_[o];
    var t = o,
      e = o.charCodeAt(0);
    return e > 31 && 127 > e ? t = o : (256 > e ? (t = "\\x", (16 > e || e > 256) && (t += "0")) : (t = "\\u", 4096 > e && (t += "0")), t += e.toString(16).toUpperCase()), goog.string.jsEscapeCache_[o] = t
  }, goog.string.contains = function (o, t) {
    return -1 != o.indexOf(t)
  }, goog.string.caseInsensitiveContains = function (o, t) {
    return goog.string.contains(o.toLowerCase(), t.toLowerCase())
  }, goog.string.countOf = function (o, t) {
    return o && t ? o.split(t).length - 1 : 0
  }, goog.string.removeAt = function (o, t, e) {
    var r = o;
    return t >= 0 && t < o.length && e > 0 && (r = o.substr(0, t) + o.substr(t + e, o.length - t - e)), r
  }, goog.string.remove = function (o, t) {
    var e = new RegExp(goog.string.regExpEscape(t), "");
    return o.replace(e, "")
  }, goog.string.removeAll = function (o, t) {
    var e = new RegExp(goog.string.regExpEscape(t), "g");
    return o.replace(e, "")
  }, goog.string.regExpEscape = function (o) {
    return String(o).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
  }, goog.string.repeat = String.prototype.repeat ? function (o, t) {
    return o.repeat(t);
  } : function (o, t) {
    return Array(t + 1).join(o)
  }, goog.string.padNumber = function (o, t, e) {
    return o = goog.isDef(e) ? o.toFixed(e) : String(o), e = o.indexOf("."), -1 == e && (e = o.length), goog.string.repeat("0", Math.max(0, t - e)) + o
  }, goog.string.makeSafe = function (o) {
    return null == o ? "" : String(o)
  }, goog.string.buildString = function (o) {
    return Array.prototype.join.call(arguments, "")
  }, goog.string.getRandomString = function () {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
  }, goog.string.compareVersions = function (o, t) {
    for (var e = 0, r = goog.string.trim(String(o)).split("."), g = goog.string.trim(String(t)).split("."), n = Math.max(r.length, g.length), i = 0; 0 == e && n > i; i++) {
      var s = r[i] || "",
        a = g[i] || "",
        u = RegExp("(\\d*)(\\D*)", "g"),
        l = RegExp("(\\d*)(\\D*)", "g");
      do {
        var c = u.exec(s) || ["", "", ""],
          f = l.exec(a) || ["", "", ""];
        if (0 == c[0].length && 0 == f[0].length) break;
        var e = 0 == c[1].length ? 0 : parseInt(c[1], 10),
          m = 0 == f[1].length ? 0 : parseInt(f[1], 10),
          e = goog.string.compareElements_(e, m) || goog.string.compareElements_(0 == c[2].length, 0 == f[2].length) || goog.string.compareElements_(c[2], f[2])
      } while (0 == e)
    }
    return e
  }, goog.string.compareElements_ = function (o, t) {
    return t > o ? -1 : o > t ? 1 : 0
  }, goog.string.hashCode = function (o) {
    for (var t = 0, e = 0; e < o.length; ++e) t = 31 * t + o.charCodeAt(e) >>> 0;
    return t
  }, goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0, goog.string.createUniqueString = function () {
    return "goog_" + goog.string.uniqueStringCounter_++
  }, goog.string.toNumber = function (o) {
    var t = Number(o);
    return 0 == t && goog.string.isEmptyOrWhitespace(o) ? NaN : t
  }, goog.string.isLowerCamelCase = function (o) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(o)
  }, goog.string.isUpperCamelCase = function (o) {
    return /^([A-Z][a-z]*)+$/.test(o)
  }, goog.string.toCamelCase = function (o) {
    return String(o).replace(/\-([a-z])/g, function (o, t) {
      return t.toUpperCase()
    })
  }, goog.string.toSelectorCase = function (o) {
    return String(o).replace(/([A-Z])/g, "-$1").toLowerCase()
  }, goog.string.toTitleCase = function (o, t) {
    var e = goog.isString(t) ? goog.string.regExpEscape(t) : "\\s";
    return o.replace(new RegExp("(^" + (e ? "|[" + e + "]+" : "") + ")([a-z])", "g"), function (o, t, e) {
      return t + e.toUpperCase()
    })
  }, goog.string.capitalize = function (o) {
    return String(o.charAt(0)).toUpperCase() + String(o.substr(1)).toLowerCase()
  }, goog.string.parseInt = function (o) {
    return isFinite(o) && (o = String(o)), goog.isString(o) ? /^\s*-?0x/i.test(o) ? parseInt(o, 16) : parseInt(o, 10) : NaN
  }, goog.string.splitLimit = function (o, t, e) {
    o = o.split(t);
    for (var r = []; e > 0 && o.length;) r.push(o.shift()), e--;
    return o.length && r.push(o.join(t)), r
  }, goog.string.lastComponent = function (o, t) {
    if (!t) return o;
    "string" == typeof t && (t = [t]);
    for (var e = -1, r = 0; r < t.length; r++)
      if ("" != t[r]) {
        var g = o.lastIndexOf(t[r]);
        g > e && (e = g)
      }
    return -1 == e ? o : o.slice(e + 1)
  }, goog.string.editDistance = function (o, t) {
    var e = [],
      r = [];
    if (o == t) return 0;
    if (!o.length || !t.length) return Math.max(o.length, t.length);
    for (var g = 0; g < t.length + 1; g++) e[g] = g;
    for (g = 0; g < o.length; g++) {
      r[0] = g + 1;
      for (var n = 0; n < t.length; n++) r[n + 1] = Math.min(r[n] + 1, e[n + 1] + 1, e[n] + Number(o[g] != t[n]));
      for (n = 0; n < e.length; n++) e[n] = r[n]
    }
    return r[t.length]
  }, goog.labs = {}, goog.labs.userAgent = {}, goog.labs.userAgent.util = {}, goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
    var o = goog.labs.userAgent.util.getNavigator_();
    return o && (o = o.userAgent) ? o : ""
  }, goog.labs.userAgent.util.getNavigator_ = function () {
    return goog.global.navigator
  }, goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_(), goog.labs.userAgent.util.setUserAgent = function (o) {
    goog.labs.userAgent.util.userAgent_ = o || goog.labs.userAgent.util.getNativeUserAgentString_()
  }, goog.labs.userAgent.util.getUserAgent = function () {
    return goog.labs.userAgent.util.userAgent_
  }, goog.labs.userAgent.util.matchUserAgent = function (o) {
    var t = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(t, o)
  }, goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (o) {
    var t = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(t, o)
  }, goog.labs.userAgent.util.extractVersionTuples = function (o) {
    for (var t, e = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), r = []; t = e.exec(o);) r.push([t[1], t[2], t[3] || void 0]);
    return r
  }, goog.labs.userAgent.platform = {}, goog.labs.userAgent.platform.isAndroid = function () {
    return goog.labs.userAgent.util.matchUserAgent("Android")
  }, goog.labs.userAgent.platform.isIpod = function () {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
  }, goog.labs.userAgent.platform.isIphone = function () {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
  }, goog.labs.userAgent.platform.isIpad = function () {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
  }, goog.labs.userAgent.platform.isIos = function () {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
  }, goog.labs.userAgent.platform.isMacintosh = function () {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
  }, goog.labs.userAgent.platform.isLinux = function () {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
  }, goog.labs.userAgent.platform.isWindows = function () {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
  }, goog.labs.userAgent.platform.isChromeOS = function () {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
  }, goog.labs.userAgent.platform.getVersion = function () {
    var o = goog.labs.userAgent.util.getUserAgent(),
      t = "";
    return goog.labs.userAgent.platform.isWindows() ? (t = /Windows (?:NT|Phone) ([0-9.]+)/, t = (o = t.exec(o)) ? o[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (t = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, t = (o = t.exec(o)) && o[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (t = /Mac OS X ([0-9_.]+)/, t = (o = t.exec(o)) ? o[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (t = /Android\s+([^\);]+)(\)|;)/, t = (o = t.exec(o)) && o[1]) : goog.labs.userAgent.platform.isChromeOS() && (t = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, t = (o = t.exec(o)) && o[1]), t || ""
  }, goog.labs.userAgent.platform.isVersionOrHigher = function (o) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), o)
  }, goog.string.TypedString = function () {}, goog.functions = {}, goog.functions.constant = function (o) {
    return function () {
      return o
    }
  }, goog.functions.FALSE = goog.functions.constant(!1), goog.functions.TRUE = goog.functions.constant(!0), goog.functions.NULL = goog.functions.constant(null), goog.functions.identity = function (o, t) {
    return o
  }, goog.functions.error = function (o) {
    return function () {
      throw Error(o)
    }
  }, goog.functions.fail = function (o) {
    return function () {
      throw o
    }
  }, goog.functions.lock = function (o, t) {
    return t = t || 0,
      function () {
        return o.apply(this, Array.prototype.slice.call(arguments, 0, t))
      }
  }, goog.functions.nth = function (o) {
    return function () {
      return arguments[o]
    }
  }, goog.functions.partialRight = function (o, t) {
    var e = Array.prototype.slice.call(arguments, 1);
    return function () {
      var t = Array.prototype.slice.call(arguments);
      return t.push.apply(t, e), o.apply(this, t)
    }
  }, goog.functions.withReturnValue = function (o, t) {
    return goog.functions.sequence(o, goog.functions.constant(t))
  }, goog.functions.equalTo = function (o, t) {
    return function (e) {
      return t ? o == e : o === e
    }
  }, goog.functions.compose = function (o, t) {
    var e = arguments,
      r = e.length;
    return function () {
      var o;
      r && (o = e[r - 1].apply(this, arguments));
      for (var t = r - 2; t >= 0; t--) o = e[t].call(this, o);
      return o
    }
  }, goog.functions.sequence = function (o) {
    var t = arguments,
      e = t.length;
    return function () {
      for (var o, r = 0; e > r; r++) o = t[r].apply(this, arguments);
      return o
    }
  }, goog.functions.and = function (o) {
    var t = arguments,
      e = t.length;
    return function () {
      for (var o = 0; e > o; o++)
        if (!t[o].apply(this, arguments)) return !1;
      return !0
    }
  }, goog.functions.or = function (o) {
    var t = arguments,
      e = t.length;
    return function () {
      for (var o = 0; e > o; o++)
        if (t[o].apply(this, arguments)) return !0;
      return !1
    }
  }, goog.functions.not = function (o) {
    return function () {
      return !o.apply(this, arguments)
    }
  }, goog.functions.create = function (o, t) {
    var e = function () {};
    return e.prototype = o.prototype, e = new e, o.apply(e, Array.prototype.slice.call(arguments, 1)), e
  }, goog.functions.CACHE_RETURN_VALUE = !0, goog.functions.cacheReturnValue = function (o) {
    var t, e = !1;
    return function () {
      return goog.functions.CACHE_RETURN_VALUE ? (e || (t = o(), e = !0), t) : o()
    }
  }, goog.functions.once = function (o) {
    var t = o;
    return function () {
      if (t) {
        var o = t;
        t = null, o()
      }
    }
  }, goog.functions.debounce = function (o, t, e) {
    e && (o = goog.bind(o, e));
    var r = null;
    return function (e) {
      goog.global.clearTimeout(r);
      var g = arguments;
      r = goog.global.setTimeout(function () {
        o.apply(null, g)
      }, t)
    }
  }, goog.functions.throttle = function (o, t, e) {
    e && (o = goog.bind(o, e));
    var r = null,
      g = !1,
      n = [],
      i = function () {
        r = null, g && (g = !1, s())
      },
      s = function () {
        r = goog.global.setTimeout(i, t), o.apply(null, n)
      };
    return function (o) {
      n = arguments, r ? g = !0 : s()
    }
  }, goog.dom = {}, goog.dom.TagName = {
    A: "A",
    ABBR: "ABBR",
    ACRONYM: "ACRONYM",
    ADDRESS: "ADDRESS",
    APPLET: "APPLET",
    AREA: "AREA",
    ARTICLE: "ARTICLE",
    ASIDE: "ASIDE",
    AUDIO: "AUDIO",
    B: "B",
    BASE: "BASE",
    BASEFONT: "BASEFONT",
    BDI: "BDI",
    BDO: "BDO",
    BIG: "BIG",
    BLOCKQUOTE: "BLOCKQUOTE",
    BODY: "BODY",
    BR: "BR",
    BUTTON: "BUTTON",
    CANVAS: "CANVAS",
    CAPTION: "CAPTION",
    CENTER: "CENTER",
    CITE: "CITE",
    CODE: "CODE",
    COL: "COL",
    COLGROUP: "COLGROUP",
    COMMAND: "COMMAND",
    DATA: "DATA",
    DATALIST: "DATALIST",
    DD: "DD",
    DEL: "DEL",
    DETAILS: "DETAILS",
    DFN: "DFN",
    DIALOG: "DIALOG",
    DIR: "DIR",
    DIV: "DIV",
    DL: "DL",
    DT: "DT",
    EM: "EM",
    EMBED: "EMBED",
    FIELDSET: "FIELDSET",
    FIGCAPTION: "FIGCAPTION",
    FIGURE: "FIGURE",
    FONT: "FONT",
    FOOTER: "FOOTER",
    FORM: "FORM",
    FRAME: "FRAME",
    FRAMESET: "FRAMESET",
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    HEAD: "HEAD",
    HEADER: "HEADER",
    HGROUP: "HGROUP",
    HR: "HR",
    HTML: "HTML",
    I: "I",
    IFRAME: "IFRAME",
    IMG: "IMG",
    INPUT: "INPUT",
    INS: "INS",
    ISINDEX: "ISINDEX",
    KBD: "KBD",
    KEYGEN: "KEYGEN",
    LABEL: "LABEL",
    LEGEND: "LEGEND",
    LI: "LI",
    LINK: "LINK",
    MAP: "MAP",
    MARK: "MARK",
    MATH: "MATH",
    MENU: "MENU",
    META: "META",
    METER: "METER",
    NAV: "NAV",
    NOFRAMES: "NOFRAMES",
    NOSCRIPT: "NOSCRIPT",
    OBJECT: "OBJECT",
    OL: "OL",
    OPTGROUP: "OPTGROUP",
    OPTION: "OPTION",
    OUTPUT: "OUTPUT",
    P: "P",
    PARAM: "PARAM",
    PRE: "PRE",
    PROGRESS: "PROGRESS",
    Q: "Q",
    RP: "RP",
    RT: "RT",
    RUBY: "RUBY",
    S: "S",
    SAMP: "SAMP",
    SCRIPT: "SCRIPT",
    SECTION: "SECTION",
    SELECT: "SELECT",
    SMALL: "SMALL",
    SOURCE: "SOURCE",
    SPAN: "SPAN",
    STRIKE: "STRIKE",
    STRONG: "STRONG",
    STYLE: "STYLE",
    SUB: "SUB",
    SUMMARY: "SUMMARY",
    SUP: "SUP",
    SVG: "SVG",
    TABLE: "TABLE",
    TBODY: "TBODY",
    TD: "TD",
    TEMPLATE: "TEMPLATE",
    TEXTAREA: "TEXTAREA",
    TFOOT: "TFOOT",
    TH: "TH",
    THEAD: "THEAD",
    TIME: "TIME",
    TITLE: "TITLE",
    TR: "TR",
    TRACK: "TRACK",
    TT: "TT",
    U: "U",
    UL: "UL",
    VAR: "VAR",
    VIDEO: "VIDEO",
    WBR: "WBR"
  }, goog.dom.tags = {}, goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }, goog.dom.tags.isVoidTag = function (o) {
    return !0 === goog.dom.tags.VOID_TAGS_[o]
  }, goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
  }, goog.debug = {}, goog.debug.Error = function (o) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
      var t = Error().stack;
      t && (this.stack = t)
    }
    o && (this.message = String(o)), this.reportErrorToServer = !0
  }, goog.inherits(goog.debug.Error, Error), goog.debug.Error.prototype.name = "CustomError", goog.asserts = {}, goog.asserts.ENABLE_ASSERTS = goog.DEBUG, goog.asserts.AssertionError = function (o, t) {
    t.unshift(o), goog.debug.Error.call(this, goog.string.subs.apply(null, t)), t.shift(), this.messagePattern = o
  }, goog.inherits(goog.asserts.AssertionError, goog.debug.Error), goog.asserts.AssertionError.prototype.name = "AssertionError", goog.asserts.DEFAULT_ERROR_HANDLER = function (o) {
    throw o
  }, goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER, goog.asserts.doAssertFailure_ = function (o, t, e, r) {
    var g = "Assertion failed";
    if (e) var g = g + (": " + e),
      n = r;
    else o && (g += ": " + o, n = t);
    o = new goog.asserts.AssertionError("" + g, n || []), goog.asserts.errorHandler_(o)
  }, goog.asserts.setErrorHandler = function (o) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = o)
  }, goog.asserts.assert = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !o && goog.asserts.doAssertFailure_("", null, t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.fail = function (o, t) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (o ? ": " + o : ""), Array.prototype.slice.call(arguments, 1)))
  }, goog.asserts.assertNumber = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isNumber(o) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertString = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isString(o) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertFunction = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isFunction(o) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertObject = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isObject(o) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertArray = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isArray(o) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertBoolean = function (o, t, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(o) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertElement = function (o, t, e) {
    return !goog.asserts.ENABLE_ASSERTS || goog.isObject(o) && o.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(o), o], t, Array.prototype.slice.call(arguments, 2)), o
  }, goog.asserts.assertInstanceof = function (o, t, e, r) {
    return !goog.asserts.ENABLE_ASSERTS || o instanceof t || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(t), goog.asserts.getType_(o)], e, Array.prototype.slice.call(arguments, 3)), o
  }, goog.asserts.assertObjectPrototypeIsIntact = function () {
    for (var o in Object.prototype) goog.asserts.fail(o + " should not be enumerable in Object.prototype.")
  }, goog.asserts.getType_ = function (o) {
    return o instanceof Function ? o.displayName || o.name || "unknown type name" : o instanceof Object ? o.constructor.displayName || o.constructor.name || Object.prototype.toString.call(o) : null === o ? "null" : typeof o
  }, goog.uri = {}, goog.uri.utils = {}, goog.uri.utils.CharCode_ = {
    AMPERSAND: 38,
    EQUAL: 61,
    HASH: 35,
    QUESTION: 63
  }, goog.uri.utils.buildFromEncodedParts = function (o, t, e, r, g, n, i) {
    var s = "";
    return o && (s += o + ":"), e && (s += "//", t && (s += t + "@"), s += e, r && (s += ":" + r)), g && (s += g), n && (s += "?" + n), i && (s += "#" + i), s
  }, goog.uri.utils.splitRe_ = /^(?:([^:\/?#.]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/#?]*?)(?::([0-9]+))?(?=[\/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, goog.uri.utils.ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  }, goog.uri.utils.split = function (o) {
    return o.match(goog.uri.utils.splitRe_)
  }, goog.uri.utils.decodeIfPossible_ = function (o, t) {
    return o ? t ? decodeURI(o) : decodeURIComponent(o) : o
  }, goog.uri.utils.getComponentByIndex_ = function (o, t) {
    return goog.uri.utils.split(t)[o] || null
  }, goog.uri.utils.getScheme = function (o) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, o)
  }, goog.uri.utils.getEffectiveScheme = function (o) {
    return o = goog.uri.utils.getScheme(o), !o && goog.global.self && goog.global.self.location && (o = goog.global.self.location.protocol, o = o.substr(0, o.length - 1)), o ? o.toLowerCase() : ""
  }, goog.uri.utils.getUserInfoEncoded = function (o) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, o)
  }, goog.uri.utils.getUserInfo = function (o) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(o))
  }, goog.uri.utils.getDomainEncoded = function (o) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, o)
  }, goog.uri.utils.getDomain = function (o) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(o), !0)
  }, goog.uri.utils.getPort = function (o) {
    return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, o)) || null
  }, goog.uri.utils.getPathEncoded = function (o) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, o)
  }, goog.uri.utils.getPath = function (o) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(o), !0)
  }, goog.uri.utils.getQueryData = function (o) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, o)
  }, goog.uri.utils.getFragmentEncoded = function (o) {
    var t = o.indexOf("#");
    return 0 > t ? null : o.substr(t + 1)
  }, goog.uri.utils.setFragmentEncoded = function (o, t) {
    return goog.uri.utils.removeFragment(o) + (t ? "#" + t : "")
  }, goog.uri.utils.getFragment = function (o) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(o))
  }, goog.uri.utils.getHost = function (o) {
    return o = goog.uri.utils.split(o), goog.uri.utils.buildFromEncodedParts(o[goog.uri.utils.ComponentIndex.SCHEME], o[goog.uri.utils.ComponentIndex.USER_INFO], o[goog.uri.utils.ComponentIndex.DOMAIN], o[goog.uri.utils.ComponentIndex.PORT])
  }, goog.uri.utils.getPathAndAfter = function (o) {
    return o = goog.uri.utils.split(o), goog.uri.utils.buildFromEncodedParts(null, null, null, null, o[goog.uri.utils.ComponentIndex.PATH], o[goog.uri.utils.ComponentIndex.QUERY_DATA], o[goog.uri.utils.ComponentIndex.FRAGMENT])
  }, goog.uri.utils.removeFragment = function (o) {
    var t = o.indexOf("#");
    return 0 > t ? o : o.substr(0, t)
  }, goog.uri.utils.haveSameDomain = function (o, t) {
    var e = goog.uri.utils.split(o),
      r = goog.uri.utils.split(t);
    return e[goog.uri.utils.ComponentIndex.DOMAIN] == r[goog.uri.utils.ComponentIndex.DOMAIN] && e[goog.uri.utils.ComponentIndex.SCHEME] == r[goog.uri.utils.ComponentIndex.SCHEME] && e[goog.uri.utils.ComponentIndex.PORT] == r[goog.uri.utils.ComponentIndex.PORT]
  }, goog.uri.utils.assertNoFragmentsOrQueries_ = function (o) {
    if (goog.DEBUG && (0 <= o.indexOf("#") || 0 <= o.indexOf("?"))) throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + o + "]")
  }, goog.uri.utils.parseQueryData = function (o, t) {
    if (o)
      for (var e = o.split("&"), r = 0; r < e.length; r++) {
        var g = e[r].indexOf("="),
          n = null,
          i = null;
        g >= 0 ? (n = e[r].substring(0, g), i = e[r].substring(g + 1)) : n = e[r], t(n, i ? goog.string.urlDecode(i) : "")
      }
  }, goog.uri.utils.appendQueryData_ = function (o) {
    if (o[1]) {
      var t = o[0],
        e = t.indexOf("#");
      e >= 0 && (o.push(t.substr(e)), o[0] = t = t.substr(0, e)), e = t.indexOf("?"), 0 > e ? o[1] = "?" : e == t.length - 1 && (o[1] = void 0)
    }
    return o.join("")
  }, goog.uri.utils.appendKeyValuePairs_ = function (o, t, e) {
    if (goog.isArray(t)) {
      goog.asserts.assertArray(t);
      for (var r = 0; r < t.length; r++) goog.uri.utils.appendKeyValuePairs_(o, String(t[r]), e)
    } else null != t && e.push("&", o, "" === t ? "" : "=", goog.string.urlEncode(t))
  }, goog.uri.utils.buildQueryDataBuffer_ = function (o, t, e) {
    for (goog.asserts.assert(0 == Math.max(t.length - (e || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length."), e = e || 0; e < t.length; e += 2) goog.uri.utils.appendKeyValuePairs_(t[e], t[e + 1], o);
    return o
  }, goog.uri.utils.buildQueryData = function (o, t) {
    var e = goog.uri.utils.buildQueryDataBuffer_([], o, t);
    return e[0] = "", e.join("")
  }, goog.uri.utils.buildQueryDataBufferFromMap_ = function (o, t) {
    for (var e in t) goog.uri.utils.appendKeyValuePairs_(e, t[e], o);
    return o
  }, goog.uri.utils.buildQueryDataFromMap = function (o) {
    return o = goog.uri.utils.buildQueryDataBufferFromMap_([], o), o[0] = "", o.join("")
  }, goog.uri.utils.appendParams = function (o, t) {
    return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([o], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([o], arguments, 1))
  }, goog.uri.utils.appendParamsFromMap = function (o, t) {
    return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([o], t))
  }, goog.uri.utils.appendParam = function (o, t, e) {
    return o = [o, "&", t], goog.isDefAndNotNull(e) && o.push("=", goog.string.urlEncode(e)), goog.uri.utils.appendQueryData_(o)
  }, goog.uri.utils.findParam_ = function (o, t, e, r) {
    for (var g = e.length; 0 <= (t = o.indexOf(e, t)) && r > t;) {
      var n = o.charCodeAt(t - 1);
      if ((n == goog.uri.utils.CharCode_.AMPERSAND || n == goog.uri.utils.CharCode_.QUESTION) && (n = o.charCodeAt(t + g), !n || n == goog.uri.utils.CharCode_.EQUAL || n == goog.uri.utils.CharCode_.AMPERSAND || n == goog.uri.utils.CharCode_.HASH)) return t;
      t += g + 1
    }
    return -1
  }, goog.uri.utils.hashOrEndRe_ = /#|$/, goog.uri.utils.hasParam = function (o, t) {
    return 0 <= goog.uri.utils.findParam_(o, 0, t, o.search(goog.uri.utils.hashOrEndRe_))
  }, goog.uri.utils.getParamValue = function (o, t) {
    var e = o.search(goog.uri.utils.hashOrEndRe_),
      r = goog.uri.utils.findParam_(o, 0, t, e);
    if (0 > r) return null;
    var g = o.indexOf("&", r);
    return (0 > g || g > e) && (g = e), r += t.length + 1, goog.string.urlDecode(o.substr(r, g - r))
  }, goog.uri.utils.getParamValues = function (o, t) {
    for (var e, r = o.search(goog.uri.utils.hashOrEndRe_), g = 0, n = []; 0 <= (e = goog.uri.utils.findParam_(o, g, t, r));) g = o.indexOf("&", e), (0 > g || g > r) && (g = r), e += t.length + 1, n.push(goog.string.urlDecode(o.substr(e, g - e)));
    return n
  }, goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/, goog.uri.utils.removeParam = function (o, t) {
    for (var e, r = o.search(goog.uri.utils.hashOrEndRe_), g = 0, n = []; 0 <= (e = goog.uri.utils.findParam_(o, g, t, r));) n.push(o.substring(g, e)), g = Math.min(o.indexOf("&", e) + 1 || r, r);
    return n.push(o.substr(g)), n.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
  }, goog.uri.utils.setParam = function (o, t, e) {
    return goog.uri.utils.appendParam(goog.uri.utils.removeParam(o, t), t, e)
  }, goog.uri.utils.appendPath = function (o, t) {
    return goog.uri.utils.assertNoFragmentsOrQueries_(o), goog.string.endsWith(o, "/") && (o = o.substr(0, o.length - 1)), goog.string.startsWith(t, "/") && (t = t.substr(1)), goog.string.buildString(o, "/", t)
  }, goog.uri.utils.setPath = function (o, t) {
    goog.string.startsWith(t, "/") || (t = "/" + t);
    var e = goog.uri.utils.split(o);
    return goog.uri.utils.buildFromEncodedParts(e[goog.uri.utils.ComponentIndex.SCHEME], e[goog.uri.utils.ComponentIndex.USER_INFO], e[goog.uri.utils.ComponentIndex.DOMAIN], e[goog.uri.utils.ComponentIndex.PORT], t, e[goog.uri.utils.ComponentIndex.QUERY_DATA], e[goog.uri.utils.ComponentIndex.FRAGMENT])
  }, goog.uri.utils.StandardQueryParam = {
    RANDOM: "zx"
  }, goog.uri.utils.makeUnique = function (o) {
    return goog.uri.utils.setParam(o, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
  }, goog.string.Const = function () {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "", this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
  }, goog.string.Const.prototype.implementsGoogStringTypedString = !0, goog.string.Const.prototype.getTypedStringValue = function () {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
  }, goog.string.Const.prototype.toString = function () {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
  }, goog.string.Const.unwrap = function (o) {
    return o instanceof goog.string.Const && o.constructor === goog.string.Const && o.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_ ? o.stringConstValueWithSecurityContract__googStringSecurityPrivate_ : (goog.asserts.fail("expected object of type Const, got '" + o + "'"), "type_error:Const")
  }, goog.string.Const.from = function (o) {
    return goog.string.Const.create__googStringSecurityPrivate_(o)
  }, goog.string.Const.TYPE_MARKER_ = {}, goog.string.Const.create__googStringSecurityPrivate_ = function (o) {
    var t = new goog.string.Const;
    return t.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = o, t
  }, goog.html = {}, goog.html.SafeScript = function () {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "", this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
  }, goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0, goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeScript.fromConstant = function (o) {
    return o = goog.string.Const.unwrap(o), 0 === o.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.SafeScript.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
  }, goog.DEBUG && (goog.html.SafeScript.prototype.toString = function () {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
  }), goog.html.SafeScript.unwrap = function (o) {
    return o instanceof goog.html.SafeScript && o.constructor === goog.html.SafeScript && o.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? o.privateDoNotAccessOrElseSafeScriptWrappedValue_ : (goog.asserts.fail("expected object of type SafeScript, got '" + o + "' of type " + goog.typeOf(o)), "type_error:SafeScript")
  }, goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function (o) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(o)
  }, goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (o) {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = o, this
  }, goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(""), goog.array = {}, goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE, goog.array.ASSUME_NATIVE_FUNCTIONS = !1, goog.array.peek = function (o) {
    return o[o.length - 1]
  }, goog.array.last = goog.array.peek, goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function (o, t, e) {
    return goog.asserts.assert(null != o.length), Array.prototype.indexOf.call(o, t, e)
  } : function (o, t, e) {
    if (e = null == e ? 0 : 0 > e ? Math.max(0, o.length + e) : e, goog.isString(o)) return goog.isString(t) && 1 == t.length ? o.indexOf(t, e) : -1;
    for (; e < o.length; e++)
      if (e in o && o[e] === t) return e;
    return -1
  }, goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function (o, t, e) {
    return goog.asserts.assert(null != o.length), Array.prototype.lastIndexOf.call(o, t, null == e ? o.length - 1 : e)
  } : function (o, t, e) {
    if (e = null == e ? o.length - 1 : e, 0 > e && (e = Math.max(0, o.length + e)), goog.isString(o)) return goog.isString(t) && 1 == t.length ? o.lastIndexOf(t, e) : -1;
    for (; e >= 0; e--)
      if (e in o && o[e] === t) return e;
    return -1
  }, goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function (o, t, e) {
    goog.asserts.assert(null != o.length), Array.prototype.forEach.call(o, t, e)
  } : function (o, t, e) {
    for (var r = o.length, g = goog.isString(o) ? o.split("") : o, n = 0; r > n; n++) n in g && t.call(e, g[n], n, o)
  }, goog.array.forEachRight = function (o, t, e) {
    for (var r = o.length, g = goog.isString(o) ? o.split("") : o, r = r - 1; r >= 0; --r) r in g && t.call(e, g[r], r, o)
  }, goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function (o, t, e) {
    return goog.asserts.assert(null != o.length), Array.prototype.filter.call(o, t, e)
  } : function (o, t, e) {
    for (var r = o.length, g = [], n = 0, i = goog.isString(o) ? o.split("") : o, s = 0; r > s; s++)
      if (s in i) {
        var a = i[s];
        t.call(e, a, s, o) && (g[n++] = a)
      }
    return g
  }, goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function (o, t, e) {
    return goog.asserts.assert(null != o.length), Array.prototype.map.call(o, t, e)
  } : function (o, t, e) {
    for (var r = o.length, g = Array(r), n = goog.isString(o) ? o.split("") : o, i = 0; r > i; i++) i in n && (g[i] = t.call(e, n[i], i, o));
    return g
  }, goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function (o, t, e, r) {
    return goog.asserts.assert(null != o.length), r && (t = goog.bind(t, r)), Array.prototype.reduce.call(o, t, e)
  } : function (o, t, e, r) {
    var g = e;
    return goog.array.forEach(o, function (e, n) {
      g = t.call(r, g, e, n, o)
    }), g
  }, goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function (o, t, e, r) {
    return goog.asserts.assert(null != o.length), goog.asserts.assert(null != t), r && (t = goog.bind(t, r)), Array.prototype.reduceRight.call(o, t, e)
  } : function (o, t, e, r) {
    var g = e;
    return goog.array.forEachRight(o, function (e, n) {
      g = t.call(r, g, e, n, o)
    }), g
  }, goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function (o, t, e) {
    return goog.asserts.assert(null != o.length), Array.prototype.some.call(o, t, e)
  } : function (o, t, e) {
    for (var r = o.length, g = goog.isString(o) ? o.split("") : o, n = 0; r > n; n++)
      if (n in g && t.call(e, g[n], n, o)) return !0;
    return !1
  }, goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function (o, t, e) {
    return goog.asserts.assert(null != o.length), Array.prototype.every.call(o, t, e)
  } : function (o, t, e) {
    for (var r = o.length, g = goog.isString(o) ? o.split("") : o, n = 0; r > n; n++)
      if (n in g && !t.call(e, g[n], n, o)) return !1;
    return !0
  }, goog.array.count = function (o, t, e) {
    var r = 0;
    return goog.array.forEach(o, function (o, g, n) {
      t.call(e, o, g, n) && ++r
    }, e), r
  }, goog.array.find = function (o, t, e) {
    return t = goog.array.findIndex(o, t, e), 0 > t ? null : goog.isString(o) ? o.charAt(t) : o[t]
  }, goog.array.findIndex = function (o, t, e) {
    for (var r = o.length, g = goog.isString(o) ? o.split("") : o, n = 0; r > n; n++)
      if (n in g && t.call(e, g[n], n, o)) return n;
    return -1
  }, goog.array.findRight = function (o, t, e) {
    return t = goog.array.findIndexRight(o, t, e), 0 > t ? null : goog.isString(o) ? o.charAt(t) : o[t]
  }, goog.array.findIndexRight = function (o, t, e) {
    for (var r = o.length, g = goog.isString(o) ? o.split("") : o, r = r - 1; r >= 0; r--)
      if (r in g && t.call(e, g[r], r, o)) return r;
    return -1
  }, goog.array.contains = function (o, t) {
    return 0 <= goog.array.indexOf(o, t)
  }, goog.array.isEmpty = function (o) {
    return 0 == o.length
  }, goog.array.clear = function (o) {
    if (!goog.isArray(o))
      for (var t = o.length - 1; t >= 0; t--) delete o[t];
    o.length = 0
  }, goog.array.insert = function (o, t) {
    goog.array.contains(o, t) || o.push(t)
  }, goog.array.insertAt = function (o, t, e) {
    goog.array.splice(o, e, 0, t)
  }, goog.array.insertArrayAt = function (o, t, e) {
    goog.partial(goog.array.splice, o, e, 0).apply(null, t)
  }, goog.array.insertBefore = function (o, t, e) {
    var r;
    2 == arguments.length || 0 > (r = goog.array.indexOf(o, e)) ? o.push(t) : goog.array.insertAt(o, t, r)
  }, goog.array.remove = function (o, t) {
    var e, r = goog.array.indexOf(o, t);
    return (e = r >= 0) && goog.array.removeAt(o, r), e
  }, goog.array.removeLast = function (o, t) {
    var e = goog.array.lastIndexOf(o, t);
    return e >= 0 ? (goog.array.removeAt(o, e), !0) : !1
  }, goog.array.removeAt = function (o, t) {
    return goog.asserts.assert(null != o.length), 1 == Array.prototype.splice.call(o, t, 1).length
  }, goog.array.removeIf = function (o, t, e) {
    return t = goog.array.findIndex(o, t, e), t >= 0 ? (goog.array.removeAt(o, t), !0) : !1
  }, goog.array.removeAllIf = function (o, t, e) {
    var r = 0;
    return goog.array.forEachRight(o, function (g, n) {
      t.call(e, g, n, o) && goog.array.removeAt(o, n) && r++
    }), r
  }, goog.array.concat = function (o) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
  }, goog.array.join = function (o) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
  }, goog.array.toArray = function (o) {
    var t = o.length;
    if (t > 0) {
      for (var e = Array(t), r = 0; t > r; r++) e[r] = o[r];
      return e
    }
    return []
  }, goog.array.clone = goog.array.toArray, goog.array.extend = function (o, t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      if (goog.isArrayLike(r)) {
        var g = o.length || 0,
          n = r.length || 0;
        o.length = g + n;
        for (var i = 0; n > i; i++) o[g + i] = r[i]
      } else o.push(r)
    }
  }, goog.array.splice = function (o, t, e, r) {
    return goog.asserts.assert(null != o.length), Array.prototype.splice.apply(o, goog.array.slice(arguments, 1))
  }, goog.array.slice = function (o, t, e) {
    return goog.asserts.assert(null != o.length), 2 >= arguments.length ? Array.prototype.slice.call(o, t) : Array.prototype.slice.call(o, t, e)
  }, goog.array.removeDuplicates = function (o, t, e) {
    t = t || o;
    var r = function (o) {
      return goog.isObject(o) ? "o" + goog.getUid(o) : (typeof o).charAt(0) + o
    };
    e = e || r;
    for (var r = {}, g = 0, n = 0; n < o.length;) {
      var i = o[n++],
        s = e(i);
      Object.prototype.hasOwnProperty.call(r, s) || (r[s] = !0, t[g++] = i)
    }
    t.length = g
  }, goog.array.binarySearch = function (o, t, e) {
    return goog.array.binarySearch_(o, e || goog.array.defaultCompare, !1, t)
  }, goog.array.binarySelect = function (o, t, e) {
    return goog.array.binarySearch_(o, t, !0, void 0, e)
  }, goog.array.binarySearch_ = function (o, t, e, r, g) {
    for (var n, i = 0, s = o.length; s > i;) {
      var a, u = i + s >> 1;
      a = e ? t.call(g, o[u], u, o) : t(r, o[u]), a > 0 ? i = u + 1 : (s = u, n = !a)
    }
    return n ? i : ~i
  }, goog.array.sort = function (o, t) {
    o.sort(t || goog.array.defaultCompare)
  }, goog.array.stableSort = function (o, t) {
    for (var e = Array(o.length), r = 0; r < o.length; r++) e[r] = {
      index: r,
      value: o[r]
    };
    var g = t || goog.array.defaultCompare;
    for (goog.array.sort(e, function (o, t) {
        return g(o.value, t.value) || o.index - t.index
      }), r = 0; r < o.length; r++) o[r] = e[r].value
  }, goog.array.sortByKey = function (o, t, e) {
    var r = e || goog.array.defaultCompare;
    goog.array.sort(o, function (o, e) {
      return r(t(o), t(e))
    })
  }, goog.array.sortObjectsByKey = function (o, t, e) {
    goog.array.sortByKey(o, function (o) {
      return o[t]
    }, e)
  }, goog.array.isSorted = function (o, t, e) {
    t = t || goog.array.defaultCompare;
    for (var r = 1; r < o.length; r++) {
      var g = t(o[r - 1], o[r]);
      if (g > 0 || 0 == g && e) return !1
    }
    return !0
  }, goog.array.equals = function (o, t, e) {
    if (!goog.isArrayLike(o) || !goog.isArrayLike(t) || o.length != t.length) return !1;
    var r = o.length;
    e = e || goog.array.defaultCompareEquality;
    for (var g = 0; r > g; g++)
      if (!e(o[g], t[g])) return !1;
    return !0
  }, goog.array.compare3 = function (o, t, e) {
    e = e || goog.array.defaultCompare;
    for (var r = Math.min(o.length, t.length), g = 0; r > g; g++) {
      var n = e(o[g], t[g]);
      if (0 != n) return n
    }
    return goog.array.defaultCompare(o.length, t.length)
  }, goog.array.defaultCompare = function (o, t) {
    return o > t ? 1 : t > o ? -1 : 0
  }, goog.array.inverseDefaultCompare = function (o, t) {
    return -goog.array.defaultCompare(o, t)
  }, goog.array.defaultCompareEquality = function (o, t) {
    return o === t
  }, goog.array.binaryInsert = function (o, t, e) {
    return e = goog.array.binarySearch(o, t, e), 0 > e ? (goog.array.insertAt(o, t, -(e + 1)), !0) : !1
  }, goog.array.binaryRemove = function (o, t, e) {
    return t = goog.array.binarySearch(o, t, e), t >= 0 ? goog.array.removeAt(o, t) : !1
  }, goog.array.bucket = function (o, t, e) {
    for (var r = {}, g = 0; g < o.length; g++) {
      var n = o[g],
        i = t.call(e, n, g, o);
      goog.isDef(i) && (r[i] || (r[i] = [])).push(n)
    }
    return r
  }, goog.array.toObject = function (o, t, e) {
    var r = {};
    return goog.array.forEach(o, function (g, n) {
      r[t.call(e, g, n, o)] = g
    }), r
  }, goog.array.range = function (o, t, e) {
    var r = [],
      g = 0,
      n = o;
    if (e = e || 1, void 0 !== t && (g = o, n = t), 0 > e * (n - g)) return [];
    if (e > 0)
      for (o = g; n > o; o += e) r.push(o);
    else
      for (o = g; o > n; o += e) r.push(o);
    return r
  }, goog.array.repeat = function (o, t) {
    for (var e = [], r = 0; t > r; r++) e[r] = o;
    return e
  }, goog.array.flatten = function (o) {
    for (var t = [], e = 0; e < arguments.length; e++) {
      var r = arguments[e];
      if (goog.isArray(r))
        for (var g = 0; g < r.length; g += 8192)
          for (var n = goog.array.slice(r, g, g + 8192), n = goog.array.flatten.apply(null, n), i = 0; i < n.length; i++) t.push(n[i]);
      else t.push(r)
    }
    return t
  }, goog.array.rotate = function (o, t) {
    return goog.asserts.assert(null != o.length), o.length && (t %= o.length, t > 0 ? Array.prototype.unshift.apply(o, o.splice(-t, t)) : 0 > t && Array.prototype.push.apply(o, o.splice(0, -t))), o
  }, goog.array.moveItem = function (o, t, e) {
    goog.asserts.assert(t >= 0 && t < o.length), goog.asserts.assert(e >= 0 && e < o.length), t = Array.prototype.splice.call(o, t, 1), Array.prototype.splice.call(o, e, 0, t[0])
  }, goog.array.zip = function (o) {
    if (!arguments.length) return [];
    for (var t = [], e = arguments[0].length, r = 1; r < arguments.length; r++) arguments[r].length < e && (e = arguments[r].length);
    for (r = 0; e > r; r++) {
      for (var g = [], n = 0; n < arguments.length; n++) g.push(arguments[n][r]);
      t.push(g)
    }
    return t
  }, goog.array.shuffle = function (o, t) {
    for (var e = t || Math.random, r = o.length - 1; r > 0; r--) {
      var g = Math.floor(e() * (r + 1)),
        n = o[r];
      o[r] = o[g], o[g] = n
    }
  }, goog.array.copyByIndex = function (o, t) {
    var e = [];
    return goog.array.forEach(t, function (t) {
      e.push(o[t])
    }), e
  }, goog.array.concatMap = function (o, t, e) {
    return goog.array.concat.apply([], goog.array.map(o, t, e))
  }, goog.math.randomInt = function (o) {
    return Math.floor(Math.random() * o)
  }, goog.math.uniformRandom = function (o, t) {
    return o + Math.random() * (t - o)
  }, goog.math.clamp = function (o, t, e) {
    return Math.min(Math.max(o, t), e)
  }, goog.math.modulo = function (o, t) {
    var e = o % t;
    return 0 > e * t ? e + t : e
  }, goog.math.lerp = function (o, t, e) {
    return o + e * (t - o)
  }, goog.math.nearlyEquals = function (o, t, e) {
    return Math.abs(o - t) <= (e || 1e-6)
  }, goog.math.standardAngle = function (o) {
    return goog.math.modulo(o, 360)
  }, goog.math.standardAngleInRadians = function (o) {
    return goog.math.modulo(o, 2 * Math.PI)
  }, goog.math.toRadians = function (o) {
    return o * Math.PI / 180
  }, goog.math.toDegrees = function (o) {
    return 180 * o / Math.PI
  }, goog.math.angleDx = function (o, t) {
    return t * Math.cos(goog.math.toRadians(o))
  }, goog.math.angleDy = function (o, t) {
    return t * Math.sin(goog.math.toRadians(o))
  }, goog.math.angle = function (o, t, e, r) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(r - t, e - o)))
  }, goog.math.angleDifference = function (o, t) {
    var e = goog.math.standardAngle(t) - goog.math.standardAngle(o);
    return e > 180 ? e -= 360 : -180 >= e && (e = 360 + e), e
  }, goog.math.sign = Math.sign || function (o) {
    return o > 0 ? 1 : 0 > o ? -1 : o
  }, goog.math.longestCommonSubsequence = function (o, t, e, r) {
    e = e || function (o, t) {
      return o == t
    }, r = r || function (t, e) {
      return o[t]
    };
    for (var g = o.length, n = t.length, i = [], s = 0; g + 1 > s; s++) i[s] = [], i[s][0] = 0;
    for (var a = 0; n + 1 > a; a++) i[0][a] = 0;
    for (s = 1; g >= s; s++)
      for (a = 1; n >= a; a++) e(o[s - 1], t[a - 1]) ? i[s][a] = i[s - 1][a - 1] + 1 : i[s][a] = Math.max(i[s - 1][a], i[s][a - 1]);
    for (var u = [], s = g, a = n; s > 0 && a > 0;) e(o[s - 1], t[a - 1]) ? (u.unshift(r(s - 1, a - 1)), s--, a--) : i[s - 1][a] > i[s][a - 1] ? s-- : a--;
    return u
  }, goog.math.sum = function (o) {
    return goog.array.reduce(arguments, function (o, t) {
      return o + t
    }, 0)
  }, goog.math.average = function (o) {
    return goog.math.sum.apply(null, arguments) / arguments.length
  }, goog.math.sampleVariance = function (o) {
    var t = arguments.length;
    if (2 > t) return 0;
    var e = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function (o) {
      return Math.pow(o - e, 2)
    })) / (t - 1)
  }, goog.math.standardDeviation = function (o) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
  }, goog.math.isInt = function (o) {
    return isFinite(o) && 0 == o % 1
  }, goog.math.isFiniteNumber = function (o) {
    return isFinite(o) && !isNaN(o)
  }, goog.math.isNegativeZero = function (o) {
    return 0 == o && 0 > 1 / o
  }, goog.math.log10Floor = function (o) {
    if (o > 0) {
      var t = Math.round(Math.log(o) * Math.LOG10E);
      return t - (parseFloat("1e" + t) > o ? 1 : 0)
    }
    return 0 == o ? -(1 / 0) : NaN
  }, goog.math.safeFloor = function (o, t) {
    return goog.asserts.assert(!goog.isDef(t) || t > 0), Math.floor(o + (t || 2e-15))
  }, goog.math.safeCeil = function (o, t) {
    return goog.asserts.assert(!goog.isDef(t) || t > 0), Math.ceil(o - (t || 2e-15))
  }, goog.math.Coordinate = function (o, t) {
    this.x = goog.isDef(o) ? o : 0, this.y = goog.isDef(t) ? t : 0
  }, goog.math.Coordinate.prototype.clone = function () {
    return new goog.math.Coordinate(this.x, this.y)
  }, goog.DEBUG && (goog.math.Coordinate.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")"
  }), goog.math.Coordinate.equals = function (o, t) {
    return o == t ? !0 : o && t ? o.x == t.x && o.y == t.y : !1
  }, goog.math.Coordinate.distance = function (o, t) {
    var e = o.x - t.x,
      r = o.y - t.y;
    return Math.sqrt(e * e + r * r)
  }, goog.math.Coordinate.magnitude = function (o) {
    return Math.sqrt(o.x * o.x + o.y * o.y)
  }, goog.math.Coordinate.azimuth = function (o) {
    return goog.math.angle(0, 0, o.x, o.y)
  }, goog.math.Coordinate.squaredDistance = function (o, t) {
    var e = o.x - t.x,
      r = o.y - t.y;
    return e * e + r * r
  }, goog.math.Coordinate.difference = function (o, t) {
    return new goog.math.Coordinate(o.x - t.x, o.y - t.y)
  }, goog.math.Coordinate.sum = function (o, t) {
    return new goog.math.Coordinate(o.x + t.x, o.y + t.y)
  }, goog.math.Coordinate.prototype.ceil = function () {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
  }, goog.math.Coordinate.prototype.floor = function () {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
  }, goog.math.Coordinate.prototype.round = function () {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
  }, goog.math.Coordinate.prototype.translate = function (o, t) {
    return o instanceof goog.math.Coordinate ? (this.x += o.x, this.y += o.y) : (this.x += Number(o), goog.isNumber(t) && (this.y += t)), this
  }, goog.math.Coordinate.prototype.scale = function (o, t) {
    var e = goog.isNumber(t) ? t : o;
    return this.x *= o, this.y *= e, this
  }, goog.math.Coordinate.prototype.rotateRadians = function (o, t) {
    var e = t || new goog.math.Coordinate(0, 0),
      r = this.x,
      g = this.y,
      n = Math.cos(o),
      i = Math.sin(o);
    this.x = (r - e.x) * n - (g - e.y) * i + e.x, this.y = (r - e.x) * i + (g - e.y) * n + e.y
  }, goog.math.Coordinate.prototype.rotateDegrees = function (o, t) {
    this.rotateRadians(goog.math.toRadians(o), t)
  }, goog.math.Box = function (o, t, e, r) {
    this.top = o, this.right = t, this.bottom = e, this.left = r
  }, goog.math.Box.boundingBox = function (o) {
    for (var t = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), e = 1; e < arguments.length; e++) t.expandToIncludeCoordinate(arguments[e]);
    return t
  }, goog.math.Box.prototype.getWidth = function () {
    return this.right - this.left
  }, goog.math.Box.prototype.getHeight = function () {
    return this.bottom - this.top
  }, goog.math.Box.prototype.clone = function () {
    return new goog.math.Box(this.top, this.right, this.bottom, this.left)
  }, goog.DEBUG && (goog.math.Box.prototype.toString = function () {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
  }), goog.math.Box.prototype.contains = function (o) {
    return goog.math.Box.contains(this, o)
  }, goog.math.Box.prototype.expand = function (o, t, e, r) {
    return goog.isObject(o) ? (this.top -= o.top, this.right += o.right, this.bottom += o.bottom, this.left -= o.left) : (this.top -= o, this.right += Number(t), this.bottom += Number(e), this.left -= Number(r)), this
  }, goog.math.Box.prototype.expandToInclude = function (o) {
    this.left = Math.min(this.left, o.left), this.top = Math.min(this.top, o.top), this.right = Math.max(this.right, o.right), this.bottom = Math.max(this.bottom, o.bottom)
  }, goog.math.Box.prototype.expandToIncludeCoordinate = function (o) {
    this.top = Math.min(this.top, o.y), this.right = Math.max(this.right, o.x), this.bottom = Math.max(this.bottom, o.y), this.left = Math.min(this.left, o.x)
  }, goog.math.Box.equals = function (o, t) {
    return o == t ? !0 : o && t ? o.top == t.top && o.right == t.right && o.bottom == t.bottom && o.left == t.left : !1
  }, goog.math.Box.contains = function (o, t) {
    return o && t ? t instanceof goog.math.Box ? t.left >= o.left && t.right <= o.right && t.top >= o.top && t.bottom <= o.bottom : t.x >= o.left && t.x <= o.right && t.y >= o.top && t.y <= o.bottom : !1
  }, goog.math.Box.relativePositionX = function (o, t) {
    return t.x < o.left ? t.x - o.left : t.x > o.right ? t.x - o.right : 0
  }, goog.math.Box.relativePositionY = function (o, t) {
    return t.y < o.top ? t.y - o.top : t.y > o.bottom ? t.y - o.bottom : 0
  }, goog.math.Box.distance = function (o, t) {
    var e = goog.math.Box.relativePositionX(o, t),
      r = goog.math.Box.relativePositionY(o, t);
    return Math.sqrt(e * e + r * r)
  }, goog.math.Box.intersects = function (o, t) {
    return o.left <= t.right && t.left <= o.right && o.top <= t.bottom && t.top <= o.bottom
  }, goog.math.Box.intersectsWithPadding = function (o, t, e) {
    return o.left <= t.right + e && t.left <= o.right + e && o.top <= t.bottom + e && t.top <= o.bottom + e
  }, goog.math.Box.prototype.ceil = function () {
    return this.top = Math.ceil(this.top), this.right = Math.ceil(this.right), this.bottom = Math.ceil(this.bottom), this.left = Math.ceil(this.left), this
  }, goog.math.Box.prototype.floor = function () {
    return this.top = Math.floor(this.top), this.right = Math.floor(this.right), this.bottom = Math.floor(this.bottom), this.left = Math.floor(this.left), this
  }, goog.math.Box.prototype.round = function () {
    return this.top = Math.round(this.top), this.right = Math.round(this.right), this.bottom = Math.round(this.bottom), this.left = Math.round(this.left), this
  }, goog.math.Box.prototype.translate = function (o, t) {
    return o instanceof goog.math.Coordinate ? (this.left += o.x, this.right += o.x, this.top += o.y, this.bottom += o.y) : (goog.asserts.assertNumber(o), this.left += o, this.right += o, goog.isNumber(t) && (this.top += t, this.bottom += t)), this
  }, goog.math.Box.prototype.scale = function (o, t) {
    var e = goog.isNumber(t) ? t : o;
    return this.left *= o, this.right *= o, this.top *= e, this.bottom *= e, this
  }, goog.math.Rect = function (o, t, e, r) {
    this.left = o, this.top = t, this.width = e, this.height = r
  }, goog.math.Rect.prototype.clone = function () {
    return new goog.math.Rect(this.left, this.top, this.width, this.height)
  }, goog.math.Rect.prototype.toBox = function () {
    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
  }, goog.math.Rect.createFromPositionAndSize = function (o, t) {
    return new goog.math.Rect(o.x, o.y, t.width, t.height)
  }, goog.math.Rect.createFromBox = function (o) {
    return new goog.math.Rect(o.left, o.top, o.right - o.left, o.bottom - o.top)
  }, goog.DEBUG && (goog.math.Rect.prototype.toString = function () {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
  }), goog.math.Rect.equals = function (o, t) {
    return o == t ? !0 : o && t ? o.left == t.left && o.width == t.width && o.top == t.top && o.height == t.height : !1
  }, goog.math.Rect.prototype.intersection = function (o) {
    var t = Math.max(this.left, o.left),
      e = Math.min(this.left + this.width, o.left + o.width);
    if (e >= t) {
      var r = Math.max(this.top, o.top);
      if (o = Math.min(this.top + this.height, o.top + o.height), o >= r) return this.left = t, this.top = r, this.width = e - t, this.height = o - r, !0
    }
    return !1
  }, goog.math.Rect.intersection = function (o, t) {
    var e = Math.max(o.left, t.left),
      r = Math.min(o.left + o.width, t.left + t.width);
    if (r >= e) {
      var g = Math.max(o.top, t.top),
        n = Math.min(o.top + o.height, t.top + t.height);
      if (n >= g) return new goog.math.Rect(e, g, r - e, n - g)
    }
    return null
  }, goog.math.Rect.intersects = function (o, t) {
    return o.left <= t.left + t.width && t.left <= o.left + o.width && o.top <= t.top + t.height && t.top <= o.top + o.height
  }, goog.math.Rect.prototype.intersects = function (o) {
    return goog.math.Rect.intersects(this, o)
  }, goog.math.Rect.difference = function (o, t) {
    var e = goog.math.Rect.intersection(o, t);
    if (!e || !e.height || !e.width) return [o.clone()];
    var e = [],
      r = o.top,
      g = o.height,
      n = o.left + o.width,
      i = o.top + o.height,
      s = t.left + t.width,
      a = t.top + t.height;
    return t.top > o.top && (e.push(new goog.math.Rect(o.left, o.top, o.width, t.top - o.top)), r = t.top, g -= t.top - o.top), i > a && (e.push(new goog.math.Rect(o.left, a, o.width, i - a)), g = a - r), t.left > o.left && e.push(new goog.math.Rect(o.left, r, t.left - o.left, g)), n > s && e.push(new goog.math.Rect(s, r, n - s, g)), e
  }, goog.math.Rect.prototype.difference = function (o) {
    return goog.math.Rect.difference(this, o)
  }, goog.math.Rect.prototype.boundingRect = function (o) {
    var t = Math.max(this.left + this.width, o.left + o.width),
      e = Math.max(this.top + this.height, o.top + o.height);
    this.left = Math.min(this.left, o.left), this.top = Math.min(this.top, o.top), this.width = t - this.left, this.height = e - this.top
  }, goog.math.Rect.boundingRect = function (o, t) {
    if (!o || !t) return null;
    var e = o.clone();
    return e.boundingRect(t), e
  }, goog.math.Rect.prototype.contains = function (o) {
    return o instanceof goog.math.Rect ? this.left <= o.left && this.left + this.width >= o.left + o.width && this.top <= o.top && this.top + this.height >= o.top + o.height : o.x >= this.left && o.x <= this.left + this.width && o.y >= this.top && o.y <= this.top + this.height
  }, goog.math.Rect.prototype.squaredDistance = function (o) {
    var t = o.x < this.left ? this.left - o.x : Math.max(o.x - (this.left + this.width), 0);
    return o = o.y < this.top ? this.top - o.y : Math.max(o.y - (this.top + this.height), 0), t * t + o * o
  }, goog.math.Rect.prototype.distance = function (o) {
    return Math.sqrt(this.squaredDistance(o))
  }, goog.math.Rect.prototype.getSize = function () {
    return new goog.math.Size(this.width, this.height)
  }, goog.math.Rect.prototype.getTopLeft = function () {
    return new goog.math.Coordinate(this.left, this.top)
  }, goog.math.Rect.prototype.getCenter = function () {
    return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
  }, goog.math.Rect.prototype.getBottomRight = function () {
    return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
  }, goog.math.Rect.prototype.ceil = function () {
    return this.left = Math.ceil(this.left), this.top = Math.ceil(this.top), this.width = Math.ceil(this.width), this.height = Math.ceil(this.height), this
  }, goog.math.Rect.prototype.floor = function () {
    return this.left = Math.floor(this.left), this.top = Math.floor(this.top), this.width = Math.floor(this.width), this.height = Math.floor(this.height), this
  }, goog.math.Rect.prototype.round = function () {
    return this.left = Math.round(this.left), this.top = Math.round(this.top), this.width = Math.round(this.width), this.height = Math.round(this.height), this
  }, goog.math.Rect.prototype.translate = function (o, t) {
    return o instanceof goog.math.Coordinate ? (this.left += o.x, this.top += o.y) : (this.left += goog.asserts.assertNumber(o), goog.isNumber(t) && (this.top += t)), this
  }, goog.math.Rect.prototype.scale = function (o, t) {
    var e = goog.isNumber(t) ? t : o;
    return this.left *= o, this.width *= o, this.top *= e, this.height *= e, this
  }, goog.iter = {}, goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
  }, goog.iter.Iterator = function () {}, goog.iter.Iterator.prototype.next = function () {
    throw goog.iter.StopIteration
  }, goog.iter.Iterator.prototype.__iterator__ = function (o) {
    return this
  }, goog.iter.toIterator = function (o) {
    if (o instanceof goog.iter.Iterator) return o;
    if ("function" == typeof o.__iterator__) return o.__iterator__(!1);
    if (goog.isArrayLike(o)) {
      var t = 0,
        e = new goog.iter.Iterator;
      return e.next = function () {
        for (;;) {
          if (t >= o.length) throw goog.iter.StopIteration;
          if (t in o) return o[t++];
          t++
        }
      }, e
    }
    throw Error("Not implemented")
  }, goog.iter.forEach = function (o, t, e) {
    if (goog.isArrayLike(o)) try {
      goog.array.forEach(o, t, e)
    } catch (r) {
      if (r !== goog.iter.StopIteration) throw r
    } else {
      o = goog.iter.toIterator(o);
      try {
        for (;;) t.call(e, o.next(), void 0, o)
      } catch (g) {
        if (g !== goog.iter.StopIteration) throw g
      }
    }
  }, goog.iter.filter = function (o, t, e) {
    var r = goog.iter.toIterator(o);
    return o = new goog.iter.Iterator, o.next = function () {
      for (;;) {
        var o = r.next();
        if (t.call(e, o, void 0, r)) return o
      }
    }, o
  }, goog.iter.filterFalse = function (o, t, e) {
    return goog.iter.filter(o, goog.functions.not(t), e)
  }, goog.iter.range = function (o, t, e) {
    var r = 0,
      g = o,
      n = e || 1;
    if (1 < arguments.length && (r = o, g = t), 0 == n) throw Error("Range step argument must not be zero");
    var i = new goog.iter.Iterator;
    return i.next = function () {
      if (n > 0 && r >= g || 0 > n && g >= r) throw goog.iter.StopIteration;
      var o = r;
      return r += n, o
    }, i
  }, goog.iter.join = function (o, t) {
    return goog.iter.toArray(o).join(t)
  }, goog.iter.map = function (o, t, e) {
    var r = goog.iter.toIterator(o);
    return o = new goog.iter.Iterator, o.next = function () {
      var o = r.next();
      return t.call(e, o, void 0, r)
    }, o
  }, goog.iter.reduce = function (o, t, e, r) {
    var g = e;
    return goog.iter.forEach(o, function (o) {
      g = t.call(r, g, o)
    }), g
  }, goog.iter.some = function (o, t, e) {
    o = goog.iter.toIterator(o);
    try {
      for (;;)
        if (t.call(e, o.next(), void 0, o)) return !0
    } catch (r) {
      if (r !== goog.iter.StopIteration) throw r
    }
    return !1
  }, goog.iter.every = function (o, t, e) {
    o = goog.iter.toIterator(o);
    try {
      for (;;)
        if (!t.call(e, o.next(), void 0, o)) return !1
    } catch (r) {
      if (r !== goog.iter.StopIteration) throw r
    }
    return !0
  }, goog.iter.chain = function (o) {
    return goog.iter.chainFromIterable(arguments)
  }, goog.iter.chainFromIterable = function (o) {
    var t = goog.iter.toIterator(o);
    o = new goog.iter.Iterator;
    var e = null;
    return o.next = function () {
      for (;;) {
        if (null == e) {
          var o = t.next();
          e = goog.iter.toIterator(o)
        }
        try {
          return e.next()
        } catch (r) {
          if (r !== goog.iter.StopIteration) throw r;
          e = null
        }
      }
    }, o
  }, goog.iter.dropWhile = function (o, t, e) {
    var r = goog.iter.toIterator(o);
    o = new goog.iter.Iterator;
    var g = !0;
    return o.next = function () {
      for (;;) {
        var o = r.next();
        if (!g || !t.call(e, o, void 0, r)) return g = !1, o
      }
    }, o
  }, goog.iter.takeWhile = function (o, t, e) {
    var r = goog.iter.toIterator(o);
    return o = new goog.iter.Iterator, o.next = function () {
      var o = r.next();
      if (t.call(e, o, void 0, r)) return o;
      throw goog.iter.StopIteration
    }, o
  }, goog.iter.toArray = function (o) {
    if (goog.isArrayLike(o)) return goog.array.toArray(o);
    o = goog.iter.toIterator(o);
    var t = [];
    return goog.iter.forEach(o, function (o) {
      t.push(o)
    }), t
  }, goog.iter.equals = function (o, t, e) {
    o = goog.iter.zipLongest({}, o, t);
    var r = e || goog.array.defaultCompareEquality;
    return goog.iter.every(o, function (o) {
      return r(o[0], o[1])
    })
  }, goog.iter.nextOrValue = function (o, t) {
    try {
      return goog.iter.toIterator(o).next()
    } catch (e) {
      if (e != goog.iter.StopIteration) throw e;
      return t
    }
  }, goog.iter.product = function (o) {
    if (goog.array.some(arguments, function (o) {
        return !o.length
      }) || !arguments.length) return new goog.iter.Iterator;
    var t = new goog.iter.Iterator,
      e = arguments,
      r = goog.array.repeat(0, e.length);
    return t.next = function () {
      if (r) {
        for (var o = goog.array.map(r, function (o, t) {
            return e[t][o]
          }), t = r.length - 1; t >= 0; t--) {
          if (goog.asserts.assert(r), r[t] < e[t].length - 1) {
            r[t]++;
            break
          }
          if (0 == t) {
            r = null;
            break
          }
          r[t] = 0
        }
        return o
      }
      throw goog.iter.StopIteration
    }, t
  }, goog.iter.cycle = function (o) {
    var t = goog.iter.toIterator(o),
      e = [],
      r = 0;
    o = new goog.iter.Iterator;
    var g = !1;
    return o.next = function () {
      var o = null;
      if (!g) try {
        return o = t.next(), e.push(o), o
      } catch (n) {
        if (n != goog.iter.StopIteration || goog.array.isEmpty(e)) throw n;
        g = !0
      }
      return o = e[r], r = (r + 1) % e.length, o
    }, o
  }, goog.iter.count = function (o, t) {
    var e = o || 0,
      r = goog.isDef(t) ? t : 1,
      g = new goog.iter.Iterator;
    return g.next = function () {
      var o = e;
      return e += r, o
    }, g
  }, goog.iter.repeat = function (o) {
    var t = new goog.iter.Iterator;
    return t.next = goog.functions.constant(o), t
  }, goog.iter.accumulate = function (o) {
    var t = goog.iter.toIterator(o),
      e = 0;
    return o = new goog.iter.Iterator, o.next = function () {
      return e += t.next()
    }, o
  }, goog.iter.zip = function (o) {
    var t = arguments,
      e = new goog.iter.Iterator;
    if (0 < t.length) {
      var r = goog.array.map(t, goog.iter.toIterator);
      e.next = function () {
        return goog.array.map(r, function (o) {
          return o.next()
        })
      }
    }
    return e
  }, goog.iter.zipLongest = function (o, t) {
    var e = goog.array.slice(arguments, 1),
      r = new goog.iter.Iterator;
    if (0 < e.length) {
      var g = goog.array.map(e, goog.iter.toIterator);
      r.next = function () {
        var t = !1,
          e = goog.array.map(g, function (e) {
            var r;
            try {
              r = e.next(), t = !0
            } catch (g) {
              if (g !== goog.iter.StopIteration) throw g;
              r = o
            }
            return r
          });
        if (!t) throw goog.iter.StopIteration;
        return e
      }
    }
    return r
  }, goog.iter.compress = function (o, t) {
    var e = goog.iter.toIterator(t);
    return goog.iter.filter(o, function () {
      return !!e.next()
    })
  }, goog.iter.GroupByIterator_ = function (o, t) {
    this.iterator = goog.iter.toIterator(o), this.keyFunc = t || goog.functions.identity
  }, goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator), goog.iter.GroupByIterator_.prototype.next = function () {
    for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
    return this.targetKey = this.currentKey, [this.currentKey, this.groupItems_(this.targetKey)]
  }, goog.iter.GroupByIterator_.prototype.groupItems_ = function (o) {
    for (var t = []; this.currentKey == o;) {
      t.push(this.currentValue);
      try {
        this.currentValue = this.iterator.next()
      } catch (e) {
        if (e !== goog.iter.StopIteration) throw e;
        break
      }
      this.currentKey = this.keyFunc(this.currentValue)
    }
    return t
  }, goog.iter.groupBy = function (o, t) {
    return new goog.iter.GroupByIterator_(o, t)
  }, goog.iter.starMap = function (o, t, e) {
    var r = goog.iter.toIterator(o);
    return o = new goog.iter.Iterator, o.next = function () {
      var o = goog.iter.toArray(r.next());
      return t.apply(e, goog.array.concat(o, void 0, r))
    }, o
  }, goog.iter.tee = function (o, t) {
    var e = goog.iter.toIterator(o),
      r = goog.isNumber(t) ? t : 2,
      g = goog.array.map(goog.array.range(r), function () {
        return []
      }),
      n = function () {
        var o = e.next();
        goog.array.forEach(g, function (t) {
          t.push(o)
        })
      };
    return goog.array.map(g, function (o) {
      var t = new goog.iter.Iterator;
      return t.next = function () {
        return goog.array.isEmpty(o) && n(), goog.asserts.assert(!goog.array.isEmpty(o)), o.shift()
      }, t
    })
  }, goog.iter.enumerate = function (o, t) {
    return goog.iter.zip(goog.iter.count(t), o)
  }, goog.iter.limit = function (o, t) {
    goog.asserts.assert(goog.math.isInt(t) && t >= 0);
    var e = goog.iter.toIterator(o),
      r = new goog.iter.Iterator,
      g = t;
    return r.next = function () {
      if (0 < g--) return e.next();
      throw goog.iter.StopIteration
    }, r
  }, goog.iter.consume = function (o, t) {
    goog.asserts.assert(goog.math.isInt(t) && t >= 0);
    for (var e = goog.iter.toIterator(o); 0 < t--;) goog.iter.nextOrValue(e, null);
    return e
  }, goog.iter.slice = function (o, t, e) {
    return goog.asserts.assert(goog.math.isInt(t) && t >= 0), o = goog.iter.consume(o, t), goog.isNumber(e) && (goog.asserts.assert(goog.math.isInt(e) && e >= t), o = goog.iter.limit(o, e - t)), o
  }, goog.iter.hasDuplicates_ = function (o) {
    var t = [];
    return goog.array.removeDuplicates(o, t), o.length != t.length
  }, goog.iter.permutations = function (o, t) {
    var e = goog.iter.toArray(o),
      r = goog.isNumber(t) ? t : e.length,
      e = goog.array.repeat(e, r),
      e = goog.iter.product.apply(void 0, e);
    return goog.iter.filter(e, function (o) {
      return !goog.iter.hasDuplicates_(o)
    })
  }, goog.iter.combinations = function (o, t) {
    function e(o) {
      return r[o]
    }
    var r = goog.iter.toArray(o),
      g = goog.iter.range(r.length),
      g = goog.iter.permutations(g, t),
      n = goog.iter.filter(g, function (o) {
        return goog.array.isSorted(o)
      }),
      g = new goog.iter.Iterator;
    return g.next = function () {
      return goog.array.map(n.next(), e)
    }, g
  }, goog.iter.combinationsWithReplacement = function (o, t) {
    function e(o) {
      return r[o]
    }
    var r = goog.iter.toArray(o),
      g = goog.array.range(r.length),
      g = goog.array.repeat(g, t),
      g = goog.iter.product.apply(void 0, g),
      n = goog.iter.filter(g, function (o) {
        return goog.array.isSorted(o)
      }),
      g = new goog.iter.Iterator;
    return g.next = function () {
      return goog.array.map(n.next(), e)
    }, g
  }, goog.labs.userAgent.browser = {}, goog.labs.userAgent.browser.matchOpera_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Opera")
  }, goog.labs.userAgent.browser.matchIE_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
  }, goog.labs.userAgent.browser.matchEdge_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
  }, goog.labs.userAgent.browser.matchFirefox_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
  }, goog.labs.userAgent.browser.matchSafari_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
  }, goog.labs.userAgent.browser.matchCoast_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
  }, goog.labs.userAgent.browser.matchIosWebview_ = function () {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
  }, goog.labs.userAgent.browser.matchChrome_ = function () {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_()
  }, goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
  }, goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_, goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_, goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_, goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_, goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_, goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_, goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_, goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_, goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_, goog.labs.userAgent.browser.isSilk = function () {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
  }, goog.labs.userAgent.browser.getVersion = function () {
    function o(o) {
      return o = goog.array.find(o, r), e[o] || ""
    }
    var t = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(t);
    var t = goog.labs.userAgent.util.extractVersionTuples(t),
      e = {};
    goog.array.forEach(t, function (o) {
      e[o[0]] = o[1]
    });
    var r = goog.partial(goog.object.containsKey, e);
    return goog.labs.userAgent.browser.isOpera() ? o(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? o(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? o(["Chrome", "CriOS"]) : (t = t[2]) && t[1] || ""
  }, goog.labs.userAgent.browser.isVersionOrHigher = function (o) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), o)
  }, goog.labs.userAgent.browser.getIEVersion_ = function (o) {
    var t = /rv: *([\d\.]*)/.exec(o);
    if (t && t[1]) return t[1];
    var t = "",
      e = /MSIE +([\d\.]+)/.exec(o);
    if (e && e[1])
      if (o = /Trident\/(\d.\d)/.exec(o), "7.0" == e[1])
        if (o && o[1]) switch (o[1]) {
        case "4.0":
          t = "8.0";
          break;
        case "5.0":
          t = "9.0";
          break;
        case "6.0":
          t = "10.0";
          break;
        case "7.0":
          t = "11.0"
        } else t = "7.0";
        else t = e[1];
    return t
  }, goog.labs.userAgent.engine = {}, goog.labs.userAgent.engine.isPresto = function () {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
  }, goog.labs.userAgent.engine.isTrident = function () {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
  }, goog.labs.userAgent.engine.isEdge = function () {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
  }, goog.labs.userAgent.engine.isWebKit = function () {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
  }, goog.labs.userAgent.engine.isGecko = function () {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
  }, goog.labs.userAgent.engine.getVersion = function () {
    var o = goog.labs.userAgent.util.getUserAgent();
    if (o) {
      var o = goog.labs.userAgent.util.extractVersionTuples(o),
        t = goog.labs.userAgent.engine.getEngineTuple_(o);
      if (t) return "Gecko" == t[0] ? goog.labs.userAgent.engine.getVersionForKey_(o, "Firefox") : t[1];
      var e, o = o[0];
      if (o && (e = o[2]) && (e = /Trident\/([^\s;]+)/.exec(e))) return e[1]
    }
    return ""
  }, goog.labs.userAgent.engine.getEngineTuple_ = function (o) {
    if (!goog.labs.userAgent.engine.isEdge()) return o[1];
    for (var t = 0; t < o.length; t++) {
      var e = o[t];
      if ("Edge" == e[0]) return e
    }
  }, goog.labs.userAgent.engine.isVersionOrHigher = function (o) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), o)
  }, goog.labs.userAgent.engine.getVersionForKey_ = function (o, t) {
    var e = goog.array.find(o, function (o) {
      return t == o[0]
    });
    return e && e[1] || ""
  }, goog.structs = {}, goog.structs.getCount = function (o) {
    return o.getCount && "function" == typeof o.getCount ? o.getCount() : goog.isArrayLike(o) || goog.isString(o) ? o.length : goog.object.getCount(o)
  }, goog.structs.getValues = function (o) {
    if (o.getValues && "function" == typeof o.getValues) return o.getValues();
    if (goog.isString(o)) return o.split("");
    if (goog.isArrayLike(o)) {
      for (var t = [], e = o.length, r = 0; e > r; r++) t.push(o[r]);
      return t
    }
    return goog.object.getValues(o)
  }, goog.structs.getKeys = function (o) {
    if (o.getKeys && "function" == typeof o.getKeys) return o.getKeys();
    if (!o.getValues || "function" != typeof o.getValues) {
      if (goog.isArrayLike(o) || goog.isString(o)) {
        var t = [];
        o = o.length;
        for (var e = 0; o > e; e++) t.push(e);
        return t
      }
      return goog.object.getKeys(o)
    }
  }, goog.structs.contains = function (o, t) {
    return o.contains && "function" == typeof o.contains ? o.contains(t) : o.containsValue && "function" == typeof o.containsValue ? o.containsValue(t) : goog.isArrayLike(o) || goog.isString(o) ? goog.array.contains(o, t) : goog.object.containsValue(o, t)
  }, goog.structs.isEmpty = function (o) {
    return o.isEmpty && "function" == typeof o.isEmpty ? o.isEmpty() : goog.isArrayLike(o) || goog.isString(o) ? goog.array.isEmpty(o) : goog.object.isEmpty(o)
  }, goog.structs.clear = function (o) {
    o.clear && "function" == typeof o.clear ? o.clear() : goog.isArrayLike(o) ? goog.array.clear(o) : goog.object.clear(o)
  }, goog.structs.forEach = function (o, t, e) {
    if (o.forEach && "function" == typeof o.forEach) o.forEach(t, e);
    else if (goog.isArrayLike(o) || goog.isString(o)) goog.array.forEach(o, t, e);
    else
      for (var r = goog.structs.getKeys(o), g = goog.structs.getValues(o), n = g.length, i = 0; n > i; i++) t.call(e, g[i], r && r[i], o)
  }, goog.structs.filter = function (o, t, e) {
    if ("function" == typeof o.filter) return o.filter(t, e);
    if (goog.isArrayLike(o) || goog.isString(o)) return goog.array.filter(o, t, e);
    var r, g = goog.structs.getKeys(o),
      n = goog.structs.getValues(o),
      i = n.length;
    if (g) {
      r = {};
      for (var s = 0; i > s; s++) t.call(e, n[s], g[s], o) && (r[g[s]] = n[s])
    } else
      for (r = [], s = 0; i > s; s++) t.call(e, n[s], void 0, o) && r.push(n[s]);
    return r
  }, goog.structs.map = function (o, t, e) {
    if ("function" == typeof o.map) return o.map(t, e);
    if (goog.isArrayLike(o) || goog.isString(o)) return goog.array.map(o, t, e);
    var r, g = goog.structs.getKeys(o),
      n = goog.structs.getValues(o),
      i = n.length;
    if (g) {
      r = {};
      for (var s = 0; i > s; s++) r[g[s]] = t.call(e, n[s], g[s], o)
    } else
      for (r = [], s = 0; i > s; s++) r[s] = t.call(e, n[s], void 0, o);
    return r
  }, goog.structs.some = function (o, t, e) {
    if ("function" == typeof o.some) return o.some(t, e);
    if (goog.isArrayLike(o) || goog.isString(o)) return goog.array.some(o, t, e);
    for (var r = goog.structs.getKeys(o), g = goog.structs.getValues(o), n = g.length, i = 0; n > i; i++)
      if (t.call(e, g[i], r && r[i], o)) return !0;
    return !1
  }, goog.structs.every = function (o, t, e) {
    if ("function" == typeof o.every) return o.every(t, e);
    if (goog.isArrayLike(o) || goog.isString(o)) return goog.array.every(o, t, e);
    for (var r = goog.structs.getKeys(o), g = goog.structs.getValues(o), n = g.length, i = 0; n > i; i++)
      if (!t.call(e, g[i], r && r[i], o)) return !1;
    return !0
  }, goog.structs.Map = function (o, t) {
    this.map_ = {}, this.keys_ = [], this.version_ = this.count_ = 0;
    var e = arguments.length;
    if (e > 1) {
      if (e % 2) throw Error("Uneven number of arguments");
      for (var r = 0; e > r; r += 2) this.set(arguments[r], arguments[r + 1])
    } else o && this.addAll(o)
  }, goog.structs.Map.prototype.getCount = function () {
    return this.count_
  }, goog.structs.Map.prototype.getValues = function () {
    this.cleanupKeysArray_();
    for (var o = [], t = 0; t < this.keys_.length; t++) o.push(this.map_[this.keys_[t]]);
    return o
  }, goog.structs.Map.prototype.getKeys = function () {
    return this.cleanupKeysArray_(), this.keys_.concat()
  }, goog.structs.Map.prototype.containsKey = function (o) {
    return goog.structs.Map.hasKey_(this.map_, o)
  }, goog.structs.Map.prototype.containsValue = function (o) {
    for (var t = 0; t < this.keys_.length; t++) {
      var e = this.keys_[t];
      if (goog.structs.Map.hasKey_(this.map_, e) && this.map_[e] == o) return !0
    }
    return !1
  }, goog.structs.Map.prototype.equals = function (o, t) {
    if (this === o) return !0;
    if (this.count_ != o.getCount()) return !1;
    var e = t || goog.structs.Map.defaultEquals;
    this.cleanupKeysArray_();
    for (var r, g = 0; r = this.keys_[g]; g++)
      if (!e(this.get(r), o.get(r))) return !1;
    return !0
  }, goog.structs.Map.defaultEquals = function (o, t) {
    return o === t
  }, goog.structs.Map.prototype.isEmpty = function () {
    return 0 == this.count_
  }, goog.structs.Map.prototype.clear = function () {
    this.map_ = {}, this.version_ = this.count_ = this.keys_.length = 0
  }, goog.structs.Map.prototype.remove = function (o) {
    return goog.structs.Map.hasKey_(this.map_, o) ? (delete this.map_[o], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
  }, goog.structs.Map.prototype.cleanupKeysArray_ = function () {
    if (this.count_ != this.keys_.length) {
      for (var o = 0, t = 0; o < this.keys_.length;) {
        var e = this.keys_[o];
        goog.structs.Map.hasKey_(this.map_, e) && (this.keys_[t++] = e), o++
      }
      this.keys_.length = t
    }
    if (this.count_ != this.keys_.length) {
      for (var r = {}, t = o = 0; o < this.keys_.length;) e = this.keys_[o], goog.structs.Map.hasKey_(r, e) || (this.keys_[t++] = e, r[e] = 1), o++;
      this.keys_.length = t
    }
  }, goog.structs.Map.prototype.get = function (o, t) {
    return goog.structs.Map.hasKey_(this.map_, o) ? this.map_[o] : t
  }, goog.structs.Map.prototype.set = function (o, t) {
    goog.structs.Map.hasKey_(this.map_, o) || (this.count_++, this.keys_.push(o), this.version_++), this.map_[o] = t
  }, goog.structs.Map.prototype.addAll = function (o) {
    var t;
    o instanceof goog.structs.Map ? (t = o.getKeys(), o = o.getValues()) : (t = goog.object.getKeys(o), o = goog.object.getValues(o));
    for (var e = 0; e < t.length; e++) this.set(t[e], o[e])
  }, goog.structs.Map.prototype.forEach = function (o, t) {
    for (var e = this.getKeys(), r = 0; r < e.length; r++) {
      var g = e[r],
        n = this.get(g);
      o.call(t, n, g, this)
    }
  }, goog.structs.Map.prototype.clone = function () {
    return new goog.structs.Map(this)
  }, goog.structs.Map.prototype.transpose = function () {
    for (var o = new goog.structs.Map, t = 0; t < this.keys_.length; t++) {
      var e = this.keys_[t];
      o.set(this.map_[e], e)
    }
    return o
  }, goog.structs.Map.prototype.toObject = function () {
    this.cleanupKeysArray_();
    for (var o = {}, t = 0; t < this.keys_.length; t++) {
      var e = this.keys_[t];
      o[e] = this.map_[e]
    }
    return o
  }, goog.structs.Map.prototype.getKeyIterator = function () {
    return this.__iterator__(!0)
  }, goog.structs.Map.prototype.getValueIterator = function () {
    return this.__iterator__(!1)
  }, goog.structs.Map.prototype.__iterator__ = function (o) {
    this.cleanupKeysArray_();
    var t = 0,
      e = this.version_,
      r = this,
      g = new goog.iter.Iterator;
    return g.next = function () {
      if (e != r.version_) throw Error("The map has changed since the iterator was created");
      if (t >= r.keys_.length) throw goog.iter.StopIteration;
      var g = r.keys_[t++];
      return o ? g : r.map_[g]
    }, g
  }, goog.structs.Map.hasKey_ = function (o, t) {
    return Object.prototype.hasOwnProperty.call(o, t)
  }, goog.Uri = function (o, t) {
    this.domain_ = this.userInfo_ = this.scheme_ = "", this.port_ = null, this.fragment_ = this.path_ = "", this.ignoreCase_ = this.isReadOnly_ = !1;
    var e;
    o instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(t) ? t : o.getIgnoreCase(), this.setScheme(o.getScheme()), this.setUserInfo(o.getUserInfo()), this.setDomain(o.getDomain()), this.setPort(o.getPort()), this.setPath(o.getPath()), this.setQueryData(o.getQueryData().clone()), this.setFragment(o.getFragment())) : o && (e = goog.uri.utils.split(String(o))) ? (this.ignoreCase_ = !!t, this.setScheme(e[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(e[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain(e[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(e[goog.uri.utils.ComponentIndex.PORT]), this.setPath(e[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(e[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(e[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!t, this.queryData_ = new goog.Uri.QueryData(null, null, this.ignoreCase_))
  }, goog.Uri.preserveParameterTypesCompatibilityFlag = !1, goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM, goog.Uri.prototype.toString = function () {
    var o = [],
      t = this.getScheme();
    t && o.push(goog.Uri.encodeSpecialChars_(t, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
    var e = this.getDomain();
    return (e || "file" == t) && (o.push("//"), (t = this.getUserInfo()) && o.push(goog.Uri.encodeSpecialChars_(t, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@"), o.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(e))), e = this.getPort(), null != e && o.push(":", String(e))), (e = this.getPath()) && (this.hasDomain() && "/" != e.charAt(0) && o.push("/"), o.push(goog.Uri.encodeSpecialChars_(e, "/" == e.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0))), (e = this.getEncodedQuery()) && o.push("?", e), (e = this.getFragment()) && o.push("#", goog.Uri.encodeSpecialChars_(e, goog.Uri.reDisallowedInFragment_)), o.join("")
  }, goog.Uri.prototype.resolve = function (o) {
    var t = this.clone(),
      e = o.hasScheme();
    e ? t.setScheme(o.getScheme()) : e = o.hasUserInfo(), e ? t.setUserInfo(o.getUserInfo()) : e = o.hasDomain(), e ? t.setDomain(o.getDomain()) : e = o.hasPort();
    var r = o.getPath();
    if (e) t.setPort(o.getPort());
    else if (e = o.hasPath()) {
      if ("/" != r.charAt(0))
        if (this.hasDomain() && !this.hasPath()) r = "/" + r;
        else {
          var g = t.getPath().lastIndexOf("/"); - 1 != g && (r = t.getPath().substr(0, g + 1) + r)
        }
      r = goog.Uri.removeDotSegments(r)
    }
    return e ? t.setPath(r) : e = o.hasQuery(), e ? t.setQueryData(o.getDecodedQuery()) : e = o.hasFragment(), e && t.setFragment(o.getFragment()), t
  }, goog.Uri.prototype.clone = function () {
    return new goog.Uri(this)
  }, goog.Uri.prototype.getScheme = function () {
    return this.scheme_
  }, goog.Uri.prototype.setScheme = function (o, t) {
    return this.enforceReadOnly(), (this.scheme_ = t ? goog.Uri.decodeOrEmpty_(o, !0) : o) && (this.scheme_ = this.scheme_.replace(/:$/, "")), this
  }, goog.Uri.prototype.hasScheme = function () {
    return !!this.scheme_
  }, goog.Uri.prototype.getUserInfo = function () {
    return this.userInfo_
  }, goog.Uri.prototype.setUserInfo = function (o, t) {
    return this.enforceReadOnly(), this.userInfo_ = t ? goog.Uri.decodeOrEmpty_(o) : o, this
  }, goog.Uri.prototype.hasUserInfo = function () {
    return !!this.userInfo_
  }, goog.Uri.prototype.getDomain = function () {
    return this.domain_
  }, goog.Uri.prototype.setDomain = function (o, t) {
    return this.enforceReadOnly(), this.domain_ = t ? goog.Uri.decodeOrEmpty_(o, !0) : o, this
  }, goog.Uri.prototype.hasDomain = function () {
    return !!this.domain_
  }, goog.Uri.prototype.getPort = function () {
    return this.port_
  }, goog.Uri.prototype.setPort = function (o) {
    if (this.enforceReadOnly(), o) {
      if (o = Number(o), isNaN(o) || 0 > o) throw Error("Bad port number " + o);
      this.port_ = o
    } else this.port_ = null;
    return this
  }, goog.Uri.prototype.hasPort = function () {
    return null != this.port_
  }, goog.Uri.prototype.getPath = function () {
    return this.path_
  }, goog.Uri.prototype.setPath = function (o, t) {
    return this.enforceReadOnly(), this.path_ = t ? goog.Uri.decodeOrEmpty_(o, !0) : o, this
  }, goog.Uri.prototype.hasPath = function () {
    return !!this.path_
  }, goog.Uri.prototype.hasQuery = function () {
    return "" !== this.queryData_.toString()
  }, goog.Uri.prototype.setQueryData = function (o, t) {
    return this.enforceReadOnly(), o instanceof goog.Uri.QueryData ? (this.queryData_ = o, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (t || (o = goog.Uri.encodeSpecialChars_(o, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(o, null, this.ignoreCase_)), this
  }, goog.Uri.prototype.setQuery = function (o, t) {
    return this.setQueryData(o, t)
  }, goog.Uri.prototype.getEncodedQuery = function () {
    return this.queryData_.toString()
  }, goog.Uri.prototype.getDecodedQuery = function () {
    return this.queryData_.toDecodedString()
  }, goog.Uri.prototype.getQueryData = function () {
    return this.queryData_
  }, goog.Uri.prototype.getQuery = function () {
    return this.getEncodedQuery()
  }, goog.Uri.prototype.setParameterValue = function (o, t) {
    return this.enforceReadOnly(), this.queryData_.set(o, t), this
  }, goog.Uri.prototype.setParameterValues = function (o, t) {
    return this.enforceReadOnly(), goog.isArray(t) || (t = [String(t)]), this.queryData_.setValues(o, t), this
  }, goog.Uri.prototype.getParameterValues = function (o) {
    return this.queryData_.getValues(o)
  }, goog.Uri.prototype.getParameterValue = function (o) {
    return this.queryData_.get(o)
  }, goog.Uri.prototype.getFragment = function () {
    return this.fragment_
  }, goog.Uri.prototype.setFragment = function (o, t) {
    return this.enforceReadOnly(), this.fragment_ = t ? goog.Uri.decodeOrEmpty_(o) : o, this
  }, goog.Uri.prototype.hasFragment = function () {
    return !!this.fragment_
  }, goog.Uri.prototype.hasSameDomainAs = function (o) {
    return !((this.hasDomain() || o.hasDomain()) && this.getDomain() != o.getDomain() || (this.hasPort() || o.hasPort()) && this.getPort() != o.getPort())
  }, goog.Uri.prototype.makeUnique = function () {
    return this.enforceReadOnly(), this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString()), this
  }, goog.Uri.prototype.removeParameter = function (o) {
    return this.enforceReadOnly(), this.queryData_.remove(o), this
  }, goog.Uri.prototype.setReadOnly = function (o) {
    return this.isReadOnly_ = o, this
  }, goog.Uri.prototype.isReadOnly = function () {
    return this.isReadOnly_
  }, goog.Uri.prototype.enforceReadOnly = function () {
    if (this.isReadOnly_) throw Error("Tried to modify a read-only Uri")
  }, goog.Uri.prototype.setIgnoreCase = function (o) {
    return this.ignoreCase_ = o, this.queryData_ && this.queryData_.setIgnoreCase(o), this
  }, goog.Uri.prototype.getIgnoreCase = function () {
    return this.ignoreCase_
  }, goog.Uri.parse = function (o, t) {
    return o instanceof goog.Uri ? o.clone() : new goog.Uri(o, t)
  }, goog.Uri.create = function (o, t, e, r, g, n, i, s) {
    return s = new goog.Uri(null, s), o && s.setScheme(o), t && s.setUserInfo(t), e && s.setDomain(e), r && s.setPort(r), g && s.setPath(g), n && s.setQueryData(n), i && s.setFragment(i), s
  }, goog.Uri.resolve = function (o, t) {
    return o instanceof goog.Uri || (o = goog.Uri.parse(o)), t instanceof goog.Uri || (t = goog.Uri.parse(t)), o.resolve(t)
  }, goog.Uri.removeDotSegments = function (o) {
    if (".." == o || "." == o) return "";
    if (goog.string.contains(o, "./") || goog.string.contains(o, "/.")) {
      var t = goog.string.startsWith(o, "/");
      o = o.split("/");
      for (var e = [], r = 0; r < o.length;) {
        var g = o[r++];
        "." == g ? t && r == o.length && e.push("") : ".." == g ? ((1 < e.length || 1 == e.length && "" != e[0]) && e.pop(), t && r == o.length && e.push("")) : (e.push(g), t = !0)
      }
      return e.join("/")
    }
    return o
  }, goog.Uri.decodeOrEmpty_ = function (o, t) {
    return o ? t ? decodeURI(o.replace(/%25/g, "%2525")) : decodeURIComponent(o) : ""
  }, goog.Uri.encodeSpecialChars_ = function (o, t, e) {
    return goog.isString(o) ? (o = encodeURI(o).replace(t, goog.Uri.encodeChar_), e && (o = goog.Uri.removeDoubleEncoding_(o)), o) : null
  }, goog.Uri.encodeChar_ = function (o) {
    return o = o.charCodeAt(0), "%" + (o >> 4 & 15).toString(16) + (15 & o).toString(16)
  }, goog.Uri.removeDoubleEncoding_ = function (o) {
    return o.replace(/%25([0-9a-fA-F]{2})/g, "%$1")
  }, goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g, goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g, goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g, goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g, goog.Uri.reDisallowedInFragment_ = /#/g, goog.Uri.haveSameDomain = function (o, t) {
    var e = goog.uri.utils.split(o),
      r = goog.uri.utils.split(t);
    return e[goog.uri.utils.ComponentIndex.DOMAIN] == r[goog.uri.utils.ComponentIndex.DOMAIN] && e[goog.uri.utils.ComponentIndex.PORT] == r[goog.uri.utils.ComponentIndex.PORT]
  }, goog.Uri.QueryData = function (o, t, e) {
    this.count_ = this.keyMap_ = null, this.encodedQuery_ = o || null, this.ignoreCase_ = !!e
  }, goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function () {
    if (!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
      var o = this;
      goog.uri.utils.parseQueryData(this.encodedQuery_, function (t, e) {
        o.add(goog.string.urlDecode(t), e)
      })
    }
  }, goog.Uri.QueryData.createFromMap = function (o, t, e) {
    if (t = goog.structs.getKeys(o), "undefined" == typeof t) throw Error("Keys are undefined");
    e = new goog.Uri.QueryData(null, null, e), o = goog.structs.getValues(o);
    for (var r = 0; r < t.length; r++) {
      var g = t[r],
        n = o[r];
      goog.isArray(n) ? e.setValues(g, n) : e.add(g, n)
    }
    return e
  }, goog.Uri.QueryData.createFromKeysValues = function (o, t, e, r) {
    if (o.length != t.length) throw Error("Mismatched lengths for keys/values");
    for (e = new goog.Uri.QueryData(null, null, r), r = 0; r < o.length; r++) e.add(o[r], t[r]);
    return e
  }, goog.Uri.QueryData.prototype.getCount = function () {
    return this.ensureKeyMapInitialized_(), this.count_
  }, goog.Uri.QueryData.prototype.add = function (o, t) {
    this.ensureKeyMapInitialized_(), this.invalidateCache_(), o = this.getKeyName_(o);
    var e = this.keyMap_.get(o);
    return e || this.keyMap_.set(o, e = []), e.push(t), this.count_ = goog.asserts.assertNumber(this.count_) + 1, this
  }, goog.Uri.QueryData.prototype.remove = function (o) {
    return this.ensureKeyMapInitialized_(), o = this.getKeyName_(o), this.keyMap_.containsKey(o) ? (this.invalidateCache_(), this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(o).length, this.keyMap_.remove(o)) : !1
  }, goog.Uri.QueryData.prototype.clear = function () {
    this.invalidateCache_(), this.keyMap_ = null, this.count_ = 0
  }, goog.Uri.QueryData.prototype.isEmpty = function () {
    return this.ensureKeyMapInitialized_(), 0 == this.count_
  }, goog.Uri.QueryData.prototype.containsKey = function (o) {
    return this.ensureKeyMapInitialized_(), o = this.getKeyName_(o), this.keyMap_.containsKey(o)
  }, goog.Uri.QueryData.prototype.containsValue = function (o) {
    var t = this.getValues();
    return goog.array.contains(t, o)
  }, goog.Uri.QueryData.prototype.getKeys = function () {
    this.ensureKeyMapInitialized_();
    for (var o = this.keyMap_.getValues(), t = this.keyMap_.getKeys(), e = [], r = 0; r < t.length; r++)
      for (var g = o[r], n = 0; n < g.length; n++) e.push(t[r]);
    return e
  }, goog.Uri.QueryData.prototype.getValues = function (o) {
    this.ensureKeyMapInitialized_();
    var t = [];
    if (goog.isString(o)) this.containsKey(o) && (t = goog.array.concat(t, this.keyMap_.get(this.getKeyName_(o))));
    else {
      o = this.keyMap_.getValues();
      for (var e = 0; e < o.length; e++) t = goog.array.concat(t, o[e])
    }
    return t
  }, goog.Uri.QueryData.prototype.set = function (o, t) {
    return this.ensureKeyMapInitialized_(), this.invalidateCache_(), o = this.getKeyName_(o), this.containsKey(o) && (this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(o).length), this.keyMap_.set(o, [t]), this.count_ = goog.asserts.assertNumber(this.count_) + 1, this
  }, goog.Uri.QueryData.prototype.get = function (o, t) {
    var e = o ? this.getValues(o) : [];
    return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < e.length ? e[0] : t : 0 < e.length ? String(e[0]) : t
  }, goog.Uri.QueryData.prototype.setValues = function (o, t) {
    this.remove(o), 0 < t.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(o), goog.array.clone(t)), this.count_ = goog.asserts.assertNumber(this.count_) + t.length)
  }, goog.Uri.QueryData.prototype.toString = function () {
    if (this.encodedQuery_) return this.encodedQuery_;
    if (!this.keyMap_) return "";
    for (var o = [], t = this.keyMap_.getKeys(), e = 0; e < t.length; e++)
      for (var r = t[e], g = goog.string.urlEncode(r), r = this.getValues(r), n = 0; n < r.length; n++) {
        var i = g;
        "" !== r[n] && (i += "=" + goog.string.urlEncode(r[n])), o.push(i)
      }
    return this.encodedQuery_ = o.join("&")
  }, goog.Uri.QueryData.prototype.toDecodedString = function () {
    return goog.Uri.decodeOrEmpty_(this.toString())
  }, goog.Uri.QueryData.prototype.invalidateCache_ = function () {
    this.encodedQuery_ = null
  }, goog.Uri.QueryData.prototype.filterKeys = function (o) {
    return this.ensureKeyMapInitialized_(), this.keyMap_.forEach(function (t, e) {
      goog.array.contains(o, e) || this.remove(e)
    }, this), this
  }, goog.Uri.QueryData.prototype.clone = function () {
    var o = new goog.Uri.QueryData;
    return o.encodedQuery_ = this.encodedQuery_, this.keyMap_ && (o.keyMap_ = this.keyMap_.clone(), o.count_ = this.count_), o
  }, goog.Uri.QueryData.prototype.getKeyName_ = function (o) {
    return o = String(o), this.ignoreCase_ && (o = o.toLowerCase()), o
  }, goog.Uri.QueryData.prototype.setIgnoreCase = function (o) {
    o && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function (o, t) {
      var e = t.toLowerCase();
      t != e && (this.remove(t), this.setValues(e, o))
    }, this)), this.ignoreCase_ = o
  }, goog.Uri.QueryData.prototype.extend = function (o) {
    for (var t = 0; t < arguments.length; t++) goog.structs.forEach(arguments[t], function (o, t) {
      this.add(t, o)
    }, this)
  }, goog.html.SafeStyleSheet = function () {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "", this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
  }, goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0, goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeStyleSheet.concat = function (o) {
    var t = "",
      e = function (o) {
        goog.isArray(o) ? goog.array.forEach(o, e) : t += goog.html.SafeStyleSheet.unwrap(o)
      };
    return goog.array.forEach(arguments, e), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(t)
  }, goog.html.SafeStyleSheet.fromConstant = function (o) {
    return o = goog.string.Const.unwrap(o), 0 === o.length ? goog.html.SafeStyleSheet.EMPTY : (goog.asserts.assert(!goog.string.contains(o, "<"), "Forbidden '<' character in style sheet string: " + o), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o))
  }, goog.html.SafeStyleSheet.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
  }, goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function () {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
  }), goog.html.SafeStyleSheet.unwrap = function (o) {
    return o instanceof goog.html.SafeStyleSheet && o.constructor === goog.html.SafeStyleSheet && o.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? o.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ : (goog.asserts.fail("expected object of type SafeStyleSheet, got '" + o + "' of type " + goog.typeOf(o)), "type_error:SafeStyleSheet")
  }, goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function (o) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(o)
  }, goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (o) {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = o, this
  }, goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(""), goog.html.SafeStyle = function () {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "", this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
  }, goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0, goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeStyle.fromConstant = function (o) {
    return o = goog.string.Const.unwrap(o), 0 === o.length ? goog.html.SafeStyle.EMPTY : (goog.html.SafeStyle.checkStyle_(o), goog.asserts.assert(goog.string.endsWith(o, ";"), "Last character of style string is not ';': " + o), goog.asserts.assert(goog.string.contains(o, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + o), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o))
  }, goog.html.SafeStyle.checkStyle_ = function (o) {
    goog.asserts.assert(!/[<>]/.test(o), "Forbidden characters in style string: " + o)
  }, goog.html.SafeStyle.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
  }, goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function () {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
  }), goog.html.SafeStyle.unwrap = function (o) {
    return o instanceof goog.html.SafeStyle && o.constructor === goog.html.SafeStyle && o.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? o.privateDoNotAccessOrElseSafeStyleWrappedValue_ : (goog.asserts.fail("expected object of type SafeStyle, got '" + o + "' of type " + goog.typeOf(o)), "type_error:SafeStyle")
  }, goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function (o) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(o)
  }, goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (o) {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = o, this
  }, goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(""), goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez", goog.html.SafeStyle.create = function (o) {
    var t, e = "";
    for (t in o) {
      if (!/^[-_a-zA-Z0-9]+$/.test(t)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + t);
      var r = o[t];
      null != r && (r instanceof goog.string.Const ? (r = goog.string.Const.unwrap(r), goog.asserts.assert(!/[{;}]/.test(r), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(r) ? goog.html.SafeStyle.hasBalancedQuotes_(r) || (goog.asserts.fail("String value requires balanced quotes, got: " + r), r = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + r), r = goog.html.SafeStyle.INNOCUOUS_STRING), e += t + ":" + r + ";")
    }
    return e ? (goog.html.SafeStyle.checkStyle_(e), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(e)) : goog.html.SafeStyle.EMPTY
  }, goog.html.SafeStyle.hasBalancedQuotes_ = function (o) {
    for (var t = !0, e = !0, r = 0; r < o.length; r++) {
      var g = o.charAt(r);
      "'" == g && e ? t = !t : '"' == g && t && (e = !e)
    }
    return t && e
  }, goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/, goog.html.SafeStyle.concat = function (o) {
    var t = "",
      e = function (o) {
        goog.isArray(o) ? goog.array.forEach(o, e) : t += goog.html.SafeStyle.unwrap(o)
      };
    return goog.array.forEach(arguments, e), t ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(t) : goog.html.SafeStyle.EMPTY
  }, goog.dom.classes = {}, goog.dom.classes.set = function (o, t) {
    o.className = t
  }, goog.dom.classes.get = function (o) {
    return o = o.className, goog.isString(o) && o.match(/\S+/g) || []
  }, goog.dom.classes.add = function (o, t) {
    var e = goog.dom.classes.get(o),
      r = goog.array.slice(arguments, 1),
      g = e.length + r.length;
    return goog.dom.classes.add_(e, r), goog.dom.classes.set(o, e.join(" ")), e.length == g
  }, goog.dom.classes.remove = function (o, t) {
    var e = goog.dom.classes.get(o),
      r = goog.array.slice(arguments, 1),
      g = goog.dom.classes.getDifference_(e, r);
    return goog.dom.classes.set(o, g.join(" ")), g.length == e.length - r.length
  }, goog.dom.classes.add_ = function (o, t) {
    for (var e = 0; e < t.length; e++) goog.array.contains(o, t[e]) || o.push(t[e])
  }, goog.dom.classes.getDifference_ = function (o, t) {
    return goog.array.filter(o, function (o) {
      return !goog.array.contains(t, o)
    })
  }, goog.dom.classes.swap = function (o, t, e) {
    for (var r = goog.dom.classes.get(o), g = !1, n = 0; n < r.length; n++) r[n] == t && (goog.array.splice(r, n--, 1), g = !0);
    return g && (r.push(e), goog.dom.classes.set(o, r.join(" "))), g
  }, goog.dom.classes.addRemove = function (o, t, e) {
    var r = goog.dom.classes.get(o);
    goog.isString(t) ? goog.array.remove(r, t) : goog.isArray(t) && (r = goog.dom.classes.getDifference_(r, t)), goog.isString(e) && !goog.array.contains(r, e) ? r.push(e) : goog.isArray(e) && goog.dom.classes.add_(r, e), goog.dom.classes.set(o, r.join(" "))
  }, goog.dom.classes.has = function (o, t) {
    return goog.array.contains(goog.dom.classes.get(o), t)
  }, goog.dom.classes.enable = function (o, t, e) {
    e ? goog.dom.classes.add(o, t) : goog.dom.classes.remove(o, t)
  }, goog.dom.classes.toggle = function (o, t) {
    var e = !goog.dom.classes.has(o, t);
    return goog.dom.classes.enable(o, t, e), e
  }, goog.reflect = {}, goog.reflect.object = function (o, t) {
    return t
  }, goog.reflect.sinkValue = function (o) {
    return goog.reflect.sinkValue[" "](o), o
  }, goog.reflect.sinkValue[" "] = goog.nullFunction, goog.reflect.canAccessProperty = function (o, t) {
    try {
      return goog.reflect.sinkValue(o[t]), !0
    } catch (e) {}
    return !1
  }, goog.reflect.cache = function (o, t, e, r) {
    return r = r ? r(t) : t, Object.prototype.hasOwnProperty.call(o, r) ? o[r] : o[r] = e(t)
  }, goog.userAgent = {}, goog.userAgent.ASSUME_IE = !1, goog.userAgent.ASSUME_EDGE = !1, goog.userAgent.ASSUME_GECKO = !1, goog.userAgent.ASSUME_WEBKIT = !1, goog.userAgent.ASSUME_MOBILE_WEBKIT = !1, goog.userAgent.ASSUME_OPERA = !1, goog.userAgent.ASSUME_ANY_VERSION = !1, goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA, goog.userAgent.getUserAgentString = function () {
    return goog.labs.userAgent.util.getUserAgent()
  }, goog.userAgent.getNavigator = function () {
    return goog.global.navigator || null
  }, goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera(), goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE(), goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge(), goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE, goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko(), goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit(), goog.userAgent.isMobile_ = function () {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
  }, goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_(), goog.userAgent.SAFARI = goog.userAgent.WEBKIT, goog.userAgent.determinePlatform_ = function () {
    var o = goog.userAgent.getNavigator();
    return o && o.platform || ""
  }, goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_(), goog.userAgent.ASSUME_MAC = !1, goog.userAgent.ASSUME_WINDOWS = !1, goog.userAgent.ASSUME_LINUX = !1, goog.userAgent.ASSUME_X11 = !1, goog.userAgent.ASSUME_ANDROID = !1, goog.userAgent.ASSUME_IPHONE = !1, goog.userAgent.ASSUME_IPAD = !1, goog.userAgent.ASSUME_IPOD = !1, goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD, goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh(), goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows(), goog.userAgent.isLegacyLinux_ = function () {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
  }, goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_(), goog.userAgent.isX11_ = function () {
    var o = goog.userAgent.getNavigator();
    return !!o && goog.string.contains(o.appVersion || "", "X11")
  }, goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_(), goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid(), goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone(), goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad(), goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod(), goog.userAgent.determineVersion_ = function () {
    var o = "",
      t = goog.userAgent.getVersionRegexResult_();
    return t && (o = t ? t[1] : ""), goog.userAgent.IE && (t = goog.userAgent.getDocumentMode_(), null != t && t > parseFloat(o)) ? String(t) : o
  }, goog.userAgent.getVersionRegexResult_ = function () {
    var o = goog.userAgent.getUserAgentString();
    return goog.userAgent.GECKO ? /rv\:([^\);]+)(\)|;)/.exec(o) : goog.userAgent.EDGE ? /Edge\/([\d\.]+)/.exec(o) : goog.userAgent.IE ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(o) : goog.userAgent.WEBKIT ? /WebKit\/(\S+)/.exec(o) : goog.userAgent.OPERA ? /(?:Version)[ \/]?(\S+)/.exec(o) : void 0
  }, goog.userAgent.getDocumentMode_ = function () {
    var o = goog.global.document;
    return o ? o.documentMode : void 0
  }, goog.userAgent.VERSION = goog.userAgent.determineVersion_(), goog.userAgent.compare = function (o, t) {
    return goog.string.compareVersions(o, t)
  }, goog.userAgent.isVersionOrHigherCache_ = {}, goog.userAgent.isVersionOrHigher = function (o) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[o] || (goog.userAgent.isVersionOrHigherCache_[o] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, o))
  }, goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher, goog.userAgent.isDocumentModeOrHigher = function (o) {
    return Number(goog.userAgent.DOCUMENT_MODE) >= o
  }, goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher, goog.userAgent.DOCUMENT_MODE = function () {
    var o = goog.global.document,
      t = goog.userAgent.getDocumentMode_();
    return o && goog.userAgent.IE ? t || ("CSS1Compat" == o.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0
  }(), goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
  }, goog.dom.vendor = {}, goog.dom.vendor.getVendorJsPrefix = function () {
    return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
  }, goog.dom.vendor.getVendorPrefix = function () {
    return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
  }, goog.dom.vendor.getPrefixedPropertyName = function (o, t) {
    if (t && o in t) return o;
    var e = goog.dom.vendor.getVendorJsPrefix();
    return e ? (e = e.toLowerCase(), e += goog.string.toTitleCase(o), !goog.isDef(t) || e in t ? e : null) : null
  }, goog.dom.vendor.getPrefixedEventType = function (o) {
    return ((goog.dom.vendor.getVendorJsPrefix() || "") + o).toLowerCase()
  }, goog.i18n = {}, goog.i18n.bidi = {}, goog.i18n.bidi.FORCE_RTL = !1, goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)), goog.i18n.bidi.Format = {
    LRE: "‪",
    RLE: "‫",
    PDF: "‬",
    LRM: "‎",
    RLM: "‏"
  }, goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
  }, goog.i18n.bidi.RIGHT = "right", goog.i18n.bidi.LEFT = "left", goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT, goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, goog.i18n.bidi.toDir = function (o, t) {
    return "number" == typeof o ? o > 0 ? goog.i18n.bidi.Dir.LTR : 0 > o ? goog.i18n.bidi.Dir.RTL : t ? null : goog.i18n.bidi.Dir.NEUTRAL : null == o ? null : o ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
  }, goog.i18n.bidi.ltrChars_ = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", goog.i18n.bidi.rtlChars_ = "֑-ۯۺ-߿‏יִ-﷿ﹰ-ﻼ", goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g, goog.i18n.bidi.stripHtmlIfNeeded_ = function (o, t) {
    return t ? o.replace(goog.i18n.bidi.htmlSkipReg_, "") : o
  }, goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]"), goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]"), goog.i18n.bidi.hasAnyRtl = function (o, t) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o, t))
  }, goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl, goog.i18n.bidi.hasAnyLtr = function (o, t) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o, t))
  }, goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]"), goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]"), goog.i18n.bidi.isRtlChar = function (o) {
    return goog.i18n.bidi.rtlRe_.test(o)
  }, goog.i18n.bidi.isLtrChar = function (o) {
    return goog.i18n.bidi.ltrRe_.test(o)
  }, goog.i18n.bidi.isNeutralChar = function (o) {
    return !goog.i18n.bidi.isLtrChar(o) && !goog.i18n.bidi.isRtlChar(o);
  }, goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]"), goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]"), goog.i18n.bidi.startsWithRtl = function (o, t) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o, t))
  }, goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl, goog.i18n.bidi.startsWithLtr = function (o, t) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o, t))
  }, goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr, goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/, goog.i18n.bidi.isNeutralText = function (o, t) {
    return o = goog.i18n.bidi.stripHtmlIfNeeded_(o, t), goog.i18n.bidi.isRequiredLtrRe_.test(o) || !goog.i18n.bidi.hasAnyLtr(o) && !goog.i18n.bidi.hasAnyRtl(o)
  }, goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$"), goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$"), goog.i18n.bidi.endsWithLtr = function (o, t) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o, t))
  }, goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr, goog.i18n.bidi.endsWithRtl = function (o, t) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o, t))
  }, goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl, goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i, goog.i18n.bidi.isRtlLanguage = function (o) {
    return goog.i18n.bidi.rtlLocalesRe_.test(o)
  }, goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g, goog.i18n.bidi.guardBracketInText = function (o, t) {
    var e = (void 0 === t ? goog.i18n.bidi.hasAnyRtl(o) : t) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return o.replace(goog.i18n.bidi.bracketGuardTextRe_, e + "$&" + e)
  }, goog.i18n.bidi.enforceRtlInHtml = function (o) {
    return "<" == o.charAt(0) ? o.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + o + "</span>"
  }, goog.i18n.bidi.enforceRtlInText = function (o) {
    return goog.i18n.bidi.Format.RLE + o + goog.i18n.bidi.Format.PDF
  }, goog.i18n.bidi.enforceLtrInHtml = function (o) {
    return "<" == o.charAt(0) ? o.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + o + "</span>"
  }, goog.i18n.bidi.enforceLtrInText = function (o) {
    return goog.i18n.bidi.Format.LRE + o + goog.i18n.bidi.Format.PDF
  }, goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g, goog.i18n.bidi.leftRe_ = /left/gi, goog.i18n.bidi.rightRe_ = /right/gi, goog.i18n.bidi.tempRe_ = /%%%%/g, goog.i18n.bidi.mirrorCSS = function (o) {
    return o.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
  }, goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g, goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g, goog.i18n.bidi.normalizeHebrewQuote = function (o) {
    return o.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1״").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1׳")
  }, goog.i18n.bidi.wordSeparatorRe_ = /\s+/, goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/, goog.i18n.bidi.rtlDetectionThreshold_ = .4, goog.i18n.bidi.estimateDirection = function (o, t) {
    for (var e = 0, r = 0, g = !1, n = goog.i18n.bidi.stripHtmlIfNeeded_(o, t).split(goog.i18n.bidi.wordSeparatorRe_), i = 0; i < n.length; i++) {
      var s = n[i];
      goog.i18n.bidi.startsWithRtl(s) ? (e++, r++) : goog.i18n.bidi.isRequiredLtrRe_.test(s) ? g = !0 : goog.i18n.bidi.hasAnyLtr(s) ? r++ : goog.i18n.bidi.hasNumeralsRe_.test(s) && (g = !0)
    }
    return 0 == r ? g ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : e / r > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
  }, goog.i18n.bidi.detectRtlDirectionality = function (o, t) {
    return goog.i18n.bidi.estimateDirection(o, t) == goog.i18n.bidi.Dir.RTL
  }, goog.i18n.bidi.setElementDirAndAlign = function (o, t) {
    o && (t = goog.i18n.bidi.toDir(t)) && (o.style.textAlign = t == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, o.dir = t == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
  }, goog.i18n.bidi.setElementDirByTextDirectionality = function (o, t) {
    switch (goog.i18n.bidi.estimateDirection(t)) {
    case goog.i18n.bidi.Dir.LTR:
      o.dir = "ltr";
      break;
    case goog.i18n.bidi.Dir.RTL:
      o.dir = "rtl";
      break;
    default:
      o.removeAttribute("dir")
    }
  }, goog.i18n.bidi.DirectionalString = function () {}, goog.html.TrustedResourceUrl = function () {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "", this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
  }, goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0, goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
  }, goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0, goog.html.TrustedResourceUrl.prototype.getDirection = function () {
    return goog.i18n.bidi.Dir.LTR
  }, goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function () {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
  }), goog.html.TrustedResourceUrl.unwrap = function (o) {
    return o instanceof goog.html.TrustedResourceUrl && o.constructor === goog.html.TrustedResourceUrl && o.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? o.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ : (goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + o + "' of type " + goog.typeOf(o)), "type_error:TrustedResourceUrl")
  }, goog.html.TrustedResourceUrl.fromConstant = function (o) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(o))
  }, goog.html.TrustedResourceUrl.fromConstants = function (o) {
    for (var t = "", e = 0; e < o.length; e++) t += goog.string.Const.unwrap(o[e]);
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(t)
  }, goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function (o) {
    var t = new goog.html.TrustedResourceUrl;
    return t.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = o, t
  }, goog.fs = {}, goog.fs.url = {}, goog.fs.url.createObjectUrl = function (o) {
    return goog.fs.url.getUrlObject_().createObjectURL(o)
  }, goog.fs.url.revokeObjectUrl = function (o) {
    goog.fs.url.getUrlObject_().revokeObjectURL(o)
  }, goog.fs.url.getUrlObject_ = function () {
    var o = goog.fs.url.findUrlObject_();
    if (null != o) return o;
    throw Error("This browser doesn't seem to support blob URLs")
  }, goog.fs.url.findUrlObject_ = function () {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
  }, goog.fs.url.browserSupportsObjectUrls = function () {
    return null != goog.fs.url.findUrlObject_()
  }, goog.html.SafeUrl = function () {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "", this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
  }, goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez", goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0, goog.html.SafeUrl.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
  }, goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0, goog.html.SafeUrl.prototype.getDirection = function () {
    return goog.i18n.bidi.Dir.LTR
  }, goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function () {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
  }), goog.html.SafeUrl.unwrap = function (o) {
    return o instanceof goog.html.SafeUrl && o.constructor === goog.html.SafeUrl && o.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? o.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (goog.asserts.fail("expected object of type SafeUrl, got '" + o + "' of type " + goog.typeOf(o)), "type_error:SafeUrl")
  }, goog.html.SafeUrl.fromConstant = function (o) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(o))
  }, goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i, goog.html.SafeUrl.fromBlob = function (o) {
    return o = goog.html.SAFE_MIME_TYPE_PATTERN_.test(o.type) ? goog.fs.url.createObjectUrl(o) : goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i, goog.html.SafeUrl.fromDataUrl = function (o) {
    var t = o.match(goog.html.DATA_URL_PATTERN_),
      t = t && goog.html.SAFE_MIME_TYPE_PATTERN_.test(t[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(t ? o : goog.html.SafeUrl.INNOCUOUS_STRING)
  }, goog.html.SafeUrl.fromTelUrl = function (o) {
    return goog.string.caseInsensitiveStartsWith(o, "tel:") || (o = goog.html.SafeUrl.INNOCUOUS_STRING), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:\/?#]*(?:[\/?#]|$))/i, goog.html.SafeUrl.sanitize = function (o) {
    return o instanceof goog.html.SafeUrl ? o : (o = o.implementsGoogStringTypedString ? o.getTypedStringValue() : String(o), goog.html.SAFE_URL_PATTERN_.test(o) || (o = goog.html.SafeUrl.INNOCUOUS_STRING), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o))
  }, goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function (o) {
    var t = new goog.html.SafeUrl;
    return t.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = o, t
  }, goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank"), goog.html.SafeHtml = function () {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "", this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_, this.dir_ = null
  }, goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0, goog.html.SafeHtml.prototype.getDirection = function () {
    return this.dir_
  }, goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0, goog.html.SafeHtml.prototype.getTypedStringValue = function () {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
  }, goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function () {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
  }), goog.html.SafeHtml.unwrap = function (o) {
    return o instanceof goog.html.SafeHtml && o.constructor === goog.html.SafeHtml && o.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? o.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (goog.asserts.fail("expected object of type SafeHtml, got '" + o + "' of type " + goog.typeOf(o)), "type_error:SafeHtml")
  }, goog.html.SafeHtml.htmlEscape = function (o) {
    if (o instanceof goog.html.SafeHtml) return o;
    var t = null;
    return o.implementsGoogI18nBidiDirectionalString && (t = o.getDirection()), o = o.implementsGoogStringTypedString ? o.getTypedStringValue() : String(o), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(o), t)
  }, goog.html.SafeHtml.htmlEscapePreservingNewlines = function (o) {
    return o instanceof goog.html.SafeHtml ? o : (o = goog.html.SafeHtml.htmlEscape(o), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(o)), o.getDirection()))
  }, goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function (o) {
    return o instanceof goog.html.SafeHtml ? o : (o = goog.html.SafeHtml.htmlEscape(o), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(o)), o.getDirection()))
  }, goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape, goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/, goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
  }, goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.APPLET, goog.dom.TagName.BASE, goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.MATH, goog.dom.TagName.META, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.SVG, goog.dom.TagName.TEMPLATE), goog.html.SafeHtml.create = function (o, t, e) {
    return goog.html.SafeHtml.verifyTagName(o), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(o, t, e)
  }, goog.html.SafeHtml.verifyTagName = function (o) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(o)) throw Error("Invalid tag name <" + o + ">.");
    if (o.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + o + "> is not allowed for SafeHtml.")
  }, goog.html.SafeHtml.createIframe = function (o, t, e, r) {
    o && goog.html.TrustedResourceUrl.unwrap(o);
    var g = {};
    return g.src = o || null, g.srcdoc = t && goog.html.SafeHtml.unwrap(t), o = goog.html.SafeHtml.combineAttributes(g, {
      sandbox: ""
    }, e), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", o, r)
  }, goog.html.SafeHtml.createSandboxIframe = function (o, t, e, r) {
    if (!goog.html.SafeHtml.canUseSandboxIframe()) throw Error("The browser does not support sandboxed iframes.");
    var g = {};
    return g.src = o ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(o)) : null, g.srcdoc = t || null, g.sandbox = "", o = goog.html.SafeHtml.combineAttributes(g, {}, e), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", o, r)
  }, goog.html.SafeHtml.canUseSandboxIframe = function () {
    return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype
  }, goog.html.SafeHtml.createScriptSrc = function (o, t) {
    goog.html.TrustedResourceUrl.unwrap(o);
    var e = goog.html.SafeHtml.combineAttributes({
      src: o
    }, {}, t);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", e)
  }, goog.html.SafeHtml.createStyle = function (o, t) {
    var e = goog.html.SafeHtml.combineAttributes({
        type: "text/css"
      }, {}, t),
      r = "";
    o = goog.array.concat(o);
    for (var g = 0; g < o.length; g++) r += goog.html.SafeStyleSheet.unwrap(o[g]);
    return r = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(r, goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", e, r)
  }, goog.html.SafeHtml.createMetaRefresh = function (o, t) {
    var e = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(o));
    return (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(e, ";") && (e = "'" + e.replace(/'/g, "%27") + "'"), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
      "http-equiv": "refresh",
      content: (t || 0) + "; url=" + e
    })
  }, goog.html.SafeHtml.getAttrNameAndValue_ = function (o, t, e) {
    if (e instanceof goog.string.Const) e = goog.string.Const.unwrap(e);
    else if ("style" == t.toLowerCase()) e = goog.html.SafeHtml.getStyleValue_(e);
    else {
      if (/^on/i.test(t)) throw Error('Attribute "' + t + '" requires goog.string.Const value, "' + e + '" given.');
      if (t.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
        if (e instanceof goog.html.TrustedResourceUrl) e = goog.html.TrustedResourceUrl.unwrap(e);
        else if (e instanceof goog.html.SafeUrl) e = goog.html.SafeUrl.unwrap(e);
      else {
        if (!goog.isString(e)) throw Error('Attribute "' + t + '" on tag "' + o + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + e + '" given.');
        e = goog.html.SafeUrl.sanitize(e).getTypedStringValue()
      }
    }
    return e.implementsGoogStringTypedString && (e = e.getTypedStringValue()), goog.asserts.assert(goog.isString(e) || goog.isNumber(e), "String or number value expected, got " + typeof e + " with value: " + e), t + '="' + goog.string.htmlEscape(String(e)) + '"'
  }, goog.html.SafeHtml.getStyleValue_ = function (o) {
    if (!goog.isObject(o)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof o + " given: " + o);
    return o instanceof goog.html.SafeStyle || (o = goog.html.SafeStyle.create(o)), goog.html.SafeStyle.unwrap(o)
  }, goog.html.SafeHtml.createWithDir = function (o, t, e, r) {
    return t = goog.html.SafeHtml.create(t, e, r), t.dir_ = o, t
  }, goog.html.SafeHtml.concat = function (o) {
    var t = goog.i18n.bidi.Dir.NEUTRAL,
      e = "",
      r = function (o) {
        goog.isArray(o) ? goog.array.forEach(o, r) : (o = goog.html.SafeHtml.htmlEscape(o), e += goog.html.SafeHtml.unwrap(o), o = o.getDirection(), t == goog.i18n.bidi.Dir.NEUTRAL ? t = o : o != goog.i18n.bidi.Dir.NEUTRAL && t != o && (t = null))
      };
    return goog.array.forEach(arguments, r), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, t)
  }, goog.html.SafeHtml.concatWithDir = function (o, t) {
    var e = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    return e.dir_ = o, e
  }, goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function (o, t) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(o, t)
  }, goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (o, t) {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = o, this.dir_ = t, this
  }, goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function (o, t, e) {
    var r, g = null;
    return r = "<" + o + goog.html.SafeHtml.stringifyAttributes(o, t), goog.isDefAndNotNull(e) ? goog.isArray(e) || (e = [e]) : e = [], goog.dom.tags.isVoidTag(o.toLowerCase()) ? (goog.asserts.assert(!e.length, "Void tag <" + o + "> does not allow content."), r += ">") : (g = goog.html.SafeHtml.concat(e), r += ">" + goog.html.SafeHtml.unwrap(g) + "</" + o + ">", g = g.getDirection()), (o = t && t.dir) && (g = /^(ltr|rtl|auto)$/i.test(o) ? goog.i18n.bidi.Dir.NEUTRAL : null), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(r, g)
  }, goog.html.SafeHtml.stringifyAttributes = function (o, t) {
    var e = "";
    if (t)
      for (var r in t) {
        if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(r)) throw Error('Invalid attribute name "' + r + '".');
        var g = t[r];
        goog.isDefAndNotNull(g) && (e += " " + goog.html.SafeHtml.getAttrNameAndValue_(o, r, g))
      }
    return e
  }, goog.html.SafeHtml.combineAttributes = function (o, t, e) {
    var r, g = {};
    for (r in o) goog.asserts.assert(r.toLowerCase() == r, "Must be lower case"), g[r] = o[r];
    for (r in t) goog.asserts.assert(r.toLowerCase() == r, "Must be lower case"), g[r] = t[r];
    for (r in e) {
      var n = r.toLowerCase();
      if (n in o) throw Error('Cannot override "' + n + '" attribute, got "' + r + '" with value "' + e[r] + '"');
      n in t && delete g[n], g[r] = e[r]
    }
    return g
  }, goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL), goog.html.legacyconversions = {}, goog.html.legacyconversions.safeHtmlFromString = function (o) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(o, null)
  }, goog.html.legacyconversions.safeStyleFromString = function (o) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.legacyconversions.safeStyleSheetFromString = function (o) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.legacyconversions.safeUrlFromString = function (o) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.legacyconversions.trustedResourceUrlFromString = function (o) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(o)
  }, goog.html.legacyconversions.reportCallback_ = goog.nullFunction, goog.html.legacyconversions.setReportCallback = function (o) {
    goog.html.legacyconversions.reportCallback_ = o
  }, goog.html.uncheckedconversions = {}, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function (o, t, e) {
    return goog.asserts.assertString(goog.string.Const.unwrap(o), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(o)), "must provide non-empty justification"), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(t, e || null)
  }, goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function (o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(o), "must provide justification"), goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(o)), "must provide non-empty justification"), goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(t)
  }, goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function (o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(o), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(o)), "must provide non-empty justification"), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(t)
  }, goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function (o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(o), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(o)), "must provide non-empty justification"), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(t)
  }, goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function (o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(o), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(o)), "must provide non-empty justification"), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(t)
  }, goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function (o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(o), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(o)), "must provide non-empty justification"), goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(t)
  }, goog.dom.safe = {}, goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
  }, goog.dom.safe.insertAdjacentHtml = function (o, t, e) {
    o.insertAdjacentHTML(t, goog.html.SafeHtml.unwrap(e))
  }, goog.dom.safe.setInnerHtml = function (o, t) {
    o.innerHTML = goog.html.SafeHtml.unwrap(t)
  }, goog.dom.safe.setOuterHtml = function (o, t) {
    o.outerHTML = goog.html.SafeHtml.unwrap(t)
  }, goog.dom.safe.documentWrite = function (o, t) {
    o.write(goog.html.SafeHtml.unwrap(t))
  }, goog.dom.safe.setAnchorHref = function (o, t) {
    var e;
    e = t instanceof goog.html.SafeUrl ? t : goog.html.SafeUrl.sanitize(t), o.href = goog.html.SafeUrl.unwrap(e)
  }, goog.dom.safe.setImageSrc = function (o, t) {
    var e;
    e = t instanceof goog.html.SafeUrl ? t : goog.html.SafeUrl.sanitize(t), o.src = goog.html.SafeUrl.unwrap(e)
  }, goog.dom.safe.setEmbedSrc = function (o, t) {
    o.src = goog.html.TrustedResourceUrl.unwrap(t)
  }, goog.dom.safe.setFrameSrc = function (o, t) {
    o.src = goog.html.TrustedResourceUrl.unwrap(t)
  }, goog.dom.safe.setIframeSrc = function (o, t) {
    o.src = goog.html.TrustedResourceUrl.unwrap(t)
  }, goog.dom.safe.setLinkHrefAndRel = function (o, t, e) {
    o.rel = e, goog.string.caseInsensitiveContains(e, "stylesheet") ? (goog.asserts.assert(t instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), o.href = goog.html.TrustedResourceUrl.unwrap(t)) : o.href = t instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(t) : t instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(t) : goog.html.SafeUrl.sanitize(t).getTypedStringValue()
  }, goog.dom.safe.setObjectData = function (o, t) {
    o.data = goog.html.TrustedResourceUrl.unwrap(t)
  }, goog.dom.safe.setScriptSrc = function (o, t) {
    o.src = goog.html.TrustedResourceUrl.unwrap(t)
  }, goog.dom.safe.setLocationHref = function (o, t) {
    var e;
    e = t instanceof goog.html.SafeUrl ? t : goog.html.SafeUrl.sanitize(t), o.href = goog.html.SafeUrl.unwrap(e)
  }, goog.dom.safe.openInWindow = function (o, t, e, r, g) {
    return o = o instanceof goog.html.SafeUrl ? o : goog.html.SafeUrl.sanitize(o), (t || window).open(goog.html.SafeUrl.unwrap(o), e ? goog.string.Const.unwrap(e) : "", r, g)
  }, goog.dom.ASSUME_QUIRKS_MODE = !1, goog.dom.ASSUME_STANDARDS_MODE = !1, goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE, goog.dom.getDomHelper = function (o) {
    return o ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(o)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
  }, goog.dom.getDocument = function () {
    return document
  }, goog.dom.getElement = function (o) {
    return goog.dom.getElementHelper_(document, o)
  }, goog.dom.getElementHelper_ = function (o, t) {
    return goog.isString(t) ? o.getElementById(t) : t
  }, goog.dom.getRequiredElement = function (o) {
    return goog.dom.getRequiredElementHelper_(document, o)
  }, goog.dom.getRequiredElementHelper_ = function (o, t) {
    goog.asserts.assertString(t);
    var e = goog.dom.getElementHelper_(o, t);
    return e = goog.asserts.assertElement(e, "No element found with id: " + t)
  }, goog.dom.$ = goog.dom.getElement, goog.dom.getElementsByTagNameAndClass = function (o, t, e) {
    return goog.dom.getElementsByTagNameAndClass_(document, o, t, e)
  }, goog.dom.getElementsByClass = function (o, t) {
    var e = t || document;
    return goog.dom.canUseQuerySelector_(e) ? e.querySelectorAll("." + o) : goog.dom.getElementsByTagNameAndClass_(document, "*", o, t)
  }, goog.dom.getElementByClass = function (o, t) {
    var e = t || document,
      r = null;
    return (r = e.getElementsByClassName ? e.getElementsByClassName(o)[0] : goog.dom.canUseQuerySelector_(e) ? e.querySelector("." + o) : goog.dom.getElementsByTagNameAndClass_(document, "*", o, t)[0]) || null
  }, goog.dom.getRequiredElementByClass = function (o, t) {
    var e = goog.dom.getElementByClass(o, t);
    return goog.asserts.assert(e, "No element found with className: " + o)
  }, goog.dom.canUseQuerySelector_ = function (o) {
    return !(!o.querySelectorAll || !o.querySelector)
  }, goog.dom.getElementsByTagNameAndClass_ = function (o, t, e, r) {
    if (o = r || o, t = t && "*" != t ? t.toUpperCase() : "", goog.dom.canUseQuerySelector_(o) && (t || e)) return o.querySelectorAll(t + (e ? "." + e : ""));
    if (e && o.getElementsByClassName) {
      if (o = o.getElementsByClassName(e), t) {
        r = {};
        for (var g, n = 0, i = 0; g = o[i]; i++) t == g.nodeName && (r[n++] = g);
        return r.length = n, r
      }
      return o
    }
    if (o = o.getElementsByTagName(t || "*"), e) {
      for (r = {}, i = n = 0; g = o[i]; i++) t = g.className, "function" == typeof t.split && goog.array.contains(t.split(/\s+/), e) && (r[n++] = g);
      return r.length = n, r
    }
    return o
  }, goog.dom.$$ = goog.dom.getElementsByTagNameAndClass, goog.dom.setProperties = function (o, t) {
    goog.object.forEach(t, function (t, e) {
      "style" == e ? o.style.cssText = t : "class" == e ? o.className = t : "for" == e ? o.htmlFor = t : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(e) ? o.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[e], t) : goog.string.startsWith(e, "aria-") || goog.string.startsWith(e, "data-") ? o.setAttribute(e, t) : o[e] = t
    })
  }, goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
  }, goog.dom.getViewportSize = function (o) {
    return goog.dom.getViewportSize_(o || window)
  }, goog.dom.getViewportSize_ = function (o) {
    return o = o.document, o = goog.dom.isCss1CompatMode_(o) ? o.documentElement : o.body, new goog.math.Size(o.clientWidth, o.clientHeight)
  }, goog.dom.getDocumentHeight = function () {
    return goog.dom.getDocumentHeight_(window)
  }, goog.dom.getDocumentHeightForWindow = function (o) {
    return goog.dom.getDocumentHeight_(o)
  }, goog.dom.getDocumentHeight_ = function (o) {
    var t = o.document,
      e = 0;
    if (t) {
      var e = t.body,
        r = t.documentElement;
      if (!r || !e) return 0;
      if (o = goog.dom.getViewportSize_(o).height, goog.dom.isCss1CompatMode_(t) && r.scrollHeight) e = r.scrollHeight != o ? r.scrollHeight : r.offsetHeight;
      else {
        var t = r.scrollHeight,
          g = r.offsetHeight;
        r.clientHeight != g && (t = e.scrollHeight, g = e.offsetHeight), e = t > o ? t > g ? t : g : g > t ? t : g
      }
    }
    return e
  }, goog.dom.getPageScroll = function (o) {
    return goog.dom.getDomHelper((o || goog.global || window).document).getDocumentScroll()
  }, goog.dom.getDocumentScroll = function () {
    return goog.dom.getDocumentScroll_(document)
  }, goog.dom.getDocumentScroll_ = function (o) {
    var t = goog.dom.getDocumentScrollElement_(o);
    return o = goog.dom.getWindow_(o), goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && o.pageYOffset != t.scrollTop ? new goog.math.Coordinate(t.scrollLeft, t.scrollTop) : new goog.math.Coordinate(o.pageXOffset || t.scrollLeft, o.pageYOffset || t.scrollTop)
  }, goog.dom.getDocumentScrollElement = function () {
    return goog.dom.getDocumentScrollElement_(document)
  }, goog.dom.getDocumentScrollElement_ = function (o) {
    return o.scrollingElement ? o.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(o) ? o.documentElement : o.body || o.documentElement
  }, goog.dom.getWindow = function (o) {
    return o ? goog.dom.getWindow_(o) : window
  }, goog.dom.getWindow_ = function (o) {
    return o.parentWindow || o.defaultView
  }, goog.dom.createDom = function (o, t, e) {
    return goog.dom.createDom_(document, arguments)
  }, goog.dom.createDom_ = function (o, t) {
    var e = t[0],
      r = t[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && r && (r.name || r.type)) {
      if (e = ["<", e], r.name && e.push(' name="', goog.string.htmlEscape(r.name), '"'), r.type) {
        e.push(' type="', goog.string.htmlEscape(r.type), '"');
        var g = {};
        goog.object.extend(g, r), delete g.type, r = g
      }
      e.push(">"), e = e.join("")
    }
    return e = o.createElement(e), r && (goog.isString(r) ? e.className = r : goog.isArray(r) ? e.className = r.join(" ") : goog.dom.setProperties(e, r)), 2 < t.length && goog.dom.append_(o, e, t, 2), e
  }, goog.dom.append_ = function (o, t, e, r) {
    function g(e) {
      e && t.appendChild(goog.isString(e) ? o.createTextNode(e) : e)
    }
    for (; r < e.length; r++) {
      var n = e[r];
      goog.isArrayLike(n) && !goog.dom.isNodeLike(n) ? goog.array.forEach(goog.dom.isNodeList(n) ? goog.array.toArray(n) : n, g) : g(n)
    }
  }, goog.dom.$dom = goog.dom.createDom, goog.dom.createElement = function (o) {
    return document.createElement(o)
  }, goog.dom.createTextNode = function (o) {
    return document.createTextNode(String(o))
  }, goog.dom.createTable = function (o, t, e) {
    return goog.dom.createTable_(document, o, t, !!e)
  }, goog.dom.createTable_ = function (o, t, e, r) {
    for (var g = o.createElement(goog.dom.TagName.TABLE), n = g.appendChild(o.createElement(goog.dom.TagName.TBODY)), i = 0; t > i; i++) {
      for (var s = o.createElement(goog.dom.TagName.TR), a = 0; e > a; a++) {
        var u = o.createElement(goog.dom.TagName.TD);
        r && goog.dom.setTextContent(u, goog.string.Unicode.NBSP), s.appendChild(u)
      }
      n.appendChild(s)
    }
    return g
  }, goog.dom.constHtmlToNode = function (o) {
    var t = goog.array.map(arguments, goog.string.Const.unwrap),
      t = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), t.join(""));
    return goog.dom.safeHtmlToNode(t)
  }, goog.dom.safeHtmlToNode = function (o) {
    return goog.dom.safeHtmlToNode_(document, o)
  }, goog.dom.safeHtmlToNode_ = function (o, t) {
    var e = o.createElement(goog.dom.TagName.DIV);
    return goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(e, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, t)), e.removeChild(e.firstChild)) : goog.dom.safe.setInnerHtml(e, t), goog.dom.childrenToNode_(o, e)
  }, goog.dom.childrenToNode_ = function (o, t) {
    if (1 == t.childNodes.length) return t.removeChild(t.firstChild);
    for (var e = o.createDocumentFragment(); t.firstChild;) e.appendChild(t.firstChild);
    return e
  }, goog.dom.isCss1CompatMode = function () {
    return goog.dom.isCss1CompatMode_(document)
  }, goog.dom.isCss1CompatMode_ = function (o) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == o.compatMode
  }, goog.dom.canHaveChildren = function (o) {
    if (o.nodeType != goog.dom.NodeType.ELEMENT) return !1;
    switch (o.tagName) {
    case goog.dom.TagName.APPLET:
    case goog.dom.TagName.AREA:
    case goog.dom.TagName.BASE:
    case goog.dom.TagName.BR:
    case goog.dom.TagName.COL:
    case goog.dom.TagName.COMMAND:
    case goog.dom.TagName.EMBED:
    case goog.dom.TagName.FRAME:
    case goog.dom.TagName.HR:
    case goog.dom.TagName.IMG:
    case goog.dom.TagName.INPUT:
    case goog.dom.TagName.IFRAME:
    case goog.dom.TagName.ISINDEX:
    case goog.dom.TagName.KEYGEN:
    case goog.dom.TagName.LINK:
    case goog.dom.TagName.NOFRAMES:
    case goog.dom.TagName.NOSCRIPT:
    case goog.dom.TagName.META:
    case goog.dom.TagName.OBJECT:
    case goog.dom.TagName.PARAM:
    case goog.dom.TagName.SCRIPT:
    case goog.dom.TagName.SOURCE:
    case goog.dom.TagName.STYLE:
    case goog.dom.TagName.TRACK:
    case goog.dom.TagName.WBR:
      return !1
    }
    return !0
  }, goog.dom.appendChild = function (o, t) {
    o.appendChild(t)
  }, goog.dom.append = function (o, t) {
    goog.dom.append_(goog.dom.getOwnerDocument(o), o, arguments, 1)
  }, goog.dom.removeChildren = function (o) {
    for (var t; t = o.firstChild;) o.removeChild(t)
  }, goog.dom.insertSiblingBefore = function (o, t) {
    t.parentNode && t.parentNode.insertBefore(o, t)
  }, goog.dom.insertSiblingAfter = function (o, t) {
    t.parentNode && t.parentNode.insertBefore(o, t.nextSibling)
  }, goog.dom.insertChildAt = function (o, t, e) {
    o.insertBefore(t, o.childNodes[e] || null)
  }, goog.dom.removeNode = function (o) {
    return o && o.parentNode ? o.parentNode.removeChild(o) : null
  }, goog.dom.replaceNode = function (o, t) {
    var e = t.parentNode;
    e && e.replaceChild(o, t)
  }, goog.dom.flattenElement = function (o) {
    var t, e = o.parentNode;
    if (e && e.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
      if (o.removeNode) return o.removeNode(!1);
      for (; t = o.firstChild;) e.insertBefore(t, o);
      return goog.dom.removeNode(o)
    }
  }, goog.dom.getChildren = function (o) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != o.children ? o.children : goog.array.filter(o.childNodes, function (o) {
      return o.nodeType == goog.dom.NodeType.ELEMENT
    })
  }, goog.dom.getFirstElementChild = function (o) {
    return goog.isDef(o.firstElementChild) ? o.firstElementChild : goog.dom.getNextElementNode_(o.firstChild, !0)
  }, goog.dom.getLastElementChild = function (o) {
    return goog.isDef(o.lastElementChild) ? o.lastElementChild : goog.dom.getNextElementNode_(o.lastChild, !1)
  }, goog.dom.getNextElementSibling = function (o) {
    return goog.isDef(o.nextElementSibling) ? o.nextElementSibling : goog.dom.getNextElementNode_(o.nextSibling, !0)
  }, goog.dom.getPreviousElementSibling = function (o) {
    return goog.isDef(o.previousElementSibling) ? o.previousElementSibling : goog.dom.getNextElementNode_(o.previousSibling, !1)
  }, goog.dom.getNextElementNode_ = function (o, t) {
    for (; o && o.nodeType != goog.dom.NodeType.ELEMENT;) o = t ? o.nextSibling : o.previousSibling;
    return o
  }, goog.dom.getNextNode = function (o) {
    if (!o) return null;
    if (o.firstChild) return o.firstChild;
    for (; o && !o.nextSibling;) o = o.parentNode;
    return o ? o.nextSibling : null
  }, goog.dom.getPreviousNode = function (o) {
    if (!o) return null;
    if (!o.previousSibling) return o.parentNode;
    for (o = o.previousSibling; o && o.lastChild;) o = o.lastChild;
    return o
  }, goog.dom.isNodeLike = function (o) {
    return goog.isObject(o) && 0 < o.nodeType
  }, goog.dom.isElement = function (o) {
    return goog.isObject(o) && o.nodeType == goog.dom.NodeType.ELEMENT
  }, goog.dom.isWindow = function (o) {
    return goog.isObject(o) && o.window == o
  }, goog.dom.getParentElement = function (o) {
    var t;
    return !goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && o instanceof goog.global.SVGElement || !(t = o.parentElement) ? (t = o.parentNode, goog.dom.isElement(t) ? t : null) : t
  }, goog.dom.contains = function (o, t) {
    if (!o || !t) return !1;
    if (o.contains && t.nodeType == goog.dom.NodeType.ELEMENT) return o == t || o.contains(t);
    if ("undefined" != typeof o.compareDocumentPosition) return o == t || Boolean(16 & o.compareDocumentPosition(t));
    for (; t && o != t;) t = t.parentNode;
    return t == o
  }, goog.dom.compareNodeOrder = function (o, t) {
    if (o == t) return 0;
    if (o.compareDocumentPosition) return 2 & o.compareDocumentPosition(t) ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
      if (o.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
      if (t.nodeType == goog.dom.NodeType.DOCUMENT) return 1
    }
    if ("sourceIndex" in o || o.parentNode && "sourceIndex" in o.parentNode) {
      var e = o.nodeType == goog.dom.NodeType.ELEMENT,
        r = t.nodeType == goog.dom.NodeType.ELEMENT;
      if (e && r) return o.sourceIndex - t.sourceIndex;
      var g = o.parentNode,
        n = t.parentNode;
      return g == n ? goog.dom.compareSiblingOrder_(o, t) : !e && goog.dom.contains(g, t) ? -1 * goog.dom.compareParentsDescendantNodeIe_(o, t) : !r && goog.dom.contains(n, o) ? goog.dom.compareParentsDescendantNodeIe_(t, o) : (e ? o.sourceIndex : g.sourceIndex) - (r ? t.sourceIndex : n.sourceIndex)
    }
    return r = goog.dom.getOwnerDocument(o), e = r.createRange(), e.selectNode(o), e.collapse(!0), r = r.createRange(), r.selectNode(t), r.collapse(!0), e.compareBoundaryPoints(goog.global.Range.START_TO_END, r)
  }, goog.dom.compareParentsDescendantNodeIe_ = function (o, t) {
    var e = o.parentNode;
    if (e == t) return -1;
    for (var r = t; r.parentNode != e;) r = r.parentNode;
    return goog.dom.compareSiblingOrder_(r, o)
  }, goog.dom.compareSiblingOrder_ = function (o, t) {
    for (var e = t; e = e.previousSibling;)
      if (e == o) return -1;
    return 1
  }, goog.dom.findCommonAncestor = function (o) {
    var t, e = arguments.length;
    if (!e) return null;
    if (1 == e) return arguments[0];
    var r = [],
      g = 1 / 0;
    for (t = 0; e > t; t++) {
      for (var n = [], i = arguments[t]; i;) n.unshift(i), i = i.parentNode;
      r.push(n), g = Math.min(g, n.length)
    }
    for (n = null, t = 0; g > t; t++) {
      for (var i = r[0][t], s = 1; e > s; s++)
        if (i != r[s][t]) return n;
      n = i
    }
    return n
  }, goog.dom.getOwnerDocument = function (o) {
    return goog.asserts.assert(o, "Node cannot be null or undefined."), o.nodeType == goog.dom.NodeType.DOCUMENT ? o : o.ownerDocument || o.document
  }, goog.dom.getFrameContentDocument = function (o) {
    return o.contentDocument || o.contentWindow.document
  }, goog.dom.getFrameContentWindow = function (o) {
    try {
      return o.contentWindow || (o.contentDocument ? goog.dom.getWindow(o.contentDocument) : null)
    } catch (t) {}
    return null
  }, goog.dom.setTextContent = function (o, t) {
    if (goog.asserts.assert(null != o, "goog.dom.setTextContent expects a non-null value for node"), "textContent" in o) o.textContent = t;
    else if (o.nodeType == goog.dom.NodeType.TEXT) o.data = t;
    else if (o.firstChild && o.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for (; o.lastChild != o.firstChild;) o.removeChild(o.lastChild);
      o.firstChild.data = t
    } else {
      goog.dom.removeChildren(o);
      var e = goog.dom.getOwnerDocument(o);
      o.appendChild(e.createTextNode(String(t)))
    }
  }, goog.dom.getOuterHtml = function (o) {
    if (goog.asserts.assert(null !== o, "goog.dom.getOuterHtml expects a non-null value for element"), "outerHTML" in o) return o.outerHTML;
    var t = goog.dom.getOwnerDocument(o).createElement(goog.dom.TagName.DIV);
    return t.appendChild(o.cloneNode(!0)), t.innerHTML
  }, goog.dom.findNode = function (o, t) {
    var e = [];
    return goog.dom.findNodes_(o, t, e, !0) ? e[0] : void 0
  }, goog.dom.findNodes = function (o, t) {
    var e = [];
    return goog.dom.findNodes_(o, t, e, !1), e
  }, goog.dom.findNodes_ = function (o, t, e, r) {
    if (null != o)
      for (o = o.firstChild; o;) {
        if (t(o) && (e.push(o), r) || goog.dom.findNodes_(o, t, e, r)) return !0;
        o = o.nextSibling
      }
    return !1
  }, goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
  }, goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
  }, goog.dom.isFocusableTabIndex = function (o) {
    return goog.dom.hasSpecifiedTabIndex_(o) && goog.dom.isTabIndexFocusable_(o)
  }, goog.dom.setFocusableTabIndex = function (o, t) {
    t ? o.tabIndex = 0 : (o.tabIndex = -1, o.removeAttribute("tabIndex"))
  }, goog.dom.isFocusable = function (o) {
    var t;
    return (t = goog.dom.nativelySupportsFocus_(o) ? !o.disabled && (!goog.dom.hasSpecifiedTabIndex_(o) || goog.dom.isTabIndexFocusable_(o)) : goog.dom.isFocusableTabIndex(o)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(o) : t
  }, goog.dom.hasSpecifiedTabIndex_ = function (o) {
    return o = o.getAttributeNode("tabindex"), goog.isDefAndNotNull(o) && o.specified
  }, goog.dom.isTabIndexFocusable_ = function (o) {
    return o = o.tabIndex, goog.isNumber(o) && o >= 0 && 32768 > o
  }, goog.dom.nativelySupportsFocus_ = function (o) {
    return o.tagName == goog.dom.TagName.A || o.tagName == goog.dom.TagName.INPUT || o.tagName == goog.dom.TagName.TEXTAREA || o.tagName == goog.dom.TagName.SELECT || o.tagName == goog.dom.TagName.BUTTON
  }, goog.dom.hasNonZeroBoundingRect_ = function (o) {
    return o = !goog.isFunction(o.getBoundingClientRect) || goog.userAgent.IE && null == o.parentElement ? {
      height: o.offsetHeight,
      width: o.offsetWidth
    } : o.getBoundingClientRect(), goog.isDefAndNotNull(o) && 0 < o.height && 0 < o.width
  }, goog.dom.getTextContent = function (o) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== o && "innerText" in o) o = goog.string.canonicalizeNewlines(o.innerText);
    else {
      var t = [];
      goog.dom.getTextContent_(o, t, !0), o = t.join("")
    }
    return o = o.replace(/ \xAD /g, " ").replace(/\xAD/g, ""), o = o.replace(/\u200B/g, ""), goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (o = o.replace(/ +/g, " ")), " " != o && (o = o.replace(/^\s*/, "")), o
  }, goog.dom.getRawTextContent = function (o) {
    var t = [];
    return goog.dom.getTextContent_(o, t, !1), t.join("")
  }, goog.dom.getTextContent_ = function (o, t, e) {
    if (!(o.nodeName in goog.dom.TAGS_TO_IGNORE_))
      if (o.nodeType == goog.dom.NodeType.TEXT) e ? t.push(String(o.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : t.push(o.nodeValue);
      else if (o.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) t.push(goog.dom.PREDEFINED_TAG_VALUES_[o.nodeName]);
    else
      for (o = o.firstChild; o;) goog.dom.getTextContent_(o, t, e), o = o.nextSibling
  }, goog.dom.getNodeTextLength = function (o) {
    return goog.dom.getTextContent(o).length
  }, goog.dom.getNodeTextOffset = function (o, t) {
    for (var e = t || goog.dom.getOwnerDocument(o).body, r = []; o && o != e;) {
      for (var g = o; g = g.previousSibling;) r.unshift(goog.dom.getTextContent(g));
      o = o.parentNode
    }
    return goog.string.trimLeft(r.join("")).replace(/ +/g, " ").length
  }, goog.dom.getNodeAtOffset = function (o, t, e) {
    o = [o];
    for (var r = 0, g = null; 0 < o.length && t > r;)
      if (g = o.pop(), !(g.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (g.nodeType == goog.dom.NodeType.TEXT) var n = g.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
          r = r + n.length;
        else if (g.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) r += goog.dom.PREDEFINED_TAG_VALUES_[g.nodeName].length;
    else
      for (n = g.childNodes.length - 1; n >= 0; n--) o.push(g.childNodes[n]);
    return goog.isObject(e) && (e.remainder = g ? g.nodeValue.length + t - r - 1 : 0, e.node = g), g
  }, goog.dom.isNodeList = function (o) {
    if (o && "number" == typeof o.length) {
      if (goog.isObject(o)) return "function" == typeof o.item || "string" == typeof o.item;
      if (goog.isFunction(o)) return "function" == typeof o.item
    }
    return !1
  }, goog.dom.getAncestorByTagNameAndClass = function (o, t, e, r) {
    if (!t && !e) return null;
    var g = t ? t.toUpperCase() : null;
    return goog.dom.getAncestor(o, function (o) {
      return (!g || o.nodeName == g) && (!e || goog.isString(o.className) && goog.array.contains(o.className.split(/\s+/), e))
    }, !0, r)
  }, goog.dom.getAncestorByClass = function (o, t, e) {
    return goog.dom.getAncestorByTagNameAndClass(o, null, t, e)
  }, goog.dom.getAncestor = function (o, t, e, r) {
    for (e || (o = o.parentNode), e = 0; o && (null == r || r >= e);) {
      if (goog.asserts.assert("parentNode" != o.name), t(o)) return o;
      o = o.parentNode, e++
    }
    return null
  }, goog.dom.getActiveElement = function (o) {
    try {
      return o && o.activeElement
    } catch (t) {}
    return null
  }, goog.dom.getPixelRatio = function () {
    var o = goog.dom.getWindow();
    return goog.isDef(o.devicePixelRatio) ? o.devicePixelRatio : o.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1
  }, goog.dom.matchesPixelRatio_ = function (o) {
    return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: " + o + "),(min--moz-device-pixel-ratio: " + o + "),(min-resolution: " + o + "dppx)").matches ? o : 0
  }, goog.dom.DomHelper = function (o) {
    this.document_ = o || goog.global.document || document
  }, goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper, goog.dom.DomHelper.prototype.setDocument = function (o) {
    this.document_ = o
  }, goog.dom.DomHelper.prototype.getDocument = function () {
    return this.document_
  }, goog.dom.DomHelper.prototype.getElement = function (o) {
    return goog.dom.getElementHelper_(this.document_, o)
  }, goog.dom.DomHelper.prototype.getRequiredElement = function (o) {
    return goog.dom.getRequiredElementHelper_(this.document_, o)
  }, goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement, goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function (o, t, e) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, o, t, e)
  }, goog.dom.DomHelper.prototype.getElementsByClass = function (o, t) {
    return goog.dom.getElementsByClass(o, t || this.document_)
  }, goog.dom.DomHelper.prototype.getElementByClass = function (o, t) {
    return goog.dom.getElementByClass(o, t || this.document_)
  }, goog.dom.DomHelper.prototype.getRequiredElementByClass = function (o, t) {
    return goog.dom.getRequiredElementByClass(o, t || this.document_)
  }, goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass, goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties, goog.dom.DomHelper.prototype.getViewportSize = function (o) {
    return goog.dom.getViewportSize(o || this.getWindow())
  }, goog.dom.DomHelper.prototype.getDocumentHeight = function () {
    return goog.dom.getDocumentHeight_(this.getWindow())
  }, goog.dom.DomHelper.prototype.createDom = function (o, t, e) {
    return goog.dom.createDom_(this.document_, arguments)
  }, goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom, goog.dom.DomHelper.prototype.createElement = function (o) {
    return this.document_.createElement(o)
  }, goog.dom.DomHelper.prototype.createTextNode = function (o) {
    return this.document_.createTextNode(String(o))
  }, goog.dom.DomHelper.prototype.createTable = function (o, t, e) {
    return goog.dom.createTable_(this.document_, o, t, !!e)
  }, goog.dom.DomHelper.prototype.safeHtmlToNode = function (o) {
    return goog.dom.safeHtmlToNode_(this.document_, o)
  }, goog.dom.DomHelper.prototype.isCss1CompatMode = function () {
    return goog.dom.isCss1CompatMode_(this.document_)
  }, goog.dom.DomHelper.prototype.getWindow = function () {
    return goog.dom.getWindow_(this.document_)
  }, goog.dom.DomHelper.prototype.getDocumentScrollElement = function () {
    return goog.dom.getDocumentScrollElement_(this.document_)
  }, goog.dom.DomHelper.prototype.getDocumentScroll = function () {
    return goog.dom.getDocumentScroll_(this.document_)
  }, goog.dom.DomHelper.prototype.getActiveElement = function (o) {
    return goog.dom.getActiveElement(o || this.document_)
  }, goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild, goog.dom.DomHelper.prototype.append = goog.dom.append, goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren, goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren, goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore, goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter, goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt, goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode, goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode, goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement, goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren, goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild, goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild, goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling, goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling, goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode, goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode, goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike, goog.dom.DomHelper.prototype.isElement = goog.dom.isElement, goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow, goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement, goog.dom.DomHelper.prototype.contains = goog.dom.contains, goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder, goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor, goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument, goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument, goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow, goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent, goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml, goog.dom.DomHelper.prototype.findNode = goog.dom.findNode, goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes, goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex, goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex, goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable, goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent, goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength, goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset, goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset, goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList, goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass, goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass, goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor, goog.style = {}, goog.style.setStyle = function (o, t, e) {
    if (goog.isString(t)) goog.style.setStyle_(o, e, t);
    else
      for (var r in t) goog.style.setStyle_(o, t[r], r)
  }, goog.style.setStyle_ = function (o, t, e) {
    (e = goog.style.getVendorJsStyleName_(o, e)) && (o.style[e] = t)
  }, goog.style.styleNameCache_ = {}, goog.style.getVendorJsStyleName_ = function (o, t) {
    var e = goog.style.styleNameCache_[t];
    if (!e) {
      var r = goog.string.toCamelCase(t),
        e = r;
      void 0 === o.style[r] && (r = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(r), void 0 !== o.style[r] && (e = r)), goog.style.styleNameCache_[t] = e
    }
    return e
  }, goog.style.getVendorStyleName_ = function (o, t) {
    var e = goog.string.toCamelCase(t);
    return void 0 === o.style[e] && (e = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(e), void 0 !== o.style[e]) ? goog.dom.vendor.getVendorPrefix() + "-" + t : t
  }, goog.style.getStyle = function (o, t) {
    var e = o.style[goog.string.toCamelCase(t)];
    return "undefined" != typeof e ? e : o.style[goog.style.getVendorJsStyleName_(o, t)] || ""
  }, goog.style.getComputedStyle = function (o, t) {
    var e = goog.dom.getOwnerDocument(o);
    return e.defaultView && e.defaultView.getComputedStyle && (e = e.defaultView.getComputedStyle(o, null)) ? e[t] || e.getPropertyValue(t) || "" : ""
  }, goog.style.getCascadedStyle = function (o, t) {
    return o.currentStyle ? o.currentStyle[t] : null
  }, goog.style.getStyle_ = function (o, t) {
    return goog.style.getComputedStyle(o, t) || goog.style.getCascadedStyle(o, t) || o.style && o.style[t]
  }, goog.style.getComputedBoxSizing = function (o) {
    return goog.style.getStyle_(o, "boxSizing") || goog.style.getStyle_(o, "MozBoxSizing") || goog.style.getStyle_(o, "WebkitBoxSizing") || null
  }, goog.style.getComputedPosition = function (o) {
    return goog.style.getStyle_(o, "position")
  }, goog.style.getBackgroundColor = function (o) {
    return goog.style.getStyle_(o, "backgroundColor")
  }, goog.style.getComputedOverflowX = function (o) {
    return goog.style.getStyle_(o, "overflowX")
  }, goog.style.getComputedOverflowY = function (o) {
    return goog.style.getStyle_(o, "overflowY")
  }, goog.style.getComputedZIndex = function (o) {
    return goog.style.getStyle_(o, "zIndex")
  }, goog.style.getComputedTextAlign = function (o) {
    return goog.style.getStyle_(o, "textAlign")
  }, goog.style.getComputedCursor = function (o) {
    return goog.style.getStyle_(o, "cursor")
  }, goog.style.getComputedTransform = function (o) {
    var t = goog.style.getVendorStyleName_(o, "transform");
    return goog.style.getStyle_(o, t) || goog.style.getStyle_(o, "transform")
  }, goog.style.setPosition = function (o, t, e) {
    var r;
    t instanceof goog.math.Coordinate ? (r = t.x, t = t.y) : (r = t, t = e), o.style.left = goog.style.getPixelStyleValue_(r, !1), o.style.top = goog.style.getPixelStyleValue_(t, !1)
  }, goog.style.getPosition = function (o) {
    return new goog.math.Coordinate(o.offsetLeft, o.offsetTop)
  }, goog.style.getClientViewportElement = function (o) {
    return o = o ? goog.dom.getOwnerDocument(o) : goog.dom.getDocument(), !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(o).isCss1CompatMode() ? o.documentElement : o.body
  }, goog.style.getViewportPageOffset = function (o) {
    var t = o.body;
    return o = o.documentElement, new goog.math.Coordinate(t.scrollLeft || o.scrollLeft, t.scrollTop || o.scrollTop)
  }, goog.style.getBoundingClientRect_ = function (o) {
    var t;
    try {
      t = o.getBoundingClientRect()
    } catch (e) {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    }
    return goog.userAgent.IE && o.ownerDocument.body && (o = o.ownerDocument, t.left -= o.documentElement.clientLeft + o.body.clientLeft, t.top -= o.documentElement.clientTop + o.body.clientTop), t
  }, goog.style.getOffsetParent = function (o) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) return goog.asserts.assert(o && "offsetParent" in o), o.offsetParent;
    var t = goog.dom.getOwnerDocument(o),
      e = goog.style.getStyle_(o, "position"),
      r = "fixed" == e || "absolute" == e;
    for (o = o.parentNode; o && o != t; o = o.parentNode)
      if (o.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && o.host && (o = o.host), e = goog.style.getStyle_(o, "position"), r = r && "static" == e && o != t.documentElement && o != t.body, !r && (o.scrollWidth > o.clientWidth || o.scrollHeight > o.clientHeight || "fixed" == e || "absolute" == e || "relative" == e)) return o;
    return null
  }, goog.style.getVisibleRectForElement = function (o) {
    for (var t = new goog.math.Box(0, 1 / 0, 1 / 0, 0), e = goog.dom.getDomHelper(o), r = e.getDocument().body, g = e.getDocument().documentElement, n = e.getDocumentScrollElement(); o = goog.style.getOffsetParent(o);)
      if (!(goog.userAgent.IE && 0 == o.clientWidth || goog.userAgent.WEBKIT && 0 == o.clientHeight && o == r) && o != r && o != g && "visible" != goog.style.getStyle_(o, "overflow")) {
        var i = goog.style.getPageOffset(o),
          s = goog.style.getClientLeftTop(o);
        i.x += s.x, i.y += s.y, t.top = Math.max(t.top, i.y), t.right = Math.min(t.right, i.x + o.clientWidth), t.bottom = Math.min(t.bottom, i.y + o.clientHeight), t.left = Math.max(t.left, i.x)
      }
    return r = n.scrollLeft, n = n.scrollTop, t.left = Math.max(t.left, r), t.top = Math.max(t.top, n), e = e.getViewportSize(), t.right = Math.min(t.right, r + e.width), t.bottom = Math.min(t.bottom, n + e.height), 0 <= t.top && 0 <= t.left && t.bottom > t.top && t.right > t.left ? t : null
  }, goog.style.getContainerOffsetToScrollInto = function (o, t, e) {
    var r = t || goog.dom.getDocumentScrollElement(),
      g = goog.style.getPageOffset(o),
      n = goog.style.getPageOffset(r),
      i = goog.style.getBorderBox(r);
    return r == goog.dom.getDocumentScrollElement() ? (t = g.x - r.scrollLeft, g = g.y - r.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (t += i.left, g += i.top)) : (t = g.x - n.x - i.left, g = g.y - n.y - i.top), i = r.clientWidth - o.offsetWidth, o = r.clientHeight - o.offsetHeight, n = r.scrollLeft, r = r.scrollTop, e ? (n += t - i / 2, r += g - o / 2) : (n += Math.min(t, Math.max(t - i, 0)), r += Math.min(g, Math.max(g - o, 0))), new goog.math.Coordinate(n, r)
  }, goog.style.scrollIntoContainerView = function (o, t, e) {
    t = t || goog.dom.getDocumentScrollElement(), o = goog.style.getContainerOffsetToScrollInto(o, t, e), t.scrollLeft = o.x, t.scrollTop = o.y
  }, goog.style.getClientLeftTop = function (o) {
    return new goog.math.Coordinate(o.clientLeft, o.clientTop)
  }, goog.style.getPageOffset = function (o) {
    var t = goog.dom.getOwnerDocument(o);
    goog.asserts.assertObject(o, "Parameter is required");
    var e = new goog.math.Coordinate(0, 0),
      r = goog.style.getClientViewportElement(t);
    return o == r ? e : (o = goog.style.getBoundingClientRect_(o), t = goog.dom.getDomHelper(t).getDocumentScroll(), e.x = o.left + t.x, e.y = o.top + t.y, e)
  }, goog.style.getPageOffsetLeft = function (o) {
    return goog.style.getPageOffset(o).x
  }, goog.style.getPageOffsetTop = function (o) {
    return goog.style.getPageOffset(o).y
  }, goog.style.getFramedPageOffset = function (o, t) {
    var e = new goog.math.Coordinate(0, 0),
      r = goog.dom.getWindow(goog.dom.getOwnerDocument(o));
    if (!goog.reflect.canAccessProperty(r, "parent")) return e;
    var g = o;
    do {
      var n = r == t ? goog.style.getPageOffset(g) : goog.style.getClientPositionForElement_(goog.asserts.assert(g));
      e.x += n.x, e.y += n.y
    } while (r && r != t && r != r.parent && (g = r.frameElement) && (r = r.parent));
    return e
  }, goog.style.translateRectForAnotherFrame = function (o, t, e) {
    if (t.getDocument() != e.getDocument()) {
      var r = t.getDocument().body;
      e = goog.style.getFramedPageOffset(r, e.getWindow()), e = goog.math.Coordinate.difference(e, goog.style.getPageOffset(r)), !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || t.isCss1CompatMode() || (e = goog.math.Coordinate.difference(e, t.getDocumentScroll())), o.left += e.x, o.top += e.y
    }
  }, goog.style.getRelativePosition = function (o, t) {
    var e = goog.style.getClientPosition(o),
      r = goog.style.getClientPosition(t);
    return new goog.math.Coordinate(e.x - r.x, e.y - r.y)
  }, goog.style.getClientPositionForElement_ = function (o) {
    return o = goog.style.getBoundingClientRect_(o), new goog.math.Coordinate(o.left, o.top)
  }, goog.style.getClientPosition = function (o) {
    return goog.asserts.assert(o), o.nodeType == goog.dom.NodeType.ELEMENT ? goog.style.getClientPositionForElement_(o) : (o = o.changedTouches ? o.changedTouches[0] : o, new goog.math.Coordinate(o.clientX, o.clientY))
  }, goog.style.setPageOffset = function (o, t, e) {
    var r = goog.style.getPageOffset(o);
    t instanceof goog.math.Coordinate && (e = t.y, t = t.x), t = goog.asserts.assertNumber(t) - r.x, goog.style.setPosition(o, o.offsetLeft + t, o.offsetTop + (Number(e) - r.y))
  }, goog.style.setSize = function (o, t, e) {
    if (t instanceof goog.math.Size) e = t.height, t = t.width;
    else if (void 0 == e) throw Error("missing height argument");
    goog.style.setWidth(o, t), goog.style.setHeight(o, e)
  }, goog.style.getPixelStyleValue_ = function (o, t) {
    return "number" == typeof o && (o = (t ? Math.round(o) : o) + "px"), o
  }, goog.style.setHeight = function (o, t) {
    o.style.height = goog.style.getPixelStyleValue_(t, !0)
  }, goog.style.setWidth = function (o, t) {
    o.style.width = goog.style.getPixelStyleValue_(t, !0)
  }, goog.style.getSize = function (o) {
    return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, o)
  }, goog.style.evaluateWithTemporaryDisplay_ = function (o, t) {
    if ("none" != goog.style.getStyle_(t, "display")) return o(t);
    var e = t.style,
      r = e.display,
      g = e.visibility,
      n = e.position;
    e.visibility = "hidden", e.position = "absolute", e.display = "inline";
    var i = o(t);
    return e.display = r, e.position = n, e.visibility = g, i
  }, goog.style.getSizeWithDisplay_ = function (o) {
    var t = o.offsetWidth,
      e = o.offsetHeight,
      r = goog.userAgent.WEBKIT && !t && !e;
    return goog.isDef(t) && !r || !o.getBoundingClientRect ? new goog.math.Size(t, e) : (o = goog.style.getBoundingClientRect_(o), new goog.math.Size(o.right - o.left, o.bottom - o.top))
  }, goog.style.getTransformedSize = function (o) {
    return o.getBoundingClientRect ? (o = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, o), new goog.math.Size(o.right - o.left, o.bottom - o.top)) : null
  }, goog.style.getBounds = function (o) {
    var t = goog.style.getPageOffset(o);
    return o = goog.style.getSize(o), new goog.math.Rect(t.x, t.y, o.width, o.height)
  }, goog.style.toCamelCase = function (o) {
    return goog.string.toCamelCase(String(o))
  }, goog.style.toSelectorCase = function (o) {
    return goog.string.toSelectorCase(o)
  }, goog.style.getOpacity = function (o) {
    goog.asserts.assert(o);
    var t = o.style;
    return o = "", "opacity" in t ? o = t.opacity : "MozOpacity" in t ? o = t.MozOpacity : "filter" in t && (t = t.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (o = String(t[1] / 100)), "" == o ? o : Number(o)
  }, goog.style.setOpacity = function (o, t) {
    goog.asserts.assert(o);
    var e = o.style;
    "opacity" in e ? e.opacity = t : "MozOpacity" in e ? e.MozOpacity = t : "filter" in e && (e.filter = "" === t ? "" : "alpha(opacity=" + 100 * Number(t) + ")")
  }, goog.style.setTransparentBackgroundImage = function (o, t) {
    var e = o.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? e.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + t + '", sizingMethod="crop")' : (e.backgroundImage = "url(" + t + ")", e.backgroundPosition = "top left", e.backgroundRepeat = "no-repeat")
  }, goog.style.clearTransparentBackgroundImage = function (o) {
    o = o.style, "filter" in o ? o.filter = "" : o.backgroundImage = "none"
  }, goog.style.showElement = function (o, t) {
    goog.style.setElementShown(o, t)
  }, goog.style.setElementShown = function (o, t) {
    o.style.display = t ? "" : "none"
  }, goog.style.isElementShown = function (o) {
    return "none" != o.style.display
  }, goog.style.installStyles = function (o, t) {
    return goog.style.installSafeStyleSheet(goog.html.legacyconversions.safeStyleSheetFromString(o), t)
  }, goog.style.installSafeStyleSheet = function (o, t) {
    var e = goog.dom.getDomHelper(t),
      r = null,
      g = e.getDocument();
    return goog.userAgent.IE && g.createStyleSheet ? (r = g.createStyleSheet(), goog.style.setSafeStyleSheet(r, o)) : (g = e.getElementsByTagNameAndClass(goog.dom.TagName.HEAD)[0], g || (r = e.getElementsByTagNameAndClass(goog.dom.TagName.BODY)[0], g = e.createDom(goog.dom.TagName.HEAD), r.parentNode.insertBefore(g, r)), r = e.createDom(goog.dom.TagName.STYLE), goog.style.setSafeStyleSheet(r, o), e.appendChild(g, r)), r
  }, goog.style.uninstallStyles = function (o) {
    goog.dom.removeNode(o.ownerNode || o.owningElement || o)
  }, goog.style.setStyles = function (o, t) {
    goog.style.setSafeStyleSheet(o, goog.html.legacyconversions.safeStyleSheetFromString(t))
  }, goog.style.setSafeStyleSheet = function (o, t) {
    var e = goog.html.SafeStyleSheet.unwrap(t);
    goog.userAgent.IE && goog.isDef(o.cssText) ? o.cssText = e : goog.dom.setTextContent(o, e)
  }, goog.style.setPreWrap = function (o) {
    o = o.style, goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (o.whiteSpace = "pre", o.wordWrap = "break-word") : o.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
  }, goog.style.setInlineBlock = function (o) {
    o = o.style, o.position = "relative", goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (o.zoom = "1", o.display = "inline") : o.display = "inline-block"
  }, goog.style.isRightToLeft = function (o) {
    return "rtl" == goog.style.getStyle_(o, "direction")
  }, goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null, goog.style.isUnselectable = function (o) {
    return goog.style.unselectableStyle_ ? "none" == o.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == o.getAttribute("unselectable") : !1
  }, goog.style.setUnselectable = function (o, t, e) {
    e = e ? null : o.getElementsByTagName("*");
    var r = goog.style.unselectableStyle_;
    if (r) {
      if (t = t ? "none" : "", o.style && (o.style[r] = t), e) {
        o = 0;
        for (var g; g = e[o]; o++) g.style && (g.style[r] = t)
      }
    } else if ((goog.userAgent.IE || goog.userAgent.OPERA) && (t = t ? "on" : "", o.setAttribute("unselectable", t), e))
      for (o = 0; g = e[o]; o++) g.setAttribute("unselectable", t)
  }, goog.style.getBorderBoxSize = function (o) {
    return new goog.math.Size(o.offsetWidth, o.offsetHeight)
  }, goog.style.setBorderBoxSize = function (o, t) {
    var e = goog.dom.getOwnerDocument(o),
      r = goog.dom.getDomHelper(e).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || r && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(o, t, "border-box");
    else if (e = o.style, r) {
      var r = goog.style.getPaddingBox(o),
        g = goog.style.getBorderBox(o);
      e.pixelWidth = t.width - g.left - r.left - r.right - g.right, e.pixelHeight = t.height - g.top - r.top - r.bottom - g.bottom
    } else e.pixelWidth = t.width, e.pixelHeight = t.height
  }, goog.style.getContentBoxSize = function (o) {
    var t = goog.dom.getOwnerDocument(o),
      e = goog.userAgent.IE && o.currentStyle;
    return e && goog.dom.getDomHelper(t).isCss1CompatMode() && "auto" != e.width && "auto" != e.height && !e.boxSizing ? (t = goog.style.getIePixelValue_(o, e.width, "width", "pixelWidth"), o = goog.style.getIePixelValue_(o, e.height, "height", "pixelHeight"), new goog.math.Size(t, o)) : (e = goog.style.getBorderBoxSize(o), t = goog.style.getPaddingBox(o), o = goog.style.getBorderBox(o), new goog.math.Size(e.width - o.left - t.left - t.right - o.right, e.height - o.top - t.top - t.bottom - o.bottom))
  }, goog.style.setContentBoxSize = function (o, t) {
    var e = goog.dom.getOwnerDocument(o),
      r = goog.dom.getDomHelper(e).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || r && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(o, t, "content-box");
    else if (e = o.style, r) e.pixelWidth = t.width, e.pixelHeight = t.height;
    else {
      var r = goog.style.getPaddingBox(o),
        g = goog.style.getBorderBox(o);
      e.pixelWidth = t.width + g.left + r.left + r.right + g.right, e.pixelHeight = t.height + g.top + r.top + r.bottom + g.bottom
    }
  }, goog.style.setBoxSizingSize_ = function (o, t, e) {
    o = o.style, goog.userAgent.GECKO ? o.MozBoxSizing = e : goog.userAgent.WEBKIT ? o.WebkitBoxSizing = e : o.boxSizing = e, o.width = Math.max(t.width, 0) + "px", o.height = Math.max(t.height, 0) + "px"
  }, goog.style.getIePixelValue_ = function (o, t, e, r) {
    if (/^\d+px?$/.test(t)) return parseInt(t, 10);
    var g = o.style[e],
      n = o.runtimeStyle[e];
    return o.runtimeStyle[e] = o.currentStyle[e], o.style[e] = t, t = o.style[r], o.style[e] = g, o.runtimeStyle[e] = n, t
  }, goog.style.getIePixelDistance_ = function (o, t) {
    var e = goog.style.getCascadedStyle(o, t);
    return e ? goog.style.getIePixelValue_(o, e, "left", "pixelLeft") : 0
  }, goog.style.getBox_ = function (o, t) {
    if (goog.userAgent.IE) {
      var e = goog.style.getIePixelDistance_(o, t + "Left"),
        r = goog.style.getIePixelDistance_(o, t + "Right"),
        g = goog.style.getIePixelDistance_(o, t + "Top"),
        n = goog.style.getIePixelDistance_(o, t + "Bottom");
      return new goog.math.Box(g, r, n, e)
    }
    return e = goog.style.getComputedStyle(o, t + "Left"), r = goog.style.getComputedStyle(o, t + "Right"), g = goog.style.getComputedStyle(o, t + "Top"), n = goog.style.getComputedStyle(o, t + "Bottom"), new goog.math.Box(parseFloat(g), parseFloat(r), parseFloat(n), parseFloat(e))
  }, goog.style.getPaddingBox = function (o) {
    return goog.style.getBox_(o, "padding")
  }, goog.style.getMarginBox = function (o) {
    return goog.style.getBox_(o, "margin")
  }, goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
  }, goog.style.getIePixelBorder_ = function (o, t) {
    if ("none" == goog.style.getCascadedStyle(o, t + "Style")) return 0;
    var e = goog.style.getCascadedStyle(o, t + "Width");
    return e in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[e] : goog.style.getIePixelValue_(o, e, "left", "pixelLeft")
  }, goog.style.getBorderBox = function (o) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
      var t = goog.style.getIePixelBorder_(o, "borderLeft"),
        e = goog.style.getIePixelBorder_(o, "borderRight"),
        r = goog.style.getIePixelBorder_(o, "borderTop");
      return o = goog.style.getIePixelBorder_(o, "borderBottom"), new goog.math.Box(r, e, o, t)
    }
    return t = goog.style.getComputedStyle(o, "borderLeftWidth"), e = goog.style.getComputedStyle(o, "borderRightWidth"), r = goog.style.getComputedStyle(o, "borderTopWidth"), o = goog.style.getComputedStyle(o, "borderBottomWidth"), new goog.math.Box(parseFloat(r), parseFloat(e), parseFloat(o), parseFloat(t))
  }, goog.style.getFontFamily = function (o) {
    var t = goog.dom.getOwnerDocument(o),
      e = "";
    if (t.body.createTextRange && goog.dom.contains(t, o)) {
      t = t.body.createTextRange(), t.moveToElementText(o);
      try {
        e = t.queryCommandValue("FontName")
      } catch (r) {
        e = ""
      }
    }
    return e || (e = goog.style.getStyle_(o, "fontFamily")), o = e.split(","), 1 < o.length && (e = o[0]), goog.string.stripQuotes(e, "\"'")
  }, goog.style.lengthUnitRegex_ = /[^\d]+$/, goog.style.getLengthUnits = function (o) {
    return (o = o.match(goog.style.lengthUnitRegex_)) && o[0] || null
  }, goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    "in": 1,
    mm: 1,
    pc: 1,
    pt: 1
  }, goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
  }, goog.style.getFontSize = function (o) {
    var t = goog.style.getStyle_(o, "fontSize"),
      e = goog.style.getLengthUnits(t);
    if (t && "px" == e) return parseInt(t, 10);
    if (goog.userAgent.IE) {
      if (String(e) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(o, t, "left", "pixelLeft");
      if (o.parentNode && o.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(e) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return o = o.parentNode, e = goog.style.getStyle_(o, "fontSize"), goog.style.getIePixelValue_(o, t == e ? "1em" : t, "left", "pixelLeft")
    }
    return e = goog.dom.createDom(goog.dom.TagName.SPAN, {
      style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
    }), goog.dom.appendChild(o, e), t = e.offsetHeight, goog.dom.removeNode(e), t
  }, goog.style.parseStyleAttribute = function (o) {
    var t = {};
    return goog.array.forEach(o.split(/\s*;\s*/), function (o) {
      var e = o.match(/\s*([\w-]+)\s*\:(.+)/);
      e && (o = e[1], e = goog.string.trim(e[2]), t[goog.string.toCamelCase(o.toLowerCase())] = e)
    }), t
  }, goog.style.toStyleAttribute = function (o) {
    var t = [];
    return goog.object.forEach(o, function (o, e) {
      t.push(goog.string.toSelectorCase(e), ":", o, ";")
    }), t.join("")
  }, goog.style.setFloat = function (o, t) {
    o.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = t
  }, goog.style.getFloat = function (o) {
    return o.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
  }, goog.style.getScrollbarWidth = function (o) {
    var t = goog.dom.createElement(goog.dom.TagName.DIV);
    return o && (t.className = o), t.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px", o = goog.dom.createElement(goog.dom.TagName.DIV), goog.style.setSize(o, "200px", "200px"), t.appendChild(o), goog.dom.appendChild(goog.dom.getDocument().body, t), o = t.offsetWidth - t.clientWidth, goog.dom.removeNode(t), o
  }, goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/, goog.style.getCssTranslation = function (o) {
    return o = goog.style.getComputedTransform(o), o && (o = o.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(o[1]), parseFloat(o[2])) : new goog.math.Coordinate(0, 0)
  };
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
  var contributor = {
    utils: {}
  };
  contributor.utils.isVideoFallbackEnabled = function () {
    var o = new goog.Uri(location.href);
    return !!goog.isDef(o.getParameterValue("gif"))
  }, contributor.ng = {}, contributor.ng.MosaicController = function (o) {
    this.el = o[0], this.init_(this.el), this.personEls_ = [], this.activeEl_ = null
  }, contributor.ng.MosaicController.$inject = ["$element"], contributor.ng.MosaicController.prototype.init_ = function (o) {
    this.personEls_ = o.querySelectorAll(".person"), [].forEach.call(this.personEls_, function (o) {
      o.getAttribute("ng-click") && (o.addEventListener("mouseenter", function () {
        this.setMosaicActiveEl(o, !0)
      }.bind(this)), o.addEventListener("mouseleave", function () {
        this.setMosaicActiveEl(o, !1)
      }.bind(this)))
    }.bind(this)), o.addEventListener("mouseLeave", function () {
      [].forEach.call(this.personEls_, function (o) {
        this.setMosaicActiveEl(o, !1)
      }.bind(this))
    }.bind(this))
  }, contributor.ng.MosaicController.prototype.activate = function (o) {
    o = o.target, this.setMosaicActiveEl(o, this.activeEl_ != o)
  }, contributor.ng.MosaicController.prototype.setMosaicActiveEl = function (o, t) {
    this.personEls_ = this.el.querySelectorAll(".person");
    var e = goog.array.indexOf(this.personEls_, o),
      r = 0 == e % 2 ? this.personEls_[e + 1] : this.personEls_[e - 1];
    [].forEach.call(this.personEls_, function (e, g) {
      var n = e == r && t,
        i = e != o && !n && t;
      goog.dom.classes.enable(e, "card-enabled", n), goog.dom.classes.enable(e, "mask-enabled", i)
    }), this.activeEl_ = t ? o : null
  }, contributor.ng.CatsController = function (o) {
    this.el = o[0], this.defaultVideoEl_ = this.el.querySelector("video.video-default"), this.meowVideoEl_ = this.el.querySelector("video.video-meow"), this.enabled = !1
  }, contributor.ng.CatsController.$inject = ["$element"], contributor.ng.CatsController.prototype.setMeowModeEnabled = function (o) {
    this.enabled = o, goog.userAgent.MOBILE || contributor.utils.isVideoFallbackEnabled() || (this.enabled ? (this.meowVideoEl_.currentTime = 0, this.meowVideoEl_.play(), this.defaultVideoEl_.pause()) : this.defaultVideoEl_.play())
  }, contributor.ng.CatsController.prototype.toggle = function () {
    this.setMeowModeEnabled(!this.enabled)
  }, contributor.yt = {}, contributor.yt.initted_ = !1, contributor.yt.player_ = null, contributor.yt.init = function () {
    if (!contributor.yt.initted_) {
      var o = goog.dom.createDom("div", "yt-lightbox");
      o.appendChild(goog.dom.createDom("div", "yt-lightbox-x")), o.appendChild(goog.dom.createDom("div", "yt-lightbox-player")), o.appendChild(goog.dom.createDom("div", "yt-lightbox-mask")), document.body.appendChild(o), o.addEventListener("click", function () {
        contributor.yt.setLightboxEnabled(!1)
      }), document.addEventListener("click", function (o) {
        o = o || window.event, o = o.target || o.srcElement, o = 3 == o.nodeType ? o.parentNode : o;
        do {
          var t = o.getAttribute("data-yt-lightbox-video-id");
          t && contributor.yt.play(t), o.parentNode && (o = o.parentNode)
        } while (o.parentNode)
      }), o = document.createElement("script"), o.setAttribute("src", "https://www.youtube.com/iframe_api"), document.body.appendChild(o), contributor.yt.initted_ = !0
    }
  }, contributor.yt.play = function (o) {
    if (goog.userAgent.MOBILE ? window.location.href = "https://m.youtube.com/watch?v=" + o : contributor.yt.setLightboxEnabled(!0), !contributor.yt.player_) {
      var t = document.querySelector(".yt-lightbox-player");
      contributor.yt.player_ = new YT.Player(t, {
        videoId: o,
        playerVars: {
          autohide: 1,
          autoplay: 1,
          fs: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        }
      })
    }
  }, contributor.yt.setLightboxEnabled = function (o) {
    contributor.yt.player_ && (o ? contributor.yt.player_.playVideo() : contributor.yt.player_.pauseVideo());
    var t = document.querySelector(".yt-lightbox");
    window.setTimeout(function () {
      goog.dom.classes.enable(t, "yt-lightbox--enabled", o)
    }, o ? 0 : 300), window.setTimeout(function () {
      goog.dom.classes.enable(t, "yt-lightbox--visible", o)
    }, o ? 10 : 0)
  };
  var gweb = {
    uri: {}
  };
  gweb.uri.getParamsAndFragments = function (o, t) {
    var e = o.getQueryData(),
      r = o.getFragment(),
      r = new goog.Uri.QueryData(r);
    return e.containsKey(t) ? e.getValues(t) : r.getValues(t)
  }, gweb.uri.setHash = function (o) {
    window.location.hash = o
  }, gweb.uri.setParamsOrFragment = function (o, t, e, r) {
    var g = o.getQueryData(),
      n = o.getFragment(),
      i = null;
    g.containsKey(t) || !r ? e && e.length && (g.setValues(t, e), o.setQueryData(g)) : (i = new goog.Uri.QueryData(n), (i.containsKey(t) || r) && e && e.length && (i.setValues(t, e), o.setFragment(i.toDecodedString())))
  }, gweb.uri.appendParams = function (o, t, e) {
    var r, g, n = o.getQueryData(),
      i = o.getFragment(),
      s = null,
      a = !1,
      u = !1;
    for (g in t) r = t[g], goog.isArray(r) && (n.containsKey(g) || !e ? r && r.length && (n.setValues(g, r), a = !0) : (goog.isNull(s) && (s = new goog.Uri.QueryData(i)), (s.containsKey(g) || e) && r && r.length && (s.setValues(g, r), u = !0)));
    a && o.setQueryData(n), !goog.isNull(s) && u && o.setFragment(s.toDecodedString())
  }, gweb.uri.updateLinks = function (o, t, e) {
    e = new goog.Uri(e || window.location.href), t = t || !1;
    for (var r in o)
      for (var g = o[r], n = 0, i = g.length; i > n; n++) {
        var s = g[n],
          a = gweb.uri.getParamsAndFragments(e, s);
        a && gweb.uri.updateLinkSetParameterValue_(r, s, a, t)
      }
  }, gweb.uri.updateLinkSetParameterValue_ = function (o, t, e, r) {
    o = goog.dom.getElementsByTagNameAndClass("a", o);
    for (var g = 0, n = o.length; n > g; g++) {
      var i = new goog.Uri(o[g].href);
      gweb.uri.setParamsOrFragment(i, t, e, r), o[g].href = i.toString()
    }
  }, contributor.main = function () {
    var o = angular.module("contributor-app", ["ngTouch"]);
    o.controller("MosaicController", contributor.ng.MosaicController), o.controller("CatsController", contributor.ng.CatsController), contributor.main.geodetect_(), contributor.main.initFallbackImages_(), contributor.yt.init(), contributor.main.enablePassParam_()
  }, goog.exportSymbol("contributor.main", contributor.main), contributor.main.enablePassParam_ = function () {
    gweb.uri.updateLinks({
      "js-pass-params": "subid utm_source utm_campaign utm_medium utm_term utm_content".split(" ")
    })
  }, contributor.main.geodetect_ = function () {
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
  }, contributor.main.initFallbackImages_ = function () {
    if (contributor.utils.isVideoFallbackEnabled()) {
      var o = document.querySelectorAll("video");
      [].forEach.call(o, function (o) {
        goog.style.setElementShown(o, !1)
      }), o = document.querySelectorAll(".video-fallback-hidden"), [].forEach.call(o, function (o) {
        o.classList.remove("video-fallback-hidden")
      })
    }
  }, contributor.setExperiment = function (o, t) {
    if ("noww-ww" == o && 1 == t) {
      var e = document.querySelectorAll(".js-exp-noww-ww");
      [].forEach.call(e, function (o) {
        o.setAttribute("href", "https://contributor.google.com/?utm_source=WW#/intro")
      })
    }
  }, goog.exportSymbol("contributor.setExperiment", contributor.setExperiment)
}();
