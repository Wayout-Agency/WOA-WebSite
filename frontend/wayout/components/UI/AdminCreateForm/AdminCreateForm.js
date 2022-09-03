import styles from "./AdminCreateForm.module.scss";
import { useState } from "react";
import RequiredData from "./RequiredData";
import OptionalData from "./OptionalData";
import OnSubmit from "./OnSubmit";
const AdminCreateForm = ({
  requiredData,
  optionalData,
  blockSample,
  handleSend,
  handleDelete,
  separation,
  setSeparation,
}) => {
  const [inputs, setInputs] = useState(optionalData);

  return (
    <div className={styles.formWrapper}>
      <form>
        <RequiredData requiredData={requiredData} />
        {optionalData ? (
          <OptionalData
            separation={separation}
            inputs={inputs}
            setInputs={setInputs}
            setSeparation={setSeparation}
            blockSample={blockSample}
          />
        ) : (
          <></>
        )}
        <OnSubmit
          handleDelete={handleDelete}
          handleSend={handleSend}
          separation={separation}
        />
      </form>
    </div>
  );
};

export default AdminCreateForm;
