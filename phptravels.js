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
	}, 20000);
}
function waitUntilPresent(selector) {
    return driver.wait(function() {
        return driver.findElement(selector).then(function(element) {
            return element.isDisplayed().then(function(displayed) {
                displayed ? element : null
            });
        },
        function(err) {
            console.log(err.name);
			//console.log(err.message);
            return null;
        });
    }, 15000);
}
function sendKeysToName(name, text) {
    return driver.findElement(By.name(name)).then(function(namedElement) {
        namedElement.clear().then(function() {
            namedElement.sendKeys(text);
        });
    });
}
driver.get('https://www.phptravels.net/').then(function() {
    return driver.findElement(By.xpath("(//a[contains(text(),'My Account')])[2]")).then(function(myAccount) {
        myAccount.click();
    });
}).then(function() {
    driver.findElement(By.xpath("(//a[contains(text(),'Login')])[2]")).then(function(login) {
        login.click();
        waitUntilStale(login);
    });
}).then(function() {
    driver.findElement(By.name("username")).then(function(username) {
        username.sendKeys("user@phptravels.com");
    });
}).then(function() {
    driver.findElement(By.name("password")).then(function(password) {
        password.sendKeys("demouser", webdriver.Key.ENTER);
        waitUntilStale(password);
    })
}).then(function() {
    driver.sleep(3000).then(function() {
        driver.findElement(By.css("span.profile-icon")).then(function(profile) {
            driver.sleep(3000).then(function() {
                profile.click();
            });
            //console.log("Clicked on profile!");
        });
    });
}).then(function() {
    sendKeysToName("address1", "469 AZ-64");
//    driver.findElement(By.name("address1")).then(function(address1) {
//        address1.sendKeys("469 AZ-64");
//    })
}).then(function() {
    //driver.findElement(By.name("city")).then(function())
    sendKeysToName("city", "Grand Canyon Village");
}).then(function() {
    sendKeysToName("state", "AZ");
}).then(function() {
    sendKeysToName("zip", "86023");
}).then(function() {
    driver.findElement(By.css("button.updateprofile")).then(function(updateButton) {
        updateButton.click();
    });
    driver.sleep(1000);
}).then(function() {
    driver.findElement(By.xpath("//a[contains(text(),'Blog')]")).then(function(blogLink) {
        blogLink.click();
        waitUntilStale(blogLink);
    });
}).then(function() {
    driver.findElement(By.xpath("//a[contains(text(),'Where to Eat in Rome…')]")).then(function(romeLink) {
        romeLink.click();
        waitUntilStale(romeLink);
    });
}).then(function() {
    driver.findElement(By.css("small.go-left.pull-right")).then(function(dateStamp) {
        dateStamp.getText().then(function(text) {
            if (text === "16/12/2014") {
                console.log("Test passed.");
            }
            else {
                console.log("Test failed.");
            }
        });
    });
});
