<main class="main">
	<div class="row">
		{#if $$slots.primary}
			<div class="row__column">
				<section class="main__column">
					<slot name="primary" />
				</section>
			</div>
		{/if}

		{#if $$slots.secondary}
			<div class="row__column">
				<section class="main__column main__column--alt">
					<slot name="secondary" />
				</section>
			</div>
		{/if}
	</div>
</main>

<style lang="scss">
	.main {
		padding: var(--gutter-y) var(--gutter-x);

		display: flex;
		flex-grow: 1;

		&__column {
			flex-grow: 1;

			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			padding: var(--gutter-y) var(--gutter-x);

			border: 1px solid var(--color-combination-2);
			background: var(--color-combination-1);

			&--alt {
				--color-combination-1: var(--color-secondary);
				--color-combination-2: var(--color-primary);

				color: var(--color-combination-2);
				background: var(--color-combination-1);

				border: 1px solid var(--color-combination-1);
			}
		}
	}

	.row {
		display: flex;
		flex-grow: 1;

		margin: 0 calc(var(--gutter-x) / 2 * -2);

		&__column {
			width: 50%;
			padding: 0 var(--gutter-x);

			display: flex;
			flex-grow: 1;

			flex-direction: column;
		}
	}
</style>