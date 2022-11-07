<script lang="ts">
	import loggedInUser$ from '$lib/stores/user';
	import BaseCircle from './BaseCircle.svelte';
	import TheLogoutForm from './TheLogoutForm.svelte';
</script>

{#if $loggedInUser$}
    <div class="applet">
        <a class="applet__infos" href="/user">
            <BaseCircle>
                👤
            </BaseCircle>

            <span class="username">
                {$loggedInUser$.username}
            </span>
        </a>

        <TheLogoutForm />
    </div>
{/if}

<style lang="scss">
    %flex {
        display: flex;

        align-items: center;
    }

    .applet {
        @extend %flex;

        &__infos {
            @extend %flex;
        }
    }

    .username {
        display: inline-block;

        margin: 0 0.5rem;
    }
</style>