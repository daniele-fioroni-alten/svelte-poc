<script lang="ts">
	import loggedInUser$ from '$lib/stores/user';
	import { page } from '$app/stores';
</script>

<nav class="navigation">
	<ul class="navigation__list">
		<li class="navigation__list-item">
			<a
				class="navigation__link"
				class:navigation__link--active={$page.url.pathname === '/'}
				href="/"
			>
				Home
			</a>
		</li>

		<li class="navigation__list-item">
			<a
				class="navigation__link"
				class:navigation__link--active={$page.url.pathname === '/posts'}
				href="/posts"
			>
				Posts
			</a>
		</li>

		{#if $loggedInUser$}
			<li class="navigation__list-item">
				<a
					class="navigation__link"
					class:navigation__link--active={$page.url.pathname === '/user'}
					href="/user"
				>
					Profile
				</a>
			</li>
		{:else}
			<li class="navigation__list-item">
				<a
					class="navigation__link"
					class:navigation__link--active={$page.url.pathname === '/user/login'}
					href="/user/login"
				>
					Login
				</a>
			</li>

			<li class="navigation__list-item">
				<a
					class="navigation__link"
					class:navigation__link--active={$page.url.pathname === '/user/registration'}
					href="/user/registration"
				>
					Registration
				</a>
			</li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	.navigation {
		&__list {
			display: flex;

			padding: 0;

			&-item {
				list-style: none;
			}
		}

		&__link {
			padding: var(--gutter-y) var(--gutter-x);

			&--active {
				color: var(--color-combination-1);
				background: var(--color-combination-2);
			}
		}
	}
</style>
