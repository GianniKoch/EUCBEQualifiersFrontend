<script>
    import Tabs from "../components/Tabs.svelte";
    import Leaderboard from "../components/Leaderboard.svelte";
    import Players from "../components/Players.svelte";

    /** @type {import('./$types').PageData} */  export let data;

    let activeTag = 'players';

</script>
<Tabs tags={[... new Set(data.standings.map(s => s.mapId))].map(l => data.standings.find(s => s.mapId === l).mapName)} bind:activeTag/>
<div class="overflow-x-auto w-full">
    {#if activeTag === 'players'}
        <Players standings={data.standings}/>
    {:else}
        <Leaderboard standings={data.standings.filter(s => s.mapName === activeTag)}/>
    {/if}
</div>
