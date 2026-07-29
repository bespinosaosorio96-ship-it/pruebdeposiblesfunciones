document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const currentUsername = document.getElementById('currentUsername');
    const logoutButton = document.getElementById('logoutButton');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    if (username && currentUsername) {
        currentUsername.textContent = username;
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('rol');
            window.location.href = 'login.html';
        });
    }

    cargarResumen();

    async function cargarResumen() {
        try {
            const response = await fetch('/api/reportes/resumen', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo cargar el resumen');
            }

            const data = await response.json();
            document.getElementById('totalBodegas').textContent = data.totalBodegas ?? 0;
            document.getElementById('totalProductos').textContent = data.totalProductos ?? 0;
            document.getElementById('totalMovimientos').textContent = data.totalMovimientos ?? 0;
        } catch (error) {
            console.error(error);
        }
    }
});
