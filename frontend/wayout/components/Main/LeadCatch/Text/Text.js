import styles from "./Text.module.scss";
import useSWR from "swr";
import wayoutAPI from "services/wayoutApi";
import Image from "next/future/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Text = () => {
  const leadCatchApiUrl = "/lead-catch/";

  const fetcher = async () => {
    const response = await wayoutAPI.get(leadCatchApiUrl);
    return response.data;
  };
  const { data, error } = useSWR(leadCatchApiUrl, fetcher);
  if (error) throw "Error";

  return data ? (
    <div className={styles.textWrapper}>
      <Image
        src={"/static/img/small_percent.svg"}
        width={120}
        height={120}
        layout="raw"
        className={styles.percent}
      />

      <p className={styles.leadCatchText}>{data.value}</p>
      <Image
        src={"/static/img/big_percent.svg"}
        width={178}
        height={230}
        layout="raw"
        className={`${styles.percent} ${styles.percentFloat}`}
      />
    </div>
  ) : (
    <Skeleton w/>
  );
};

export default Text;
