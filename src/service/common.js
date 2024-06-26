export async function getJson(url) {
    let res; 
    try {
        res = await fetch(url);
        res = await res.json();
    } catch (error) {
        console.error(error);
    }
    return res;
}

export const BACKENDURL = 'https://todo-nodejs-nu.vercel.app';