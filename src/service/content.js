import { BACKENDURL, getJson } from "./common";

export async function getTasks(user_id) {
    const url = BACKENDURL + `/api/tasks?user_id=${user_id}`;
    return getJson(url);
}

export async function getCanvasTask(user_id) {
    const url = BACKENDURL + `/api/eventlist?user_id=${user_id}`;
    return getJson(url);
}

export async function addTaskJson(task) {
    const url = BACKENDURL + "/insert-task";
    let res;
    
    if (task.dateTime === undefined) {
        const currentTime = new Date();
        task.dateTime = currentTime.getTime() - currentTime.getTimezoneOffset() * 60 * 1000;
    }

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

export async function addTask(task) {
    const url = BACKENDURL + "/insert-task";
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

export async function updateComplete(data) {
    const url = BACKENDURL + "/update-complete";
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

export async function updateImportant(data) {
    const url = BACKENDURL + "/update-important";
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

export async function deleteTask(data) {
    const url = BACKENDURL + "/delete-task";
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

export async function getCanvasLastUpdateHour(user_id) {
    const url = BACKENDURL + `/taskLastUpdated?user_id=${user_id}`;
    const data = await getJson(url);

    const lastUpdated = new Date(data.lastUpdated).getTime();
    const now = new Date().getTime();

    const differenceInHours = (now - lastUpdated) / (1000 * 60 * 60);
    return differenceInHours.toFixed(0);
}