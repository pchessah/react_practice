import { asnycAdd } from "./async";

let values = [200, 400, 500, 800];
async function doTask(){
    let total = await asnycAdd(values)
    console.log(`Main Total: ${total}`);
}


doTask()