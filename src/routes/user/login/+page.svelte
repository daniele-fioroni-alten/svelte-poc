<script lang="ts">
	import { goto } from '$app/navigation';
	import BaseDividerHr from '$lib/components/BaseDividerHr.svelte';
	import TheLoginForm from '$lib/components/TheLoginForm.svelte';
	import user$ from '$lib/stores/user';
	import type { ActionData } from './$types';
  	
	export let form: ActionData;

	$: {
		if( $user$ ){
			goto('/user');
		}
	}
</script>

<svelte:head>
	<title>Login</title>
	
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Login</h1>

<BaseDividerHr />

<TheLoginForm form={form} />
