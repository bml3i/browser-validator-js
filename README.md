# browser-validator-js
### Show friendly messages to user if the website doesn't support specific web engine type/version. 

# Example

This online [demo](http://blog.bigcay.com/demo/browser_validator_demo.html) would prevent us from visiting the page if we are using the following web browser engines: 
1. Webkit (Chrome/Safari)
2. Any IE version other than 7 or 8

**Link:**[http://blog.bigcay.com/demo/browser_validator_demo.html](http://blog.bigcay.com/demo/browser_validator_demo.html)


# How to use

Include the browser validator and jQuery scripts in the head tag. 

	<script src="js/jquery.js" charset="utf-8" type="text/javascript"></script>
	<script src="js/browser-validator.js" charset="utf-8" type="text/javascript"></script>

When the page is loaded, simply call `.init(options)` and `.validateBrowser()`. 

	<script type="text/javascript">
		$(document).ready(function () {
			BrowserValidator.init({
				webkit: {
					majorVersionMax: 0,
					prompt: "Unfortunately, this site doesn't support any browsers with Webkit."
				},
				msie: {
					majorVersionMin: 7,
					majorVersionMax: 8,
					prompt: "Unfortunately, this site supports IE 7/8. "
				}
			}).validateBrowser();
		});	
	</script>

**note:** jQuery version should be less than v1.9, or we may need to jQuery.migrate plugin. I used v1.7 in the demo page and it works well. 

# Customization

By default, browser-validator-js would prevent users from visiting the site if they are using IE browsers and the version is less than 8. However, we could simply add our own configurations as well as prompt messages by invoking the `.init(options)` method. 

In the above demo, we passed two configuration items to `.init(options)` method. The first configuration item is going to check if user is using any version of webkit browser (**note:** `majorVersionMax: 0` means we don't care the browser version as long as the web browser engine is webkit), if this is true, the prompt message `Unfortunately, this site doesn't support any browsers with Webkit.` would be shown on the screen. 

For now, all supported web browser engines are: webkit (Chrome/Safari), opera, msie (IE) and mozilla (Firefox). 

	BrowserValidator.init({
		webkit: {
			majorVersionMax: 0,
			prompt: "Unfortunately, this site doesn't support any browsers with Webkit."
		},
		msie: {
			majorVersionMin: 7,
			majorVersionMax: 8,
			prompt: "Unfortunately, this site supports IE 7/8. "
		}
	}).validateBrowser();


