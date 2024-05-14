import { BACKENDURL, getJson } from "./common";

export async function getNotes(user_id) {
    const url = BACKENDURL + `/api/notes?user_id=${user_id}`;
    return getJson(url);
}

export async function getJwcNote() {
    const url = BACKENDURL + "/api/news";
    return getJson(url);
}

export async function addNoteJson(note) {
    const url = BACKENDURL + "/insert-note";
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        res = await res.json();
    } catch (error) {
        console.error(error);
    }
    return res;
}

export async function addNote(note) {
    const url = BACKENDURL + "/insert-note";
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    } catch (error) {
        console.error(error);
    }
    return res;
}

export async function updateNoteImportant(data) {
    const url = BACKENDURL + "/update-important-note";
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
    }
    return res;
}

export async function deleteNote(data){
    const url = BACKENDURL + "/delete-note";
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
    }
    return res;
}