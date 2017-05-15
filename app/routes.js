angular.module('app').config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when('/', {
		templateUrl: '/modules/landing/view.html',
		controller: 'LandingController',
		controllerAs: 'vm'
	}).when('/api/', {
		templateUrl: '/api/v1/view.html',
		controller: 'ApiV1Controller',
		controllerAs: 'vm'
	}).when('/api/v1/', {
		templateUrl: '/api/v1/view.html',
		controller: 'ApiV1Controller',
		controllerAs: 'vm'
	});
}]);
