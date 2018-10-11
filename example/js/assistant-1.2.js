//////////////////////////////////////////////
//  ggAssistant JS/CSS      PlugIn V1.2     //
//  Developed by: Ing.Gerardo Garita J.     //
//                FullStack Developer       //
//  email:  info@ggaritaj.com               //
//  date:       wednesday, 2018-07-25       //
//  last date:  wednesday, 2018-08-23       //
//////////////////////////////////////////////

; (function ($) {
    var _gghistory = [];
    if (!Array.prototype._cont) {
        Array.prototype._cont = function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element) {
                    return true;
                }
            }
            return false;
        };
    }
    jQuery.fn.Assistant = function () {
        return this;
    };
    jQuery.fn.ggAssistant = function (options) { 
        try {
            _ggSetSize(this);
            $(this).each(function (a, ul) {
                var _classAssistant = $(ul).attr("assistant");
                $(ul).find("li").on("click", function (e) {
                    var itemClicked = $(this);
                    if (!$(itemClicked).hasClass("disabled")) {
                        if ($(itemClicked).hasClass("page")) {
                            _gghistory.push([_classAssistant, $(ul).Assistant().GetPosition()]);
                            var aTagInsted = $(this.children[0]);
                            var divPaginate = $(aTagInsted[0]).attr("page-element");
                            var prevBtn = $("ul[assistant='" + _classAssistant + "']").find("li.prev");
                            var nextBtn = $("ul[assistant='" + _classAssistant + "']").find("li.next");
                            $("div[assistant-element='" + _classAssistant + "'].paginate").removeClass("active");
                            $("ul[assistant='" + _classAssistant + "']").find("li").removeClass("active");
                            $(divPaginate).addClass("active");
                            $("ul[assistant='" + _classAssistant + "']").find("a[page-element='" + divPaginate + "']").each(function () {
                                $(this.parentNode).addClass("active");
                            });
                            $(prevBtn).removeClass("disabled");
                            $(nextBtn).removeClass("disabled");
                            if ($($(ul).find("li.page.active").next()).hasClass("next")) {
                                $(nextBtn).addClass("disabled");
                            } else if ($($(ul).find("li.page.active").prev()).hasClass("prev")) {
                                $(prevBtn).addClass("disabled");
                            }
                        } else {
                            var activeOption = $(ul).find("li.page.active");
                            if ($(itemClicked).hasClass("prev")) {
                                _ggSetActiveOption("prev", activeOption);
                            } else if ($(itemClicked).hasClass("next")) {
                                _ggSetActiveOption("next", activeOption);
                            }
                        }
                    } else {
                        e.preventDefault();
                    }
                });
                if ((options != undefined) && (options !== null) && (options !== "")) {
                    var startPos = 2;
                    if (options.hasOwnProperty('startAt')) {
                        startPos = ((options.startAt > 0) ? (options.startAt + 1) : startPos);
                    }
                    $(ul).find("li:nth-child(" + startPos + ")").addClass("active");
                    $("div[assistant-element='" + _classAssistant + "']:nth-child(" + startPos + ")").addClass("active");
                    var optQty = $(ul).find("li").length;
                    if (startPos == 2) {
                        $(ul).find("li.prev").addClass("disabled");
                        $(ul).find("li.next").removeClass("disabled");
                    } else if (startPos == (optQty - 1)) {
                        $(ul).find("li.prev").removeClass("disabled");
                        $(ul).find("li.next").addClass("disabled");
                    } else {
                        $(ul).find("li.prev, li.next").removeClass("disabled");
                    }
                    var refresh = false;
                    if (options.hasOwnProperty('disable')) {
                        $(options.disable).each(function (pos, item) {
                            $($(ul).find("li.page")[item - 1]).addClass("disabled").removeClass("active");
                        });
                        refresh = true;
                    }
                    if (options.hasOwnProperty('hide')) {
                        $(options.hide).each(function (pos, item) {
                            $($(ul).find("li.page")[item - 1]).addClass("hide").removeClass("active");
                        });
                        refresh = true;
                    }
                    if (refresh) {
                        $(ul).Assistant().Refresh();
                    }
                } else {
                    $("ul[assistant='" + _classAssistant + "']").find("li:nth-child(2)").addClass("active");
                    $("div[assistant-element='" + _classAssistant + "']:nth-child(2)").addClass("active");
                    $("ul[assistant='" + _classAssistant + "']").find("li.prev").addClass("disabled");
                    $("ul[assistant='" + _classAssistant + "']").find("li.next").removeClass("disabled");
                }
            });
            console.log("gg:assistant ready!");
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
        finally {
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 1000);
        }
    };
    jQuery.fn.Assistant().Refresh = function () {
        try {
            _ggSetSize(this);
            $(this).each(function (a, ul) {
                var act = $(ul).find("li:nth-child(" + ($(ul).Assistant().GetPosition() + 1) + ")");
                if (_ggIsMovementEnable("prev", $(act))) {
                    $(ul).find("li.prev").removeClass("disabled");
                } else {
                    $(ul).find("li.prev").addClass("disabled");
                }
                if (_ggIsMovementEnable("next", $(act))) {
                    $(ul).find("li.next").removeClass("disabled");
                } else {
                    $(ul).find("li.next").addClass("disabled");
                }
            });
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
        finally {
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 1000);
        }
    };
    jQuery.fn.Assistant().GetPosition = function () {
        try {
            var position = null;
            $(this[0]).find("li.page").each(function (pos, item) {
                if ($(this).hasClass("active")) {
                    position = pos + 1;
                    return false;
                }
            });
            return position;
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.Assistant().SetPosition = function (position, fireEvent) {
        try {
            if (position != undefined) {
                fireEvent = ((fireEvent == undefined || fireEvent == null) ? true : fireEvent);
                var _classAssistant = $(this[0]).attr("assistant");
                $("div[assistant-element='" + _classAssistant + "']").removeClass("active");
                _gghistory.push([_classAssistant, $(this).Assistant().GetPosition()]);
                $(this).each(function (a, ul) {
                    var liTag = $(ul).find("li:nth-child(" + (position + 1) + ")");
                    if (fireEvent === false) {
                        var divId = $($(liTag).find("a")).attr("page-element");
                        $(ul).find("li").removeClass("active");
                        $(liTag).addClass("active");
                        $(divId).addClass("active");
                        var opts = $(ul).find("li").length;
                        if (position == 1) {
                            $(ul).find("li.prev").addClass("disabled");
                        } else if (position == (opts - 2)) {
                            $(ul).find("li.next").addClass("disabled");
                        } else {
                            $(ul).find("li.prev").removeClass("disabled");
                            $(ul).find("li.next").removeClass("disabled");
                        }
                    } else {
                        $(liTag).click();
                        return false;
                    }
                });
            } else {
                console.log("there is no position");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.Assistant().Show = function (position) {
        try {
            if (position != undefined) {
                $(this).each(function (a, ul) {
                    $(position).each(function (b, pos) {
                        $(ul).find("li:nth-child(" + (pos + 1) + ")").removeClass("hide");
                    });
                });
                $(this).Assistant().Refresh();
            } else {
                console.log("there is no position");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
        finally {
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 1000);
        }
    };
    jQuery.fn.Assistant().Hide = function (position) {
        try {
            if (position != undefined) {
                $(this).each(function (a, ul) {
                    $(position).each(function (b, pos) {
                        $(ul).find("li:nth-child(" + (pos + 1) + ")").addClass("hide");
                    });
                });
                $(this).Assistant().Refresh();
            } else {
                console.log("there is no position");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
        finally {
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 1000);
        }
    };
    jQuery.fn.Assistant().Enable = function (position) {
        try {
            if (position != undefined) {
                $(this).each(function (a, ul) {
                    $(position).each(function (b, pos) {
                        $(ul).find("li:nth-child(" + (pos + 1) + ")").removeClass("disabled");
                    });
                });
                $(this).Assistant().Refresh();
            } else {
                console.log("there is no position");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.Assistant().Disable = function (position) {
        try {
            if (position != undefined) {
                $(this).each(function (a, ul) {
                    $(position).each(function (b, pos) {
                        $(ul).find("li:nth-child(" + (pos + 1) + ")").addClass("disabled");
                    });
                });
                $(this).Assistant().Refresh();
            } else {
                console.log("there is no position");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.Assistant().History = function (quantity) {
        try {
            var _classAssistant = $(this[0]).attr("assistant");
            if (quantity == undefined || quantity == null || quantity == "") {
                console.log("quantity is not set");
                return null;
            } else {
                var result = [];
                $(_gghistory).each(function (a, item) {
                    if (item[0] == _classAssistant) {
                        result.push(item[1]);
                    }
                });
                result = ((quantity === "all") ? result : (result.slice((result.length - quantity), result.length)));
                return result;
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    function _ggSetSize(selector) {
        var assistantsQty = $(selector).length;
        var opts = $(selector).find("li:visible");
        $(opts).attr("style", "width:" + (Math.floor(100 / (($(opts).length) / assistantsQty))) + "%");
    };
    function _ggSetActiveOption(type, opt) {
        var _classAssistant = $(($(opt).find("a").attr("page-element"))).attr("assistant-element");
        var activeOption = null;
        if (type === "prev") {
            activeOption = $(opt).prev()[0];
        } else if (type === "next") {
            activeOption = $(opt).next()[0];
        } else {
            return false;
        }
        if ($(activeOption).hasClass("page")) {
            if (!$(activeOption).hasClass("hide") && !$(activeOption).hasClass("disabled")) {
                $(activeOption).click();
            } else {
                _ggSetActiveOption(type, activeOption);
            }
        } else {
            $("ul[assistant='" + _classAssistant + "']").find("li." + type).addClass("disabled");
        }
        return true;
    };
    function _ggIsMovementEnable(type, opt) {
        var option = null;
        if (type === "prev") {
            option = $(opt).prev()[0];
        } else if (type === "next") {
            option = $(opt).next()[0];
        } else {
            return false;
        }
        if ($(option).hasClass("page")) {
            if (!$(option).hasClass("hide") && !$(option).hasClass("disabled")) {
                return true;
            } else {
                _ggIsMovementEnable(type, option);
            }
        } else {
            return false;
        }
    };
})(jQuery);
