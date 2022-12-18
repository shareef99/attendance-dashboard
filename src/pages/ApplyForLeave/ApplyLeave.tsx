import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "../../components/Molecules/Select";
import { applyForLeaveApi, getLeavesAPi } from "../../api/leaves";
import { leaveType } from "../Leaves/Leaves";
import { DatePicker } from "@mantine/dates";
import { Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  errNotification,
  loadingNotification,
  successNotification,
} from "../../helpers/notification";
import { useNavigate } from "react-router-dom";

const ApplyLeaveSchema = z.object({
  name: z.string(),
  from: z.date(),
  to: z.date(),
  duration: z.enum(["half-day", "full-day"]),
});

type ApplyLeaveType = z.infer<typeof ApplyLeaveSchema>;

export default function ApplyLeave() {
  const navigate = useNavigate();

  // Form
  const { getInputProps, onSubmit } = useForm<ApplyLeaveType>({
    validateInputOnBlur: true,
    validate: zodResolver(ApplyLeaveSchema),
  });

  // Queries
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: leaves,
  } = useQuery<Array<leaveType>, any>({
    queryKey: ["apply-leaves"],
    queryFn: getLeavesAPi,
  });

  if (isError) {
    console.log(error);
  }

  const submitHandler = async (data: ApplyLeaveType) => {
    loadingNotification({
      id: "leave",
      title: "Apply Leave",
      message: "Applying for leave",
    });

    try {
      const body = {
        name: leaves?.find((leave) => leave._id === data.name)?.name,
        shortname: leaves?.find((leave) => leave._id === data.name)?.shortname,
        from: data.from,
        to: data.to,
        leave_duration: data.duration,
      };
      await applyForLeaveApi(body);
      await queryClient.invalidateQueries(["employee"]);
      navigate("/apply-for-leave");
      successNotification({
        id: "leave",
        title: "Apply Leave",
        message: "Applied for Leave successfully",
      });
    } catch (err) {
      errNotification({
        id: "leave",
        title: "Apply Leave",
        message: "Failed to apply for leave",
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
          <Select
            label="Leave Name"
            placeholder="Select Leave"
            data={
              leaves
                ? leaves.map((leave) => ({
                    value: leave._id,
                    label: leave.name,
                  }))
                : []
            }
            nothingFound={isLoading ? "Not Found" : "Loading..."}
            {...getInputProps("name")}
          />
          <DatePicker
            label="From"
            placeholder="Enter Date"
            className="rightIcon"
            {...getInputProps("from")}
            minDate={new Date()}
          />
          <DatePicker
            label="To"
            placeholder="Enter Date"
            className="rightIcon"
            minDate={new Date()}
            {...getInputProps("to")}
          />
          <Select
            label="Leave Duration"
            placeholder="Select Duration"
            data={[
              { value: "half-day", label: "Half Day" },
              { value: "full-day", label: "Full Day" },
            ]}
            {...getInputProps("duration")}
          />
          <Button className="btn !mt-4" fullWidth type="submit">
            Apply Leave
          </Button>
        </form>
      </div>
    </section>
  );
}
