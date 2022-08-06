export interface ChangePasswordDto {
  uid: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
