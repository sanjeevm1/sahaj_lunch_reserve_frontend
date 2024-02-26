<script lang="ts">
    import { onMount } from "svelte";
    import { postData } from "../api/api";

   
   export let date : String 
   let selectedDate = new Date(date)
   setTimeZero(selectedDate)

   function setTimeZero(date : Date){
        
        date.setHours(1)
        date.setMinutes(1)
        date.setSeconds(1)
        date.setMilliseconds(1)
        console.log(date)
     }


   let employees :String[] = []

   async function getEmployees(){
       console.log(date)
       employees = (await postData("/admin",{date:selectedDate})).data
   }

   onMount(getEmployees)

</script>

<main>
   {#each employees as employee}
       <p>{employee}</p> 
    {/each}
</main>