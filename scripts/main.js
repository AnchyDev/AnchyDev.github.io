window.onload = function() {
    Particles.init({
      selector: '.background',
      maxParticles: 450,
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 200,
            color: '#505050',
            connectParticles: false
          }
        }
    ]
    });
  }; 