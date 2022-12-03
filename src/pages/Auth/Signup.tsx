import { TextInput, Button, NumberInput, Divider } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import Select from "../../components/Molecules/Select";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

type SignupType = {
  name: string;
  id: string;
  email: string;
  type: "teaching" | "non-teaching" | string;
  designation: string;
  phone: number | null;
  joiningDate: string;
  department: string;
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  id: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  type: Yup.string().typeError("Required").required("Required"),
  designation: Yup.string().typeError("Required").required("Required"),
  phone: Yup.number()
    .typeError("Required")
    .required("Required")
    .test(
      "len",
      "Phone number must be of 10 digits",
      (val) => val?.toString().length === 10
    ),
  joiningDate: Yup.string().typeError("Required").required("Required"),
  department: Yup.string().typeError("Required").required("Required"),
});

export default function Signup() {
  const navigate = useNavigate();

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

  const { getInputProps, onSubmit, values } = useForm<SignupType>({
    initialValues: {
      name: "",
      id: "",
      email: "",
      type: "",
      designation: "",
      phone: null,
      joiningDate: "",
      department: "",
    },
    validateInputOnBlur: true,
    validate: yupResolver(SignupSchema),
  });

  return (
    <section className="bg-p-green w-screen h-screen flex justify-center items-center">
      <div className="shadow-2xl bg-p-white-green p-8 rounded">
        <h2 className="text-xl text-center mb-4 font-medium">Sign Up</h2>
        <form onSubmit={onSubmit((data) => console.log(data))}>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Name"
              placeholder="Enter name"
              withAsterisk
              classNames={{
                input: "bg-p-white-green",
              }}
              {...getInputProps("name")}
            />
            <TextInput
              label="ID"
              placeholder="Enter Unique ID"
              withAsterisk
              classNames={{
                input: "bg-p-white-green",
              }}
              {...getInputProps("id")}
            />
            <TextInput
              label="Email"
              placeholder="faculty@islen.com"
              withAsterisk
              classNames={{
                input: "bg-p-white-green",
              }}
              {...getInputProps("email")}
            />
            <NumberInput
              label="Phone Number"
              placeholder="945xxxxxxx"
              hideControls
              withAsterisk
              classNames={{ input: "bg-p-white-green" }}
              {...getInputProps("phone")}
            />
            <DatePicker
              label="Joining Date"
              placeholder="Select Joining Date"
              classNames={{
                input: "bg-p-white-green",
                rightSection: "rightIcon",
              }}
              withAsterisk
              {...getInputProps("joiningDate")}
            />
            <Select
              data={[
                { value: "cse", label: "CSE" },
                { value: "cse-ai&ds", label: "CSE-AI&DS" },
                { value: "cse-ai&ml", label: "CSE-AI&ML" },
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
                  ? designation.nonTeaching.map((x) => ({ value: x, label: x }))
                  : designation.teaching.map((x) => ({ value: x, label: x }))
              }
              label="Designation"
              withAsterisk
              placeholder="Select designation"
              {...getInputProps("designation")}
            />
          </div>
          <Button className="btn !mt-4" fullWidth type="submit">
            Sign Up
          </Button>
          <Divider label="OR" labelPosition="center" variant="dashed" mt="md" />
          <Button
            className="btn-outline !mt-4"
            fullWidth
            variant="outline"
            onClick={() => navigate("/auth/signin")}
          >
            Sign In
          </Button>
        </form>
      </div>
    </section>
  );
}
