const BASE_URL = 'http://localhost:3000/api/players';

async function getAllPlayers() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("שגיאה בשליפת השחקנים:", error.message);
        throw error;
    }
}

async function findPlayerByName(name) {
    try {
        const response = await fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const players = await response.json();
        return players.length > 0 ? players[0] : undefined;
    } catch (error) {
        console.error("שגיאה בחיפוש שחקן לפי שם:", error.message);
        throw error;
    }
}

async function createPlayer(name) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, lowestTime: null }),
            duplex: 'half' // חובה ב-Node.js עבור בקשות עם body
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("שגיאה ביצירת שחקן חדש:", error.message);
        throw error;
    }
}

async function updatePlayer(player) {
   
    try {
        const response = await fetch(`${BASE_URL}/${player.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'close'
            },
            body: JSON.stringify({ lowestTime: player.lowestTime }),
            duplex: 'half'
            
        });
         console.log(player)
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`שגיאה בעדכון שחקן עם מזהה ${player.id}:`, error.message);
        throw error;
    }
}
export { getAllPlayers, findPlayerByName, createPlayer, updatePlayer };