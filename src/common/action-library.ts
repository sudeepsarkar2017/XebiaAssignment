import { browser, ElementFinder, protractor } from "protractor";

let EC = protractor.ExpectedConditions;

export class ActionLibrary {

    async get(url: string) {
        await browser.manage().deleteAllCookies()
        await browser.get(url).then(() => {
            console.log("logger: get(url)-->" + url)
        });
    }

    async grabTitle(expectedTitle?: string) {
        await browser.wait(EC.titleContains(expectedTitle), 5000).then(() => {
            console.log("logger: getTitle() -->" + expectedTitle)
        });
        return await browser.getTitle()
    }

    async waitForElement(locator: ElementFinder, waitTime = 5000, action = 'visibilityOf()') {
        await browser.wait(EC.visibilityOf(locator), waitTime).then(() => {
            console.log(`logger: wait for ${action} ` + locator.parentElementArrayFinder.locator_.value)
        });
    }

    async click(locator: ElementFinder, waitTime = 5000) {
        await browser.wait(EC.elementToBeClickable(locator), waitTime).then(() => {
            console.log("logger: wait for elementToBeClickable()" + locator.parentElementArrayFinder.locator_.value)
        });
        await locator.click().then(() => {
            console.log('logger: click(): ' + locator.parentElementArrayFinder.locator_.value);
        });
    }

    async grabAttribute(locator: ElementFinder, attributeName: string, waitTime?: number, action = 'grabAttribute()'): Promise<string> {
        await this.waitForElement(locator, waitTime, action);
        let attribute = await locator.getAttribute(attributeName).then((attr: string) => {
            console.log("logger: getAttribute(): " + locator.parentElementArrayFinder.locator_.value)
            return attr
        });
        return attribute
    }

    async grabText(locator: ElementFinder, waitTime?: number, action = 'grabText()'): Promise<string> {
        await this.waitForElement(locator, waitTime, action);
        let text = await locator.getText().then((txt: string) => {
            console.log("logger: getAttribute(): " + locator.parentElementArrayFinder.locator_.value)
            return txt
        });
        return text;
    }

    async waitForInvisibilityOf(locator: ElementFinder, waitTime = 5000) {
        await browser.wait(EC.invisibilityOf(locator), waitTime).then(() => {
            console.log("logger: wait for invisibilityOf()" + locator.parentElementArrayFinder.locator_.value)
        });
    }

}
