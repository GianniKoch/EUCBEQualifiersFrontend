<script>
    /** @type {import('./$types').PageData} */  export let data;

    function findIndividualScore(leaderboardId, playerId) {
        const standing = data.standings.find(standing => standing.mapId === leaderboardId && standing.playerId === playerId);
        if (standing) {
            return Math.round(standing.mapScore*100_000)/1_000;
        }
        return 0;
    }

    function findTotalScore(playerId){
        const playerScores = data.standings.filter(standing => standing.playerId === playerId);
        console.log(playerScores)
        return Math.round(playerScores.reduce((total, standing) => total + standing.mapScore, 0)/data.leaderboards.length * 100_000)/1_000;
    }

    function sortedPlayers(){
        const players = data.players.map(id => {
            return {
                playerId: id,
                totalScore: findTotalScore(id)
            }
        });
        return players.sort((a, b) => b.totalScore - a.totalScore);
    }

</script>

<div class="overflow-x-auto w-full">
    <table class="table w-full">
        <tbody>
        {#each sortedPlayers() as player, i}
            <tr>
                <td>
                    <h1># {i+1}</h1>
                </td>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img src="{data.standings.find(s => s.playerId === player.playerId).playerAvatar}" alt=""/>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">{data.standings.find(s => s.playerId === player.playerId).playerName}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div tabindex="0" class="collapse collapse-arrow rounded-box">
                        <div class="collapse-title font-medium">
                            {findTotalScore(player.playerId)}%
                        </div>
                        <div class="collapse-content">
                            {#each data.leaderboards as leaderboardId}
                                <p>{data.standings.find(s=>s.mapId===leaderboardId).mapName}: {findIndividualScore(leaderboardId, player.playerId)}%</p>
                            {/each}
                        </div>
                    </div>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
