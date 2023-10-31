'use strict';

// TO-DO: Translate to typescript

const user = require('../user');
const meta = require('../meta');
const analytics = require('../analytics');
const usersController = require('./admin/users');
const helpers = require('./helpers');

const instructorController = module.exports;

instructorController.ipBlacklist = async function (req, res, next) {
    const isAdminOrGlobalMod = await user.isAdminOrGlobalMod(req.uid);
    if (!isAdminOrGlobalMod) {
        return next();
    }

    const [rules, analyticsData] = await Promise.all([
        meta.blacklist.get(),
        analytics.getBlacklistAnalytics(),
    ]);
    res.render('ip-blacklist', {
        title: '[[pages:ip-blacklist]]',
        rules: rules,
        analytics: analyticsData,
        breadcrumbs: helpers.buildBreadcrumbs([{ text: '[[pages:ip-blacklist]]' }]),
    });
};


instructorController.registrationQueue = async function (req, res, next) {
    const isAdminOrGlobalMod = await user.isAdminOrGlobalMod(req.uid);
    if (!isAdminOrGlobalMod) {
        return next();
    }
    await usersController.registrationQueue(req, res);
};