'use strict';

var server = require('server');
server.extend(module.superModule);

var reminder = require('*/cartridge/scripts/middleware/reminder');

server.append('Show', reminder.getReminderItems);

module.exports = server.exports();
