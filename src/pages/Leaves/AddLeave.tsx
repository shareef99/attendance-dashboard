import { Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { addLeaveApi } from "../../api/leaves";
import NumberInput from "../../components/Molecules/NumberInput";
import Select from "../../components/Molecules/Select";
import TextInput from "../../components/Molecules/TextInput";
import {
  errNotification,
  loadingNotification,
  successNotification,
} from "../../helpers/notification";

const addLeaveSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  leaveType: z.string(),
  limit: z.number(),
  eligibility: z.enum(["eligible", "non-eligible"]),
  document: z.enum(["required", "not-required"]),
});

type addLeaveType = z.infer<typeof addLeaveSchema>;

export default function AddLeave() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form
  const { onSubmit, getInputProps } = useForm<addLeaveType>({
    validateInputOnBlur: true,
    validate: zodResolver(addLeaveSchema),
  });

  const submitHandler = async (data: addLeaveType) => {
    loadingNotification({
      id: "leave",
      title: "Leave",
      message: "Adding leave...",
    });
    try {
      const body = {
        name: data.name,
        shortName: data.shortName,
        leaveType: data.leaveType,
        limit: data.limit,
        eligibility: data.eligibility === "eligible" ? true : false,
        uploadDocument: data.document === "required" ? true : false,
      };
      await addLeaveApi(body);
      await queryClient.invalidateQueries(["leaves"]);
      successNotification({
        id: "leave",
        title: "Leave",
        message: "Leave added successfully",
      });
      navigate("/leaves");
    } catch (err) {
      errNotification({
        id: "leave",
        title: "Leave",
        message: "Failed to add leave",
      });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="shadow-2xl w-[300px] md:w-[500px] p-8">
        <h2 className="text-xl text-center mb-4">Add Leave</h2>
        <form
          className="space-y-2"
          onSubmit={onSubmit((data) => submitHandler(data))}
        >
          <TextInput
            label="Name"
            placeholder="Enter name"
            {...getInputProps("name")}
          />
          <TextInput
            label="Short Name"
            placeholder="Enter short name"
            {...getInputProps("shortName")}
          />
          <Select
            label="Leave Type"
            placeholder="Select leave type"
            data={[
              { value: "accumulated", label: "Accumulated" },
              { value: "public-holiday", label: "Public Holiday" },
            ]}
            {...getInputProps("leaveType")}
          />
          <NumberInput
            label="Leave limit"
            placeholder="Enter leave limit"
            min={1}
            {...getInputProps("limit")}
          />
          <Select
            label="Eligibility"
            placeholder="Select eligibility"
            data={[
              { value: "eligible", label: "Eligible" },
              { value: "non-eligible", label: "Not Eligible" },
            ]}
            {...getInputProps("eligibility")}
          />
          <Select
            label="Document"
            placeholder="Select document"
            data={[
              { value: "required", label: "Required" },
              { value: "not-required", label: "Not Required" },
            ]}
            {...getInputProps("document")}
          />
          <Button fullWidth className="btn" type="submit">
            Add Leave
          </Button>
        </form>
      </div>
    </section>
  );
}
