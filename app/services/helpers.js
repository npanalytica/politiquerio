/**
 * @name: helpers
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('Helpers', [
function(Helpers) {

	return {
		// turns an array into a dictionary, with key @prop -> default: id
		dictionarify: function(arr, prop) {
			if(!_.isArray(arr)) return null;
			prop = prop || 'id';
			dict = {};
			for(var i = 0; i < arr.length; i++) {
				dict[arr[i][prop]] = arr[i];
			}
			return dict;
		},
		removeItem: function(item, array) {
			var index = array.indexOf(item);
			if(index > -1) array.splice(array.indexOf(item), 1);
		},
		generatePagination: function(n_items, items_per_page) {
			var n_pages = Math.ceil(n_items / items_per_page);
			var pages = [];
			for(var i = 0; i < n_pages; i++) pages.push(i);
			var pagination = {
				"items_per_page": items_per_page,
				"pages": pages,
				"current_page": 0,
				nextPage: function() {
					if(this.current_page < (this.pages.length - 1))
						this.current_page++;
				},
				prevPage: function() {
					if(this.current_page > 0) this.current_page--;
				},
				update: function(n_items) {
					var n_pages = Math.ceil(n_items / items_per_page);
					var pages = [];
					for(var i = 0; i < n_pages; i++) pages.push(i);
					this.pages = pages;
					this.current_page = 0;
				}
			}
			return pagination;
		}
	}
}]);
