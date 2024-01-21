import { useParams } from "react-router-dom";
import { useFetchAVideoQuery } from "../../api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import Error from "../ui/Error";

export default function Video() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useFetchAVideoQuery(videoId);

  let content = null;
  if (isLoading) {
    content = (
      <>
        <PlayerLoader /> <DescriptionLoader />
      </>
    );
  } else if (isError) {
    content = <Error />;
  } else {
    content = (
      <>
        <Player title={video.title} link={video.link} />
        <Description video={video} />
      </>
    );
  }

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          <RelatedVideos />
        </div>
      </div>
    </section>
  );
}
