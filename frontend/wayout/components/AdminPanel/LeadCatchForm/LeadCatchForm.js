import styles from "./LeadCatchForm.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import Input from "@/components/UI/Input";
import SendButton from "@/components/UI/SendButton/";
import { useState, useEffect } from "react";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";

const LeadCatchForm = () => {
  const [leadCatch, setLeadCatch] = useState("");
  const leadCatchUrl = "/lead-catch/";

  const updateLeadCatch = async (e) => {
    e.preventDefault();
    const client = await rootWayoutAPI();
    await client.put(leadCatchUrl, { new_value: leadCatch });
  };

  useEffect(() => {
    const getLeadCatch = async () => {
      const response = await wayoutAPI.get(leadCatchUrl);
      setLeadCatch(response.data.value);
    };
    getLeadCatch();
  }, []);

  return (
    <div className={styles.formWrapper}>
      <h2 className={panelStyles.title}>Добавление/ред. лид. кэтчера</h2>
      <form onSubmit={updateLeadCatch} className={styles.form}>
        <Input
          placeholder="Текст H1"
          value={leadCatch}
          onChange={(e) => setLeadCatch(e.target.value)}
        />
        <SendButton className={styles.leadButton} />
      </form>
    </div>
  );
};

export default LeadCatchForm;
