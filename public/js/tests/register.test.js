import register from './register.js';
import Assert from './assert.js';
import * as assert from "node:assert";
import userEvent from "@testing-library/user-event"
import JSDOM from "jsdom";
import registerHTMl from "../../html/register.html";
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    waitFor,
} from '@testing-library/dom'
import '@testing-library/jest-dom'

describe('Testing User Registration', async function () {
    const user = userEvent.setup();

    const container = registerHTMl;

    const email = getByLabelText(container, "Email:");
    email.value = "test@test.com";
    const emailConfirm = getByLabelText(container, "Confirm Email:");
    emailConfirm.value = "test@test.com";

    const displayName = getByLabelText(container, "Create a display name:");
    displayName.value = "CookieLover13";

    const password = getByLabelText(container, "Password:");
    password.value = "LlamasAndArrows1234";
    const passwordConfirm = getByLabelText(container, "Confirm Password:");
    password.value = "LlamasAndArrows1234";

    const submitBttn = getByText(container, "Register");



    it("Testing successfully registered", async function () {
        await submitBttn.click();
        assert.equal()
    })
})