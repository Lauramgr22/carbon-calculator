function mostrarGrafica(auto, elec, dieta, vuelos, habitos) {
    const ctx = document.getElementById('graficaComparativa').getContext('2d');
    const totalUsuario = auto + elec + dieta + vuelos + habitos;
    const promedioMundial = 4000;
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tu Huella', 'Promedio Mundial'],
        datasets: [{
          label: 'kg CO₂e por año',
          data: [totalUsuario, promedioMundial],
          backgroundColor: ['#4983CF', '#D5D5D5']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  