export type EmployeesType = {
  _id: string;
  emp_id: string;
  department: string;
  designation: string;
  name: string;
  email: string;
  mobile_no: number;
  joining_date: string;
  emp_type: string;
};

export type EmployeeDetailsType = {
  _id: string;
  name: string;
  emp_id: string;
  email: string;
  mobile_no: number;
  joining_date: string;
  department: string;
  emp_type: string;
  designation: string;
  role: number;
  leaves: Array<{
    no_of_leaves_taken: number;
    shortname: string;
  }>;
  salary: number;
  final_salary: number;
  is_salary_updated: boolean;
  personalDetails: PersonalDetailsType;
  qualificationDetails: QualificationDetailsType;
  experience: Array<ExperienceType>;
  family: Array<FamilyType>;
};

export type PersonalDetailsType = {
  _id: string;
  gender: "male" | "female" | "others";
  dob: string;
  married: boolean;
  marriedDate: string;
  address: string;
  bankAccountNo: number;
  bankName: string;
  IFSCCode: string;
  pancardNo: string;
  pfNo: string;
  aadharNo: number;
  RTGSNo: string;
};

export type QualificationDetailsType = {
  _id: string;
  ssc: {
    board: string;
    yearOfPassing: number;
    percentage: number;
  };
  inter: {
    board: string;
    yearOfPassing: number;
    percentage: number;
  };
  degree: {
    qualification: string;
    branch: string;
    yearOfPassing: number;
    percentage: number;
    remarks: string;
  };
  pg: [
    {
      qualification: string;
      specification: string;
      yearOfPassing: number;
      percentage: number;
      remarks: string;
      grade: string;
    }
  ];
  other: [
    {
      qualification: string;
      specification: string;
      yearOfPassing: number;
      percentage: number;
      remarks: string;
      grade: string;
    }
  ];
};

export type ExperienceType = {
  institute: string;
  type: string;
  from: string;
  to: string;
  designation: string;
  subjects: Array<string>;
  salary: number;
};

export type FamilyType = {
  memberName: string;
  relation: string;
  dob: string;
  age: Number;
  aadharNo: Number;
  insuranceName: string;
  insuranceNo: string;
};
