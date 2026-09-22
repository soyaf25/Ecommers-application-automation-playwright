
import * as dotenv from "dotenv";
import * as path from "path";

//jenkins/local will set node_env

const envName =process.env.ENV|| 'dev' ;

//load env file from project node
dotenv.config({
    path: path.resolve(process.cwd(),`.env.${envName}`),
});

export interface enviromentconfig  {
    env : string;
    baseURL:string;
    retries:number;

}

export const config :enviromentconfig = {

    env:envName,
    baseURL :'https://www.camposcoffee.com/',
    retries: Number(process.env.retries ?? 0),

}