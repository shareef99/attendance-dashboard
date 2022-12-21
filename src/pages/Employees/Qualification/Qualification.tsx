import { Button } from "@mantine/core";
import { useState } from "react";
import { QualificationDetailsType } from "../employee";
import BoardForm from "./BoardForm";
// import DegreeForm from "./DegreeForm";

type Props = {
  qualification: QualificationDetailsType;
  id: string;
};

export default function Qualification({ qualification, id }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <section className="my-4 space-y-4">
      <div>
        <div className="flex justify-between">
          <h2 className="text-xl">SSC Details</h2>
          <Button className="btn" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "Done" : "Edit"}
          </Button>
        </div>
        <BoardForm
          boardName="ssc"
          id={id}
          formValues={qualification.ssc}
          isEdit={isEdit}
          onToggleIsEdit={() => setIsEdit(!isEdit)}
        />
      </div>
      <div>
        <h2 className="text-xl">Intermediate Details</h2>
        <BoardForm
          boardName="inter"
          id={id}
          formValues={qualification.inter}
          isEdit={isEdit}
          onToggleIsEdit={() => setIsEdit(!isEdit)}
        />
      </div>
      {/* <div>
        <h2 className="text-xl">Degree Details</h2>
        <DegreeForm type="degree" id={id} hasGrades={false} />
      </div>
      <div>
        <h2 className="text-xl">PG Details</h2>
        <DegreeForm type="degree" id={id} hasGrades={true} />
      </div>
      <div>
        <h2 className="text-xl">Other Qualifications</h2>
        <DegreeForm type="degree" id={id} hasGrades={true} />
      </div> */}
    </section>
  );
}
