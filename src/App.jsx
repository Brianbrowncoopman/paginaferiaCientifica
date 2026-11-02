import { useState, useEffect, useCallback } from 'react';
import fondoImg from '/fondo.jpeg';

// Función para verificar si un archivo es video por su extensión
const checkIsVideo = (url) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.m4v'];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// Configuración de galerías con sus respectivos iconos SVG
const galleries = {
  1: {
    title: "Imagenes Microscopio",
    isVerticalList: true, // Mostrado en lista vertical hacia abajo
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path>
      </svg>
    ),
    items: [
      { id: 1, image: "/fotosmicroscopio/ameba.jpeg", title: "Ameba" },
      { id: 2, image: "/fotosmicroscopio/amebamicroscopioporcien.jpeg", title: "Ameba (100x)" },
      { id: 3, image: "/fotosmicroscopio/amebaporcientres.jpeg", title: "Ameba (Detalle)" },
      { id: 4, image: "/fotosmicroscopio/amebatestacea.jpeg", title: "Ameba Testácea" },
      { id: 5, image: "/fotosmicroscopio/amebaycoloniademicroalgas.jpeg", title: "Ameba y Colonia de Microalgas" },
      { id: 6, image: "/fotosmicroscopio/coloniadefitoplancton.jpeg", title: "Colonia de Fitoplancton" },
      { id: 7, image: "/fotosmicroscopio/coloniademicroalgascuatro.jpeg", title: "Colonia de Microalgas N° 4" },
      { id: 8, image: "/fotosmicroscopio/coloniademicroalgaycristalesdesal.jpeg", title: "Colonia de Microalga y Cristales de Sal" },
      { id: 9, image: "/fotosmicroscopio/conjuntodemateriaorganica.jpeg", title: "Conjunto de Materia Orgánica" },
      { id: 10, image: "/fotosmicroscopio/conjuntodemateriaorganicados.jpeg", title: "Conjunto de Materia Orgánica N° 2" },
      { id: 11, image: "/fotosmicroscopio/conjuntodemicroalgas.jpeg", title: "Conjunto de Microalgas" },
      { id: 12, image: "/fotosmicroscopio/criptofito.jpeg", title: "Criptófito" },
      { id: 13, image: "/fotosmicroscopio/cristaldesal.jpeg", title: "Cristal de Sal" },
      { id: 14, image: "/fotosmicroscopio/cristaldesalporcien.jpeg", title: "Cristal de Sal (100x)" },
      { id: 15, image: "/fotosmicroscopio/diatomea.jpeg", title: "Diatomea" },
      { id: 16, image: "/fotosmicroscopio/diatomeapennada.jpeg", title: "Diatomea Pennada" },
      { id: 17, image: "/fotosmicroscopio/diatomeaporcien.jpeg", title: "Diatomea (100x)" },
      { id: 18, image: "/fotosmicroscopio/diatomeaporciendos.jpeg", title: "Diatomea (100x) N° 2" },
      { id: 19, image: "/fotosmicroscopio/diatomeaporcientres.jpeg", title: "Diatomea (100x) N° 3" },
      { id: 20, image: "/fotosmicroscopio/diatomeaycristaldesal2.jpeg", title: "Diatomea y Cristal de Sal" },
      { id: 21, image: "/fotosmicroscopio/diatomeayconjuntodemateriaorganica.jpeg", title: "Diatomea y Conjunto de Materia Organica" },
      { id: 22, image: "/fotosmicroscopio/dinoflageladodelgeneroprorocentrum.jpeg", title: "Dinoflagelado del género Prorocentrum" },
      { id: 23, image: "/fotosmicroscopio/fitoplancton.jpeg", title: "Fitoplancton" },
      { id: 24, image: "/fotosmicroscopio/materiaorganicaporcien.jpeg", title: "Materia Orgánica (100x)" },
      { id: 25, image: "/fotosmicroscopio/microalga.jpeg", title: "Microalga" },
      { id: 26, image: "/fotosmicroscopio/microalgados.jpeg", title: "Microalgas (100x)" },
      { id: 27, image: "/fotosmicroscopio/microalendescompocicion.jpeg", title: "Microalga en Descomposición" },
      { id: 28, image: "/fotosmicroscopio/microalgasydeiatomea.jpeg", title: "Microalgas y Diatomea" },
      { id: 29, image: "/fotosmicroscopio/protozoociliado.jpeg", title: "Protozoo Ciliado" },
      { id: 30, image: "/fotosmicroscopio/quistederesistenciadeprotozoo.jpeg", title: "Quista de Resistencia de Protozoo " },
      { id: 31, image: "/fotosmicroscopio/quistederesistenciadeprotozoodos.jpeg", title: "Quista de Resistencia de Protozoo N° 2" }
    ]
  },
  2: {
    title: "Imagenes Cultivo",
    isVerticalList: true, // Mostrado en lista vertical hacia abajo igual que Microscopio
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 5H9L8 4zM6 18h12a2 2 0 002-2v-1a6 6 0 00-6-6h-4a6 6 0 00-6 6v1a2 2 0 002 2z"></path>
      </svg>
    ),
    items: [
      // Agrega aquí los archivos reales que tengas dentro de tu carpeta /cultivos/
      { id: 1, image: "/cultivos/bacteriabacilares.jpeg", title: "Bacterias Bacilares" },
      { id: 2, image: "/cultivos/bacterioplanctonmarino.jpeg", title: "Bacterioplancton Marino" },
      { id: 3, image: "/cultivos/coloniadebacterias.jpeg", title: "Colonia de Bacterias" },
      { id: 4, image: "/cultivos/conjuntodecianobacterias.jpeg", title: "Conjunto de Cianobacterias" },
      { id: 5, image: "/cultivos/canjuntodemateriaorganicaybacterioplancton.jpeg", title: "Conjunto de Materia Orgánica y Bacterioplancton" },  
      { id: 6, image: "/cultivos/diatomeacolonial.jpeg", title: "Diatomea Colonia" },
      { id: 7, image: "/cultivos/diatomeapennada.jpeg", title: "Diatomea Pennada" },
      { id: 8, image: "/cultivos/diatomeas.jpeg", title: "Diatomeas" },
      { id: 9, image: "/cultivos/diatomeasdos.jpeg", title: "Diatomeas " },
      { id: 10, image: "/cultivos/materiaorganicaofibradealgunalga.jpeg", title: "Materia Orgánica o Fibra de Alguna Alga" },
      { id: 11, image: "/cultivos/microalga.jpeg", title: "Microalgas" },
      { id: 12, image: "/cultivos/microalgasdos.jpeg", title: "Microalgas N° 2" },
      { id: 13, image: "/cultivos/microalgasydiatomeas.jpeg", title: "Microalgas y Diatomeas" },
      { id: 14, image: "/cultivos/microalgasyrestosorganicos.jpeg", title: "Microalgas y Restos Orgánicos" },
      { id: 15, image: "/cultivos/microplastico.jpeg", title: "Microplástico" },
      { id: 16, image: "/cultivos/namatodo.jpeg", title: "Namatodo " },
      { id: 17, image: "/cultivos/pedazodeagaragarnutritivoconbacterias.jpeg", title: "Pedazo de Agar Agar Nutritivo con Bacterias  " },
      { id: 18, image: "/cultivos/pedazodeagaragarnutritivoconbacteriasdos.jpeg", title: "pedazo de agar agar nutritivo con bacterias 2" },
      { id: 19, image: "/cultivos/pedazodenematodo(gusanomicroscopico).jpeg", title: "Pedazo de Nematodo (Gusano Microscópico)" },
      { id: 20, image: "/cultivos/pequeñoconjuntodemicroalgas.jpeg", title: "Pequeño Conjunto de Microalgas" },
      { id: 21, image: "/cultivos/protozoo.jpeg", title: "Protozoo" },
      { id: 22, image: "/cultivos/protozoociliado.jpeg", title: "Protozoo Ciliado" },
      { id: 23, image: "/cultivos/protozoomicroalgasydiatomeas.jpeg", title: "Protozoo , Microalgas y Diatomeas" },
      { id: 24, image: "/cultivos/quistedeprotozoociliado.jpeg", title: "Quiste de Protozoo Ciliado" },
      { id: 25, image: "/cultivos/restosdemateriaorganica.jpeg", title: "Restos de Materia Orgánica" },
      { id: 26, image: "/cultivos/quistedeprotozoociliado.jpeg", title: "Quiste de Protozoo Ciliado" },
      { id: 27, image: "/cultivos/restosdemateriaorganica.jpeg", title: "Restos de Materia Orgánica" },
      { id: 28, image: "/cultivos/rotifero.jpeg", title: "Rotifero" }
    ]
  },
  3: {
    title: "Fotos del viaje",
    showDetails: false,
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    items: Array.from({ length: 65 }, (_, i) => {
      const num = i + 1;
      const isVideo = num > 60;
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
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    items: [
      { id: 1, image: "/afiches/1.jpeg" },
      { id: 2, image: "/afiches/2.jpeg" },
      { id: 3, image: "/afiches/3.jpeg" },
    ]
  },
  5: {
    title: "Póster",
    isPoster: true,
    question: "¿Cómo la salinidad de los distintos cuerpos de agua afecta la biodiversidad de microorganismos de la línea costera de Algarrobo?",
    hypothesis: "El aumento de la salinidad en la línea costera de Algarrobo reduce la riqueza y diversidad de microorganismos dando como resultado un dominio de especies halófilas y halotolerantes.",
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ),
    items: [
      { id: 1, image: "/poster.jpeg" }
    ]
  },
  6: {
    title: "Tablas y Datos",
    isVerticalList: true, // Mostrado en lista vertical hacia abajo
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
    ),
    items: [
      { id: 1, image: "/tablas/Tabladesalinidadpormuestraycantidaddemicroorganismos.jpeg", title: "Salinidad por Muestra y Cantidad de Microorganismos" },
      { id: 2, image: "/tablas/estaeslafotodelatabla.jpeg", title: "Tabla de observación superficial de presencia de óxido en las muestras (cualitativa)" },
      { id: 3, image: "/tablas/tabladedistribuciondeplacas.jpeg", title: "Tabla de Distribución de Placas" },
      { id: 4, image: "/tablas/tabladeobservacionsuperficialdeplacasdia1.jpeg", title: "Tabla de observación superficial de placas día 1" },
      { id: 5, image: "/tablas/tabladeobservacionsuperficialdeplacasdia2.jpeg", title: "Tabla de observación superficial de placas día 2" },
      { id: 6, image: "/tablas/tabladerelacionentresalinidadfinalynivelnumericodeoxidodo.jpeg", title: "Tabla de relación entre salinidad final e nivel numérico de óxido" },
       { id: 7, image: "/tablas/tabladerepresentacionnumericadeoxidocualitativo.jpeg", title: "Tabla de representación numérica de óxido cualitativo" },
      { id: 8, image: "/tablas/graficodedispercionsobrerelacionentresalinidadinicialyfinal.jpeg", title: "Grafico de dispersión sobre relación entre salinidad inicial y final" },
      { id: 9, image: "/tablas/salinidadfinalyneveldeoxidonumerico.jpeg", title: "Grafico de salinidad final y nivel de óxido numérico" },
      { id: 10, image: "/tablas/graficodebarrassobreelpromediodesalinidadinicialconlasalinidadfinal.jpeg", title: "Grafico de barras sobre el promedio de salinidad inicial con la salinidad final" },
      { id: 11, image: "/tablas/graficodebarrassobreelpromediodesalinidadsegunloscuerposdeagua.jpeg", title: "Grafico de barras sobre el promedio de salinidad según los cuerpos de agua" },
      { id: 12, image: "/tablas/tabladeobservacionsuperficialdeplacasdiacinco.jpeg", title: "Tabla de observación superficial de placas día 5" },
      { id: 13, image: "/tablas/tabladeobservaciondecultivosdemuestras.jpeg", title: "Tabla de observación de cultivos de muestra" },
    ]
  }
};

