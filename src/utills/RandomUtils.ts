
import type {expect, Locator, Page}  from '@playwright/test';


export class RandomeUtil{

    public constructor (private page:Page){

    }
    generateRandomeNo(min:number,max:number):number{
        return Math.floor(
            Math.random()*(max-min+1))+min;
    }

     generateRandomestring(num:number):string{
        const character= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;

        let result =""
        for(let i=0;i<num;i++){
            result += character.charAt(
                Math.floor(Math.random()*character.length));
            }

            return result;
        }

    generateRandomeemail():string{

        return `test ${Date.now()}@example.com`;
    
    }    

}

