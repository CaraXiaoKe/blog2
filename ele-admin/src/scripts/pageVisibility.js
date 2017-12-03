let prefixSupport;

const keyWithPrefix = function(prefix, key) {
    if (prefix !== "") {
        // 首字母大写
        return prefix + key.slice(0,1).toUpperCase() + key.slice(1);
    }
    return key;
};

const isPageVisibilitySupport = (function() {
    let support = false;
    if (typeof window.screenX === "number") {
        ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
            if (support == false && document[keyWithPrefix(prefix, "hidden")] != undefined) {
                prefixSupport = prefix;
                support = true;
            }
        });
    }
    return support;
})();

const isHidden = function() {
    if (isPageVisibilitySupport) {
        return document[keyWithPrefix(prefixSupport, "hidden")];
    }
    return undefined;
};

const  visibilityState = function() {
    if (isPageVisibilitySupport) {
        return document[keyWithPrefix(prefixSupport, "visibilityState")];
    }
    return undefined;
};

export default {
    hidden: isHidden(),
    visibilityState: visibilityState(),
    visibilitychange: function(fn, usecapture) {
        usecapture = undefined || false;
        if (isPageVisibilitySupport && typeof fn === "function") {
            return document.addEventListener(prefixSupport + "visibilitychange", function(evt) {
                this.hidden = isHidden();
                this.visibilityState = visibilityState();
                fn.call(this, evt);
            }.bind(this), usecapture);
        }
        return undefined;
    }
};
