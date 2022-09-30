<script>
	import ConfigView from './views/Config-view.svelte';
	import Router from "svelte-spa-router";
	import TitleBar from "./components/Title-bar.svelte"
	import FirstUseView from "./views/First-use-view.svelte";
	import Dashboard from "./views/Dashboard.svelte";
	import ProgramList from './views/ProgramList.svelte';
	import {push} from 'svelte-spa-router';

	let routes = {
		"/": FirstUseView,
		"/dashboard": Dashboard,
		"/program-list": ProgramList,
		"/config":ConfigView,
	}; 
	// window.api.deleteAllDataForTest();
	window.api.firstUse((data)=>{
		if(!data){
			push('/dashboard');
		}
	});
</script>

<main>
	<TitleBar></TitleBar>
	<Router {routes}/>
</main>

<style>
	main{
		height: 100vh;
		width: 100%;
	}
</style>