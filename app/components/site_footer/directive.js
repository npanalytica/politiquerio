/**
 * @name site-footer
 * @version 0.0.1
 *
**/

angular.module('app').controller('SiteFooterController', [
'Helpers', function(Helpers) {
	var dichos_mensos = [
		'Solum potestis prohibere ignes silvarum',
		'Canis meus id comedit',
		'Sit vis nobiscum',
		'Balaenae Nobis Conservandae Sunt',
		'Vidistine nuper imagines moventes bonas?',
		'Prehende uxorem meam, sis'
	]
	this.dicho = Helpers.randomItem(dichos_mensos);
}]);

angular.module('app').directive('siteFooter', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'SiteFooterController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/site_footer/view.html'
	}
});
