import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <HashLoader size={50} />
    </div>
  );
};

export default Loading;
