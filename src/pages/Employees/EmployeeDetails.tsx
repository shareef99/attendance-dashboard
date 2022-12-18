import { useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeApi } from "../../api/employees";
import Loader from "../../components/Molecules/Loader";
import { errNotification } from "../../helpers/notification";
import { EmployeeDetailsType } from "./employee";
import Qualification from "./Qualification/Qualification";

export default function EmployeeDetails() {
  const params = useParams();
  const id = params.empId;

  const {
    isLoading,
    isError,
    error,
    data: employee,
  } = useQuery<EmployeeDetailsType, any>({
    queryFn: () => getEmployeeApi(id!),
    queryKey: [`employee-${id}`],
  });

  if (isError) {
    errNotification(
      {
        id: "employee",
        title: "Employee",
        message:
          error?.response?.data?.err ||
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load employee",
      },
      false
    );
  }

  return (
    <Tabs
      defaultValue="personal"
      className="mt-4"
      classNames={{
        tabsList: "border-p-blue-dark",
        tab: "border-p-blue-dark hover:bg-p-blue hover:text-white transition-all duration-300 easy-in",
      }}
      styles={(theme) => ({
        tab: {
          "&[data-active]": {
            borderColor: theme.colors.p[1],
            backgroundColor: theme.colors.p[1],
            color: theme.white,
          },
        },
      })}
    >
      <Tabs.List position="apart">
        <Tabs.Tab value="personal">Personal Details</Tabs.Tab>
        <Tabs.Tab value="qualification">Qualification Details</Tabs.Tab>
        <Tabs.Tab value="experience">Experience Details</Tabs.Tab>
        <Tabs.Tab value="family">Family Details</Tabs.Tab>
        <Tabs.Tab value="other">Other Details</Tabs.Tab>
      </Tabs.List>

      {isLoading || !employee ? (
        <Loader fullscreen={true} />
      ) : (
        <>
          <Tabs.Panel value="personal">Personal</Tabs.Panel>
          <Tabs.Panel value="qualification">
            <Qualification
              qualification={employee.qualificationDetails}
              id={employee.emp_id}
            />
          </Tabs.Panel>
          <Tabs.Panel value="experience">experience</Tabs.Panel>
          <Tabs.Panel value="family">Family Details</Tabs.Panel>
          <Tabs.Panel value="other">Other</Tabs.Panel>
        </>
      )}
    </Tabs>
  );
}
