import fs from 'node:fs';
export {chromium} from 'playwright';
const systemChrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
const executablePath=process.env.CHROME_PATH||(process.platform==='win32'&&fs.existsSync(systemChrome)?systemChrome:undefined);
export const launchOptions={headless:true,...(executablePath?{executablePath}:{})};
