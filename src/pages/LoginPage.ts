import type {Locator, Page}  from '@playwright/test';
import{config} from "../../config/env.config.js";
import { commonUtils } from '../utills/commonActionUtills.js';
import { BasePage } from './BasePage.js';
import {expect} from '@playwright/test';

export class LoginPage extends BasePage{
    readonly emailTextBox:Locator;
    readonly passwordTextBox:Locator;
    readonly loginBtn:Locator;
    readonly errormessage:Locator;

    public constructor(page:Page){
        super(page);
        this.emailTextBox= page.locator("//input[@data-id='inputUsername']");
        this.passwordTextBox=page.locator("//input[@data-id='inputPassword']");
        this.loginBtn=page.locator('.login-button-container');
        this.errormessage=page.locator('.error slds-var-p-around_x-small slds-var-p-top_small');

    }


    public async login(username:string,password:string){
        await  this.commonutils.fillInput(this.emailTextBox,username);
        await  this.commonutils.fillInput(this.emailTextBox,password);
        await this.commonutils.clickElement(this.loginBtn);
    }

    public async ErrorMessage(){
        await this.commonutils.isElementvisible(this.errormessage);

    }
}