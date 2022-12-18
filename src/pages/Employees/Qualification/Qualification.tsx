import { QualificationDetailsType } from "../employee";
import BoardForm from "./BoardForm";
import DegreeForm from "./DegreeForm";

type Props = {
  qualification: QualificationDetailsType;
  id: string;
};

export default function Qualification({ qualification, id }: Props) {
  return (
    <section className="my-4 space-y-4">
      <div>
        <h2 className="text-xl">SSC Details</h2>
        <BoardForm boardName="ssc" id={id} />
      </div>
      <div>
        <h2 className="text-xl">Intermediate Details</h2>
        <BoardForm boardName="inter" id={id} />
      </div>
      <div>
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
      </div>
    </section>
  );
}
