import styles from "./Clients.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ClientCard from "./ClientCard";
import Image from "next/future/image";
import Link from "next/link";

const Clients = () => {
  const casesApiUrl = "/posts/cases/?quantity=3";

  const fetcher = async () => {
    const widthData = [622, 544, 380];
    const response = await wayoutAPI.get(casesApiUrl);
    widthData.map((width, index) => {
      response.data[index].value.width = width;
    });
    return response.data;
  };

  const { data } = useSWR(casesApiUrl, fetcher);

  return (
    <div className={styles.clientsWrapper}>
      <Link href={"/magazine/"}>
        <div className={styles.clientsHeader}>
          <h2 className={styles.title}>Клиенты</h2>
          <Image
            className={styles.img}
            width={66}
            height={28}
            src={"/static/img/arrow.svg"}
            layout="raw"
            alt="arrow"
          />
        </div>
      </Link>
      <div className={styles.clientCardsWrapper}>
        {data && data.length > 2 ? (
          data.map(({ value }, index) => {
            return (
              <ClientCard
                filesLimit={value.files_quantity}
                divId={`case_${index}`}
                key={index}
                postType={"cases"}
                slug={value.slug}
                caseId={value.id}
                title={value.title}
                description={value.description}
                width={value.width}
                height={380}
              />
            );
          })
        ) : (
          <>
            <Skeleton width={622} height={450} borderRadius={15} />
            <Skeleton width={544} height={450} borderRadius={15} />
            <Skeleton width={380} height={450} borderRadius={15} />
          </>
        )}
        <Link href={"/magazine/"}>
          <div className={styles.moreWrapper}>
            <p className={styles.moreText}>Смотреть еще фото</p>
            <Image
              className={styles.moreImg}
              width={66}
              height={28}
              src={"/static/img/arrow.svg"}
              layout="raw"
              alt="arrow"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Clients;
