google.maps.__gjsload__('infowindow', function(_) {
    var UO = function(a) {
            return !!a.infoWindow.get("logAsInternal")
        },
        LFa = function(a, b) {
            if (1 === a.Fg.size) {
                const c = Array.from(a.Fg.values())[0];
                c.qt !== b.qt && (c.set("map", null), a.Fg.delete(c))
            }
            a.Fg.add(b)
        },
        NFa = function(a, b) {
            var c = a.__gm;
            a = c.get("panes");
            c = c.get("innerContainer");
            b = {
                pl: a,
                wj: _.fC.wj(),
                Su: c,
                shouldFocus: b
            };
            return new MFa(b)
        },
        VO = function(a, b) {
            a.ah.style.visibility = b ? "" : "hidden";
            b && a.shouldFocus && (a.focus(), a.shouldFocus = !1);
            b ? OFa(a) : a.Mg = !1
        },
        PFa = function(a) {
            const b = !!a.get("open");
            var c = a.get("content");
            c = b ? c : null;
            if (c == a.Hg) VO(a, b && a.get("position"));
            else {
                if (a.Hg) {
                    const d = a.Hg.parentNode;
                    d == a.Fg && d.removeChild(a.Hg)
                }
                c && (a.Ng = !1, a.Fg.appendChild(c));
                VO(a, b && a.get("position"));
                a.Hg = c;
                WO(a)
            }
        },
        WO = function(a) {
            var b = a.getSize();
            if (b) {
                var c = b.Jl;
                b = b.minWidth;
                a.Gi.style.maxWidth = _.Ht(c.width);
                a.Gi.style.maxHeight = _.Ht(c.height);
                a.Gi.style.minWidth = _.Ht(b);
                a.Fg.style.maxHeight = _.on.Fg ? _.Ht(c.height - 18) : _.Ht(c.height - 36);
                XO(a);
                a.Kg.start()
            }
        },
        QFa = function(a) {
            const b = a.get("pixelOffset") || new _.Gl(0, 0);
            var c =
                new _.Gl(a.Gi.offsetWidth, a.Gi.offsetHeight);
            a = -b.height + c.height + 11 + 60;
            let d = b.height + 60;
            const e = -b.width + c.width / 2 + 60;
            c = b.width + c.width / 2 + 60;
            0 > b.height && (d -= b.height);
            return {
                top: a,
                bottom: d,
                left: e,
                right: c
            }
        },
        OFa = function(a) {
            !a.Mg && a.get("open") && a.get("visible") && a.get("position") && (_.Dk(a, "visible"), a.Mg = !0)
        },
        XO = function(a) {
            var b = a.get("position");
            if (b && a.get("pixelOffset")) {
                var c = QFa(a);
                const d = b.x - c.left,
                    e = b.y - c.top,
                    f = b.x + c.right;
                c = b.y + c.bottom;
                _.ru(a.anchor, b);
                b = a.get("zIndex");
                _.tu(a.ah, _.dj(b) ?
                    b : e + 60);
                a.set("pixelBounds", _.ym(d, e, f, c))
            }
        },
        SFa = function(a, b, c) {
            return b instanceof _.Nk ? new RFa(a, b, c) : new RFa(a, b)
        },
        UFa = function(a) {
            a.Fg && a.vi.push(_.Mt(a.Fg, "pixelposition_changed", () => {
                TFa(a)
            }))
        },
        TFa = function(a) {
            const b = a.model.get("pixelPosition") || a.Fg && a.Fg.get("pixelPosition");
            a.Jg.set("position", b)
        },
        WFa = function(a) {
            a = a.__gm;
            a.get("IW_AUTO_CLOSER") || a.set("IW_AUTO_CLOSER", new VFa);
            return a.get("IW_AUTO_CLOSER")
        },
        VFa = class {
            constructor() {
                this.Fg = new Set
            }
        };
    var MFa = class extends _.Hk {
        constructor(a) {
            super();
            this.Hg = this.Lg = null;
            this.Mg = this.Ng = !1;
            this.Su = a.Su;
            this.shouldFocus = a.shouldFocus;
            this.ah = document.createElement("div");
            this.ah.style.cursor = "default";
            this.ah.style.position = "absolute";
            this.ah.style.left = this.ah.style.top = "0";
            a.pl.floatPane.appendChild(this.ah);
            this.anchor = _.su("div", this.ah);
            this.Jg = _.su("div", this.anchor);
            this.Gi = _.su("div", this.Jg);
            this.Gi.setAttribute("role", "dialog");
            this.Gi.tabIndex = -1;
            this.Rg = _.su("div", this.Jg);
            this.Fg = _.su("div",
                this.Gi);
            _.gxa(this.ah);
            _.mu(this.Gi, "gm-style-iw");
            _.mu(this.anchor, "gm-style-iw-a");
            _.mu(this.Jg, "gm-style-iw-t");
            _.mu(this.Rg, "gm-style-iw-tc");
            _.mu(this.Gi, "gm-style-iw-c");
            _.mu(this.Fg, "gm-style-iw-d");
            _.on.Fg && !_.on.Mg && (a.wj ? this.Gi.style.paddingLeft = "0" : this.Gi.style.paddingRight = "0", this.Gi.style.paddingBottom = "0", this.Fg.style.overflow = "scroll");
            VO(this, !1);
            _.xk(this.ah, "mousedown", _.ok);
            _.xk(this.ah, "mouseup", _.ok);
            _.xk(this.ah, "mousemove", _.ok);
            _.xk(this.ah, "pointerdown", _.ok);
            _.xk(this.ah,
                "pointerup", _.ok);
            _.xk(this.ah, "pointermove", _.ok);
            _.xk(this.ah, "dblclick", _.ok);
            _.xk(this.ah, "click", _.ok);
            _.xk(this.ah, "touchstart", _.ok);
            _.xk(this.ah, "touchend", _.ok);
            _.xk(this.ah, "touchmove", _.ok);
            _.Lt(this.ah, "contextmenu", this, this.Pg);
            _.Lt(this.ah, "wheel", this, _.ok);
            _.Lt(this.ah, "mousewheel", this, _.lk);
            _.Lt(this.ah, "MozMousePixelScroll", this, _.lk);
            this.Gg = new _.iw({
                xp: new _.El(8, 8),
                Aq: new _.Gl(14, 14),
                offset: new _.El(-6, -6),
                ownerElement: this.Gi
            });
            this.Gi.appendChild(this.Gg.element);
            _.xk(this.Gg.element,
                "click", b => {
                    _.ok(b);
                    _.Dk(this, "closeclick");
                    this.set("open", !1)
                });
            this.Kg = new _.Wm(() => {
                !this.Ng && this.get("content") && this.get("visible") && (_.Dk(this, "domready"), this.Ng = !0)
            }, 0);
            this.Og = _.xk(this.ah, "keydown", b => {
                "Escape" !== b.key && "Esc" !== b.key || !this.Gi.contains(document.activeElement) || (b.stopPropagation(), _.Dk(this, "closeclick"), this.set("open", !1))
            })
        }
        ariaLabel_changed() {
            const a = this.get("ariaLabel");
            a ? this.Gi.setAttribute("aria-label", a) : this.Gi.removeAttribute("aria-label")
        }
        open_changed() {
            PFa(this)
        }
        content_changed() {
            PFa(this)
        }
        pendingFocus_changed() {
            this.get("pendingFocus") &&
                (this.get("open") && this.get("visible") && this.get("position") ? _.zn(this.Gi, !0) : console.warn("Setting focus on InfoWindow was ignored. This is most likely due to InfoWindow not being visible yet."), this.set("pendingFocus", !1))
        }
        dispose() {
            setTimeout(() => {
                document.activeElement && document.activeElement !== document.body || (this.Lg && this.Lg !== document.body ? _.zn(this.Lg, !0) || _.zn(this.Su, !0) : _.zn(this.Su, !0))
            });
            this.Og && _.sk(this.Og);
            this.ah.parentNode.removeChild(this.ah);
            this.Kg.stop();
            this.Kg.dispose()
        }
        getSize() {
            var a =
                this.get("layoutPixelBounds"),
                b = this.get("pixelOffset");
            const c = this.get("maxWidth") || 648,
                d = this.get("minWidth") || 0;
            if (!b) return null;
            a ? (b = a.zh - a.sh - (11 + -b.height), a = a.Bh - a.xh - 6, 240 <= a && (a -= 120), 240 <= b && (b -= 120)) : (a = 648, b = 654);
            a = Math.min(a, c);
            a = Math.max(d, a);
            a = Math.max(0, a);
            b = Math.max(0, b);
            return {
                Jl: new _.Gl(a, b),
                minWidth: d
            }
        }
        pixelOffset_changed() {
            const a = this.get("pixelOffset") || new _.Gl(0, 0);
            this.Jg.style.right = _.Ht(-a.width);
            this.Jg.style.bottom = _.Ht(-a.height + 11);
            WO(this)
        }
        layoutPixelBounds_changed() {
            WO(this)
        }
        position_changed() {
            this.get("position") ?
                (XO(this), VO(this, !!this.get("open"))) : VO(this, !1)
        }
        zIndex_changed() {
            XO(this)
        }
        visible_changed() {
            this.ah.style.display = this.get("visible") ? "" : "none";
            this.Kg.start();
            if (this.get("visible")) {
                const a = this.Gg.element.style.display;
                this.Gg.element.style.display = "none";
                this.Gg.element.getBoundingClientRect();
                this.Gg.element.style.display = a;
                OFa(this)
            } else this.Mg = !1
        }
        Pg(a) {
            let b = !1;
            const c = this.get("content");
            let d = a.target;
            for (; !b && d;) b = d == c, d = d.parentNode;
            b ? _.lk(a) : _.nk(a)
        }
        focus() {
            this.Lg = document.activeElement;
            let a;
            _.on.Ng && (a = this.Fg.getBoundingClientRect());
            if (this.get("disableAutoPan")) _.zn(this.Gi, !0);
            else {
                var b = _.yu(this.Fg);
                if (b.length) {
                    b = b[0];
                    a = a || this.Fg.getBoundingClientRect();
                    var c = b.getBoundingClientRect();
                    _.zn(c.bottom <= a.bottom && c.right <= a.right ? b : this.Gi, !0)
                } else _.zn(this.Gg.element, !0)
            }
        }
    };
    var RFa = class {
        constructor(a, b, c) {
            this.model = a;
            this.isOpen = !0;
            this.Fg = this.Hg = this.lh = null;
            this.vi = [];
            var d = a.get("shouldFocus");
            this.Jg = NFa(b, d);
            const e = b.__gm;
            (d = b instanceof _.Nk) && c ? c.then(h => {
                this.isOpen && (this.lh = h, this.Fg = new _.FL(l => {
                    this.Hg = new _.CB(b, h, l, () => {});
                    h.Fi(this.Hg);
                    return this.Hg
                }), this.Fg.bindTo("latLngPosition", a, "position"), UFa(this))
            }) : (this.Fg = new _.FL, this.Fg.bindTo("latLngPosition", a, "position"), this.Fg.bindTo("center", e, "projectionCenterQ"), this.Fg.bindTo("zoom", e), this.Fg.bindTo("offset",
                e), this.Fg.bindTo("projection", b), this.Fg.bindTo("focus", b, "position"), UFa(this));
            this.Kg = d ? UO(a) ? "Ia" : "Id" : null;
            this.Lg = d ? UO(a) ? 148284 : 148285 : null;
            const f = new _.GL(["scale"], "visible", h => null == h || .3 <= h);
            this.Fg && f.bindTo("scale", this.Fg);
            const g = this.Jg;
            g.set("logAsInternal", UO(a));
            g.bindTo("ariaLabel", a);
            g.bindTo("zIndex", a);
            g.bindTo("layoutPixelBounds", e, "pixelBounds");
            g.bindTo("disableAutoPan", a);
            g.bindTo("pendingFocus", a);
            g.bindTo("maxWidth", a);
            g.bindTo("minWidth", a);
            g.bindTo("content", a);
            g.bindTo("pixelOffset",
                a);
            g.bindTo("visible", f);
            this.Gg = new _.Wm(() => {
                if (b instanceof _.Nk)
                    if (this.lh) {
                        var h = a.get("position");
                        h && _.eu(b, this.lh, new _.gl(h), QFa(g))
                    } else c.then(() => {
                        this.Gg.start()
                    });
                else(h = g.get("pixelBounds")) ? _.Dk(e, "pantobounds", h) : this.Gg.start()
            }, 150);
            if (d) {
                let h = null;
                this.vi.push(_.Mt(a, "position_changed", () => {
                    const l = a.get("position");
                    !l || a.get("disableAutoPan") || l.equals(h) || (this.Gg.start(), h = l)
                }))
            } else a.get("disableAutoPan") || this.Gg.start();
            g.set("open", !0);
            this.vi.push(_.qk(g, "domready", () => {
                a.trigger("domready")
            }));
            this.vi.push(_.qk(g, "visible", () => {
                a.trigger("visible")
            }));
            this.vi.push(_.qk(g, "closeclick", () => {
                a.close();
                a.trigger("closeclick")
            }));
            this.vi.push(_.Mt(a, "pixelposition_changed", () => {
                TFa(this)
            }));
            this.Kg && _.xl(b, this.Kg);
            this.Lg && _.vl(b, this.Lg)
        }
        close() {
            if (this.isOpen) {
                this.isOpen = !1;
                for (var a of this.vi) _.sk(a);
                this.vi.length = 0;
                this.Gg.stop();
                this.Gg.dispose();
                this.lh && this.Hg && this.lh.jm(this.Hg);
                a = this.Jg;
                a.unbindAll();
                a.set("open", !1);
                a.dispose();
                this.Fg && this.Fg.unbindAll()
            }
        }
    };
    _.ik("infowindow", {
        vD: function(a) {
            let b = null;
            _.Mt(a, "map_changed", function d() {
                const e = a.get("map");
                b && (b.Qz.Fg.delete(a), b.hH.close(), b = null);
                if (e) {
                    const f = e.__gm;
                    f.get("panes") ? f.get("innerContainer") ? (b = {
                        hH: SFa(a, e, e instanceof _.Nk ? f.Gg.then(({
                            lh: g
                        }) => g) : void 0),
                        Qz: WFa(e)
                    }, LFa(b.Qz, a)) : _.Ak(f, "innercontainer_changed", d) : _.Ak(f, "panes_changed", d)
                }
            })
        }
    });
});