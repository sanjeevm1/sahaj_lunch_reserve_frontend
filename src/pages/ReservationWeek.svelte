<script lang="ts" >
    
    import { postData } from "../api/api";
    import { onMount } from "svelte";


    export let date :string ;

    interface reservationEntity{
        date : String
        isReserved : Boolean
    }

    let reservations : reservationEntity[]= []
    let selectedDate = new Date(date)
    let day = new Date(date).getDay();
    var weekday=new Array(7);
    
        weekday[0]="Monday";
        weekday[1]="Tuesday";
        weekday[2]="Wednesday";
        weekday[3]="Thursday";
        weekday[4]="Friday";
    

    function setTimeZero(date : Date){
        
        date.setHours(1)
        date.setMinutes(1)
        date.setSeconds(1)
        date.setMilliseconds(1)
        console.log(date)
     }

     while(selectedDate.getDay()!=1)
     selectedDate.setDate(selectedDate.getDate()-1)
     
     setTimeZero(selectedDate)

     async function getDataEntry(){

        let day = 0
        while(day<5){
        
        let temp = new Date(selectedDate.valueOf())
        temp.setDate(temp.getDate()+day)
        setTimeZero(temp)
        reservations.push({date:temp.toLocaleDateString(),isReserved:(await postData("/is-reserved",{id:sessionStorage.getItem("id"),date:temp})).data})
        day++
     }
     console.log(reservations)
     reservations = [...reservations]

}

   

    onMount(getDataEntry)
   
</script>


<div class="w-screen h-screen flex" >
    <div class="border-2 h-fit rounded-xl mx-auto mt-40 p-10">
        <div class="w-[500px] flex mt-5 text-2xl  font-semibold">
            <div class="w-1/3">
                Day
            </div>
            <div class="text-left w-1/3">
                Date
            </div>
            <div class="text-right w-1/3">
                Reservation
            </div>
        </div>
    {#each reservations as item,j}
        <div class="w-[400px] flex mt-5  text-lg">
            <div class="w-1/3">
                {weekday[j]}
            </div>
            <div class="text-right w-1/3">
                {item.date}
            </div>
            <div class="text-right w-1/3">
                {(item.isReserved)?"Yes":"No"}
            </div>
        </div>
    {/each}
    </div>
</div>