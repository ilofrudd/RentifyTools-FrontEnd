export enum FINDUSER_FORM_NAMES {
  LAST_NAME = 'lastname',
  PHONE = 'phone',
  EMAIL = 'email',
}

export interface FindUsersProps {
  onSearch: () => void
}
