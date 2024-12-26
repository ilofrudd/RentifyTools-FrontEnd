export enum CHANGE_ADVERT_FORM_NAMES {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  STATUS = 'status',
  IMAGE_URLS = 'imageUrls',
  PRICE = 'price',
}

export interface ChangeAdvertFormProps {
  onChange?: () => void
}
