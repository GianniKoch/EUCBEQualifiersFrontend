// @ts-nocheck
import {getStandings} from "../services/BackendService.js";

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const standings = await getStandings();
    return {
        standings
    }
}