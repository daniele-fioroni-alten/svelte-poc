<script lang="ts">
	import TheUserApplet from './TheUserApplet.svelte';
	import TheNavigation from './TheNavigation.svelte';
</script>

<header class="header">
	<TheNavigation />

	<TheUserApplet />
</header>

<style lang="scss">
	.header {
		background: var(--color-combination-1);
		color: var(--color-combination-2);
		border-bottom: 1px solid var(--color-combination-2);

		justify-content: space-between;

		position: sticky;
		top: 0;

		display: flex;
	}
</style>
