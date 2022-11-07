<script lang="ts">
	import type Post from "$lib/models/post.model";

	import { page } from '$app/stores';
	import BaseDividerHr from "$lib/components/BaseDividerHr.svelte";

	export let post: Post = $page.data.post;
</script>

<svelte:head>
	<title>Post {post?.title}</title>
	
	<meta name="description" content={'Post'+post?.title} />
</svelte:head>

{#if post}
	<h1>{post.title}</h1>

	<BaseDividerHr />

	<p>{post.body}</p>
{/if}