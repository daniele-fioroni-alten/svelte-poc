<script lang="ts">
	import { enhance } from '$app/forms';
	import user$ from '$lib/stores/user';

	export let form: Record<string, any> | null = null;

    $: {
        if( form?.success ){
            $user$ = form.user;
        }
    }
</script>

<form method="POST" action="/user/registration" use:enhance={
    () => ((e) => {
        if( e.result.type !== 'redirect' && e.result.type !== 'error' ){
            form = e.result.data || null
        }
    })
}>
	<label for="registration-username">Username:</label>
	<input id="registration-username" name="username" />

	<label for="registration-password">Password:</label>
	<input id="registration-password" type="password" name="password[]" />

	<label for="registration-password-confirmation">Confirm Password:</label>
	<input id="registration-password-confirmation" type="password" name="password[]" />

	<button type="submit"> Register </button>

	{#if form?.message}
		{form.message}
	{/if}
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

    input {
        margin-bottom: 1rem;
    }

	button {
		margin-top: auto;
	}
</style>
