import TextInput from "../../components/Molecules/TextInput";
import { PasswordInput, Button, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  return (
    <section className="bg-p-green w-screen h-screen flex justify-center items-center">
      <div className="shadow-2xl bg-p-white-green p-8 rounded">
        <h2 className="text-xl text-center font-medium">Sign In</h2>
        <form className="space-y-2 sm:w-96 w-72 py-2">
          <TextInput label="Faculty ID" placeholder="Enter ID" withAsterisk />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            withAsterisk
            classNames={{
              rightSection: `rightIcon`,
              input: `bg-p-white-green`,
            }}
          />
          <Button className="btn !mt-4 !font-medium" fullWidth>
            Sign In
          </Button>
          <Divider label="OR" labelPosition="center" variant="dashed" mt="md" />
          <Button
            className="btn-outline !mt-3"
            fullWidth
            variant="outline"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