export default function App() {
  const [activeGalleryKey, setActiveGalleryKey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const activeGallery = activeGalleryKey ? galleries[activeGalleryKey] : null;
  const totalItems = activeGallery ? activeGallery.items.length : 0;
  const currentItem = activeGallery ? activeGallery.items[currentIndex] : null;

  // Evaluador automático del elemento activo
  const isVideoItem = currentItem ? checkIsVideo(currentItem.image) : false;

  const nextImage = useCallback(() => {
    if (totalItems > 0 && !activeGallery?.isPoster && !activeGallery?.isVerticalList) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  }, [totalItems, activeGallery]);

  const prevImage = useCallback(() => {
    if (totalItems > 0 && !activeGallery?.isPoster && !activeGallery?.isVerticalList) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  }, [totalItems, activeGallery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeGallery) return;
      if (e.key === 'ArrowRight' && !isFullscreen && !selectedImage && !activeGallery?.isVerticalList) nextImage();
      if (e.key === 'ArrowLeft' && !isFullscreen && !selectedImage && !activeGallery?.isVerticalList) prevImage();
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (selectedImage) {
          setSelectedImage(null);
        } else {
          setActiveGalleryKey(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGallery, nextImage, prevImage, isFullscreen, selectedImage]);

  const openGallery = (key) => {
    setActiveGalleryKey(key);
    setCurrentIndex(0);
    setIsFullscreen(false);
    setSelectedImage(null);
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

            {/* Menú de Botones con Iconos */}
            <div className="grid grid-cols-1 gap-3 pt-4 max-w-md mx-auto">
              {Object.keys(galleries).map((key) => (
                <button
                  key={key}
                  onClick={() => openGallery(Number(key))}
                  className="py-3 px-5 bg-gray-700/40 hover:bg-gray-600 border border-gray-600 hover:border-cyan-400 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl hover:scale-105 backdrop-blur-md cursor-pointer text-white flex items-center justify-center space-x-3"
                >
                  <span>{galleries[key].icon}</span>
                  <span>{galleries[key].title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : activeGallery.isPoster ? (
          /* --- MÓDULO PÓSTER --- */
          <div className="w-full space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md flex items-center space-x-2">
                <span>{activeGallery.icon}</span>
                <span>{activeGallery.title}</span>
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
        ) : activeGallery.isVerticalList ? (
          /* --- MÓDULO LISTA VERTICAL (MICROSCÓPIO, CULTIVOS Y TABLAS) --- */
          <div className="w-full space-y-6 animate-fade-in py-4">
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3 sticky top-0 bg-black/70 backdrop-blur-md z-30 px-4 py-2 rounded-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md flex items-center space-x-2">
                <span>{activeGallery.icon}</span>
                <span>{activeGallery.title}</span>
              </h2>
              <button
                onClick={() => setActiveGalleryKey(null)}
                className="px-4 py-2 bg-green-400/40 hover:bg-green-500/40 border border-gray-600 rounded-lg text-sm font-medium transition backdrop-blur-md cursor-pointer text-white"
              >
                ← Volver al Inicio
              </button>
            </div>

            {/* Listado vertical centrado ocupando el máximo de pantalla */}
            <div className="w-full flex flex-col items-center space-y-8 px-2">
              {activeGallery.items.map((item) => (
                <div key={item.id} className="w-full max-w-4xl flex flex-col items-center space-y-3 bg-black/50 p-4 sm:p-6 rounded-2xl border border-gray-700/60 backdrop-blur-md shadow-2xl">
                  <div 
                    className="w-full flex justify-center items-center cursor-zoom-in overflow-hidden rounded-xl"
                    onClick={() => setSelectedImage(item)}
                    title="Haz clic para ver en pantalla completa"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                    />
                  </div>
                  {item.title && (
                    <div className="text-center w-full bg-black/70 py-3 px-4 rounded-xl border border-gray-700/50">
                      <p className="text-base sm:text-lg font-semibold text-cyan-200">
                        {item.title}
                      </p>
                      {item.desc && (
                        <p className="text-sm text-gray-300 mt-1">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal de Pantalla Completa para la lista vertical */}
            {selectedImage && (
              <div 
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative max-w-7xl max-h-screen w-full h-full flex flex-col items-center justify-center p-2">
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-gray-800/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold border border-gray-600 transition shadow-lg z-50 cursor-pointer"
                  >
                    ✕ Cerrar Pantalla Completa
                  </button>
                  <img 
                    src={selectedImage.image} 
                    alt="Pantalla Completa" 
                    className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl mb-3"
                  />
                  {selectedImage?.title && (
                    <p className="text-cyan-300 text-base sm:text-lg font-medium text-center bg-black/80 px-4 py-2 rounded-lg border border-gray-700">
                      {selectedImage.title}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* --- MÓDULOS DE CARRUSEL (RESTO DE MÓDULOS) --- */
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center border-b border-gray-600/80 pb-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 drop-shadow-md flex items-center space-x-2">
                  <span>{activeGallery.icon}</span>
                  <span>{activeGallery.title}</span>
                </h2>
              </div>
              <button
                onClick={() => setActiveGalleryKey(null)}
                className="px-4 py-2 bg-green-400/40 hover:bg-green-500/40 border border-gray-600 rounded-lg text-sm font-medium transition backdrop-blur-md cursor-pointer text-white"
              >
                ← Volver al Inicio
              </button>
            </div>

            {/* Visor principal */}
            <div 
              className={`relative w-full h-[430px] sm:h-[480px] rounded-2xl overflow-hidden ${activeGallery.isCleanView ? 'bg-transparent border-none shadow-none' : 'bg-gray-950/80 border border-gray-700/80 shadow-2xl'} flex items-center justify-center group ${isVideoItem ? '' : 'cursor-zoom-in'}`}
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
                  className="w-full h-full object-contain max-h-[480px] z-10"
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

              {activeGallery.showDetails && activeGallery.title !== "Tablas y Datos" && (
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
                <div className="relative max-w-7xl max-h-screen w-full h-full flex flex-col items-center justify-center p-2">
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 bg-gray-800/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold border border-gray-600 transition shadow-lg z-50 cursor-pointer"
                  >
                    ✕ Cerrar Pantalla Completa
                  </button>
                  <img 
                    src={currentItem.image} 
                    alt="Pantalla Completa" 
                    className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl mb-3"
                  />
                  {currentItem?.title && (
                    <p className="text-cyan-300 text-base sm:text-lg font-medium text-center bg-black/80 px-4 py-2 rounded-lg border border-gray-700">
                      {currentItem.title}
                    </p>
                  )}
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