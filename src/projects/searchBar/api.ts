const users = [
  "Naresh",
  "Mani",
  "Govardhan",
  "Mahesh",
  "Brahma",
  "Adarsh",
  "Vinod",
  "Emmu",
  "Bhaskar",
  "Jagadish",
];

export interface GetApiResponse {
  success: boolean;
  data?: string[];
  message?: string;
}

export const getApiData = (searchVal: string): Promise<GetApiResponse> => {
  return new Promise((resolve, reject) => {
    if (searchVal) {
      setTimeout(() => {
        const filterData = users.filter((user) =>
          user.toLowerCase().includes(searchVal.toLowerCase())
        );
        if (filterData.length) {
          resolve({ data: filterData, success: true });
        } else {
          reject({ success: false, message: "No records found" });
        }
      }, 1500);
    } else {
      reject({ success: false, message: "No Input value" });
    }
  });
};
