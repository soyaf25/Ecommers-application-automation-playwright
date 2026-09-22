import {expect, Locator, Page}  from '@playwright/test';
import{config} from "../../config/env.config";
import { BasePage } from './BasePage';

export class selfRegister extends BasePage{
    readonly createAccount:Locator;
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly email:Locator;
    readonly password:Locator;
    readonly cnfmPassword:Locator;
    readonly Register:Locator;
    
    public constructor(page:Page){
        super(page);
        this.createAccount= page.locator('.register-text');
        this.firstName = page.locator('//input[@data-id="firstName"]');
        this.lastName = page.locator('//input[@data-id="lastName"]');
        this.email = page.locator('//input[@data-id="email"]');
        this.password= page.locator('//input[@data-id="password"]')
        this.cnfmPassword= page.locator('//input[@data-id="confirmPassword"]')
        this.Register= page.locator('.login-button slds-button')
        
    }

    public async create_Account(){
        let first:string=this.randomutils.generateRandomestring(6);
        let last:string=this.randomutils.generateRandomestring(8);
        let email:string= this.randomutils.generateRandomeemail();
        let password:string=this.randomutils.generateRandomestring(7);
        await this.commonutils.clickElement(this.createAccount);
        await this.commonutils.fillInput(this.firstName,first);
        await this.commonutils.fillInput(this.lastName,last);
        await this.commonutils.fillInput(this.email,email);
        await this.commonutils.fillInput(this.password,password);
        await this.commonutils.fillInput(this.cnfmPassword,password);
        await this.commonutils.clickElement(this.Register);

    }
}