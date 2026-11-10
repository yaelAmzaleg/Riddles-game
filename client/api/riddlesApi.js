const BASE_URL = 'http://localhost:3000/api/riddles';

async function getAllRiddles() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("שגיאה בשליפת החידות:", error.message);
        throw error;
    }
}

async function createRiddle(riddle) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(riddle),
            duplex: 'half'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("שגיאה ביצירת חידה חדשה:", error.message);
        throw error;
    }
}

async function updateRiddle(id, riddle) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(riddle),
            duplex: 'half' 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`שגיאה בעדכון חידה עם מזהה ${id}:`, error.message);
        throw error;
    }
}

async function deleteRiddle(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`שגיאה במחיקת חידה עם מזהה ${id}:`, error.message);
        throw error;
    }
}

export { getAllRiddles, createRiddle, updateRiddle, deleteRiddle };