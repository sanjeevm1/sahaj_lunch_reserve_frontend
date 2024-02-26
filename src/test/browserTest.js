
import { Browser, Builder } from "selenium-webdriver"

const webDriver = await new Builder().forBrowser(Browser.CHROME).build()

export {webDriver}


