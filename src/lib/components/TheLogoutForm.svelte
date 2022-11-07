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

<form method="POST" action="/user?/logout" use:enhance={() => ((e) => {
    if( e.result.type !== 'redirect' && e.result.type !== 'error' ){
        form = e.result.data || null;
    }
})}>
    <button type="submit"> Logout </button>
</form>