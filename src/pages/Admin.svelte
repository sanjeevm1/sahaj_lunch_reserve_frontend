<script lang="ts">
    import { navigate } from "svelte-routing";
    import { postData } from "../api/api";
    import { getCurrentWeek } from "../utils/getCurrentWeek";

    function setTimeZero(date : Date){
        
        date.setHours(1)
        date.setMinutes(1)
        date.setSeconds(1)
        date.setMilliseconds(1)
        console.log(date)
     }

     function getFormatedDate(currentDate:Date):string {
        let yyyy = currentDate.getFullYear();
        let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        let dd = String(currentDate.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }


     interface dateEntity{
        date : Date,
        count : Number
     }

   let date = new Date()
   
   while(date.getDay()!=1){
     date.setDate(date.getDate()-1)
   }

   let currWeek = getCurrentWeek(date)
   let datesOnTheWeek : dateEntity[]= []
   updateDateList()

   
   async function changeWeek(index=7){
       
       for(let entity of datesOnTheWeek){
         entity.date.setDate(entity.date.getDate()+index)
         setTimeZero(entity.date)
         entity.count = (await postData("/admin/date",{date:entity.date})).data
         
       }
       currWeek = getCurrentWeek(datesOnTheWeek[0].date)
       datesOnTheWeek = [...datesOnTheWeek]
   }

   async function updateDateList(){
      
          let day = 0
          datesOnTheWeek.splice(0,5)

          while(day<5){
   
            
            let temp = new Date()
            temp.setDate(date.getDate()+day)
            setTimeZero(temp)
           
            datesOnTheWeek.push({date:temp,count : (await postData("/admin/date",{date:temp})).data})
            day++
        }

        datesOnTheWeek = [...datesOnTheWeek]
   }

  
</script>

<main>
    
    <div class="h-screen w-screen flex flex-col ">
      <div class="mx-auto mt-20 text-4xl title"> Admin </div>
      <div class="flex flex-col mx-auto  mt-20 border-2 shadow-xl p-20 rounded-2xl">
    <div class="flex ">
        <button class="btn" on:click={()=>{changeWeek(-7)}}> &lt; </button>
        <div class="week p-5 font-bold ">{currWeek}</div>
        <button class="btn" on:click={()=>{changeWeek(7)}}> &gt;</button>
    </div>
    <div class="flex mt-5 mb-5 justify-center flex-col">
      <div class="flex   space-x-10">
               <div class="p-2">Date</div>
               <div class="p-2">Count</div>
        </div>
        {#each datesOnTheWeek as entity}
            <div class="flex bg-zinc-300 p-5 mt-2 space-x-3" on:click={()=>{navigate(`/admin/${getFormatedDate(entity.date)}`)}}>
               <div>{entity.date.toLocaleDateString()}</div>
               <div>{entity.count}</div>
            </div>
        {/each}
    </div>

</main>