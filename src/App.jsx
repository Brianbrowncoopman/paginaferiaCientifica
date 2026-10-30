import { useState, useEffect, useCallback } from 'react';
import fondoImg from '/fondo.jpeg';

// Función para verificar si un archivo es video por su extensión
const checkIsVideo = (url) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.m4v'];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// Configuración de galerías
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
    // Generación dinámica mixta: 1 al 60 son .jpeg, 61 en adelante son .mp4
    items: Array.from({ length: 65 }, (_, i) => {
      const num = i + 1;
      const isVideo = num > 60; // 61, 62, 63, etc., se marcan automáticamente como video
      return {
        id: num,
        image: isVideo ? `/fotosdelviaje/${num}.mp4` : `/fotosdelviaje/${num}.jpeg`
      };
    })
  },
  4: {
    title: "Afiches",
    showDetails: false,
    isCleanView: true,
    items: [
      { id: 1, image: "/afiches/1.jpeg" },
      { id: 2, image: "/afiches/2.png" }
    ]
  },
  5: {
    title: "Póster",
    isPoster: true,
    question: "¿Cómo la salinidad de los distintos cuerpos de agua afecta la biodiversidad de microorganismos de la línea costera de Algarrobo?",
    hypothesis: "El aumento de la salinidad en la línea costera de Algarrobo reduce la riqueza y diversidad de microorganismos dando como resultado un dominio de especies halófilas y halotolerantes.",
    items: [
      { id: 1, image: "/poster.jpeg" }
    ]
  }
};

