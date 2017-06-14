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
		juntarLista: function(arr) {
			if(arr.length == 1) return arr[0];
			arr[arr.length - 2] =
				arr[arr.length - 2] + ' y ' + arr[arr.length - 1];
			arr.pop();
			return arr.join(', ');
		},
		// returns a random item from an array
		randomItem: function(array) {
			var index = Math.floor(Math.random() * array.length);
			return array[index];
		},
		removeItem: function(item, array) {
			var index = array.indexOf(item);
			if(index > -1) array.splice(array.indexOf(item), 1);
		},
		sort: function(datos, tipo, prop) {
			prop = prop || 'valor';
			return _.sortBy(datos, function(d) {
				return tipo == 'mayor' ?
					-parseInt(d[prop]) : parseInt(d[prop]);
			});
		},
		generatePagination: function(n_items, items_per_page, max_pages) {
			max_pages = max_pages || Infinity;
			var n_pages = Math.ceil(n_items / items_per_page);
			var pages = [];
			var pagination = {
				"truncated": false,
				"max_pages": max_pages,
				"items_per_page": items_per_page,
				"pages": pages,
				"current_page": 0,
				nextPage: function() {
					if(this.current_page < (this.pages[this.pages.length - 1]))
						this.current_page++;
				},
				prevPage: function() {
					if(this.current_page > 0) this.current_page--;
				},
				update: function(n_items) {
					var n_pages = Math.ceil(n_items / items_per_page);
					var pages = [];
					if(n_pages < this.max_pages) {
						for(var i = 0; i < n_pages; i++) pages.push(i);
					} else {
						this.truncated = true;
						pages = [0,1,2];
						for(var i = 3; i >= 1; i--) pages.push(n_pages - i);
					}
					this.pages = pages;
					this.current_page = 0;
				}
			}
			return pagination;
		}
	}
}]);
