import { useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getCurrentEmployeeApi, getEmployeeApi } from "../../api/employees";
import Loader from "../../components/Molecules/Loader";
import { errNotification } from "../../helpers/notification";
import { EmployeeDetailsType } from "./employee";
import Qualification from "./Qualification/Qualification";
import PersonalDetails from "./PersonalDetails";

type Props = {
  isProfile: boolean;
};

export default function EmployeeDetails({ isProfile }: Props) {
  const params = useParams();
  const id = params.empId;

  const {
    isLoading,
    isError,
    error,
    data: employee,
  } = useQuery<EmployeeDetailsType, any>({
    queryFn: () => (id ? getEmployeeApi(id) : getCurrentEmployeeApi()),
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
      </Tabs.List>

      {isLoading || !employee ? (
        <Loader fullscreen={true} />
      ) : (
        <>
          <Tabs.Panel value="personal">
            <PersonalDetails
              personalDetails={{
                emp_id: employee.emp_id,
                department: employee.department,
                aadharNo: employee.personalDetails.aadharNo,
                address: employee.personalDetails.address,
                bankAccountNo: employee.personalDetails.bankAccountNo,
                bankName: employee.personalDetails.bankName,
                designation: employee.designation,
                dob: employee.personalDetails.dob,
                joining_date: employee.joining_date,
                email: employee.email,
                gender: employee.personalDetails.gender,
                IFSCCode: employee.personalDetails.IFSCCode,
                married: employee.personalDetails.married
                  ? "married"
                  : "unmarried",
                marriedDate: employee.personalDetails.marriedDate,
                mobile_no: employee.mobile_no,
                name: employee.name,
                pancardNo: employee.personalDetails.pancardNo,
                pfNo: employee.personalDetails.pfNo,
                RTGSNo: employee.personalDetails.RTGSNo,
                emp_type: employee.emp_type,
                salary: employee.salary,
              }}
              isProfile={isProfile}
            />
          </Tabs.Panel>
          <Tabs.Panel value="qualification">
            <Qualification
              qualification={employee.qualificationDetails}
              id={employee.emp_id}
              isProfile={isProfile}
            />
          </Tabs.Panel>
          <Tabs.Panel value="experience">experience</Tabs.Panel>
        </>
      )}
    </Tabs>
  );
}
