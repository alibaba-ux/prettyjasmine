/**
 * 测试运行入口 
 * @author qijun.weiqj@alibaba-inc.com
 */
require(['jquery', 'helper', 'reporter'], 

		function($, Helper, Reporter) {

var Main = {

	init: function() {
		var url = this.getParam('test');
		if (!url) {
			return this.showPrompt();
		}

		this.initFixtureSupport();	
		this.proxyTest();
		Helper.serial([
			$.proxy(this, 'loadJs', url),
			$.proxy(this, 'loadImportjs'),
			$.proxy(this, 'installDescribe'),
			$.proxy(this, 'runTests')
		]);
	},

	getParam: function(name) {
		var params = this.params || 
				(this.params = Helper.unparam(window.location.search));
		return params[name];
	},

	showPrompt: function() {
		$('div.container').show();
		$('a.comeback').hide();
	},

	initFixtureSupport: function() {
		var self = this,
			proxyUrl = 'fixture.php',	
			fixture = new jasmine.Fixtures();

		fixture.fixturesPath = 'remote';
		
		load = function() {
			var base = self.getBaseUrl(),
				urls = $.map(arguments, function(url) { 
					return proxyUrl + '?url=' + Helper.join(base, url);
				});
			fixture.load.apply(fixture, urls);
		};

		window.loadFixtures = load;	
	},

	proxyTest: function() {
		var self = this;
		this._describe = describe;
		window.describe = function() {
			self._specs.push(arguments);	
		};

		window.importjs = $.proxy(this, 'importjs');
	},

	importjs: function(urls) {
		urls = $.makeArray(urls);
		this._importjs.push.apply(this._importjs, urls);
	},

	loadJs: function(url) {
		url = this.expandUrl(url);
		return $.Deferred(function(p) {
			var fired = false;
			$.ajax(url, { 
				dataType: 'script', 
				crossDomain: true
			}).done(function() {
				fired || p.resolve();
				fired = true;	
			}); 

			setTimeout(function() {
				fired || p.reject(); 
				fired = true;
			}, 2000);

		}).fail($.proxy(this, 'alert', '找不到文件: ' + url));
	},

	expandUrl: function(url, stamp) {
		var base = this.getBaseUrl();
		if (!/\.js$/.test(url)) {
			url += '.js';
		}
		if (!/^https?:\/\//.test(url) && base) {
			url = Helper.join(base, url);
		}
		if (stamp) {
			url = Helper.url(url, '_=' + $.now());
		}
		return url;
	},

	loadImportjs: function() {
		var self = this,
			promise = $.when(),
			urls = this._importjs.slice();
		this._importjs = [];

		$.each(urls, function(index, url) {
			promise = promise.pipe(function() {
				var defer = $.Deferred(),
					p = self.loadJs(url);
				p.done(function() {
					if (self._importjs.length) {
						self.loadImportjs().done(defer.resolve);
					} else {
						defer.resolve();
					}
				});		
				return defer;
			});	
		});
		return promise;
	},

	installDescribe: function() {
		var self = this;
		window.describe = this._describe;
		$.each(this._specs, function(index, args) {
			describe.apply(window, args);
		});
		return $.when();
	},

	getBaseUrl: function() {
		return this.getParam('base');
	},

	runTests: function() {
		var reporter = new Reporter(),
			env = jasmine.getEnv();

		env.updateInterval = 1000;
		env.addReporter(reporter);
		env.specFilter = function(spec) {
			return reporter.specFilter(spec);
		};

		env.execute();	
	},

	alert:function(message) {
		var panel = $('div.runner-panel'),
			alert = $('div.alert', panel);
		if (!alert.length) {
			alert = $('<div class="alert alert-error">').appendTo(panel);
		}
		alert.html(message);
	},

	_specs: [],
	_importjs: []
};


$($.proxy(Main, 'init'));


});


define('jquery', function() {
	return jQuery;
});

