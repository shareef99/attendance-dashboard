import { Button, ScrollArea, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getLeavesAPi } from "../../api/leaves";
import Loader from "../../components/Molecules/Loader";

export type leaveType = {
  _id: string;
  name: string;
  shortName: string;
  limit: number;
  leaveType: string;
  eligibility: boolean;
  uploadDocument: boolean;
};

export default function Leaves() {
  const {
    isLoading,
    isError,
    error,
    data: leaves,
  } = useQuery<Array<leaveType>, any>({
    queryFn: getLeavesAPi,
    queryKey: ["leave-types"],
  });

  if (isLoading) {
    return <Loader fullscreen={true} />;
  }

  if (isError) {
    console.log(error);
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Leave Types</h2>
        <Button className="btn">
          <Link to="/leaves/add">Add Leave Type</Link>{" "}
        </Button>
      </div>
      {leaves && leaves.length > 0 ? (
        <ScrollArea>
          <Table className="my-4" striped withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Type</th>
                <th>Limit</th>
                <th>Eligibility</th>
                <th>Require Document</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave.name}</td>
                  <td>{leave.shortName}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.limit}</td>
                  <td>{leave.eligibility ? "Yes" : "No"}</td>
                  <td>{leave.uploadDocument ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      ) : (
        <>No Leave to show</>
      )}
    </section>
  );
}
