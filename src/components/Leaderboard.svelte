<script lang="ts">
    export let standings = [];
</script>

<table class="table w-full">
    <tbody>
    {#each standings.sort((s1, s2) => s2.mapScore - s1.mapScore) as standing, i}
        <tr>
            <td>
                <h1 class="font-medium"># {i + 1}</h1>
            </td>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src="{standing.playerAvatar}"
                                 alt=""/>
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{standing.playerName}</div>
                    </div>
                </div>
            </td>
            <td>
                <p class="font-medium">
                    {Math.round(standing.mapScore / (standings[0] === undefined ? 0 : standings.sort((s1, s2) => s2.mapScore - s1.mapScore)[0].mapScore) * 100_000) / 1000}% ({Math.round(standing.mapScore * 100_000) / 1_000}%)
                </p>
            </td>
        </tr>
    {/each}
    </tbody>
</table>