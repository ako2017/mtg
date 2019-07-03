Array.prototype.removeByValue = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) {
			this.splice(i, 1);
			return val;
		}
	}
	return null;
}

Array.prototype.contains = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) {
			return true;
		}
	}
	return false;
}

Array.prototype.removeByValues = function(val) {
	for (var i = 0; i < val.length; i++) {
		this.removeByValue(val[i]);
	}
}