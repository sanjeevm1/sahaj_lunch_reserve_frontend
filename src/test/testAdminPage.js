
import {webDriver} from "./browserTest.js"
import { isLeftArrowPresent } from "./testHomePage.js"
import {getCurrentWeek} from "../utils/getCurrentWeek.js"
import { By, WebElement } from "selenium-webdriver"

await webDriver.get("http://localhost:5173/admin")
await testAdminPage()

async function testAdminPage(){

    await isLeftArrowPresent()
    await isLeftArrowPresent()
    await isCurrentWeekDetermined()
    await isCurrentWeekRendered()
    await isDateChangeableToNext()
}

async function isCurrentWeekDetermined(){

    console.log("Check if weeknumber of specific date is determined")
    let weekNumber = getCurrentWeek(new Date("2024-02-26"))
    
    if(weekNumber == 4)
    console.log("   test case passed")

    else
    console.log("   test case failed")
}

async function isCurrentWeekRendered(){

    console.log("Check if current weeknumber is rendered by default")

    let weekNumber = getCurrentWeek(new Date())

    let weekElement = await webDriver.findElement(By.className("week")).getAttribute("innerText")

    if(parseInt(weekElement) == weekNumber)
    console.log("   test case passed")

    else
    console.log("   test case failed")

}

async function isDateChangeableToNext(){

    console.log("Check if date can be changed to next")

    let currWeekNumber = getCurrentWeek(new Date())

    let buttons = await webDriver.findElements(By.tagName("button"))
    await buttons[1].click()

    let week = await webDriver.findElement(By.className("week")).getAttribute("innerText")
   
    if((currWeekNumber+1)==parseInt(week))
    console.log("   test case passed")

    else
    console.log("   test case failed")
    
    await webDriver.navigate().refresh()
}

