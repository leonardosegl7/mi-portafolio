import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Database, Globe, Download, ChevronDown, ChevronLeft, ChevronRight, Languages } from 'lucide-react';

// Simulación de i18next para el entorno de Claude (en tu proyecto real, instalarías react-i18next)
const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      technologies: "Tecnologías",
      projects: "Proyectos",
      contact: "Contacto",
      downloadCV: "Descargar CV"
    },
    hero: {
      greeting: "Hola, yo soy",
      role: "Desarrollador Web",
      description: "Egresado en Ingeniería en Sistemas Computacionales, con la especialidad de Tecnologías de la Nube, con una sólida ética de trabajo. Soy una persona empática, responsable y ordenada, lo que facilita la colaboración efectiva en equipos de trabajo. Apasionado por el aprendizaje continuo y siempre abierto a adquirir nuevos conocimientos y habilidades para mejorar en mi campo."
    },
    about: {
      title: "Sobre mí",
      aboutMe: "Acerca de mí",
      description: "Me llamo Leonardo, tengo 24 años, soy originario de Morelia Michoacan y egresado de la carrera de Ingeniería en Sistemas Computacionales en el Tecnológico de Morelia. También estudié Soporte y Mantenimiento de Cómputo en el CONALEP Morelia II. A lo largo de mi formación me he especializado en el desarrollo de software, trabajando con diversas tecnologías. Tengo un buen nivel de inglés. Adaptabilidad con facilidad a distintos lenguajes de programación, trabajo en equipo de manera eficaz.",
      skills: "Habilidades/Aptitudes",
      skillsList: {
        english: "Inglés B2",
        communication: "Buena comunicación",
        punctual: "Puntual",
        integral: "Integral",
        bootstrap: "Bootstrap",
        fastLearning: "Rápido aprendizaje",
        teamwork: "Trabajo en equipo",
        adaptability: "Adaptabilidad",
        positivity: "Positividad",
        creativity: "Creatividad"
      }
    },
    technologies: {
      title: "Tecnologías y Herramientas",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools & DevOps",
      toolsDescription: "Herramientas y tecnologías que uso para desarrollo y despliegue"
    },
    projects: {
      title: "Proyectos Destacados",
      cecati: {
        title: "CECATI 35",
        description: "Este proyecto consiste en el desarrollo de un sistema web para la gestión de cursos e información sobre las especialidades del CECATI 35.",
        link: "Ver sitio"
      },
      portfolio: {
        title: "Portafolio Personal",
        description: "Portafolio web interactivo y responsivo desarrollado con React, que muestra mis habilidades, proyectos y experiencia profesional con un diseño moderno y animaciones fluidas.",
        link: "Ver proyecto actual"
      }
    },
    contact: {
      title: "Contacto",
      description: "¿Tienes un proyecto en mente? ¡Me encantaría conocer más sobre él y ayudarte a hacerlo realidad!",
      email: "Correo:",
      whatsapp: "WhatsApp:",
      linkedin: "LinkedIn:",
      linkedinText: "Visita mi perfil de LinkedIn",
      location: "Ubicación:",
      locationText: "Morelia, Michoacán"
    },
    footer: {
      copyright: "© 2025 Leonardo. Todos los derechos reservados."
    },
    cv: {
      spanish: "CV en Español",
      english: "CV in English"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      technologies: "Technologies",
      projects: "Projects",
      contact: "Contact",
      downloadCV: "Download CV"
    },
    hero: {
      greeting: "Hello, I'm",
      role: "Web Developer",
      description: "Graduate in Computer Systems Engineering, specialized in Cloud Technologies, with a solid work ethic. I am an empathetic, responsible, and organized person, which facilitates effective collaboration in work teams. Passionate about continuous learning and always open to acquiring new knowledge and skills to improve in my field."
    },
    about: {
      title: "About Me",
      aboutMe: "About Me",
      description: "My name is Leonardo, I'm 24 years old, originally from Morelia Michoacan and graduated with a degree in Computer Systems Engineering from Tecnológico de Morelia. I also studied Computer Support and Maintenance at CONALEP Morelia II. Throughout my training, I have specialized in software development, working with various technologies. I have a good level of English. I adapt easily to different programming languages and work effectively in teams.",
      skills: "Skills/Abilities",
      skillsList: {
        english: "English B2",
        communication: "Good communication",
        punctual: "Punctual",
        integral: "Integral",
        bootstrap: "Bootstrap",
        fastLearning: "Fast learning",
        teamwork: "Teamwork",
        adaptability: "Adaptability",
        positivity: "Positivity",
        creativity: "Creativity"
      }
    },
    technologies: {
      title: "Technologies and Tools",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools & DevOps",
      toolsDescription: "Tools and technologies I use for development and deployment"
    },
    projects: {
      title: "Featured Projects",
      cecati: {
        title: "CECATI 35",
        description: "This project consists of developing a web system for course management and information about CECATI 35 specialties.",
        link: "View site"
      },
      portfolio: {
        title: "Personal Portfolio",
        description: "Interactive and responsive web portfolio developed with React, showcasing my skills, projects, and professional experience with modern design and smooth animations.",
        link: "View current project"
      }
    },
    contact: {
      title: "Contact",
      description: "Do you have a project in mind? I'd love to learn more about it and help you make it a reality!",
      email: "Email:",
      whatsapp: "WhatsApp:",
      linkedin: "LinkedIn:",
      linkedinText: "Visit my LinkedIn profile",
      location: "Location:",
      locationText: "Morelia, Michoacán"
    },
    footer: {
      copyright: "© 2025 Leonardo. All rights reserved."
    },
    cv: {
      spanish: "CV en Español",
      english: "CV in English"
    }
  }
};

