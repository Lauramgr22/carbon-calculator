function mostrarGrafica(auto, elec, dieta, vuelos, habitos) {
    const ctx = document.getElementById('grafica').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Auto', 'Electricidad', 'Dieta', 'Vuelos', 'Hábitos'],
            datasets: [{
                label: 'kg CO₂e',
                data: [auto, elec, dieta, vuelos, habitos],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
