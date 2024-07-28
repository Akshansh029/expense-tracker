import { Loader } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ClipLoader />
    </div>
  );
};

export default Loading;
