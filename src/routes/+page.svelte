<script>
	import BaseDividerFancy from "$lib/components/BaseDividerFancy.svelte";
	import BaseDividerHr from "$lib/components/BaseDividerHr.svelte";
	import BaseMain from "$lib/components/BaseMain.svelte";
</script>

<svelte:head>
	<title>Home</title>
	
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<BaseMain>
	<svelte:fragment slot="primary">
		<h1>Svelte POC: Welcome</h1>

		<BaseDividerHr />

		<BaseDividerFancy />

		<p>This is a svelte demonstration app...</p>

		<p>This is the homepage</p>
	</svelte:fragment>
</BaseMain>
