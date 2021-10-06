'use strict';
var Logger = require('dw/system/Logger');
var Transaction = require('dw/system/Transaction');

/**
 * @param {Object} profile current customer's profile
 * @returns {List} - list of reminder items
 */
function getReminderItems(profile) {
    var result = [];
    var birthdayReminderList = null;

    if (profile.custom.birthdayReminder) {
        try {
            birthdayReminderList = JSON.parse(profile.custom.birthdayReminder);
        } catch (e) {
            Logger.error('Error while parse birthdayReminder value from customerNo={0}\n, error={1}', profile.customerNo, e);
            result = [];
        }
        if (birthdayReminderList) {
            result = birthdayReminderList;
        }
    }

    return result;
}

/**
 * @param {Object} profile current customer's profile
 * @param {string} uuid remind id to remove
 */
function deleteItem(profile, uuid) {
    var isItemToRemoved = false;
    var items = [];
    if (profile.custom.birthdayReminder && uuid) {
        var birthdayReminderList = JSON.parse(profile.custom.birthdayReminder);
        for (var i = 0; i < birthdayReminderList.length; i++) {
            var item = birthdayReminderList[i];
            if (item.uuid !== uuid) {
                items.push(item);
            } else {
                isItemToRemoved = true;
            }
        }

        if (isItemToRemoved) {
            Transaction.wrap(function () {
                // eslint-disable-next-line no-param-reassign
                profile.custom.birthdayReminder = JSON.stringify(items);
            });
        }
    }
}

module.exports = {
    getReminderItems: getReminderItems,
    delete: deleteItem
};
