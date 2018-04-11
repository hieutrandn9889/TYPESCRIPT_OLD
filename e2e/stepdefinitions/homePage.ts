import { browser } from 'protractor';
import { SearchPageObject } from '../pages/searchPage';
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({Given}) {
    const search: SearchPageObject = new SearchPageObject();

    Given(/^I am on google page$/, () => {
        return true;
    });
});
