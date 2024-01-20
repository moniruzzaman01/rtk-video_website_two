import { useFetchAllVideosQuery } from "../../api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError } = useFetchAllVideosQuery();

  let content = null;
  if (isLoading) {
    content = (
      <>
        {Array(8)
          .fill(0)
          .map((a, b) => (
            <VideoLoader key={b} />
          ))}
      </>
    );
  } else if (isError) {
    content = <Error />;
  } else if (videos.length == 0) {
    content = <Error />;
  } else if (videos.length > 0) {
    content = videos.map((video, key) => <Video key={key} video={video} />);
  }

  return <>{content}</>;
}
