import type {expect, Locator, Page}  from '@playwright/test';
import {config} from "../../config/env.config.js";
import { commonUtils } from '../utills/commonActionUtills.js';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage{

    readonly acceptcooki:Locator;
    readonly userLogo:Locator;


    public constructor(page:Page){
        super(page);
        this.acceptcooki=page.locator('#onetrust-accept-btn-handler').first();
        this.userLogo=page.locator('.icon-menu').nth(1);

    }

    public async acceptcoki(){
        await this.commonutils.clickElement(this.acceptcooki);

    }
    public async clickOnUserLogo(){
        await this.commonutils.clickElement(this.userLogo); 
    }
}