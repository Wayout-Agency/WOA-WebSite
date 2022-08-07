import styles from "./AdminUDForm.module.scss";
import { useState } from "react";
import RequiredData from "./RequiredData";
import OptionalData from "./OptionalData";
import OnSubmit from "./OnSubmit";

const AdminUDForm = ({
  required_data,
  optional_data,
  blockSample,
  handleSend,
  handleDelete,
  defaultSeparation,
  deleteFileAPIUrl,
}) => {
  const [optionalInputs, setOptionalInputs] = useState(optional_data);
  const [requiredInputs, setRequiredInputs] = useState(required_data);
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
