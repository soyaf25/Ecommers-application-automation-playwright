import  { commonUtils } from "../utills/commonActionUtills.js";
import  { RandomeUtil } from "../utills/RandomUtils.js";
import  { waitUtils } from "../utills/Waitutils.js";
import type {Page} from "@playwright/test";



export class BasePage{
    readonly page : Page;
    readonly commonutils:commonUtils;
    readonly randomutils: RandomeUtil;
    readonly waitutils: waitUtils;

    public constructor(page:Page){
        this.page=page;
        this.commonutils=new commonUtils(page);
        this.randomutils=new RandomeUtil(page);
        this.waitutils = new waitUtils(page);
    }


}