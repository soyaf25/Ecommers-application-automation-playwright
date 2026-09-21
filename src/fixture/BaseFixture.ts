import {test as base,expect} from "playwright/test";
import{config} from "../../config/env.config.js";


export const test = base.extend({
    page:async({page},use)=>{
        await page.goto(config.baseURL);
        await use(page)
    }
});


export{expect};