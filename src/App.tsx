/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import Concepto from "./about";

function App() {
  //Portada de los juegos. Tienen que tener el orden en los tres arreglos
  const covers = [
    "https://image.api.playstation.com/vulcan/ap/rnd/202501/2115/cadb8f4c0e96d1f406a81cda594e290c86bf283722d04aa5.png",
    "https://cdn1.epicgames.com/offer/a14a02aa3c8143729605eaf7c93d7501/EGS_Battlefield6_BattlefieldStudios_S2_1200x1600-a88625a836120c55650c83d17a010c25",
    "https://upload.wikimedia.org/wikipedia/en/0/05/Silksong.jpg",
    "https://cms-assets.xboxservices.com/assets/3e/87/3e87c16e-3a14-4796-aa95-46dc6c0c880a.jpg?n=730026216_Sharing_200x200.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5nuVjOAL4AyOYdcR4s66qSFV0RtpVa-AEDw&s",
  ];
  //Textos a mostrar
  const textos = [
    "El Dragon Oscuro ha resucitado, solo un Ninja del Clan Cuervo puede terminar el ciclo",
    "Destruccion, tanques, jets. Battlefield regresa con una capa de pintura nueva. Alistate",
    "Adentrate en Pharloom, juega como Hornet y sigue la historia en Hollow Knight Silksong",
    "La mejor subfranquicia de CoD en su septima entrega. Preparate para hacer historia",
    "Despues de 22 años, Kirby vuelve a las carreras. Diseñado para Switch 2",
  ];
  //QR's de los juegos
  const qrs = [
    "qr-codeNG4.png",
    "qr-codeBF6.png",
    "qr-codeHK2.png",
    "qr-codeBO7.png",
    "qr-codeKAR.png",
  ];

  const videos = [
    "ng4Render.mp4",
    "bf6Render.mp4",
    "hk2Render.mp4",
    "bo7Render.mp4",
    "karRender.mp4",
  ];
  //
  //Cada cuanto tiempo cambia. Se recomienda que sea menor a 12000 milisegundos
  const tiempoCambio = 11500;
  //
  //Cuanto tiempo dura el fade
  const duracionFade = 500;
  let teclas = "";
  const teclasObjetivo =
    "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightbaEnter";
  //
  //Poner los estados iniciales
  const [source, setSource] = useState(
    "https://image.api.playstation.com/vulcan/ap/rnd/202501/2115/cadb8f4c0e96d1f406a81cda594e290c86bf283722d04aa5.png"
  );
  const [cambiarIMG, setCambiarIMG] = useState(0);
  const [texto, setTexto] = useState(
    "El Dragon Oscuro ha resucitado, solo un Ninja del Clan Cuervo puede terminar el ciclo"
  );
  const [qr, setQR] = useState("/qr-codeNG4.png");
  const [haceFade, setHaceFade] = useState(false);
  const [haceHover, setHaceHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [videoSource, setVideoSource] = useState("ng4Render.mp4");

  const mostrarModal = () => {
    setModal((modal) => !modal);
  };

  useEffect(() => {
    let timer: number;
    //Si el estado de haceHover es falso, se ejecuta el intervalo de tiempo para cambiar las imagenes, etc.
    if (!haceHover) {
      timer = setInterval(() => {
        //Reproducir animacion de fade in
        setHaceFade(true);
        //Esperar a que termine la dureacion de la animacion y aumentar el estado numero de cambiarIMG, desde
        //0 hasta n, donde n es el tamaño de los arreglos (especificamente, el de QR's)
        setTimeout(() => {
          setCambiarIMG((valorActual) => {
            if (valorActual >= qrs.length - 1) {
              return 0;
            } else {
              return valorActual + 1;
            }
          });
          //Quitar la animacion
          setHaceFade(false);
        }, duracionFade);
        //Siempre que haceHover sea falso, ejecutar esta funcion cada tiempoCambio milisegundos
      }, tiempoCambio);
    }
    //Eliminar el timer
    return () => clearInterval(timer);
  }, [haceHover, duracionFade, qrs.length, tiempoCambio]);
  //Cambiar las imagenes, textos, QR, etc, en base al tiempo que ha transcurrido y el indice de cambiarIMG
  useEffect(() => {
    setSource(covers[cambiarIMG]);
    setTexto(textos[cambiarIMG]);
    setQR(qrs[cambiarIMG]);
    setVideoSource(videos[cambiarIMG]);
  }, [cambiarIMG, covers, qrs, textos, videos]);

  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      teclas = (teclas + e.key).slice(-teclasObjetivo.length);
      if (teclas === teclasObjetivo) {
        teclas = "";
        setModal((modal) => !modal);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [teclas, teclasObjetivo]);

  function juegoAnterior() {
    setHaceFade(true);
    setHaceHover(true);
    setTimeout(() => {
      setCambiarIMG((valorActual) => {
        if (valorActual <= 0) {
          return qrs.length - 1;
        } else {
          return valorActual - 1;
        }
      });
      //Quitar la animacion
      setHaceFade(false);
      setHaceHover(false);
    }, duracionFade);
  }

  function juegoSiguiente() {
    setHaceFade(true);
    setHaceHover(true);
    setTimeout(() => {
      setCambiarIMG((valorActual) => {
        if (valorActual >= qrs.length - 1) {
          return 0;
        } else {
          return valorActual + 1;
        }
      });
      //Quitar la animacion
      setHaceFade(false);
      setHaceHover(false);
    }, duracionFade);
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4 h-screen">
      <video
        autoPlay
        muted
        loop
        src={videoSource}
        className={`absolute -z-1 object-fill w-screen h-screen blur-[10px] elemento ${
          haceFade ? "fade" : ""
        }`}
        style={{ transition: `opacity ${duracionFade}ms ease-in-out` }}
      ></video>
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0 max-[600px]:hidden">
        <svg
          viewBox="-19.04 0 75.804 75.804"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
          stroke="#ffffff"
          transform="matrix(-1, 0, 0, 1, 0, 0)"
          width={"50px"}
          height={"50px"}
          onClick={() => juegoAnterior()}
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 rounded-sm"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g
              id="Group_65"
              data-name="Group 65"
              transform="translate(-831.568 -384.448)"
            >
              {" "}
              <path
                id="Path_57"
                data-name="Path 57"
                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                fill="#ffffff"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      {modal && <Concepto cerrarModal={mostrarModal}></Concepto>}
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-1">
          <p className="text-4xl">テレビゲーム</p>
          <div className="w-[250px] max-w-[100vw] p-4">
            <img
              src={source}
              alt="React Router"
              className={`rounded-sm hidden w-full dark:block max-h-[250px] aspect-square elemento ${
                haceFade ? "fade" : ""
              }`}
              style={{ transition: `opacity ${duracionFade}ms ease-in-out` }}
              onMouseEnter={() => setHaceHover(true)}
              onMouseLeave={() => setHaceHover(false)}
              id="imgTest"
            />
          </div>
        </header>
        <div className="flex max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-3 dark:border-gray-700 space-y-4">
            <p
              className={`leading-6 text-gray-700 dark:text-gray-200 text-center elemento ${
                haceFade ? "fade" : ""
              }`}
              style={{ transition: `opacity ${duracionFade}ms ease-in-out` }}
              onMouseEnter={() => setHaceHover(true)}
              onMouseLeave={() => setHaceHover(false)}
            >
              {texto}
            </p>
            <img
              src={qr}
              alt="React Router"
              className={`rounded-sm hidden w-25 dark:block mx-auto elemento ${
                haceFade ? "fade" : ""
              }`}
              style={{ transition: `opacity ${duracionFade}ms ease-in-out` }}
              onMouseEnter={() => setHaceHover(true)}
              onMouseLeave={() => setHaceHover(false)}
            />
            <p
              className={`leading-6 text-gray-700 dark:text-gray-200 text-center elemento ${
                haceFade ? "fade" : ""
              }`}
              style={{ transition: `opacity ${duracionFade}ms ease-in-out` }}
            >
              {cambiarIMG + 1}/{qrs.length}
            </p>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0 max-[600px]:hidden">
        <svg
          viewBox="-19.04 0 75.804 75.804"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
          stroke="#ffffff"
          width={"50px"}
          height={"50px"}
          onClick={() => juegoSiguiente()}
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 rounded-sm"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g
              id="Group_65"
              data-name="Group 65"
              transform="translate(-831.568 -384.448)"
            >
              {" "}
              <path
                id="Path_57"
                data-name="Path 57"
                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                fill="#ffffff"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </main>
  );
}

export default App;
