document.addEventListener('DOMContentLoaded', () => {
    const AUDITORIA_ENDPOINT = '/auditorias';
    const logoutButton = document.getElementById('logoutButton');
    const refreshButton = document.getElementById('refreshAuditButton');
    const tableBody = document.getElementById('auditoriaTableBody');
    const usuarioFilter = document.getElementById('usuarioFilter');
    const entidadFilter = document.getElementById('entidadFilter');
    const productoFilter = document.getElementById('productoFilter');
    const tipoFilter = document.getElementById('tipoFilter');
    const pageMessage = document.getElementById('pageMessage');

    let auditorias = [];
    let productos = [];

    verificarAutenticacion();
    configurarEventos();
    cargarAuditoria();

    function configurarEventos() {
        if (logoutButton) {
            logoutButton.addEventListener('click', cerrarSesion);
        }

        if (refreshButton) {
            refreshButton.addEventListener('click', cargarAuditoria);
        }

        [usuarioFilter, entidadFilter, productoFilter].forEach((input) => {
            input?.addEventListener('input', aplicarFiltros);
        });

        tipoFilter?.addEventListener('change', aplicarFiltros);
    }

    async function cargarAuditoria() {
        try {
            // Cargar auditoría y productos en paralelo para poder mostrar nombres
            const [auditResp, prodResp] = await Promise.all([
                fetch(AUDITORIA_ENDPOINT, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                }),
                fetch('/api/productos', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                })
            ]);

            if (!auditResp.ok) {
                throw new Error('No se pudo cargar la auditoría');
            }

            const auditData = await auditResp.json();
            const prodData = prodResp && prodResp.ok ? await prodResp.json() : [];

            auditorias = Array.isArray(auditData) ? auditData : [];
            productos = Array.isArray(prodData) ? prodData : [];

            aplicarFiltros();
            ocultarMensaje();
        } catch (error) {
            console.error(error);
            mostrarMensaje('No fue posible cargar la auditoría.', 'error');
        }
    }

    function aplicarFiltros() {
        const usuario = (usuarioFilter?.value || '').trim().toLowerCase();
        const entidad = (entidadFilter?.value || '').trim().toLowerCase();
        const producto = (productoFilter?.value || '').trim().toLowerCase();
        const tipo = (tipoFilter?.value || '').trim().toUpperCase();

        const filtradas = auditorias.filter((item) => {
            const usuarioCoincide = !usuario || (item.usuario || '').toLowerCase().includes(usuario);
            const entidadCoincide = !entidad || (item.entidadAfectada || '').toLowerCase().includes(entidad);
            const productoCoincide = !producto || (item.valoresNuevos || '').toLowerCase().includes(producto) || (item.valoresAnteriores || '').toLowerCase().includes(producto);
            const tipoCoincide = !tipo || (item.tipoOperacion || '').toUpperCase() === tipo;
            return usuarioCoincide && entidadCoincide && productoCoincide && tipoCoincide;
        });

        renderizarTabla(filtradas);
    }

    function renderizarTabla(datos) {
        if (!tableBody) return;

        if (!datos.length) {
            tableBody.innerHTML = '<tr><td colspan="5" class="no-data">No hay registros de auditoría para mostrar.</td></tr>';
            return;
        }

        tableBody.innerHTML = datos.map((item) => {
            const fecha = item.fechaHora ? new Date(item.fechaHora).toLocaleString('es-ES') : 'Sin fecha';

            // Si la entidad afectada es Producto, mostrar el nombre del producto si está disponible
            let detalle = 'Sin detalle';

            if (item.entidadAfectada && String(item.entidadAfectada).toLowerCase().includes('producto') && item.entidadId) {
                const prod = productos.find(p => Number(p.id) === Number(item.entidadId));

                if (prod) {
                    detalle = `Producto: ${prod.nombre}`;
                } else if (item.valoresNuevos) {
                    detalle = item.valoresNuevos;
                } else {
                    detalle = `Producto #${item.entidadId}`;
                }
            } else {
                detalle = item.valoresNuevos ? String(item.valoresNuevos) : (item.valoresAnteriores ? String(item.valoresAnteriores) : 'Sin detalle');
            }

            return `
                <tr>
                    <td>${fecha}</td>
                    <td><span class="badge badge-info">${item.tipoOperacion || 'N/A'}</span></td>
                    <td>${item.usuario || 'Sistema'}</td>
                    <td>${item.entidadAfectada || 'Sin entidad'}</td>
                    <td>${detalle}</td>
                </tr>`;
        }).join('');
    }

    function mostrarMensaje(mensaje, tipo) {
        if (!pageMessage) return;
        pageMessage.hidden = false;
        pageMessage.className = 'alert';
        pageMessage.classList.add(tipo === 'error' ? 'alert-error' : 'alert-info');
        pageMessage.textContent = mensaje;
    }

    function ocultarMensaje() {
        if (pageMessage) {
            pageMessage.hidden = true;
            pageMessage.textContent = '';
        }
    }

    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
        }
    }

    function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('rol');
        window.location.href = 'login.html';
    }
});
