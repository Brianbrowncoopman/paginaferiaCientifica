import { useState, useEffect, useCallback } from 'react';
import fondoImg from '/fondo.jpeg';

// Generador automático de los ítems para cada módulo
const galleries = {
  1: {
    title: "Imagenes Microscopio",
    showDetails: true,
    items: Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      title: `Muestra N° ${i + 1}`,
      desc: `Extracción y análisis de salinidad en el punto ${i + 1} de la costa.`,
      image: "/imagen1.jpeg",
      caption: `Figura 1.${i + 1}: Muestreo in situ en Algarrobo.`
    }))
  },
  2: {
    title: "Imagenes Cultivo",
    showDetails: true,
    items: Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      title: `Microorganismo ${i + 1}`,
      desc: "Observación al microscopio y conteo de especies.",
      image: "/imagen1.jpeg",
      caption: `Figura 2.${i + 1}: Detalle microscópico.`
    }))
  },
  3: {
    title: "Fotos del viaje",
    showDetails: false, 
    items: Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      image: `/fotosdelviaje/${i + 1}.jpeg` 
    }))
  },
  4: {
    title: "Afiches",
    showDetails: false,
    items: Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      image: `/afiches/${i + 1}.jpeg` 
    }))
  },
  5: {
    title: "Póster",
    isPoster: true, 
    question: "¿Cómo la salinidad de los distintos cuerpos de agua afecta la biodiversidad de microorganismos de la línea costera de Algarrobo?",
    hypothesis: "El aumento de la salinidad en la línea costera de Algarrobo reduce la riqueza y diversidad de microorganismos dando como resultado un dominio de especies halófilas y halotolerantes.",
    items: [
      {
        id: 1,
        image: "/poster.jpeg" 
      }
    ]
  }
};

