import { z } from "zod";
import { Button } from "@mantine/core";
import NumberInput from "../../../components/Molecules/NumberInput";
import TextInput from "../../../components/Molecules/TextInput";
import { useForm, zodResolver } from "@mantine/form";
import { axiosClient } from "../../../api";

type Props = {
  boardName: "ssc" | "inter";
  id: string;
};

const boardSchema = z.object({
  board: z.string(),
  yop: z.number(),
  percentage: z.number(),
});

type boardType = z.infer<typeof boardSchema>;

export default function BoardForm({ boardName, id }: Props) {
  const { onSubmit, getInputProps } = useForm<boardType>({
    validateInputOnBlur: true,
    validate: zodResolver(boardSchema),
  });

  const submitHandler = (data: boardType) => {
    if (boardName === "ssc") {
      axiosClient.put("/employees/qualification", data, {
        params: { id: id, type: boardName },
      });
    } else {
      axiosClient.put("/employees/qualification", data, {
        params: { id: id, type: boardName },
      });
    }
  };

  return (
    <form className="mt-2" onSubmit={onSubmit((data) => submitHandler(data))}>
      <div className="grid grid-cols-3 gap-4">
        <TextInput
          label="Board"
          placeholder="Enter Board Name"
          className="grow"
          withAsterisk
          {...getInputProps("board")}
        />
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
      </div>
      <Button type="submit" className="btn mt-2">
        SAVE
      </Button>
    </form>
  );
}
