<script lang="ts">
  import { postData } from "../api/api";
  import {navigate} from 'svelte-routing'

    let id = ""
    let name = ""
    async function login() {
        const result = await postData('/login',{id,name})
        if(result["status"]==200){
          sessionStorage.setItem("id",id)
          navigate('/home')
        }
       
    }
  </script>
  <div class="h-screen w-screen">
    <div class="rounded-3xl shadow-lg bg-zinc-300 p-10 w-[400px] mx-auto mt-40 flex flex-col">
      <h3 class="mx-auto p-10 text-4xl font-bold">Login</h3>
  
      <input type="text" class="input input-bordered mb-10 w-full" bind:value={id} placeholder="id" />
      <input type="text" class="input input-bordered  w-full mb-10"  bind:value={name} placeholder="Username" />
      <button class="btn  mb-20" on:click={login}> LOGIN</button>
    </div>
  </div>