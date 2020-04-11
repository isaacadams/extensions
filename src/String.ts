String.prototype.isNullOrWhitespace = function() {
    if(!this) return true;
    return this.match(/^\s*$/) !== null;
}