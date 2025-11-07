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
  //Videos a 12~ segundos
  const videos = [
    "ng4Render.mp4",
    "bf6Render.mp4",
    "hk2Render.mp4",
    "bo7Render.mp4",
    "karRender.mp4",
  ];
  //Titulo del juego para identificarlo, luego Steam, Play, Xbox y Switch en ese orden. Si no hay, dejar vacio
  const stores = [
    [
      "ng4",
      "https://store.steampowered.com/agecheck/app/2627260/",
      "https://www.playstation.com/es-mx/games/ninja-gaiden-4/",
      "https://www.xbox.com/es-MX/games/store/ninja-gaiden-4/9P0SQ1S72G4J",
      "",
    ],
    [
      "bf6",
      "https://store.steampowered.com/app/2807960/Battlefield_6/",
      "https://www.playstation.com/es-mx/games/battlefield-6/",
      "https://www.xbox.com/es-MX/games/store/battlefield-6/9P2FF14JZLL3",
      "",
    ],
    [
      "hk2",
      "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/",
      "https://www.playstation.com/es-mx/games/hollow-knight-silksong/",
      "https://www.xbox.com/es-mx/games/store/hollow-knight-silksong/9n116v0599hb",
      "https://www.nintendo.com/es-mx/store/products/hollow-knight-silksong-switch/?srsltid=AfmBOorc2ZoxZrGh0RXrL-5Se0n-GhhO5ibrfy0xezmrZUWyll4A4p01",
    ],
    [
      "bo7",
      "https://store.steampowered.com/agecheck/app/3606480/",
      "https://www.playstation.com/es-mx/games/call-of-duty-black-ops-7/",
      "https://www.xbox.com/es-MX/games/call-of-duty-black-ops-7",
      "",
    ],
    [
      "kar",
      "",
      "",
      "",
      "https://www.nintendo.com/es-mx/store/products/kirby-air-riders-switch-2/?srsltid=AfmBOooop1xbqd6w7XIXNWBf-UNjd4_5oUa2KKvGpA4hnIqev9D3F9VO",
    ],
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
  const [index, setIndex] = useState(0);
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
          setIndex((valorActual) => {
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
    setSource(covers[index]);
    setTexto(textos[index]);
    setQR(qrs[index]);
    setVideoSource(videos[index]);
  }, [index, covers, qrs, textos, videos]);

  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (e.key == "ArrowLeft") {
        juegoAnterior();
      }
      if (e.key == "ArrowRight") {
        juegoSiguiente();
      }
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
      setIndex((valorActual) => {
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
      setIndex((valorActual) => {
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

  //noTiene se tiene que evaluar a true, o nunca va a redirigir a los sitios ya que al los demas tener undefined
  //React lo evalua a false
  function irALink(indice: number, store: number, noTiene?: boolean) {
    if (noTiene) {
      return;
    }
    window.open(stores[indice][store], "blank", "noopener,noreferrer");
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4 h-screen">
      {/* SVGS */}
      {/* SVGS */}
      {/* SVGS */}
      <div
        className={`container flex absolute top-0 elemento ${
          haceFade ? "fade" : ""
        }`}
        style={{ transition: `opacity ${duracionFade}ms ease-in-out` }}
      >
        <svg
          viewBox="-1.5 0 259 259"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid"
          fill="#f5f5f5"
          width={60}
          className={`p-3 ${
            stores[index][1] ? "" : "opacity-50"
          } transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:fill-[#1b2838] hover:bg-[#66c0f4]`}
          onClick={() =>
            stores[index][1] ? irALink(index, 1) : irALink(index, 1, true)
          }
          style={{ cursor: stores[index][1] ? "pointer" : "not-allowed" }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              <title>Steam</title>{" "}
              <path d="M127.778579,0 C60.4203546,0 5.24030561,52.412282 0,119.013983 L68.7236558,147.68805 C74.5451924,143.665561 81.5845466,141.322185 89.1497766,141.322185 C89.8324924,141.322185 90.5059824,141.340637 91.1702465,141.377541 L121.735621,96.668877 L121.735621,96.0415165 C121.735621,69.1388208 143.425688,47.2457835 170.088511,47.2457835 C196.751333,47.2457835 218.441401,69.1388208 218.441401,96.0415165 C218.441401,122.944212 196.751333,144.846475 170.088511,144.846475 C169.719475,144.846475 169.359666,144.83725 168.99063,144.828024 L125.398299,176.205276 C125.425977,176.786507 125.444428,177.367738 125.444428,177.939743 C125.444428,198.144443 109.160732,214.575753 89.1497766,214.575753 C71.5836817,214.575753 56.8868387,201.917832 53.5655182,185.163615 L4.40997549,164.654462 C19.6326942,218.967277 69.0834655,258.786219 127.778579,258.786219 C198.596511,258.786219 256,200.847629 256,129.393109 C256,57.9293643 198.596511,0 127.778579,0 Z M80.3519677,196.332478 L64.6033732,189.763644 C67.389592,195.63131 72.2239585,200.539484 78.6359521,203.233444 C92.4932392,209.064206 108.472481,202.430791 114.247888,188.435116 C117.043333,181.663313 117.061785,174.190342 114.294018,167.400086 C111.526251,160.609831 106.295171,155.31417 99.5879487,152.491048 C92.9176301,149.695603 85.7767911,149.797088 79.5031858,152.186594 L95.777656,158.976849 C105.999942,163.276114 110.834309,175.122157 106.571948,185.436702 C102.318812,195.751247 90.574254,200.631743 80.3519677,196.332478 Z M202.30901,96.0424391 C202.30901,78.1165345 187.85204,63.5211763 170.092201,63.5211763 C152.323137,63.5211763 137.866167,78.1165345 137.866167,96.0424391 C137.866167,113.968344 152.323137,128.554476 170.092201,128.554476 C187.85204,128.554476 202.30901,113.968344 202.30901,96.0424391 Z M145.938821,95.9870838 C145.938821,82.4988323 156.779242,71.5661525 170.138331,71.5661525 C183.506646,71.5661525 194.347066,82.4988323 194.347066,95.9870838 C194.347066,109.475335 183.506646,120.408015 170.138331,120.408015 C156.779242,120.408015 145.938821,109.475335 145.938821,95.9870838 Z">
                {" "}
              </path>{" "}
            </g>{" "}
          </g>
        </svg>
        <svg
          fill="#f5f5f5"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          width={60}
          className={`p-3 ${
            stores[index][2] ? "" : "opacity-50"
          } transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:fill-[#f5f5f5] hover:bg-[#092f94]`}
          onClick={() =>
            stores[index][2] ? irALink(index, 2) : irALink(index, 1, true)
          }
          style={{ cursor: stores[index][2] ? "pointer" : "not-allowed" }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>Playstation</title>{" "}
            <path d="M11.979 3.464v23.396l5.219 1.681v-19.624c0-0.923 0.407-1.537 1.063-1.324 0.844 0.245 1.011 1.089 1.011 2.011v7.833c3.256 1.589 5.817-0.005 5.817-4.203 0-4.317-1.5-6.235-5.916-7.771-1.745-0.6-4.975-1.584-7.188-2zM18.188 25.12l8.396-3.037c0.952-0.343 1.099-0.832 0.328-1.088-0.781-0.255-2.183-0.188-3.147 0.161l-5.604 2v-3.183l0.317-0.109c0 0 1.604-0.561 3.885-0.823 2.261-0.239 5.048 0.041 7.251 0.88 2.464 0.803 2.724 1.964 2.099 2.767-0.62 0.796-2.161 1.38-2.161 1.38l-11.391 4.14v-3.063zM2.412 24.803c-2.537-0.729-2.953-2.224-1.803-3.1 1.068-0.776 2.875-1.4 2.875-1.4l7.489-2.683v3.083l-5.364 1.964c-0.943 0.36-1.099 0.844-0.317 1.099 0.781 0.261 2.181 0.204 3.12-0.156l2.583-0.943v2.765c-0.156 0.037-0.339 0.057-0.521 0.099-2.583 0.439-5.323 0.261-8.047-0.64z"></path>{" "}
          </g>
        </svg>
        <svg
          fill="#f5f5f5"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={60}
          className={`p-3 ${
            stores[index][3] ? "" : "opacity-50"
          } transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:fill-[#f5f5f5] hover:bg-[#107C10]`}
          onClick={() =>
            stores[index][3] ? irALink(index, 3) : irALink(index, 1, true)
          }
          style={{ cursor: stores[index][3] ? "pointer" : "not-allowed" }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>Xbox</title>{" "}
            <path d="M16 5.425c-1.888-1.125-4.106-1.922-6.473-2.249l-0.092-0.010c-0.070-0.005-0.152-0.008-0.234-0.008-0.613 0-1.188 0.16-1.687 0.441l0.017-0.009c2.357-1.634 5.277-2.61 8.426-2.61 0.008 0 0.016 0 0.024 0h0.019c0.005 0 0.011 0 0.018 0 3.157 0 6.086 0.976 8.501 2.642l-0.050-0.033c-0.478-0.272-1.051-0.433-1.662-0.433-0.085 0-0.169 0.003-0.252 0.009l0.011-0.001c-2.459 0.336-4.677 1.13-6.648 2.297l0.082-0.045zM5.554 5.268c-0.041 0.014-0.077 0.032-0.11 0.054l0.002-0.001c-2.758 2.723-4.466 6.504-4.466 10.684 0 3.584 1.256 6.875 3.353 9.457l-0.022-0.028c-1.754-3.261 4.48-12.455 7.61-16.159-3.53-3.521-5.277-4.062-6.015-4.062-0.010-0-0.021-0.001-0.032-0.001-0.115 0-0.225 0.021-0.326 0.060l0.006-0.002zM20.083 9.275c3.129 3.706 9.367 12.908 7.605 16.161 2.075-2.554 3.332-5.845 3.332-9.43 0-4.181-1.709-7.962-4.467-10.684l-0.002-0.002c-0.029-0.021-0.063-0.039-0.1-0.052l-0.003-0.001c-0.1-0.036-0.216-0.056-0.336-0.056-0.005 0-0.011 0-0.016 0h0.001c-0.741-0-2.485 0.543-6.014 4.063zM6.114 27.306c2.627 2.306 6.093 3.714 9.888 3.714s7.261-1.407 9.905-3.728l-0.017 0.015c2.349-2.393-5.402-10.901-9.89-14.29-4.483 3.39-12.24 11.897-9.886 14.29z"></path>{" "}
          </g>
        </svg>
        <svg
          fill="#f5f5f5"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          width={60}
          className={`p-3 ${
            stores[index][4] ? "" : "opacity-50"
          } transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:fill-[#f5f5f5] hover:bg-[#e60012]`}
          onClick={() =>
            stores[index][4] ? irALink(index, 4) : irALink(index, 1, true)
          }
          style={{ cursor: stores[index][4] ? "pointer" : "not-allowed" }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>Switch/Switch 2</title>{" "}
            <path d="M18.901 32h4.901c4.5 0 8.198-3.698 8.198-8.198v-15.604c0-4.5-3.698-8.198-8.198-8.198h-5c-0.099 0-0.203 0.099-0.203 0.198v31.604c0 0.099 0.099 0.198 0.302 0.198zM25 14.401c1.802 0 3.198 1.5 3.198 3.198 0 1.802-1.5 3.198-3.198 3.198-1.802 0-3.198-1.396-3.198-3.198-0.104-1.797 1.396-3.198 3.198-3.198zM15.198 0h-7c-4.5 0-8.198 3.698-8.198 8.198v15.604c0 4.5 3.698 8.198 8.198 8.198h7c0.099 0 0.203-0.099 0.203-0.198v-31.604c0-0.099-0.099-0.198-0.203-0.198zM12.901 29.401h-4.703c-3.099 0-5.599-2.5-5.599-5.599v-15.604c0-3.099 2.5-5.599 5.599-5.599h4.604zM5 9.599c0 1.698 1.302 3 3 3s3-1.302 3-3c0-1.698-1.302-3-3-3s-3 1.302-3 3z"></path>{" "}
          </g>
        </svg>
      </div>
      {/* SVGS */}
      {/* SVGS */}
      {/* SVGS */}
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
              {index + 1}/{qrs.length}
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
