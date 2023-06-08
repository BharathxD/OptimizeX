import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/UI/Loader"));

const LoadingPage = () => {
  return <Loader />;
};

export default LoadingPage;
