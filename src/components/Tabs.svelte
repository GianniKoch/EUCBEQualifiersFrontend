<script lang="ts">
    export let tags = [];
    export let activeTag = 'players';
</script>

<div class="tabs justify-center py-3">
    <a class="tab tab-bordered text-lg" class:tab-active={'players' === activeTag} on:click={() => activeTag = 'players'}>Total</a>
    {#each tags as tag}
        <a class="tab tab-bordered w-40 text-ellipsis overflow-hidden text-lg" class:tab-active={tag === activeTag} on:click={() => activeTag = tag}>{tag}</a>
    {/each}
</div>