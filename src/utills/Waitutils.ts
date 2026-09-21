import type {expect, Locator, Page}  from '@playwright/test';


export class waitUtils{

    public constructor (private page:Page){

    }
    async witForEement(element:string){
        await this.page.locator(element).waitFor({
            state:'visible'
        })
    }

        async witForEementHidden(element:string){
        await this.page.locator(element).waitFor({
            state:'hidden'
        })

    }


}