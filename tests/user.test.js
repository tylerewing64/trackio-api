"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { expect, test } = require('@jest/globals');
const { User } = require('../models/userModel');
const user = new User();
const tyler = {
    username: "test",
    password: 'test',
    email: 'tyler',
    firstname: 'tyler',
    lastname: 'been'
};
test('Testing password to sh256', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield user.authorizeUser('tester', 'test');
    expect(token).toBe('');
}));
