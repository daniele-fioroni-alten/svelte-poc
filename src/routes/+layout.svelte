<script lang="ts">
	import TheHeader from '$lib/components/TheHeader.svelte';
	import TheFooter from '$lib/components/TheFooter.svelte';
	
	import './styles.scss';
</script>

<TheHeader />

<slot />

<TheFooter />