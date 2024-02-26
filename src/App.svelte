<script lang="ts">
  import {Router,Route} from 'svelte-routing';
  export let url = '';
  import Login from './pages/Login.svelte'
  import Home from './pages/Home.svelte';
    import Admin from './pages/Admin.svelte';
    import ReservationList from './pages/ReservationList.svelte';
  import ReservationWeek from './pages/ReservationWeek.svelte';

</script>
<Router {url}>
  <Route path="/login" component={Login}/>
  <Route path="/home" component={Home}/>

  <Route path="/admin" component={Admin}/>
  <Route path="/admin/:date" component={ReservationList}/>
  <Route path='/reservation/week/:date' let:params> <ReservationWeek date={params.date} /> </Route>
</Router>