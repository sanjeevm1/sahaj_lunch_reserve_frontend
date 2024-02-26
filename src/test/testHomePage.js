import { By } from "selenium-webdriver"
import {webDriver} from "./browserTest.js"

export async function testHomePage(){

    await isReservationTitlePresent()
    await isLeftArrowPresent()
    await isRightArrowPresent()
    await isYesOrNoButtonPresent()
    await isSaveButtonPresent()
    await isByDefaultCurrentDateIsSelected()
    await isDateChangeableToPrev()
    await isDateChangeableToNext()
    await isYesOrNoButtonPresent()
    await isYesOrNoDisabledOnWeekend()
}

async function isReservationTitlePresent(){

    console.log("Check login title is present")

    let title = await webDriver.findElement(By.className("title")).getAttribute("innerText")

    if(title=="Lunch Reservation")
    console.log("   test case passed")

    else
    console.log("   test case failed")

}

export async function isLeftArrowPresent(){

    console.log("Check if left arrow present in home page")

    let buttons = await webDriver.findElements(By.tagName("button"))
    let leftArrowButton = await buttons[0].getAttribute("innerText")

    if(leftArrowButton=="<")
    console.log("   test case passed")

    else
    console.log("   test case failed")


}

export async function isRightArrowPresent(){

    console.log("Check if right arrow present in home page")

    let buttons = await webDriver.findElements(By.tagName("button"))
    let rightArrowButton = await buttons[1].getAttribute("innerText")

    if(rightArrowButton==">")
    console.log("   test case passed")

    else
    console.log("   test case failed")


}

async function isYesOrNoButtonPresent(){

    console.log("Check if yes or no radio button present present in home page")

    let radioButtons = await webDriver.findElements(By.tagName("label"))
    
    let yesButton = await radioButtons[0].getAttribute("innerText")
    let noButton = await radioButtons[1].getAttribute("innerText")
    
    if(yesButton.trim()=="yes" && noButton.trim()=="no")
    console.log("   test case passed")

    else
    console.log("   test case failed")

}

async function isSaveButtonPresent(){

    console.log("Check if save button present in home page")

    let buttons = await webDriver.findElements(By.tagName("button"))
    let saveButton = await buttons[2].getAttribute("innerText")

    if(saveButton=="SAVE")
    console.log("   test case passed")

    else
    console.log("   test case failed")

}

async function isWeekButtonPresent(){

    console.log("Check if Week button present in home page")

    let buttons = await webDriver.findElements(By.tagName("button"))
    let saveButton = await buttons[3].getAttribute("innerText")

    if(saveButton=="WEEK")
    console.log("   test case passed")

    else
    console.log("   test case failed")

}

async function isByDefaultCurrentDateIsSelected(){

    console.log("Check if by default current date is selected")

    let  currDate = formatDate(new Date())

    let element = await webDriver.findElement(By.className("date"))
    let date = await element.getAttribute("innerText")

    if(date==currDate)
    console.log("   test case passed")

    else
    console.log("   test case failed")

}



function formatDate(date){

    let month = (date.getMonth()>=9)?(date.getMonth()+1):(`0${date.getMonth()+1}`)
    return `${date.getDate()}/${month}/${date.getFullYear()}`
}

function reformatDate(localedate){

    let arr = localedate.split("/")
    let year = arr[2]
    let month = arr[1]
    let date = arr[0]

    return `${year}-${month}-${date}`
}

async function isDateChangeableToPrev(){

    console.log("Check if date can be changed to previous")

    let currDate = new Date()
    currDate.setDate(currDate.getDate()-1)

    await webDriver.findElement(By.tagName("button")).click()

    let element = await webDriver.findElement(By.className("date"))
    let date = await element.getAttribute("innerText")
   
    if(date==formatDate(currDate))
    console.log("   test case passed")

    else
    console.log("   test case failed")

    await webDriver.navigate().refresh()
    
}

async function isDateChangeableToNext(){

    console.log("Check if date can be changed to next")

    let currDate = new Date()
    currDate.setDate(currDate.getDate()+1)

    let buttons = await webDriver.findElements(By.tagName("button"))
    await buttons[1].click()

    let element = await webDriver.findElement(By.className("date"))
    let date = await element.getAttribute("innerText")
   
    if(date==formatDate(currDate))
    console.log("   test case passed")

    else
    console.log("   test case failed")

    await webDriver.navigate().refresh()
    
}

async function isYesOrNoDisabledOnWeekend(){

    console.log("Check if yes or no button disabled on weekend")
    
    let temp = await webDriver.findElement(By.className("date")).getAttribute("innerText")
    let date = new Date(reformatDate(temp))
    
    while(date.getDay()!=0 && date.getDay()!=6){
        console.log(date)
        let buttons = await webDriver.findElements(By.tagName("button"))
        await buttons[1].click()
        date = new Date(await webDriver.findElement(By.className("date")).getAttribute("innerText"))
    }

    let radioButtons = await webDriver.findElements(By.tagName("input"))
    
    let yesButton = await radioButtons[0].getAttribute("disabled")
    let noButton = await radioButtons[1].getAttribute("disabled")
    
    if(yesButton && noButton)
    console.log("   test case passed")

    else
    console.log("   test case failed")

}
