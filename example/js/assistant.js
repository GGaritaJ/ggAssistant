//////////////////////////////////////////////
//  ggAssistant JS/CSS      PlugIn V1.1     //
//  Developed by: Ing.Gerardo Garita J.     //
//                FullStack Developer       //
//  email:  info@ggaritaj.com               //
//          gerardo.garita@ecomtrading.com  //
//  date:       wednesday, 2018-07-25       //
//  last date:  wednesday, 2018-07-30       //
//////////////////////////////////////////////

; (function ($) {
    var classAssistant;
    var _gghistory = [];
    jQuery.fn.ggAssistant = function (selector, options) {  
        try {
            if (selector != undefined && selector != null) {
                classAssistant = selector;
                _ggSetSize(classAssistant);
                $(this).each(function (pos, item) {
                    var idAssistant = item.id;
                    $("ul#" + idAssistant + " li").on("click", function (e) {
                        var itemClicked = $(this);
                        if (!$(itemClicked).hasClass("disabled")) {
                            if ($(itemClicked).hasClass("page")) {
                                _gghistory.push($(classAssistant).ggAssistant.GetPosition());
                                var aTagInsted = $(this.childNodes[0]);
                                var divPaginate = $(aTagInsted[0]).attr("page-element");
                                var prevBtn = $("ul" + classAssistant + " li.prev");
                                var nextBtn = $("ul" + classAssistant + " li.next");
                                $("div[assistant-element='" + classAssistant + "'].paginate").removeClass("active");
                                $("ul" + classAssistant + " li").removeClass("active");
                                $(divPaginate).addClass("active");
                                $("ul" + classAssistant + " a[page-element='" + divPaginate + "']").each(function () {
                                    $(this.parentNode).addClass("active");
                                });
                                $(prevBtn).removeClass("disabled");
                                $(nextBtn).removeClass("disabled");
                                if ($($("ul#" + idAssistant + " li.page.active").next()).hasClass("next")) {
                                    $(nextBtn).addClass("disabled");
                                } else if ($($("ul#" + idAssistant + " li.page.active").prev()).hasClass("prev")) {
                                    $(prevBtn).addClass("disabled");
                                }
                            } else {
                                var activeOption = $("ul#" + idAssistant + " li.page.active");
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
                });
                if ((options != undefined) && (options !== null) && (options !== "")) {
                    var startPos = 2;
                    if (options.hasOwnProperty('startAt')) {
                        startPos = ((options.startAt > 0) ? (options.startAt + 1) : startPos);
                    }
                    $("ul" + classAssistant + " li:nth-child(" + startPos + ")").addClass("active");
                    $("div[assistant-element='" + classAssistant + "']:nth-child(" + startPos + ")").addClass("active");
                    var optQty = $("ul" + classAssistant)[0];
                    optQty = $(optQty).find("li").length;
                    if (startPos == 2) {
                        $("ul" + classAssistant + " li.prev").addClass("disabled");
                        $("ul" + classAssistant + " li.next").removeClass("disabled");
                    } else if (startPos == (optQty - 1)) {
                        $("ul" + classAssistant + " li.prev").removeClass("disabled");
                        $("ul" + classAssistant + " li.next").addClass("disabled");
                    } else {
                        $("ul" + classAssistant + " li.prev, ul" + classAssistant + " li.next").removeClass("disabled");
                    }
                    var refresh = false;
                    if (options.hasOwnProperty('disable')) {
                        $(options.disable).each(function (pos, item) {
                            $("ul" + classAssistant).each(function () {
                                $($(this).find("li.page")[item - 1]).addClass("disabled").removeClass("active");
                            });
                        });
                        refresh = true;
                    }
                    if (options.hasOwnProperty('hide')) {
                        $(options.hide).each(function (pos, item) {
                            $("ul" + classAssistant).each(function () {
                                $($(this).find("li.page")[item - 1]).addClass("hide").removeClass("active");
                            });
                        });
                        refresh = true;
                    }
                    if (refresh) {
                        $(classAssistant).ggAssistant.Refresh();
                    }
                } else {
                    $("ul" + classAssistant + " li:nth-child(2)").addClass("active");
                    $("div[assistant-element='" + classAssistant + "']:nth-child(2)").addClass("active");
                    $("ul" + classAssistant + " li.prev").addClass("disabled");
                    $("ul" + classAssistant + " li.next").removeClass("disabled");
                }
                console.log("gg:assistant ready!");
            } else {
                console.log("there is no selector");
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
    jQuery.fn.ggAssistant.Refresh = function () {
        try {
            if (classAssistant != undefined) {
                _ggSetSize(classAssistant);
                var act = $("ul" + classAssistant + " li:nth-child(" + ($(classAssistant).ggAssistant.GetPosition() + 1) + ")")[0];
                if (_ggIsMovementEnable("prev", $(act))) {
                    $("ul" + classAssistant + " li.prev").removeClass("disabled");
                } else {
                    $("ul" + classAssistant + " li.prev").addClass("disabled");
                }
                if (_ggIsMovementEnable("next", $(act))) {
                    $("ul" + classAssistant + " li.next").removeClass("disabled");
                } else {
                    $("ul" + classAssistant + " li.next").addClass("disabled");
                }
            } else {
                console.log("there is no selector");
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
    jQuery.fn.ggAssistant.GetPosition = function () {
        try {
            if (classAssistant != undefined) {
                var assistant = $("ul" + classAssistant)[0];
                var position = null;
                $(assistant).find("li.page").each(function (pos, item) {
                    if ($(this).hasClass("active")) {
                        position = pos + 1;
                        return false;
                    }
                });
                return position;
            } else {
                console.log("there is no selector");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.ggAssistant.SetPosition = function (position, fireEvent) {
        try {
            if (position != undefined && classAssistant != undefined) {
                _gghistory.push($(classAssistant).ggAssistant.GetPosition());
                fireEvent = ((fireEvent == undefined || fireEvent == null) ? true : fireEvent);
                var liTag = $("ul" + classAssistant + " li:nth-child(" + (position + 1) + ")");
                if (fireEvent === false) {
                    var divId = $($(liTag).find("a")).attr("page-element");
                    $("ul" + classAssistant + " li").removeClass("active");
                    $("div[assistant-element='" + classAssistant + "']").removeClass("active");
                    $(liTag).addClass("active");
                    $(divId).addClass("active");
                    var opts = (($("ul" + classAssistant + " li").length) / ($("ul" + classAssistant).length));
                    if (position == 1) {
                        $("ul" + classAssistant + " li.prev").addClass("disabled");
                    } else if (position == (opts - 2)) {
                        $("ul" + classAssistant + " li.next").addClass("disabled");
                    } else {
                        $("ul" + classAssistant + " li.prev").removeClass("disabled");
                        $("ul" + classAssistant + " li.next").removeClass("disabled");
                    }
                } else {
                    $(liTag)[0].click();
                }
            } else {
                console.log("position is not set or there is no selector");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.ggAssistant.Show = function (position) {
        try {
            if (position != undefined && classAssistant != undefined) {
                $(position).each(function (id, pos) {
                    $("ul" + classAssistant + " li:nth-child(" + (pos + 1) + ")").removeClass("hide");
                });
                $(classAssistant).ggAssistant.Refresh();
            } else {
                console.log("position is not set or there is no selector");
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
    jQuery.fn.ggAssistant.Hide = function (position) {
        try {
            if (position != undefined && classAssistant != undefined) {
                $(position).each(function (id, pos) {
                    $("ul" + classAssistant + " li:nth-child(" + (pos + 1) + ")").addClass("hide");
                });
                $(classAssistant).ggAssistant.Refresh();
            } else {
                console.log("position is not set or there is no selector");
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
    jQuery.fn.ggAssistant.Enable = function (position) {
        try {
            if (position != undefined && classAssistant != undefined) {
                $(position).each(function (id, pos) {
                    $("ul" + classAssistant + " li:nth-child(" + (pos + 1) + ")").removeClass("disabled");
                });
                $(classAssistant).ggAssistant.Refresh();
            } else {
                console.log("position is not set or there is no selector");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.ggAssistant.Disable = function (position) {
        try {
            if (position != undefined && classAssistant != undefined) {
                $(position).each(function (id, pos) {
                    $("ul" + classAssistant + " li:nth-child(" + (pos + 1) + ")").addClass("disabled");
                });
                $(classAssistant).ggAssistant.Refresh();
            } else {
                console.log("position is not set or there is no selector");
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    jQuery.fn.ggAssistant.History = function (quantity) {
        try {
            if (quantity == undefined || quantity == null || quantity == "") {
                console.log("quantity is not set");
                return null;
            } else if (quantity === "all") {
                return _gghistory;
            } else if (quantity === "last") {
                return _gghistory[_gghistory.length - 1];
            } else {
                return _gghistory[_gghistory.length - quantity];
            }
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
    };
    function _ggSetSize(selector) {
        var assistantsQty = $("ul" + selector).length;
        var opts = $(selector).find("li:visible");
        $(opts).attr("style", "width:" + (Math.floor(100 / (($(opts).length) / assistantsQty))) + "%");
    };
    function _ggSetActiveOption(type, opt) {
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
            $("ul" + classAssistant + " li." + type).addClass("disabled");
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
