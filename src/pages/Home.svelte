<script lang="ts">
  import { navigate } from "svelte-routing";
    import { deleteData, postData } from "../api/api";

    let date = new Date();

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


    let radio = ''
    let isWeekEnd = false
    setTimeZero(date)

    $:console.log(radio)

    $:date,isWeekEnd= ( date.toDateString().slice(0,3)==='Sat' || date.toDateString().slice(0,3)==='Sun')
    
    const values = [
		{ label: 'yes', value: 'yes' },
		{ label: 'no', value: 'no' },
	];



    async function reserveOrRemoveDate(){
          
        if(radio == "yes"){
            setTimeZero(date)
            let res = await postData("/reserve",{id:sessionStorage.getItem("id"),date : date})
        }

        if(radio == "no"){
            setTimeZero(date)
            let res = await postData("/unreserve",{id:sessionStorage.getItem("id"),date : date})
        }
    }

</script>

<div class="h-screen w-screen flex flex-col ">
    <div class="mx-auto mt-20 text-4xl title"> Lunch Reservation </div>
    <div class="flex flex-col mx-auto  mt-20 border-2 shadow-xl p-20 rounded-2xl">
        <div class=" flex ">
            <button class="btn" on:click={()=> {date.setDate(date.getDate()-1);date =date;radio = ''}}> &lt; </button>
            <div class="my-auto mx-10 date">{date.toLocaleDateString()}</div>
            <button class="btn" on:click={()=>{date.setDate(date.getDate()+1);date =date; radio = ''}} > &gt;</button>
        </div>
        <div class="flex mt-20 mb-10 justify-center">
            {#each values as value}
                 <label class="border p-3 ml-10 rounded-lg" >{value.label} 
                    <input disabled={isWeekEnd} class="{isWeekEnd?'input-disabled':''}" type="radio" bind:group={radio} name="reserve" value={value.value} >
                </label>
            {/each}
        </div>
        <div class="mx-auto">
            <button class=" btn" on:click={reserveOrRemoveDate}>SAVE</button>
        </div>
        <div class="mx-auto mt-5">
            <button class=" btn" on:click={()=>navigate(`/reservation/week/${getFormatedDate(date)}`)} >WEEK</button>
        </div>
    </div>
</div>
