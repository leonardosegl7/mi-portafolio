import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Database, Globe, Download, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Componente del Carrusel
  const PhotoCarousel = () => {
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // AQUÍ PONES TUS FOTOS - Reemplaza estos nombres con los nombres reales de tus archivos
    const photos = [
      'Vaca saturno saturnita.jpg',
      'Balerina capuchina.png',
      'bombardiro crocodilo.png'
    ];

    const nextPhoto = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
      setTimeout(() => setIsTransitioning(false), 500);
    };

    const prevPhoto = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
      setTimeout(() => setIsTransitioning(false), 500);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        nextPhoto();
      }, 4000); //cada 4 segundos
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-full max-w-md mx-auto">
        {/* Contenedor de la imagen */}
        <div className="relative h-80 w-full overflow-hidden rounded-2xl">
          <img
            src={photos[currentPhoto]}
            alt={`Foto ${currentPhoto + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Botones de navegación */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicadores de puntos */}
        <div className="flex justify-center mt-4 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPhoto
                ? 'bg-orange-400 scale-110'
                : 'bg-gray-400 hover:bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    );
  };

  ////////////////////////////////////// Datos ///////////////////////////////////////
  const developerInfo = {
    whatsapp: "https://wa.me/4431693072",
    cvUrls: {
      es: "/CV Leonardo Serrato.pdf",
      en: "/CV Leonardo Serrato EN.pdf"
    }
  };

  ////////////////////////////////////// Tecnologias ///////////////////////////////////////
  const techCategories = {
    frontend: {
      title: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      technologies: ["JavaScript", "React", "Tailwind CSS", "HTML5", "CSS3",]
    },
    backend: {
      title: "Backend",
      icon: <Code className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      technologies: ["Node.js", "Python", "PHP", "Laravel", "Java"]
    },
    database: {
      title: "Database",
      icon: <Database className="w-8 h-8" />,
      color: "from-purple-500 to-violet-500",
      technologies: ["PostgreSQL", "MySQL", "SQLite", "Firebase"]
    }
  };
  const toolsList = [
    "Git", "GitHub", "VS Code", "Figma", "Postman", "Docker", "Vite", "Canva",
  ];

  //////////////////////////////////////////// Altura del navbar fijo
  const NAVBAR_HEIGHT = 80;
  /////////////////////////////////////////////////// useEffect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-mi', 'tecnologias', 'proyectos', ''];
      const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 50; // Offset adicional para mejor detección

      let currentSection = 'inicio';

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;

          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Ejecutar una vez al cargar para establecer la sección inicial
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el select cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cv-select-container')) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - NAVBAR_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadCV = (language) => {
    const cvUrl = developerInfo.cvUrls[language];
    const fileName = language === 'es' ? 'CV-Leonardo-Serrato-ES.pdf' : 'CV-Leonardo-Serrato-EN.pdf';

    // Crear un elemento <a> temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cerrar el select después de la descarga
    setIsSelectOpen(false);
  };

  const cvOptions = [
    { value: 'es', label: 'CV en Español', flag: '🇪🇸' },
    { value: 'en', label: 'CV in English', flag: '🇺🇸' }
  ];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10" style={{ height: `${NAVBAR_HEIGHT}px` }}>
        <div className="mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo/Nombre */}
            <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Leonardo             
              {/* <img src="L.png" className='w-8 h-8' /> */}
            </div>

            {/* Menu de navegación */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'sobre-mi', label: 'Sobre Mí' },
                { id: 'tecnologias', label: 'Tecnologías' },
                { id: 'proyectos', label: 'Proyectos' },
                { id: 'contacto', label: 'Contacto' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`hover:text-orange-400 transition-all duration-300 relative py-2 ${activeSection === id
                    ? 'text-orange-400'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {label}
                  {/* Indicador activo */}
                  {activeSection === id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                  )}
                </button>
              ))}

              {/* Select para Descargar CV */}
              <div className="relative cv-select-container">
                <button
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-medium hover:scale-105 min-w-[140px] justify-between"
                >
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar CV
                  </div>
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isSelectOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {cvOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleDownloadCV(option.value)}
                        className="w-full px-4 py-3 text-left hover:bg-orange-500/20 transition-all duration-200 flex items-center space-x-3 text-white hover:text-orange-300 border-b border-white/10 last:border-b-0"
                      >
                        <span className="text-lg">{option.flag}</span>
                        <span className="flex-1">{option.label}</span>
                        <Download className="w-4 h-4 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center relative overflow-hidden" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Introducción - Lado Izquierdo */}
            <div className="text-left">
              <p className="text-2xl text-gray-300 mb-4">Hola, yo soy</p>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Leonardo
              </h1>
              <h2 className="text-2xl md:text-3xl text-orange-400 mb-8">
                Desarrollador Web
              </h2>
              <button className="px-8 py-3 border border-orange-500 text-orange-400 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 mb-8">
                Disponible para contratación
              </button>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab vitae quidem minima sapiente quis! Laudantium eligendi consequuntur modi earum dolorem odio laborum quam tempora! Nostrum eaque doloribus beatae voluptate!
              </p>
            </div>
            {/* Foto - Lado Derecho */}
            <div className="flex justify-center md:justify-end">
              <div className="w-[500px] h-96 bg-gradient-to-r from-orange-500 to-blue-500 p-1 shadow-2xl">
                {/* AQUÍ PONES TU FOTO - Reemplaza este div con tu imagen */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-8xl overflow-hidden">
                  <img
                    src="tralalerotralala.jpg"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/************************************************************ Sobre Mí ************************************************************/}
      <section id="sobre-mi" className="py-10 relative" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Sobre Mí
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Carrusel de fotos */}
            <PhotoCarousel />
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-orange-400">Mi Historia</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eos officia officiis, iste recusandae corrupti, corporis vitae debitis voluptatibus ipsam voluptate vero animi error aliquid? Eligendi impedit eius recusandae odio!</p>
              <p className="text-gray-300 mb-6">
              </p>
              <h3 className="text-2xl font-semibold mb-6 text-orange-400">Habilidades</h3>
              <ul className="text-gray-300 mb-6 list-disc list-inside">
                <li>Inglés Intermedio</li>
                <li>Buena comunicación</li>
                <li>Puntual</li>
                <li>Integral</li>
                <li>Bootstrap</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-10 bg-black/20" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Tecnologías y Herramientas
          </h2>

          {/* Cards de Tecnologías */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(techCategories).map(([key, category], index) => (
              <div
                key={key}
                className="group bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Header de la card */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <div className={`h-1 w-12 mx-auto bg-gradient-to-r ${category.color} rounded-full`}></div>
                </div>

                {/* Lista de tecnologías */}
                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={tech}
                      className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:transform hover:translateX-2"
                      style={{
                        animationDelay: `${(index * 0.2) + (techIndex * 0.1)}s`
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3 flex-shrink-0`}></div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Card Horizontal de Tools */}
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-orange-400/50 transition-all duration-500 group">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Tools & DevOps</h3>
              <p className="text-gray-400">Herramientas y tecnologías que uso para desarrollo y despliegue</p>
              <div className="h-1 w-16 mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4"></div>
            </div>

            {/* Grid de herramientas con animación */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {toolsList.map((tool, index) => (
                <div
                  key={tool}
                  className="bg-white/5 rounded-xl p-4 text-center hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-amber-500/20 transition-all duration-300 hover:transform hover:scale-105 border border-white/5 hover:border-orange-400/30 group/tool animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <span className="text-sm text-gray-300 group-hover/tool:text-white transition-colors duration-300 font-medium">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/****************************************** Proyectos ***********************************************/}
      <section id="proyectos" className="py-10" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                <img src="Portada Cecati.jpg" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">CECATI 35</h3>
                <p className="text-gray-400 mb-4">Este proyecto consiste en el desarrollo de un sistema web para la gestión de cursos e información sobre las especialidades del CECATI 35.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                    taildwind
                  </span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                    NodeJS
                  </span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                    Firebase
                  </span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm">
                    git
                  </span>
                </div>
                <div className="flex space-x-4">
                  <a href='https://cecati35.edu.mx/' className="flex items-center text-orange-400 hover:text-orange-300 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Link
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-10 bg-black/20" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Contacto
          </h2>
          
          {/* Descripción */}
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente? ¡Me encantaría conocer más sobre él y ayudarte a hacerlo realidad!
            </p>
          </div>

          {/* Grid de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            
            {/* Correo */}
            <div className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Correo:</h3>
              <a 
                href="mailto:leonardo.segl7@gmail.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 break-all"
              >
                leonardo.segl7@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp:</h3>
              <a 
                href="https://wa.me/4431693072" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors duration-300"
              >
                +52 443 169 3072
              </a>
            </div>

            {/* LinkedIn */}
            <div className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <Linkedin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn:</h3>
              <a 
                href="https://linkedin.com/in/leonardo-serrato-4a8759373" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                Visita mi perfil de LinkedIn
              </a>
            </div>

            {/* Ubicación */}
            <div className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ubicación:</h3>
              <p className="text-red-400">
                Morelia, Michoacán
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Leonardo. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;