import { TextInput, Button, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import Select from "../../components/Molecules/Select";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
// import { useLoadingNotification } from "../../hooks/notification";
import { addEmployeeApi } from "../../api/employees";
import { useQueryClient } from "@tanstack/react-query";

const AddEmployeeSchema = z.object({
  name: z.string(),
  id: z.string(),
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

  const designation = {
    teaching: [
      "HOD",
      "Principal",
      "Professor",
      "Associate Professor",
      "Assistant Professor",
      "Lab Assistant",
      "System Assistant",
      "Admin Office",
      "Librarian",
    ],
    nonTeaching: [
      "Non Teaching 1",
      "Non Teaching 2",
      "Non Teaching 3",
      "Non Teaching 4",
    ],
  };

  // Form
  const { getInputProps, onSubmit, values } = useForm<AddEmployeeType>({
    validateInputOnBlur: true,
    validate: zodResolver(AddEmployeeSchema),
  });

  // Functions
  const submitHandler = async (data: AddEmployeeType) => {
    const body = {
      name: data.name,
      emp_id: data.id,
      email: data.email,
      mobile_no: data.phone,
      joining_date: data.joiningDate,
      department: data.department,
      emp_type: data.type,
      designation: data.designation,
      role: 2,
    };

    try {
      // useLoadingNotification({
      //   id: "employee",
      //   title: "Employee",
      //   message: "Adding employee",
      // });
      console.log("Adding employee...");
      await addEmployeeApi(body);
      await queryClient.invalidateQueries(["employees"]);
      navigate("/employees");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="shadow-2xl bg-p-white p-8 rounded">
        <h2 className="text-xl text-center mb-4 font-medium">Add Employee</h2>
        <form onSubmit={onSubmit((data) => submitHandler(data))}>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Name"
              placeholder="Enter name"
              withAsterisk
              {...getInputProps("name")}
            />
            <TextInput
              label="ID"
              placeholder="Enter Unique ID"
              withAsterisk
              {...getInputProps("id")}
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
                values.type === "non-teaching"
                  ? designation.nonTeaching.map((x) => ({
                      value: x.toLowerCase(),
                      label: x,
                    }))
                  : designation.teaching.map((x) => ({
                      value: x.toLowerCase(),
                      label: x,
                    }))
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
