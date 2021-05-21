import { ActionLibrary } from "../../common/action-library";
import { Module1Page } from "./module1-po";

const action = new ActionLibrary();
const po = new Module1Page();
const testData = require("./module1-data.json")

describe("Xebia  Assignment for Test Engineer position", () => {

  testData.testScript_001.forEach((data: any) => {
    it("Test to verify HOME page", async () => {
      await action.get(data.url);
      expect(await action.grabTitle(data.pageTitle)).toEqual(data.pageTitle);
      expect(await po.brandLogo.getAttribute('alt')).toEqual(data.logoAltText);
      expect(await po.searchBar.isDisplayed()).toBe(true);
    })
  })

  testData.testScript_002.forEach((data: any) => {
    it("Test to verify cruise search", async () => {
      await action.get(data.url);
      await po.cruiseSearch(data);
      await po.verifyCruiseSearch(data);
    })
  })
})