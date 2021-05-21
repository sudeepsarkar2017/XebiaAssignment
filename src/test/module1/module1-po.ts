import { element, ElementFinder, by, browser, protractor } from "protractor";
import { ActionLibrary } from "../../common/action-library";
import { CommonPage } from "../../common/common-po";

const action = new ActionLibrary();
let EC = protractor.ExpectedConditions;

export class Module1Page extends CommonPage {

    readonly destinationsCruiseSearchTextBox: Promise<ElementFinder> = this.cruiseSearchFilterOption('Destinations');
    readonly departureDateCruiseSearchTextBox: Promise<ElementFinder> = this.cruiseSearchFilterOption('Departure Date');
    readonly durationCruiseSearchTextBox: Promise<ElementFinder> = this.cruiseSearchFilterOption('Duration');
    readonly departFromCruiseSearchTextBox: Promise<ElementFinder> = this.cruiseSearchFilterOption('Depart From');
    readonly cruseSearchButton: ElementFinder = element(by.xpath("//div[@class='search-bar']//button[text()='Search' and contains(@aria-disabled, 'false')]"))
    readonly destination: ElementFinder = element(by.css(".card-title"))
    readonly departFrom: ElementFinder = element(by.xpath("//div[@class='itinerary-block']/div[text()='Departs']/following-sibling::span"))
    readonly cookiesBanner: ElementFinder = element(by.css("#onetrust-close-btn-container button"))

    async cruiseSearchFilterOption(filterLabel: string): Promise<ElementFinder> {
        let locator = element(by.xpath(`//div[@class='search-bar']//span[@class='dropdown-title' and text()='${filterLabel}']`));
        await action.waitForElement(locator)
        return locator
    }

    cruiseSearchOverLayOption(): ElementFinder {
        return element(by.xpath("//div[@class='overlay-container']//button[contains(@class,'enabledClass')]"))
    }

    async clickCruiseSearchOverLayFirstOption() {
        let ariaLabelAttribute = ''
        await action.click(this.cruiseSearchOverLayOption()).then(async () => {
            let selectedOption: ElementFinder = element(by.xpath("//div[@class='overlay-container']//button[contains(@class,'enabledClass') and @aria-checked='true']"))
            await action.waitForElement(selectedOption);
            ariaLabelAttribute = await action.grabAttribute(selectedOption, 'aria-label');
        })
        return ariaLabelAttribute.trim()
    }
    async cruiseSearch(data: any) {
        await this.cookiesBanner.isPresent().then(async (banner) => {
            if (banner) {
                await action.click(this.cookiesBanner);
                await action.waitForInvisibilityOf(this.cookiesBanner)
            }
        })
        await action.click(await this.destinationsCruiseSearchTextBox);
        data.destination = await this.clickCruiseSearchOverLayFirstOption();
        await action.click(await this.departureDateCruiseSearchTextBox);
        data.departureDate = await this.clickCruiseSearchOverLayFirstOption();
        await action.click(await this.durationCruiseSearchTextBox);
        data.duration = await this.clickCruiseSearchOverLayFirstOption();
        await action.click(await this.departFromCruiseSearchTextBox);
        data.departFrom = await this.clickCruiseSearchOverLayFirstOption();
        await action.click(this.cruseSearchButton);
    }

    async verifyCruiseSearch(data: any) {
        let itineraryCard: ElementFinder = element(by.css(".tile-itinerary-card "))
        let destination: ElementFinder = element(by.css(".card-title"))
        let departFrom: ElementFinder = element(by.xpath("//div[@class='itinerary-block']/div[text()='Departs']/following-sibling::span"))
        await action.waitForElement(itineraryCard);
        // expect(await (await action.grabText(destination)).trim()).toContain(data.destination.trim());
        expect(data.departFrom).toContain( (await action.grabText(departFrom)).trim());
    }

}