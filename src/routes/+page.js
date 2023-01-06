// @ts-nocheck
import {getStandings} from "../services/BackendService.js";

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const standings = await getStandings();
    const players = [... new Set(standings.map(s => s.playerId))];
    const leaderboards = [... new Set(standings.map(s => s.mapId))];
    return {
        standings,
        players,
        leaderboards
    }
}