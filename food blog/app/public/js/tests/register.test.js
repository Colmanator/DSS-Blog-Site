import register from './register.js';
import Assert from './assert.js';
import * as assert from "node:assert";

describe('Testing User Registration', function () {
    it("Testing successfully registered", function () {
        assert.equal(register(), true);
    })
})