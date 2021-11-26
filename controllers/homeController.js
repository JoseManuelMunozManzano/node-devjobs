exports.mostrarTrabajos = (req, res) => {
  res.render('home', {
    nombrePagina: 'devJobs',
    tagline: 'Encuentra y Publica Trabajos Para Desarrolladores Web',
    barra: true,
    boton: true,
  });
};
