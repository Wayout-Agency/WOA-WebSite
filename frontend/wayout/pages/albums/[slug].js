import AlbumsCardComponent from "@/components/AlbumsCard";
import { useRouter } from "next/router";

const AlbumsCard = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <AlbumsCardComponent type={slug} />;
};

export default AlbumsCard;
