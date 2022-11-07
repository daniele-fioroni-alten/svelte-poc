<script>
	import BaseDividerFancy from "$lib/components/BaseDividerFancy.svelte";
	import BaseDividerHr from "$lib/components/BaseDividerHr.svelte";

	import BaseMain from "$lib/components/BaseMain.svelte";

</script>

<BaseMain>
	<svelte:fragment slot="primary">
		<h1>Svelte POC: User</h1>

		<BaseDividerHr />

		<BaseDividerFancy />

		<p>This is a svelte demonstration app...</p>

		<p>This is an user area</p>
	</svelte:fragment>
	
	<svelte:fragment slot="secondary">
        <slot />
	</svelte:fragment>
</BaseMain>