// Hook personalizado para manejar idiomas
const useTranslation = () => {
  const [language, setLanguage] = useState(() => {
    // Obtener idioma del navegador o usar español por defecto
    const browserLang = navigator.language.slice(0, 2);
    return ['es', 'en'].includes(browserLang) ? browserLang : 'es';
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return { t, language, changeLanguage };
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, language, changeLanguage } = useTranslation();

  // Componente del Carrusel con animación suave
  const PhotoCarousel = () => {
    const [currentPhoto, setCurrentPhoto] = useState(0);

    const photos = [
      'Ing_Leonardo.jpg',
      'Tacos.jpg',
      'NUBE_TOGA.jpg',
      'Perfil.jpg',
      'Happy.jpg'
    ];

    const nextPhoto = () => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
      setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        nextPhoto();
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-full max-w-md mx-auto">
        <div
          className="relative h-80 w-full overflow-hidden rounded-2xl"
          style={{
            backgroundImage: 'url("carousel-background.jpg")', //Fondo del Carrusel
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentPhoto * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-contain flex-shrink-0"
              />
            ))}
          </div>

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

        <div className="flex justify-center mt-4 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPhoto
                ? 'bg-teal-400 scale-110'
                : 'bg-gray-400 hover:bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const developerInfo = {
    whatsapp: "https://wa.me/4431693072",
    cvUrls: {
      es: "/CV Leonardo Serrato.pdf",
      en: "/CV Leonardo Serrato EN.pdf"
    }
  };

  const techCategories = {
    frontend: {
      title: t('technologies.frontend'),
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      technologies: ["JavaScript", "React", "Tailwind CSS", "HTML5", "CSS3"]
    },
    backend: {
      title: t('technologies.backend'),
      icon: <Code className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      technologies: ["Node.js", "Python", "PHP", "Laravel", "Java"]
    },
    database: {
      title: t('technologies.database'),
      icon: <Database className="w-8 h-8" />,
      color: "from-purple-500 to-violet-500",
      technologies: ["PostgreSQL", "MySQL", "SQLite", "Firebase"]
    }
  };

  const toolsList = [
    "Git", "GitHub", "VS Code", "Figma", "Postman", "Docker", "Vite", "Canva"
  ];

  const NAVBAR_HEIGHT = 80;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-mi', 'tecnologias', 'proyectos', 'contacto'];
      const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 50;

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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cv-select-container')) {
        setIsSelectOpen(false);
      }
      if (!event.target.closest('.language-select-container')) {
        setIsLanguageOpen(false);
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

  const handleDownloadCV = (languageCV) => {
    const cvUrl = developerInfo.cvUrls[languageCV];
    const fileName = languageCV === 'es' ? 'CV-Leonardo-Serrato-ES.pdf' : 'CV-Leonardo-Serrato-EN.pdf';

    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSelectOpen(false);
  };

  const cvOptions = [
    { value: 'es', label: t('cv.spanish'), flag: '🇪🇸' },
    { value: 'en', label: t('cv.english'), flag: '🇺🇸' }
  ];

  const languageOptions = [
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'en', label: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10" style={{ height: `${NAVBAR_HEIGHT}px` }}>
        <div className="mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              <img
                src="DesarrolladorSF.png"
                alt="Logo Desarrollador"
                className="h-30 w-40 object-contain" // Ajusta la altura según necesites
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'inicio', label: t('nav.home') },
                { id: 'sobre-mi', label: t('nav.about') },
                { id: 'tecnologias', label: t('nav.technologies') },
                { id: 'proyectos', label: t('nav.projects') },
                { id: 'contacto', label: t('nav.contact') }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`hover:text-teal-400 transition-all duration-300 relative py-2 ${activeSection === id
                    ? 'text-teal-400'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {label}
                  {activeSection === id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></div>
                  )}
                </button>
              ))}

              {/* Language Selector */}
              <div className="relative language-select-container">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-medium hover:scale-105"
                >
                  <Languages className="w-4 h-4 mr-2" />
                  <span className="text-lg mr-2">
                    {language === 'es' ? '🇪🇸' : '🇺🇸'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {languageOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          changeLanguage(option.value);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center space-x-3 border-b border-white/10 last:border-b-0 ${language === option.value
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'text-white hover:bg-purple-500/20 hover:text-purple-300'
                          }`}
                      >
                        <span className="text-lg">{option.flag}</span>
                        <span className="flex-1">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CV Selector */}
              <div className="relative cv-select-container">
                <button
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-medium hover:scale-105 min-w-[140px] justify-between"
                >
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    {t('nav.downloadCV')}
                  </div>
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSelectOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {cvOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleDownloadCV(option.value)}
                        className="w-full px-4 py-3 text-left hover:bg-teal-500/20 transition-all duration-200 flex items-center space-x-3 text-white hover:text-teal-300 border-b border-white/10 last:border-b-0"
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
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-2xl text-gray-300 mb-4">{t('hero.greeting')}</p>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-slate-400 bg-clip-text text-transparent">
                Leonardo
              </h1>
              <h2 className="text-2xl md:text-3xl text-teal-400 mb-8">
                {t('hero.role')}
              </h2>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                {t('hero.description')}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative w-[400px] h-[480px] rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm overflow-hidden shadow-2xl group-hover:shadow-teal-500/10 transition-all duration-500">
                  <img
                    src="Sinfondoleo.png"
                    alt="Leonardo - Desarrollador Web"
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-10 relative" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <PhotoCarousel />
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-teal-400">{t('about.aboutMe')}</h3>
              <p className="text-gray-300 mb-6">
                {t('about.description')}
              </p>
              <h3 className="text-2xl font-semibold mb-6 text-teal-400">{t('about.skills')}</h3>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <ul className="text-gray-300 mb-6 list-disc list-inside">
                  <li>{t('about.skillsList.english')}</li>
                  <li>{t('about.skillsList.communication')}</li>
                  <li>{t('about.skillsList.punctual')}</li>
                  <li>{t('about.skillsList.integral')}</li>
                  <li>{t('about.skillsList.bootstrap')}</li>
                </ul>
                <ul className="text-gray-300 mb-6 list-disc list-inside">
                  <li>{t('about.skillsList.fastLearning')}</li>
                  <li>{t('about.skillsList.teamwork')}</li>
                  <li>{t('about.skillsList.adaptability')}</li>
                  <li>{t('about.skillsList.positivity')}</li>
                  <li>{t('about.skillsList.creativity')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-10 bg-black/20" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            {t('technologies.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(techCategories).map(([key, category], index) => (
              <div
                key={key}
                className="group bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10"
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <div className={`h-1 w-12 mx-auto bg-gradient-to-r ${category.color} rounded-full`}></div>
                </div>

                <div className="space-y-3">
                  {category.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:transform hover:translateX-2"
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

          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-teal-400/30 transition-all duration-500 group">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('technologies.tools')}</h3>
              <p className="text-gray-400">{t('technologies.toolsDescription')}</p>
              <div className="h-1 w-16 mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {toolsList.map((tool, index) => (
                <div
                  key={tool}
                  className="bg-white/5 rounded-xl p-4 text-center hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-amber-500/20 transition-all duration-300 hover:transform hover:scale-105 border border-white/5 hover:border-orange-400/30 group/tool"
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

      {/* Projects Section */}
      <section id="proyectos" className="py-10" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Proyecto CECATI 35 */}
            <div className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-teal-500/10 to-blue-500/10 flex items-center justify-center">
                <img src="Portada Cecati.jpg" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t('projects.cecati.title')}</h3>
                <p className="text-gray-400 mb-4">{t('projects.cecati.description')}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 rounded-full text-sm">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 rounded-full text-sm">
                    NodeJS
                  </span>
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 rounded-full text-sm">
                    Firebase
                  </span>
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 rounded-full text-sm">
                    Git
                  </span>
                </div>
                <div className="flex space-x-4">
                  <a href='https://cecati35.edu.mx/' target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('projects.cecati.link')}
                  </a>
                </div>
              </div>
            </div>

            {/* Proyecto Portafolio Personal */}
            <div className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <img src="image.png" className="w-full h-full object-cover" alt="Preview del portafolio" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t('projects.portfolio.title')}</h3>
                <p className="text-gray-400 mb-4">{t('projects.portfolio.description')}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                    Lucide React
                  </span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                    Responsive
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => scrollToSection('inicio')}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('projects.portfolio.link')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-10 bg-black/20" style={{ scrollMarginTop: `${NAVBAR_HEIGHT}px` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>

          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Correo */}
            <div className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('contact.email')}</h3>
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
              <h3 className="text-xl font-bold text-white mb-2">{t('contact.whatsapp')}</h3>
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
              <h3 className="text-xl font-bold text-white mb-2">{t('contact.linkedin')}</h3>
              <a
                href="https://linkedin.com/in/leonardo-serrato-4a8759373"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                {t('contact.linkedinText')}
              </a>
            </div>

            {/* Ubicación */}
            <div className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('contact.location')}</h3>
              <p className="text-red-400">
                {t('contact.locationText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;