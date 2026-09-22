import  userLogin from "../test-data/userLogin.json"
import { expect, test } from "../src/fixture/TestFixture";
import type { Locator, Page}  from '@playwright/test';
import { HomePage } from "../src/pages/HomePage";
import { selfRegister } from "../src/pages/selfRegisterPage";
import { RandomeUtil } from "../src/utills/RandomUtils";


test(`loginwith valid user id - ${userLogin.validuser}`,{tag:['@smoke']},async({loginPage,homePage})=>{

    await homePage.acceptcoki();
    await homePage.clickOnUserLogo();
    await loginPage.login(userLogin.validuser.email,userLogin.validuser.password);

})

// test(`login with invalid user id- ${userLogin.invaliduser}`,async({loginPage,homePage,})=>{

//     await homePage.acceptcoki();
//     await homePage.clickOnUserLogo();
//     await loginPage.login(userLogin.invaliduser.email,userLogin.invaliduser.password);
//     await loginPage.ErrorMessage();
// })

// test('create new account with valid data',async({homePage,SelfRegister})=>{
    
//     await homePage.acceptcoki();
//     await homePage.clickOnUserLogo();
//     await  SelfRegister.create_Account();
// })