import { HomePage } from "../pages/HomePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { selfRegister } from "../pages/selfRegisterPage.js";
import {test as base,expect} from "./BaseFixture.js";

type TestFixture = {
     homePage:HomePage;
     loginPage:LoginPage;
     SelfRegister:selfRegister;
}

export const test=base.extend <TestFixture>({
    homePage: async({page},use)=>{
        await use(new HomePage(page))
    },
    loginPage: async({page},use)=>{
        await use(new LoginPage(page))
    },
    SelfRegister: async({page},use)=>{
        await use(new selfRegister(page))
    }
});

export{expect};