import {env} from "$env/dynamic/public";

export async function getStandings() {
    const response = await fetch(`${env.PUBLIC_BACKEND_URL}/Qualifier`)
    return await response.json()
}