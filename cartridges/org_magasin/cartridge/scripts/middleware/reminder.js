'use strict';

var URLUtils = require('dw/web/URLUtils');
var reminderHelpers = require('*/cartridge/scripts/helpers/reminderHelpers');

/**
 * Middleware vthat gets account birth reminder items
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function getReminderItems(req, res, next) {
    res.setViewData({
        reminderItems: reminderHelpers.getReminderItems(req.currentCustomer.raw.profile)
    });

    next();
}

/**
 * Middleware vthat delete reminder item
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function removeItem(req, res, next) {
    var uuid = req.querystring.uuid;
    if (uuid) {
        reminderHelpers.delete(req.currentCustomer.raw.profile, uuid);
    }
    res.redirect(URLUtils.https('Account-Show'));
    next();
}

module.exports = {
    getReminderItems: getReminderItems,
    removeItem: removeItem
};
