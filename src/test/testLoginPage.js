
import { By } from "selenium-webdriver"
import { webDriver } from "./browserTest.js"
import { testHomePage } from "./testHomePage.js"

let url = "http://localhost:5173"

webDriver.get(`${url}/login`).then(async ()=>{

   await isLoginTitlePresent()
   await isEmpIdCanbeEntered()
   await isEmpNameCanbeEntered()
   await isLoginButtonPresent()
   await isNavigateToHomePageWhenLoginButtonClicked()
})

async function isLoginTitlePresent(){

    console.log("Check login title is present")
    let loginTitle = await webDriver.findElement(By.tagName("h3")).getAttribute("innerText")
        
        
    if(loginTitle=="Login"){
        console.log("   test passed")
     }
    else{
        console.log("   test failed")
    }
    
}

async function isEmpIdCanbeEntered(){

    console.log("Check employee can enter id")    
    let elements = await webDriver.findElements(By.tagName("input"))

    await elements[0].clear()
    await elements[0].sendKeys(101)

    let id = await elements[0].getAttribute("value")

    if(id=="101"){
        console.log("   test case passed")
    }
    else{
        console.log("   test case failed")
    }
        
   
}

async function isEmpNameCanbeEntered(){

    console.log("Check employee can enter id")
    let elements = await webDriver.findElements(By.tagName("input"))

    await elements[1].clear()
    await elements[1].sendKeys("Logesh")

    let empName = await elements[1].getAttribute("value")


    if(empName=="Logesh"){
        console.log("   test case passed")
    }
    else{
        console.log("   test case failed")
    }
        
}

async function isLoginButtonPresent(){

    console.log("Check login button present")
    let button = await webDriver.findElement(By.tagName("button")).getAttribute("innerText")

    if(button=="LOGIN")
    console.log("   test case passed")

    else
    console.log("   test case failed")
    
}

async function isNavigateToHomePageWhenLoginButtonClicked(){

   console.log("Check if employee gets navigate to home page when login button is clicked")

   await webDriver.findElement(By.tagName("button")).click()
   
   await webDriver.wait(async ()=>{
    let navigatedUrl = await webDriver.getCurrentUrl()
    return navigatedUrl==`${url}/home`
   },3000)

   if(await webDriver.getCurrentUrl()==`${url}/home`){
     console.log("    test case passed")
     await testHomePage()
   }

   else
   console.log("    test case failed")

}


