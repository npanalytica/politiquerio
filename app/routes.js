angular.module('app').config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when('/', {
		templateUrl: '/modules/temporary_splash/view.html',
	}).when('/landing/:prequery?', {
		templateUrl: '/modules/landing/view.html',
		controller: 'LandingController',
		controllerAs: 'vm'
	}).when('/api/', {
		templateUrl: '/api/v1/view.html',
		controller: 'ApiV1Controller',
		controllerAs: 'vm'
	}).when('/buscar/', {
		templateUrl: '/modules/buscar/view.html',
		controller: 'BuscarController',
		controllerAs: 'vm'
	}).when('/test/', {
		templateUrl: '/modules/test/view.html',
		controller: 'TestController',
		controllerAs: 'vm'
	}).when('/api/v1/', {
		templateUrl: '/api/v1/view.html',
		controller: 'ApiV1Controller',
		controllerAs: 'vm'
	}).when('/persona/:id', {
		templateUrl: '/modules/persona/view.html',
		controller: 'PersonaController',
		controllerAs: 'vm'
	}).when('/explorador/', {
		templateUrl: '/modules/grupos/view.html',
		controller: 'GruposController',
		controllerAs: 'vm'
	}).when('/grupos/:id?', {
		templateUrl: '/modules/grupos/view.html',
		controller: 'GruposController',
		controllerAs: 'vm'
	}).when('/subgrupos/:id', {
		templateUrl: '/modules/subgrupos/view.html',
		controller: 'SubgruposController',
		controllerAs: 'vm'
	}).when('/estadisticas/:id', {
		templateUrl: '/modules/estadisticas/view.html',
		controller: 'EstadisticasController',
		controllerAs: 'vm'
	}).when('/datasets/:id', {
		templateUrl: '/modules/datasets/view.html',
		controller: 'DatasetsController',
		controllerAs: 'vm'
	}).when('/docs/manifesto', {
		templateUrl: '/modules/docs/manifesto.html',
		controller: 'DocsController',
		controllerAs: 'vm'
	}).otherwise({
		templateUrl: '/modules/temporary_splash/view.html'
	});
}]);
