import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/UI/Loader"));

const LoadingPage = () => <Loader />;

export default LoadingPage;
