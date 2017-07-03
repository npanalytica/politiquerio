/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('BuscarController', [
'RESTDataset', 'Helpers', 'Static',
function(RESTDataset, Helpers, Static) {

	var self = this;

	self.SLIDER_DATE_OPTIONS = {floor: 1900, ceil: 2017};
	self.SLIDER_CLEAN_OPTIONS = {floor: 0, ceil: 4};

	self.search = {
		text: '',
		httpStatus: 3,
		has_national_data: false,
		has_state_data: false,
		has_mun_data: false,
		years: {from: 1900, to: 2017},
	}

	self.formatFecha = function(s) {
		return s.substring(0, 4);
	}

	self.pagination = Helpers.generatePagination(0, 7, 15);

	self.buscar = function() {
		RESTDataset.search(self.search, self.pagination);
	}

}]);
