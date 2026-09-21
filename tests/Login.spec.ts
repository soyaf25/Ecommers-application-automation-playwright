import  userLogin from "../test-data/userLogin.json"with { type: "json" };
import { expect, test } from "../src/fixture/TestFixture.js";
import type { Locator, Page}  from '@playwright/test';
import { HomePage } from "../src/pages/HomePage.js";
import { selfRegister } from "../src/pages/selfRegisterPage.js";
import { RandomeUtil } from "../src/utills/RandomUtils.js";


test(`loginwith valid user id - ${userLogin.validuser}`,async({loginPage,homePage})=>{

    await homePage.acceptcoki();
    await homePage.clickOnUserLogo();
    await loginPage.login(userLogin.validuser.email,userLogin.validuser.password);

})

test(`login with invalid user id- ${userLogin.invaliduser}`,async({loginPage,homePage,})=>{

    await homePage.acceptcoki();
    await homePage.clickOnUserLogo();
    await loginPage.login(userLogin.invaliduser.email,userLogin.invaliduser.password);
    await loginPage.ErrorMessage();
})

test('create new account with valid data',async({homePage,SelfRegister})=>{
    
    await homePage.acceptcoki();
    await homePage.clickOnUserLogo();
    await  SelfRegister.create_Account();
})