angular.module('app').config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when('/', {
		templateUrl: '/modules/temporary_splash/view.html',
	}).when('/landing/', {
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
	}).when('/explorador/', {
		templateUrl: '/modules/explorador/view.html',
		controller: 'ExploradorController',
		controllerAs: 'vm'
	}).otherwise({
		templateUrl: '/modules/temporary_splash/view.html'
	});
}]);
