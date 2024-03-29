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
  const { data } = useSWR(leadCatchApiUrl, fetcher);

  return data ? (
    <div className={styles.textWrapper}>
      <Image
        src={"/static/img/small_percent.svg"}
        width={89}
        height={120}
        layout="raw"
        className={styles.percent}
        alt="percent"
      />

      <p className={styles.leadCatchText}>{data.value}</p>
      <Image
        src={"/static/img/big_percent.svg"}
        width={178}
        height={230}
        layout="raw"
        className={styles.percentFloat}
        alt="percent-float"
      />
    </div>
  ) : (
    <Skeleton width={798} height={530} style={{ borderRadius: "15px" }} />
  );
};

export default Text;
