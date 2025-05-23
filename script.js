function mostrarFormulario() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('formulario').style.display = 'block';
}

function calcularHuella() {
    // Transporte
    const kmAuto = parseFloat(document.getElementById('kmAuto').value) || 0;
    const tipoVehiculo = document.getElementById('tipoVehiculo').value;

    let factorVehiculo = 0.2; // default gasolina
    if (tipoVehiculo === 'diesel') factorVehiculo = 0.25;
    if (tipoVehiculo === 'electrico') factorVehiculo = 0.05;

    const CO2auto = kmAuto * 52 * factorVehiculo;

    // Electricidad
    const electricidad = parseFloat(document.getElementById('electricidad').value) || 0;
    const fuenteRenovable = document.getElementById('renovable').value === 'si';
    const factorElectricidad = fuenteRenovable ? 0.2 : 0.4;
    const CO2electricidad = electricidad * 12 * factorElectricidad;

    // Dieta
    const dieta = document.getElementById('dieta').value;
    const comidasConCarne = parseInt(document.getElementById('comidasConCarne').value) || 0;

    let CO2dietaBase = 500; // vegana
    if (dieta === 'vegetariana') CO2dietaBase = 700;
    else if (dieta === 'mixta') CO2dietaBase = 900;
    else if (dieta === 'carnivora') CO2dietaBase = 1000;

    const CO2carne = comidasConCarne * 20 * 52; // 20 kg CO₂ por comida x semanas
    const CO2dieta = CO2dietaBase + CO2carne;

    // Vuelos
    const vuelos = parseInt(document.getElementById('vuelos').value) || 0;
    const CO2vuelos = vuelos * 250;

    // Hábitos
    const reciclas = document.getElementById('reciclas').value === 'si';
    const transporteSostenible = document.getElementById('transporteSostenible').value === 'si';

    let CO2habitos = 0;
    if (reciclas) CO2habitos -= 200;
    if (transporteSostenible) CO2habitos -= 200;

    // Total
    const total = CO2auto + CO2electricidad + CO2dieta + CO2vuelos + CO2habitos;

    // Mostrar resultados
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';

    document.getElementById('total').innerText = `${total.toFixed(2)} kg CO₂e / año`;

    const mensajeEl = document.getElementById('mensaje');
    mensajeEl.classList.remove('felicitacion', 'advertencia');

    if (total > 4000) {
        mensajeEl.innerText = 'Tu huella es más alta que el promedio mundial.';
        mensajeEl.classList.add('advertencia');
    } else {
        mensajeEl.innerText = '¡Bien! Tu huella está por debajo del promedio mundial.';
        mensajeEl.classList.add('felicitacion');
    }

    document.getElementById('mensaje').innerText = mensaje.innerText;

    const consejos = [];
    if (CO2auto > 1000) consejos.push('Considera usar más transporte público o bicicleta.');
    if (CO2dieta > 1500) consejos.push('Reduce el consumo de carne, especialmente roja.');
    if (CO2electricidad > 1500) consejos.push('Ahorra energía o considera fuentes renovables.');
    if (!reciclas) consejos.push('Empieza a reciclar regularmente.');
    if (!transporteSostenible) consejos.push('Camina o usa la bici al menos 1 vez por semana.');

    document.getElementById('consejos').innerHTML = `
    <h3>Consejos para reducir tu huella:</h3>
    <ul>${consejos.map(c => `<li>${c}</li>`).join('')}</ul>`;

    mostrarGrafica(CO2auto, CO2electricidad, CO2dieta, CO2vuelos, CO2habitos);
}

function reiniciar() {
    // Ocultar resultado y mostrar formulario
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('formulario').style.display = 'block';

    // Opcional: borrar valores del formulario
    document.getElementById('kmAuto').value = '';
    document.getElementById('electricidad').value = '';
    document.getElementById('comidasConCarne').value = '';
    document.getElementById('vuelos').value = '';
    document.getElementById('tipoVehiculo').value = 'gasolina';
    document.getElementById('renovable').value = 'no';
    document.getElementById('dieta').value = 'mixta';
    document.getElementById('reciclas').value = 'no';
    document.getElementById('transporteSostenible').value = 'no';

    // Borrar gráfica si ya existe
    const canvas = document.getElementById('grafica');
    const nuevoCanvas = canvas.cloneNode(); // reemplazo limpio
    canvas.parentNode.replaceChild(nuevoCanvas, canvas);
}
