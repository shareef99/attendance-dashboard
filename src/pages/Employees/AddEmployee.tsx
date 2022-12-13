import { TextInput, Button, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import Select from "../../components/Molecules/Select";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
// import { useLoadingNotification } from "../../hooks/notification";
import { addEmployeeApi } from "../../api/employees";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  errNotification,
  loadingNotification,
  successNotification,
} from "../../helpers/notification";
import { getDesignationsApi } from "../../api/designations";

const AddEmployeeSchema = z.object({
  initials: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  biometric: z.string(),
  email: z.string().email("Invalid Email"),
  type: z.string(),
  designation: z.string(),
  phone: z
    .number()
    .positive()
    .refine(
      (val) => val.toString().length === 10,
      "Number must be of 10 digits"
    ),
  joiningDate: z.date(),
  department: z.string(),
});

type AddEmployeeType = z.infer<typeof AddEmployeeSchema>;

export default function AddEmployee() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form
  const { getInputProps, onSubmit, values } = useForm<AddEmployeeType>({
    validateInputOnBlur: true,
    validate: zodResolver(AddEmployeeSchema),
  });

  // Query
  const { data: designations } = useQuery({
    queryFn: getDesignationsApi,
    queryKey: ["designations"],
  });

  // Functions
  const submitHandler = async (data: AddEmployeeType) => {
    console.log(data);

    const body = {
      name: `${data.initials} ${data.firstName} ${data.lastName}`,
      emp_id: data.biometric,
      email: data.email,
      mobile_no: data.phone,
      joining_date: data.joiningDate,
      department: data.department,
      emp_type: data.type,
      designation: data.designation,
      role: 2,
    };

    try {
      loadingNotification({
        id: "employee",
        title: "Employee",
        message: "Adding employee",
      });

      await addEmployeeApi(body);
      await queryClient.invalidateQueries(["employees"]);
      navigate("/employees");
      successNotification({
        id: "employee",
        title: "Employee",
        message: "Employee added successfully",
      });
    } catch (err) {
      console.log(err);
      errNotification({
        id: "employee",
        title: "Employee",
        message: "Failed to add employee",
      });
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="shadow-2xl bg-p-white p-8 rounded">
        <h2 className="text-xl text-center mb-4 font-medium">Add Employee</h2>
        <form onSubmit={onSubmit((data) => submitHandler(data))}>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Initials"
              placeholder="Select Initials"
              data={[
                { value: "Dr", label: "Dr" },
                { value: "Mr", label: "Mr" },
                { value: "Mrs", label: "Mrs" },
                { value: "Ms", label: "Ms" },
                { value: "Miss", label: "Miss" },
              ]}
              {...getInputProps("initials")}
            />
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              withAsterisk
              {...getInputProps("name")}
              {...getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              withAsterisk
              {...getInputProps("lastName")}
            />
            <TextInput
              label="Biometric"
              placeholder="Enter Biometric"
              withAsterisk
              {...getInputProps("biometric")}
            />
            <TextInput
              label="Email"
              placeholder="faculty@islen.com"
              withAsterisk
              {...getInputProps("email")}
            />
            <NumberInput
              label="Phone Number"
              placeholder="945xxxxxxx"
              hideControls
              withAsterisk
              {...getInputProps("phone")}
            />
            <DatePicker
              label="Joining Date"
              placeholder="Select Joining Date"
              classNames={{
                rightSection: "rightIcon",
              }}
              withAsterisk
              {...getInputProps("joiningDate")}
            />
            <Select
              data={[
                { value: "cse", label: "CSE" },
                { value: "it", label: "IT" },
                { value: "civil", label: "CIVIL" },
                { value: "mech", label: "Mech" },
                { value: "ece", label: "ECE" },
                { value: "eee", label: "EEE" },
              ]}
              label="Department"
              withAsterisk
              placeholder="Select Department"
              {...getInputProps("department")}
            />
            <Select
              data={[
                { value: "teaching", label: "Teaching" },
                { value: "non-teaching", label: "Non Teaching" },
              ]}
              label="Faculty Type"
              withAsterisk
              placeholder="Select faculty type"
              {...getInputProps("type")}
            />
            <Select
              data={
                designations
                  ? designations
                      .filter((x: any) => x.type === values.type)
                      .map((x: any) => ({
                        value: x.name,
                        label: x.name,
                      }))
                  : []
              }
              label="Designation"
              withAsterisk
              placeholder="Select designation"
              {...getInputProps("designation")}
            />
          </div>
          <Button className="btn !mt-4" fullWidth type="submit">
            Add Employee
          </Button>
        </form>
      </div>
    </section>
  );
}
