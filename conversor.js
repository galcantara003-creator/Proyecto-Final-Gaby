// Lógica de simulación presupuestal y consumo de la API
document.getElementById('conversor-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const monto = parseFloat(document.getElementById('monto').value);
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;

    const resultadoContainer = document.getElementById('resultado-container');
    const resultadoMonto = document.getElementById('resultado-monto');
    const timestamp = document.getElementById('conversion-timestamp');

    if (isNaN(monto) || monto <= 0) {
        alert('Ingrese un monto operativo válido.');
        return;
    }

    try {
        const respuesta = await fetch(`https://open.er-api.com/v6/latest/${origen}`);
        const datos = await respuesta.json();

        if (datos.result === 'success') {
            const tasa = datos.rates[destino];
            const resultado = (monto * tasa).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            resultadoMonto.textContent = `${resultado} ${destino}`;
            timestamp.textContent = `(Actualizado vía API: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} CST)`;
            resultadoContainer.classList.remove('d-none');
        } else {
            throw new Error('Error al consultar la tasa de cambio');
        }
    } catch (error) {
        console.error(error);
        alert('Ocurrió un error en el cálculo presupuestal. Intente nuevamente.');
    }
});