export default function App() {
  const [activeGalleryKey, setActiveGalleryKey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false); // Estado para la pantalla completa del póster

  const activeGallery = activeGalleryKey ? galleries[activeGalleryKey] : null;
  const totalItems = activeGallery ? activeGallery.items.length : 0;

  const nextImage = useCallback(() => {
    if (totalItems > 0 && !activeGallery?.isPoster) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  }, [totalItems, activeGallery]);

  const prevImage = useCallback(() => {
    if (totalItems > 0 && !activeGallery?.isPoster) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  }, [totalItems, activeGallery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeGallery) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          setActiveGalleryKey(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGallery, nextImage, prevImage, isFullscreen]);

  const openGallery = (key) => {
    setActiveGalleryKey(key);
    setCurrentIndex(0);
    setIsFullscreen(false);
  };

  return (
    <div 
      style={{ backgroundImage: `url(${fondoImg})` }} 
      className="min-h-screen w-screen bg-cover bg-center bg-fixed bg-no-repeat text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden"
    >
      {/* Capa oscura superpuesta */}
      <div className="absolute inset-0 bg-black/35 z-0"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center my-auto">
        
        {activeGalleryKey === null ? (
          /* --- HOME --- */
          <div className="w-full text-center space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
              Variación salina y microfauna en Algarrobo.
            </h1>
            
            <p className="text-gray-100 text-lg sm:text-xl italic font-medium drop-shadow-md">
              "El delicado equilibrio de la costa: cómo las alteraciones salinas amenazan la vida microscópica."
            </p>
            
            <div className="py-3 px-4 text-sm text-gray-100 border border-gray-500/50 rounded-xl bg-gray-700/50 backdrop-blur-md shadow-xl space-y-1">
              <p className="font-semibold text-gray-100">Feria Científica Colegio San Nicolás de Maipú • 2026</p>
              <p><strong>Integrantes:</strong> Mathilda Brown, Santiago Bello, Cristóbal Vera, Belén Pérez, Catherine Romero.</p>
            </div>

            {/* Botones de Módulos */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">
              {Object.keys(galleries).map((key) => (
                <button
                  key={key}
                  onClick={() => openGallery(Number(key))}
                  className="p-6 sm:p-5 bg-gray-700/40 hover:bg-gray-400 border border-gray-600 hover:border-cyan-400 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl hover:scale-105 backdrop-blur-md cursor-pointer text-white"
                >
                  {galleries[key].title}
                </button>
              ))}
            </div>
          </div>
        ) : activeGallery.isPoster ? (
          /* --- VISTA ESPECIAL DE PÓSTER --- */
          <div className="w-full space-y-4 animate-fade-in">
            {/* Encabezado */}
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md">
                {activeGallery.title}
              </h2>
              <button
                onClick={() => setActiveGalleryKey(null)}
                className="px-4 py-2 bg-gray-900/80 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium transition backdrop-blur-md cursor-pointer text-white"
              >
                ← Volver al Inicio
              </button>
            </div>

            {/* Dos bloques separados para Pregunta e Hipótesis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/60 p-5 rounded-xl border border-gray-700/60 backdrop-blur-md shadow-md space-y-2 flex flex-col justify-between">
                <h3 className="font-bold text-cyan-300 text-lg sm:text-xl">Pregunta de Investigación</h3>
                <p className="text-gray-100 text-sm sm:text-base leading-relaxed">{activeGallery.question}</p>
              </div>

              <div className="bg-black/60 p-5 rounded-xl border border-gray-700/60 backdrop-blur-md shadow-md space-y-2 flex flex-col justify-between">
                <h3 className="font-bold text-cyan-300 text-lg sm:text-xl">Hipótesis</h3>
                <p className="text-gray-100 text-sm sm:text-base leading-relaxed">{activeGallery.hypothesis}</p>
              </div>
            </div>

            {/* Contenedor del Póster con interacción de Pantalla Completa al hacer clic */}
            <div className="w-full flex flex-col items-center">
              <p className="text-xs text-cyan-300 mb-2 italic">Haz clic sobre la imagen para verla en pantalla completa (y vuelve a hacer clic para reducirla)</p>
              
              <div className="w-full flex justify-center items-center overflow-auto max-h-[80vh] p-2 cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                <img 
                  src={activeGallery.items[0].image} 
                  alt="Póster Científico" 
                  className="max-w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>
            </div>

            {/* MODAL DE PANTALLA COMPLETA */}
            {isFullscreen && (
              <div 
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
                onClick={() => setIsFullscreen(false)}
              >
                <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center">
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 bg-gray-800/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold border border-gray-600 transition shadow-lg z-50"
                  >
                    ✕ Cerrar Pantalla Completa
                  </button>
                  <img 
                    src={activeGallery.items[0].image} 
                    alt="Póster Científico Pantalla Completa" 
                    className="max-w-full max-h-[95vh] object-contain rounded-md shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* --- VISTA DE CARRUSEL PARA LOS DEMÁS MÓDULOS --- */
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md">
                  {activeGallery.title}
                </h2>
                <p className="text-xs text-gray-300 mt-0.5">
                  Foto {currentIndex + 1} de {totalItems}
                </p>
              </div>
              <button
                onClick={() => setActiveGalleryKey(null)}
                className="px-4 py-2 bg-gray-900/80 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium transition backdrop-blur-md cursor-pointer text-white"
              >
                ← Volver al Inicio
              </button>
            </div>

            <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-gray-950/80 border border-gray-700/80 shadow-2xl flex items-center justify-center group">
              <img 
                src={activeGallery.items[currentIndex].image} 
                alt={`Foto ${currentIndex + 1}`} 
                className="w-full h-full object-contain transition-all duration-300"
              />

              <button
                onClick={prevImage}
                className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-4 cursor-pointer z-20"
                title="Foto Anterior"
              >
                <span className="p-3 rounded-full bg-black/60 text-white hover:bg-cyan-600 border border-white/20 transition-transform group-hover:scale-110">
                  ❮
                </span>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-4 cursor-pointer z-20"
                title="Foto Siguiente"
              >
                <span className="p-3 rounded-full bg-black/60 text-white hover:bg-cyan-600 border border-white/20 transition-transform group-hover:scale-110">
                  ❯
                </span>
              </button>

              {activeGallery.showDetails && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5 backdrop-blur-sm space-y-1 z-10">
                  <h3 className="font-bold text-lg sm:text-xl text-white">
                    {activeGallery.items[currentIndex].title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {activeGallery.items[currentIndex].desc}
                  </p>
                  {activeGallery.items[currentIndex].caption && (
                    <p className="text-xs text-cyan-300 font-mono italic pt-1">
                      {activeGallery.items[currentIndex].caption}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-gray-300 px-2">
              <button 
                onClick={prevImage} 
                className="hover:text-cyan-300 cursor-pointer font-medium"
              >
                ← Anterior (Flecha Izquierda)
              </button>
              <span className="font-mono text-cyan-400">
                {currentIndex + 1} / {totalItems}
              </span>
              <button 
                onClick={nextImage} 
                className="hover:text-cyan-300 cursor-pointer font-medium"
              >
                Siguiente (Flecha Derecha) →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}