export default function App() {
  const [activeGalleryKey, setActiveGalleryKey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeGallery = activeGalleryKey ? galleries[activeGalleryKey] : null;
  const totalItems = activeGallery ? activeGallery.items.length : 0;
  const currentItem = activeGallery ? activeGallery.items[currentIndex] : null;

  // Evaluador automático del elemento activo
  const isVideoItem = currentItem ? checkIsVideo(currentItem.image) : false;

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
      if (e.key === 'ArrowRight' && !isFullscreen) nextImage();
      if (e.key === 'ArrowLeft' && !isFullscreen) prevImage();
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
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/35 z-0"></div>

      {/* Contenedor principal */}
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

            {/* Menú de Botones */}
            <div className="grid grid-cols-1 gap-3 pt-4 max-w-md mx-auto">
              {Object.keys(galleries).map((key) => (
                <button
                  key={key}
                  onClick={() => openGallery(Number(key))}
                  className="py-3 px-4 bg-gray-700/40 hover:bg-gray-600 border border-gray-600 hover:border-cyan-400 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl hover:scale-105 backdrop-blur-md cursor-pointer text-white"
                >
                  {galleries[key].title}
                </button>
              ))}
            </div>
          </div>
        ) : activeGallery.isPoster ? (
          /* --- MÓDULO PÓSTER --- */
          <div className="w-full space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md">
                {activeGallery.title}
              </h2>
              <button
                onClick={() => setActiveGalleryKey(null)}
                className="px-4 py-2 bg-green-400/40 hover:bg-green-500/40 border border-gray-600 rounded-lg text-sm font-medium transition backdrop-blur-md cursor-pointer text-white"
              >
                ← Volver al Inicio
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/60 p-5 rounded-xl border border-gray-700/60 backdrop-blur-md shadow-md space-y-2">
                <h3 className="font-bold text-cyan-300 text-lg sm:text-xl">Pregunta de Investigación</h3>
                <p className="text-gray-100 text-sm sm:text-base leading-relaxed">{activeGallery.question}</p>
              </div>

              <div className="bg-black/60 p-5 rounded-xl border border-gray-700/60 backdrop-blur-md shadow-md space-y-2">
                <h3 className="font-bold text-cyan-300 text-lg sm:text-xl">Hipótesis</h3>
                <p className="text-gray-100 text-sm sm:text-base leading-relaxed">{activeGallery.hypothesis}</p>
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <p className="text-xs text-cyan-300 mb-2 italic">Haz clic sobre la imagen para verla en pantalla completa</p>
              
              <div className="w-full flex justify-center items-center overflow-auto max-h-[80vh] p-2 cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                <img 
                  src={activeGallery.items[0].image} 
                  alt="Póster Científico" 
                  className="max-w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>
            </div>

            {isFullscreen && (
              <div 
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
                onClick={() => setIsFullscreen(false)}
              >
                <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center">
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 bg-gray-800/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold border border-gray-600 transition shadow-lg z-50 cursor-pointer"
                  >
                    ✕ Cerrar
                  </button>
                  <img 
                    src={activeGallery.items[0].image} 
                    alt="Pantalla Completa" 
                    className="max-w-full max-h-[95vh] object-contain rounded-md shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* --- MÓDULOS DE CARRUSEL (AUTOMÁTICO IMAGEN / VIDEO) --- */
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md">
                  {activeGallery.title}
                </h2>
                {/*<p className="text-xs text-gray-300 mt-0.5">
                  Elemento {currentIndex + 1} de {totalItems} {isVideoItem ? "(Video)" : "(Haz clic para ampliar foto)"}
                </p>*/}
              </div>
              <button
                onClick={() => setActiveGalleryKey(null)}
                className="px-4 py-2 bg-gray-900/80 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium transition backdrop-blur-md cursor-pointer text-white"
              >
                ← Volver al Inicio
              </button>
            </div>

            {/* Visor principal */}
            <div 
              className={`relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden ${activeGallery.isCleanView ? 'bg-transparent border-none shadow-none' : 'bg-gray-950/80 border border-gray-700/80 shadow-2xl'} flex items-center justify-center group ${isVideoItem ? '' : 'cursor-zoom-in'}`}
              onClick={() => {
                if (!isVideoItem) setIsFullscreen(true);
              }}
            >
              {/* RENDERIZADO CONDICIONAL POR DETECCIÓN DE VIDEO/IMAGEN */}
              {isVideoItem ? (
                <video 
                  key={currentItem.image}
                  src={currentItem.image} 
                  controls 
                  className="w-full h-full object-contain max-h-[540px] z-10"
                />
              ) : (
                <img 
                  src={currentItem.image} 
                  alt={`Elemento ${currentIndex + 1}`} 
                  className="w-full h-full object-contain transition-all duration-300 hover:scale-[1.01]"
                />
              )}

              {/* Botones de navegación laterales */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-4 cursor-pointer z-20"
                title="Anterior"
              >
                <span className="p-3 rounded-full bg-black/60 text-white hover:bg-cyan-600 border border-white/20 transition-transform group-hover:scale-110">
                  ❮
                </span>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-4 cursor-pointer z-20"
                title="Siguiente"
              >
                <span className="p-3 rounded-full bg-black/60 text-white hover:bg-cyan-600 border border-white/20 transition-transform group-hover:scale-110">
                  ❯
                </span>
              </button>

              {activeGallery.showDetails && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5 backdrop-blur-sm space-y-1 z-10 pointer-events-none">
                  <h3 className="font-bold text-lg sm:text-xl text-white">
                    {currentItem.title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {currentItem.desc}
                  </p>
                  {currentItem.caption && (
                    <p className="text-xs text-cyan-300 font-mono italic pt-1">
                      {currentItem.caption}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal para ver fotos en pantalla completa */}
            {isFullscreen && !isVideoItem && (
              <div 
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
                onClick={() => setIsFullscreen(false)}
              >
                <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center">
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 bg-gray-800/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold border border-gray-600 transition shadow-lg z-50 cursor-pointer"
                  >
                    ✕ Cerrar Pantalla Completa
                  </button>
                  <img 
                    src={currentItem.image} 
                    alt="Pantalla Completa" 
                    className="max-w-full max-h-[95vh] object-contain rounded-md shadow-2xl"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-gray-300 px-2">
              <button 
                onClick={prevImage} 
                className="hover:text-cyan-300 cursor-pointer font-medium"
              >
                ← Anterior 
              </button>
              <span className="font-mono text-cyan-400">
                {currentIndex + 1} / {totalItems}
              </span>
              <button 
                onClick={nextImage} 
                className="hover:text-cyan-300 cursor-pointer font-medium"
              >
                Siguiente  →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}