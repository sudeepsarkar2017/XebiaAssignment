import { browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions, protractor } from "protractor";

let EC = protractor.ExpectedConditions;

export class ActionLibrary {

    async get(url: string) {
       await browser.manage().deleteAllCookies()
        await browser.get(url);
    }

    async grabTitle(expectedTitle?: string) {
        await browser.wait(EC.titleContains(expectedTitle), 5000);
        return await browser.getTitle()
    }

    async waitForElement(locator: ElementFinder, waitTime = 5000) {
        await browser.wait(EC.visibilityOf(locator), waitTime);
    }

    async click(locator: ElementFinder, waitTime = 5000) {
        await browser.wait(EC.elementToBeClickable(locator), waitTime);
        await locator.click();
    }

    async grabAttribute(locator: ElementFinder, attributeName: string, waitTime?: number): Promise<string> {
        await browser.wait(EC.visibilityOf(locator), 5000);
        return await locator.getAttribute(attributeName);
    }

    async grabText(locator: ElementFinder, waitTime?: number): Promise<string> {
        await browser.wait(EC.visibilityOf(locator), 5000);
        return await locator.getText();
    }

    async waitForInvisibilityOf(locator: ElementFinder, waitTime = 5000) {
        await browser.wait(EC.invisibilityOf(locator), waitTime);
    }

}
