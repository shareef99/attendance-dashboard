import { useForm } from "@mantine/form";
import { z } from "zod";
import NumberInput from "../../../components/Molecules/NumberInput";
import TextInput from "../../../components/Molecules/TextInput";
import { Button } from "@mantine/core";

type Props = {
  type: "degree" | "pg" | "others";
  id: string;
  hasGrades: boolean;
};

const degreeSchema = z.object({
  qualification: z.string(),
  specialization: z.string(),
  yop: z.number(),
  percentage: z.number(),
  remarks: z.string(),
  grade: z.string().optional(),
});

type DegreeType = z.infer<typeof degreeSchema>;

export default function DegreeForm({ type, id, hasGrades }: Props) {
  const { getInputProps, onSubmit } = useForm<DegreeType>();

  const submitHandler = async (data: DegreeType) => {
    try {
      console.log(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <form className="mt-2" onSubmit={onSubmit((data) => submitHandler(data))}>
      <div className="grid grid-cols-3 gap-4">
        <TextInput label="Qualification" placeholder="Enter Qualification" />
        <TextInput label="Specialization" placeholder="Enter Specialization" />
        <NumberInput
          label="Year of Passing"
          placeholder="Enter YOP"
          className="grow"
          hideControls
          withAsterisk
          {...getInputProps("yop")}
        />
        <NumberInput
          label="Percentage"
          placeholder="Enter Percentage"
          precision={2}
          min={1}
          className="grow"
          withAsterisk
          {...getInputProps("percentage")}
        />
        <TextInput label="Remarks" placeholder="Enter Remarks" />
        {hasGrades && <TextInput label="Grade" placeholder="Enter Grade" />}
      </div>
      <Button className="btn mt-2">SAVE</Button>
    </form>
  );
}
