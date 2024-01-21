import { useFetchRelatedVideosQuery } from "../../../api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";
import { string, number } from "prop-types";

export default function RelatedVideos({ title, videoId }) {
  const {
    data: videos,
    isLoading,
    isError,
  } = useFetchRelatedVideosQuery({
    videoId,
    title,
  });

  let content = null;
  if (isLoading) {
    content = (
      <div>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </div>
    );
  } else if (isError) {
    content = <Error />;
  } else {
    content = videos.map((video, key) => (
      <RelatedVideo key={key} video={video} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}

RelatedVideos.propTypes = {
  title: string,
  videoId: number,
};
