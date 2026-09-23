// Validación e interactividad para el formulario de atención corporativa
document.getElementById('contacto-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensajeExito = document.getElementById('mensaje-exito');

    if (nombre !== '' && email.includes('@')) {
        mensajeExito.classList.remove('d-none');
        document.getElementById('contacto-form').reset();

        setTimeout(() => {
            mensajeExito.classList.add('d-none');
        }, 5000);
    } else {
        alert('Por favor complete todos los campos requeridos correctamente.');
    }
});