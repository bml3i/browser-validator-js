var BrowserValidator = (function () {
	// support engines: webkit, opera, msie, mozilla
	// configuration items: majorVersionMin, majorVersionMax, prompt
	var _defaults = {
		msie: {
			majorVersionMin: 8,
			prompt: "Unfortunately, this site doesn't support old version of IE."
		}
	};
	
	var showPrompt = false;
	var bypassValidation = false; 
	var prompt = "Unfortunately, this site doesn't support your web browser type/version. ";
	var browser = $.browser;
	var majorVersion = parseInt($.browser.version, 10);
	
	var settings = _defaults || {};
	
	return {
		init: function (options) {
			options = options || {};
			settings = $.extend({}, _defaults, options);
			return this; 
		},
		continueToVisit: function () {
			if (typeof(Storage) !== "undefined") {
				sessionStorage.setItem('browserValidatorJS_bypassValidation', true);
			}
			
			// refresh current page 
			window.location.href = $(location).attr('href');
		},
		validateBrowser: function () {
			if (typeof(Storage) !== "undefined") {
				bypassValidation = sessionStorage.getItem('browserValidatorJS_bypassValidation');
			}
			
			// bypass the validation
			if (bypassValidation) {
				return; 
			}
			
			var browserCheckList = $.map(settings, function (value, key) {
				return key;
			});
			
			for (var i = 0; i < browserCheckList.length; i++) {
				var currBrowserEngine = browserCheckList[i];
				
				// if the current browser type is in browser check list 
				if (browser[currBrowserEngine]) {
					if (settings[currBrowserEngine].prompt) {
						prompt = settings[currBrowserEngine].prompt; 
					}
					
					if (typeof(settings[currBrowserEngine].majorVersionMin) !== "undefined") {
						if (majorVersion < settings[currBrowserEngine].majorVersionMin) {
							showPrompt = true; 
						}
					}
					
					if (typeof(settings[currBrowserEngine].majorVersionMax) !== "undefined") {
						if (majorVersion > settings[currBrowserEngine].majorVersionMax) {
							showPrompt = true; 
						}
					}
					
					break; 
				}
			}
			
			if (showPrompt) {
				$('body').html('<div><h3>' + prompt + '</h3></div>');
				
				// show 'continue to visit' link if user's browser supports session storage
				if (typeof(Storage) !== "undefined") {
					$('body').append('<div> <a href="#" onclick="BrowserValidator.continueToVisit();">continue to visit?</a> (not recommend)</div>');
				}
			}
		}
	}
})();
