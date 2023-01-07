<script>
    export let standings = [];

    const leaderboards = [...new Set(standings.map(standing => standing.mapId))].map(id => {
        return {
            id: id,
            name: standings.find(standing => standing.mapId === id).mapName,
            highestScore: standings.filter(s => s.mapId === id).reduce((a, b) => a.mapScore > b.mapScore ? a : b).mapScore
        }
    });

    const players = [...new Set(standings.map(s => s.playerId))].map(id => {
        return {
            id: id,
            name: standings.find(s => s.playerId === id).playerName,
            avatar: standings.find(s => s.playerId === id).playerAvatar,
            scores: standings.filter(s => s.playerId === id).map(s => {
                return {
                    id: s.mapId,
                    score: s.mapScore,
                    weight: s.mapScore / leaderboards.find(l => l.id === s.mapId).highestScore
                }
            })
        }
    });

    function totalWeights(scores) {
        return round(scores.map(s => s.weight).reduce((a, b) => a + b) / leaderboards.length);
    }
    function totalScore(scores) {
        return round(scores.map(s => s.score).reduce((a, b) => a + b) / leaderboards.length);
    }

    function weight(scores, id) {
        const score = scores.find(s => s.id === id);
        if(score) {
            return round(score.weight);
        }
        return 0;
    }

    function score(scores, id) {
        const score = scores.find(s => s.id === id);
        if(score) {
            return round(score.score);
        }
        return 0;
    }

    function round(value){
        return Math.round(value * 100_000) / 1_000;
    }
</script>

<table class="table w-full">
    <tbody>
    {#each players.sort((p1, p2) => totalWeights(p2.scores) - totalWeights(p1.scores)) as player, i}
        <tr>
            <td>
                <h1># {i + 1}</h1>
            </td>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src="{player.avatar}" alt="{player.name}">
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{player.name}</div>
                    </div>
                </div>
            </td>
            <td>
                <div tabindex="0" class="collapse collapse-arrow rounded-box">
                    <div class="collapse-title font-medium">
                        {totalWeights(player.scores)}%
                        ({totalScore(player.scores)}%)
                    </div>
                    <div class="collapse-content">
                        {#each leaderboards as leaderboard}
                            <p>{weight(player.scores, leaderboard.id)}% ({score(player.scores, leaderboard.id)}%) - {leaderboard.name}</p>
                        {/each}
                    </div>
                </div>
            </td>
        </tr>
    {/each}
    </tbody>
</table>