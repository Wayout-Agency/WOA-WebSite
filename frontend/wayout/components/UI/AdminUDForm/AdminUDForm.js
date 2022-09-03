import styles from "./AdminUDForm.module.scss";
import { useState } from "react";
import RequiredData from "./RequiredData";
import OptionalData from "./OptionalData";
import OnSubmit from "./OnSubmit";

const AdminUDForm = ({
  requiredData,
  optionalData,
  blockSample,
  handleSend,
  handleDelete,
  defaultSeparation,
  deleteFileAPIUrl,
}) => {
  const [optionalInputs, setOptionalInputs] = useState(optionalData);
  const [requiredInputs, setRequiredInputs] = useState(requiredData);
  const [separation, setSeparation] = useState(defaultSeparation);

  return (
    <div className={styles.formWrapper}>
      <form>
        <RequiredData
          requiredInputs={requiredInputs}
          setRequiredInputs={setRequiredInputs}
        />
        {optionalInputs ? (
          <OptionalData
            deleteFileAPIUrl={deleteFileAPIUrl}
            optionalInputs={optionalInputs}
            setOptionalInputs={setOptionalInputs}
            separation={separation}
            setSeparation={setSeparation}
            blockSample={blockSample}
            handleSend={handleSend}
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

export default AdminUDForm;
