import { useContext } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../../context/globalcontext";

const ComingSoon = () => {
  const { role } = useContext(globalContext);

  console.log(role);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-peach px-6 relative overflow-hidden">
      {/* Soft Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-purple rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-purple rounded-xl rotate-12"></div>
      </div>

      <div className="z-10 text-center">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-purple/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 bg-purple rounded-full opacity-80"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-purple mb-4 uppercase tracking-tighter">
          Coming Soon
        </h1>

        <div className="w-16 h-1 bg-purple mx-auto mb-6 rounded-full"></div>

        <p className="text-gray-700 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
          We are currently organizing our inventory.
          <span className="block mt-2 text-purple font-bold">
            This section will be updated soon!
          </span>
        </p>

        <div className="mt-10">
          <Link
            to={`/app/${role}-dashboard`.toLowerCase()}
            className="px-8 py-3 bg-purple text-peach font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
