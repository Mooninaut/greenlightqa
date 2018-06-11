var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

// Adapted from Python link_has_gone_stale() on http://www.obeythetestinggoat.com/how-to-get-selenium-to-wait-for-page-load-after-a-click.html
function waitUntilStale(element) {
	return driver.wait(function() {
		return element.findElement(By.id('does-not-matter')).then(null, function(err) {
			//console.log(err.name);
			//console.log(err.message);
			return err.name === 'StaleElementReferenceError'
		});
	});
}

driver.get('https://www.phptravels.net/').then(function() {
    return driver.findElement(By.xpath("(//a[contains(text(),'My Account')])[2]"));
}).then(function(myAccount) {
    return myAccount.click();
}).then(function() {
    return driver.findElement(By.xpath("(//a[contains(text(),'Login')])[2]"));
}).then(function(login) {
    return login.click();
});
