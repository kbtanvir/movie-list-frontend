export interface ChangePasswordDto {
  email?: string;
  token?: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ReqChangePasswordDTO {
  email: string;
}
