import type { Locator, Page}  from '@playwright/test';
import { expect } from '@playwright/test';


export class commonUtils{

    public constructor (private page:Page){

    }

    async clickElement(element:Locator){
        
        await expect(element).toBeVisible();
        await element.click();
    
    }

    async fillInput(element:Locator,value:string){
        await expect(element).toBeVisible();
        await element.fill(value);
    }

    async getText(element:Locator){
       await expect(element).toBeVisible();
    }
    
    async isElementvisible(element:Locator):Promise<boolean>{
        return await element.isVisible();
    }
      

}


