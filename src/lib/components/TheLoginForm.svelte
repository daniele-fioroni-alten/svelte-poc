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

<form method="POST" action="/user/login" use:enhance={
    () => ((e) => {
        if( e.result.type !== 'redirect' && e.result.type !== 'error' ){
            form = e.result.data || null
        }
    })
}>
	<label for="login-username">Username:</label>
	<input type="text" id="login-username" name="username" />

	<label for="login-password">Password:</label>
	<input type="password" id="login-password" name="password" />

	<button type="submit">
		Login
	</button>

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