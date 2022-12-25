import { z } from "zod";
import { Button } from "@mantine/core";
import NumberInput from "../../../components/Molecules/NumberInput";
import TextInput from "../../../components/Molecules/TextInput";
import { useForm, zodResolver } from "@mantine/form";
import { axiosClient } from "../../../api";
import {
  errNotification,
  loadingNotification,
  successNotification,
} from "../../../helpers/notification";

const boardSchema = z.object({
  board: z.string(),
  yearOfPassing: z.number(),
  percentage: z.number(),
});

type BoardType = z.infer<typeof boardSchema>;

type Props = {
  boardName: "ssc" | "inter";
  id: string;
  formValues: BoardType;
  isEdit: boolean;
  onToggleIsEdit: () => void;
  isProfile: boolean;
};

export default function BoardForm({
  boardName,
  id,
  formValues,
  isEdit,
  onToggleIsEdit,
  isProfile,
}: Props) {
  // Form
  const { onSubmit, getInputProps } = useForm<BoardType>({
    initialValues: { ...formValues },
    validateInputOnBlur: true,
    validate: zodResolver(boardSchema),
  });

  // Functions
  const submitHandler = async (data: BoardType) => {
    try {
      loadingNotification({
        id: "qualification",
        title: "Qualification",
        message: "Updating Qualification Details",
      });
      onToggleIsEdit();
      if (boardName === "ssc") {
        await axiosClient.put("/employees/qualification", data, {
          params: { id: id, type: boardName },
        });
      } else {
        await axiosClient.put("/employees/qualification", data, {
          params: { id: id, type: boardName },
        });
      }
      successNotification({
        id: "qualification",
        title: "Qualification",
        message: "Qualification Details Updated",
      });
    } catch (err: any) {
      errNotification({
        id: "qualification",
        title: "Qualification",
        message:
          err?.response?.data?.message ||
          err.message ||
          "Failed to Update Qualification",
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
          disabled={!isEdit}
          {...getInputProps("board")}
        />
        <NumberInput
          label="Year of Passing"
          placeholder="Enter YOP"
          className="grow"
          hideControls
          withAsterisk
          disabled={!isEdit}
          {...getInputProps("yearOfPassing")}
        />
        <NumberInput
          label="Percentage"
          placeholder="Enter Percentage"
          precision={2}
          min={1}
          className="grow"
          withAsterisk
          disabled={!isEdit}
          {...getInputProps("percentage")}
        />
      </div>
      {!isProfile && (
        <Button type="submit" className="btn mt-2" disabled={!isEdit}>
          SAVE
        </Button>
      )}
    </form>
  );
}
