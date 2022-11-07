<script lang="ts">
	import BaseDividerHr from '$lib/components/BaseDividerHr.svelte';
	import TheRegistrationForm from '$lib/components/TheRegistrationForm.svelte';
	import type { ActionData } from './$types';
	import user$ from "$lib/stores/user";
	import { goto } from '$app/navigation';

	export let form: ActionData;

	$: {
		if( $user$ ){
			goto('/user');
		}
	}
</script>

<svelte:head>
	<title>Registration</title>
	
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Registration</h1>

<BaseDividerHr />

<TheRegistrationForm form={form} />
