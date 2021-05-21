import { browser, element, ElementFinder,by } from "protractor";
import { ActionLibrary } from "./action-library";

const action= new ActionLibrary();

/**
 * Ultimate base class of Page Objects containing data and functionality
 * common to all Page Objects.
 */
 export class CommonPage {
/**
 * Common locators of the application.
 */

readonly brandLogo:ElementFinder = element(by.css('.nav-brand-logo a img'));
readonly searchBar:ElementFinder = element(by.css("div[class='search-bar']"));

 }