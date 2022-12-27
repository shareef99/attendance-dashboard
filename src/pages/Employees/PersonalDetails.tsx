import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getDesignationsApi } from "../../api/designations";
import NumberInput from "../../components/Molecules/NumberInput";
import Select from "../../components/Molecules/Select";
import TextInput from "../../components/Molecules/TextInput";
import { Button } from "@mantine/core";
import { useState } from "react";
import {
  errNotification,
  loadingNotification,
  successNotification,
} from "../../helpers/notification";
import { updatePersonalDetailsApi } from "../../api/employees";
import dayjs from "dayjs";

const personalSchema = z.object({
  emp_id: z.string(),
  name: z.string(),
  gender: z.enum(["male", "female", "others"]).optional(),
  dob: z.string().optional(),
  married: z.enum(["married", "unmarried"]).optional(),
  marriedDate: z.string().optional(),
  designation: z.string(),
  department: z.string(),
  address: z.string().optional(),
  mobile_no: z.number(),
  email: z.string().email(),
  joining_date: z.string(),
  bankAccountNo: z.number().optional(),
  bankName: z.string().optional(),
  IFSCCode: z.string().optional(),
  pancardNo: z.string().optional(),
  pfNo: z.string().optional(),
  aadharNo: z.number().optional(),
  RTGSNo: z.string().optional(),
  salary: z.number().optional(),
});

type PersonalType = z.infer<typeof personalSchema>;

type Props = {
  personalDetails: PersonalType & { emp_type: string };
  isProfile: boolean;
};

export default function PersonalDetails({ personalDetails, isProfile }: Props) {
  const [isEdit, setIsEdit] = useState(false);

  // Query
  const queryClient = useQueryClient();
  const { data: designations } = useQuery({
    queryFn: getDesignationsApi,
    queryKey: ["designations"],
  });

  // Form
  const { getInputProps, onSubmit } = useForm<PersonalType>({
    initialValues: {
      ...personalDetails,
      // In order to pass date values directly into mantine form, we need to convert string to date
      // @ts-ignore
      joining_date: dayjs(personalDetails.joining_date).toDate(),
      // Initially Personal details will be undefined, if undefined value is not checked dayjs will give mantine the current date value
      // @ts-ignore
      dob: personalDetails.dob ? dayjs(personalDetails.dob).toDate() : "",
      // @ts-ignore
      marriedDate: personalDetails.marriedDate
        ? dayjs(personalDetails.marriedDate).toDate()
        : "",
    },
  });

  const submitHandler = async (data: PersonalType) => {
    try {
      loadingNotification({
        id: "personal",
        title: "Personal Details",
        message: "Updating personal details",
      });
      setIsEdit(false);
      await updatePersonalDetailsApi({
        ...data,
        married: data.married === "married" ? true : false,
        role: designations.find(
          (designation: any) => designation.name === data.designation
        ).role,
      });
      await queryClient.invalidateQueries([`employee-${data.emp_id}`]);
      successNotification({
        id: "personal",
        title: "Personal Details",
        message: "Personal details updated",
      });
    } catch (err: any) {
      errNotification({
        id: "personal",
        title: "Personal Details",
        message:
          err?.response?.data?.message ||
          err.message ||
          "Failed to update personal details",
      });
    }
  };

  return (
    <section className="my-4">
      <div className="flex justify-end">
        {!isProfile && (
          <Button className="btn" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "Done" : "Edit"}
          </Button>
        )}
      </div>
      {/* @ts-ignore */}
      <form onSubmit={onSubmit((data) => submitHandler(data))}>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            label="Bio Metric"
            placeholder="Enter Bio Metric"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("emp_id")}
          />
          <TextInput
            label="Name"
            placeholder="Enter Name"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("name")}
          />
          <Select
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "others", label: "Others" },
            ]}
            label="Gender"
            placeholder="Select Gender"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("gender")}
          />
          <DatePicker
            label="Date Of Birth"
            placeholder="Select DOB"
            disabled={!isEdit}
            classNames={{ rightSection: "rightIcon", disabled: "!text-black" }}
            styleDisable={true}
            {...getInputProps("dob")}
          />
          <Select
            data={[
              { value: "married", label: "Married" },
              { value: "unmarried", label: "Un Married" },
            ]}
            label="Married"
            placeholder="Select Married Status"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("married")}
          />
          <DatePicker
            label="Date Of Married"
            placeholder="Select date of married"
            disabled={!isEdit}
            classNames={{ rightSection: "rightIcon", disabled: "!text-black" }}
            styleDisable={true}
            {...getInputProps("marriedDate")}
          />
          <Select
            data={
              designations
                ? designations.map((designation: any) => ({
                    value: designation.name,
                    label: designation.name,
                  }))
                : []
            }
            label="Designation"
            placeholder="Select Designation"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("designation")}
          />
          <NumberInput
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            hideControls
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("mobile_no")}
          />
          <TextInput
            label="Email"
            placeholder="Enter Email"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("email")}
          />
          <DatePicker
            label="Date Of Joining"
            placeholder="Select Date of joining"
            disabled={!isEdit}
            classNames={{ rightSection: "rightIcon", disabled: "!text-black" }}
            {...getInputProps("joining_date")}
          />
          <NumberInput
            label="Bank Account Number"
            placeholder="Enter Bank Account Number"
            hideControls
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("bankAccountNo")}
          />
          <TextInput
            label="Bank Name"
            placeholder="Enter Bank Name"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("bankName")}
          />
          <TextInput
            label="IFSC Code"
            placeholder="Enter Bio Metric"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("IFSCCode")}
          />
          <TextInput
            label="Pancard Number"
            placeholder="Enter Pancard Number"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("pancardNo")}
          />
          <TextInput
            label="PF Number"
            placeholder="Enter PF Number"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("pfNo")}
          />
          <NumberInput
            label="Aadhar Number"
            placeholder="Enter Aadhar Number"
            disabled={!isEdit}
            hideControls
            styleDisable={true}
            {...getInputProps("aadharNo")}
          />
          <TextInput
            label="RTGS No"
            placeholder="Enter RTGS No"
            disabled={!isEdit}
            styleDisable={true}
            {...getInputProps("RTGSNo")}
          />
          <NumberInput
            label="Salary"
            placeholder="Enter Salary"
            disabled={!isEdit}
            hideControls
            styleDisable={true}
            {...getInputProps("salary")}
          />
          <div></div>
          {!isProfile && (
            <Button className="btn" type="submit" disabled={!isEdit}>
              Save
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
