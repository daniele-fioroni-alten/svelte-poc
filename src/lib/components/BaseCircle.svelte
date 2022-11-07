<div class="circle">
    <div class="inner">
        <slot />
    </div>
</div>

<style lang="scss">
    .circle {
        width: 2.5rem;
        aspect-ratio: 1/1;
        position: relative;

        border-radius: 100%;

        background: var(--color-combination-2);
        color: var(--color-combination-2);
    }

    .inner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>