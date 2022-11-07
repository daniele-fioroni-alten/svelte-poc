<script>
	import { goto } from "$app/navigation";
	import BaseDividerHr from "$lib/components/BaseDividerHr.svelte";
	import TheUserApplet from "$lib/components/TheUserApplet.svelte";
	import user$ from "$lib/stores/user";

	$: {
		if( !$user$ ){
			goto('/user/login');
		}
	}
</script>

<svelte:head>
	<title>Profile</title>
	
	<meta name="description" content="Your personal area" />
</svelte:head>

<h1>Profile</h1>

<BaseDividerHr />

<TheUserApplet />
