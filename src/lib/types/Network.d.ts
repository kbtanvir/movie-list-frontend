export type NetworkResponse<D = {}> = {
  data?: D[] | D;
  status: "initial" | "success" | "error" | "loading";
  message?: string;
};
