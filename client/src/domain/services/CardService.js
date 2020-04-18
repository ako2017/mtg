CardService = function () {
};

CardService.prototype.getAvailableCards = function(extensionId) {
	db = new localStorageDB("mtg_db", localStorage);
	var queryResult = db.query('card_table', {ext_ref: extensionId});
	return queryResult;
};