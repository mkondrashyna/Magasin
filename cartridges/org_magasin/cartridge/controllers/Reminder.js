'use strict';

var server = require('server');

var reminder = require('*/cartridge/scripts/middleware/reminder');

server.get('Remove', reminder.removeItem);

module.exports = server.exports();
