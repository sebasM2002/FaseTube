import { useParams } from "react-router-dom";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import RelatedVideo from "../components/RelatedVideo";
import { useEffect, useState } from "react";
import axios from "axios";

function formatDate(date) {
  const nombreMes = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const day = date.getDate();
  const month = nombreMes[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
}

export default function VisualizadorPage() {
  const { video } = useParams();
  const [videoInfo, setVideoInfo] = useState({});
  const [canalInfo, setCanalInfo] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://fase-tube-server-c537f172c3b7.herokuapp.com/api/videos/id/?video_id=${video}`
      )
      .then((res) => {
        console.log(res.data);
        setVideoInfo(res.data);
        fetchCanal(res.data.user_id);
      })
      .catch((error) => console.error("Error fetching video: ", error));
  }, [video]);

  const fetchCanal = (canal_id) => {
    axios
      .get(
        `https://fase-tube-server-c537f172c3b7.herokuapp.com/api/canal/info?canal_id=${canal_id}`
      )
      .then((res) => {
        // console.log(res.data);
        setCanalInfo(res.data);
      })
      .catch((error) => console.error("Error fetching canal: ", error));
  };

  return (
    <div className="flex columns-3">
      {/* Columna invisible */}
      <div className="w-20" />

      {/* Video */}
      <div className="w-[971px]">
        {/* Visualizador */}
        <div className="w-[930px] h-[523px] flex rounded-xl justify-center">
          <video
            src={`https://fase-tube-server-c537f172c3b7.herokuapp.com/api/videos/watch/?video_id=${video}`}
            className="w-[930px] h-[523px] object-cover focus:outline-none rounded-xl"
            controls
            // autoPlay
          />
        </div>
        <hr className="my-1 invisible" />

        {/* Interactividad */}
        <div className="w-[930px] h-24">
          <h1 className="font-serif text-white text-2xl">{videoInfo.titulo}</h1>
          <hr className="my-1 invisible" />
          <div className="flex w-full columns-4">
            {/* Canal */}
            <div className="w-10 h-10 rounded-full">
              <img className="rounded-full" src={canalInfo.foto_ruta}></img>
            </div>
            <div className="w-fit mx-3">
              <h2 className="font-serif text-white whitespace-nowrap overflow-hidden">
                {canalInfo.username}
              </h2>
              <p className="font-serif text-white opacity-50 text-xs">
                1,000 subs
              </p>
            </div>

            {/* Botón de suscripción */}
            <div className="flex mx-2">
              <button className="bg-purple-700 rounded-full px-4 font-serif text-white">
                Suscribirse
              </button>
            </div>

            {/* Botón de like */}
            <div className="flex ml-auto">
              <div className="w-28 h-10 bg-violet-900 bg-opacity-30 rounded-2xl border-2 border-zinc-300 border-opacity-30 flex items-center px-3">
                <HandThumbsUp color="white" />
                <p className="text-white font-serif mx-1">{videoInfo.likes}</p>
                {/* <div className="w-10 rotate-90 border ml-auto"></div> */}
                <HandThumbsDown color="white" className="ml-auto" />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-0 invisible" />

        {/* Detalles del vídeo */}
        <div className="w-[930px] h-16 bg-violet-900 bg-opacity-50 rounded-lg px-4 py-2">
          <p className="text-white font-serif">
            {videoInfo.vistas} visualizaciones · Subido el{" "}
            {formatDate(new Date(videoInfo.fecha_reg))}
          </p>
          <p className="text-white font-serif">{videoInfo.descripcion}</p>
        </div>

        <hr className="my-3 invisible" />

        {/* Comentarios */}
        <div className="w-[930px] h-24">
          <h2 className="font-serif text-white text-2xl">Comentarios</h2>

          {/* Añadir comentario */}
          <div className="flex columns-3 my-2 w-[930px]">
            <div className="w-10 h-10 rounded-full bg-purple-700"></div>
            <input
              type="text"
              placeholder="Añade tu comentario"
              className="bg-transparent text-white border-b-2 w-[800px] mx-4 focus:outline-none font-serif"
            />
            <button className="ml-auto bg-purple-700 rounded-full px-4 font-serif text-white">
              Comentar
            </button>
          </div>

          {/* Comentarios publicados */}
          <div className="my-4">
            <Comentario
              canal="Canal A"
              comentario="Me gusta la carne, la leche y el pan.Me gusta la carne, la leche y el panMe gusta la carne, la leche y el panMe gusta la carne, la leche y el panMe gusta la carne, la leche y el panMe gusta la carne, la leche y el panMe gusta la carne, la leche y el panMe gusta la carne, la leche y el panMe gusta la carne, la leche y el pan"
            />
            <Comentario
              canal="Canal B"
              comentario="El más inteligente de su casa (vive solo)"
            />
            <Comentario
              canal="Canal C"
              comentario="No dejes que nadie arruine tu día. Es TU DÍA; arruínalo tú mismo"
            />
          </div>
          <hr className="my-10 invisible" />
        </div>
      </div>

      {/* Recomendados */}
      <div className="w-96">
        <div className="font-serif text-white text-2xl mx-2">
          <h1>Video relacionados</h1>
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
        </div>
      </div>
    </div>
  );
}

const Comentario = ({ canal, comentario }) => {
  return (
    <div className="w-full flex columns-2 my-4 mx-2">
      <div className="w-10 h-10 rounded-full bg-purple-700"></div>
      <div className="w-[800px] font-serif text-white mx-2">
        <p>{canal}</p>
        <p className="opacity-60">{comentario}</p>
      </div>
    </div>
  );
};
