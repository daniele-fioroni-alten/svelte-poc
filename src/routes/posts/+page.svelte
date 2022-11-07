<script lang="ts">
	import type Post from "$lib/models/post.model";

	import { page } from '$app/stores';
	import BaseDividerHr from "$lib/components/BaseDividerHr.svelte";

	export let posts: Post[] = $page.data.posts || [];
</script>

<svelte:head>
	<title>Posts</title>
	
	<meta name="description" content="Posts reel" />
</svelte:head>

<h1>Posts</h1>

<BaseDividerHr />

<ul>
	{#each posts as post}
		<li>
			<article>
				<h1>
					<a href={'posts/'+post.id}>
						{post.title}
					</a>
				</h1>

				<p>{post.body}</p>
			</article>
		</li>
	{/each}
</ul>