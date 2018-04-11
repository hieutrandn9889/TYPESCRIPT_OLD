import { SearchPageObject } from '../pages/searchPage';
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({ When, Then }) {
    const search: SearchPageObject = new SearchPageObject();

    When(/^I type "(.*?)"$/, (text) => {
        return search.searchTextBox.sendKeys(text);
    });

    Then(/^I click on search button$/, () => {

    });
});

