import TextInput from "../../components/Molecules/TextInput";
import { PasswordInput, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../store/employeeSlice";
import { setAuth } from "../../helpers/auth";

const signinSchema = z.object({
  emp_id: z.string(),
  password: z.string(),
});

type signinType = z.infer<typeof signinSchema>;

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form
  const { getInputProps, onSubmit } = useForm<signinType>({
    initialValues: {
      emp_id: "",
      password: "",
    },
    validate: zodResolver(signinSchema),
  });

  // Functions
  const submitHandler = async (data: signinType) => {
    try {
      const res: any = await axios.post(
        "http://localhost:9000/api/v1/auth/signin",
        data
      );
      const accessToken = res.data.token;
      const employee = res.data.employee;
      console.log(employee);

      dispatch(signin({ accessToken: accessToken, ...employee }));
      setAuth({ isAuth: true, accessToken: res.data.token, employee });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-p-white-green w-screen h-screen flex justify-center items-center">
      <div className="shadow-2xl bg-p-white-green p-8 rounded">
        <h2 className="text-xl text-center font-medium">Sign In</h2>
        <form
          className="space-y-2 sm:w-96 w-72 py-2"
          onSubmit={onSubmit((data) => submitHandler(data))}
        >
          <TextInput
            label="Employee ID"
            placeholder="Enter ID"
            withAsterisk
            {...getInputProps("emp_id")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            withAsterisk
            classNames={{
              rightSection: `rightIcon`,
              input: `bg-p-white-green`,
            }}
            {...getInputProps("password")}
          />
          <Button className="btn !mt-4 !font-medium" fullWidth type="submit">
            Sign In
          </Button>
        </form>
      </div>
    </section>
  );
}
