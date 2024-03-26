import { getJson } from "./common";

export async function getNotes(user_id) {
    const url = `https://todo-nodejs-nu.vercel.app/api/notes?user_id=${user_id}`;
    return getJson(url);
}

export async function getJwcNote() {
    const url = `https://todo-nodejs-nu.vercel.app/api/news`;
    return getJson(url);
}

export async function addNoteJson(task) {
    const url = `https://todo-nodejs-nu.vercel.app/insert-note`;
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        res = await res.json();
    } catch (error) {
        console.error(error);
    }
    return res;
}

export async function addNote(task) {
    const url = `https://todo-nodejs-nu.vercel.app/insert-note`;
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error(error);
    }
    return res;
}