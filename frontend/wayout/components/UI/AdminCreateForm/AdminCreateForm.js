import styles from "./AdminCreateForm.module.scss";
import { useState } from "react";
import RequiredData from "./RequiredData";
import OptionalData from "./OptionalData";
import OnSubmit from "./OnSubmit";
const AdminCreateForm = ({
  required_data,
  optional_data,
  blockSample,
  handleSend,
  handleDelete,
  separation,
  setSeparation,
}) => {
  const [inputs, setInputs] = useState(optional_data);

  return (
    <div className={styles.formWrapper}>
      <form>
        <RequiredData required_data={required_data} />
        <OptionalData
          separation={separation}
          inputs={inputs}
          setInputs={setInputs}
          setSeparation={setSeparation}
          blockSample={blockSample}
        />
        <OnSubmit handleDelete={handleDelete} handleSend={handleSend} />
      </form>
    </div>
  );
};

export default AdminCreateForm;
