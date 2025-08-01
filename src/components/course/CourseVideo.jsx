import ReactPlayer from "react-player";

export default function CourseVideo({ url, title }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 border border-gray-200">
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-t-xl overflow-hidden">
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          className="react-player"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h3>
      </div>
    </div>
  );
}