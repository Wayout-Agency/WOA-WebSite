import useSWR from "swr";
import wayoutAPI from "services/wayoutApi";
import { useState } from "react";
import styles from "./QuestionServices.module.scss";
import Text from "./Text";
import Title from "./Title";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuestionServices = ({ QSType = "question" }) => {
  const questionServiceApiUrl = "/questions-services/";
  const [isActive, setIsActive] = useState([]);

  const fetcher = async () => {
    let response = await wayoutAPI.get(questionServiceApiUrl);
    response.data = response.data.filter(({ type }) => type === QSType);
    response.data.map((_, i) => {
      isActive[i] = false;
      setIsActive(isActive);
    });
    return response.data;
  };

  const click = (index) => {
    isActive[index] = !isActive[index];
    setIsActive([...isActive]);
  };

  const { data, error } = useSWR(questionServiceApiUrl, fetcher);

  if (error) throw "Error";

  return (
    <div className={styles.QSWrapper}>
      <h2 className={styles.QSTitle}>Вопросы</h2>
      <div className={styles.QSContentWrapper}>
        {data && data.length > 0 ? (
          data.map(({ title, text }, index) => {
            return (
              <div
                key={index}
                className={styles.QSItem}
                onClick={() => click(index)}
              >
                <Title title={title} isActive={isActive[index]} />
                <Text text={text} isActive={isActive[index]} />
              </div>
            );
          })
        ) : (
          <Skeleton width={"100%"} height={340} borderRadius={15} />
        )}
      </div>
    </div>
  );
};

export default QuestionServices;
