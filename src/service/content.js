import { getJson } from "./common";

export async function getTasks(user_id) {
    const url = `https://todo-nodejs-nu.vercel.app/api/tasks?user_id=${user_id}`;
    return getJson(url);
}

export async function getCanvasTask(user_id) {
    const url = `https://todo-nodejs-nu.vercel.app/api/eventlist?user_id=${user_id}`;
    return getJson(url);
}

export async function addTaskJson(task) {
    const url = `https://todo-nodejs-nu.vercel.app/insert-task`;
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
    const url = `https://todo-nodejs-nu.vercel.app/insert-task`;
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
    const url = `https://todo-nodejs-nu.vercel.app/update-complete`;
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
    const url = `https://todo-nodejs-nu.vercel.app/update-important`;
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