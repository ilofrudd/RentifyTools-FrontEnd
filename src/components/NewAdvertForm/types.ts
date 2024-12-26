export enum NEWADVERT_FORM_NAMES {
  TITLE = 'title',
  DESCRIPTION = 'description',
  STATUS = 'status',
  IMAGE_URLS = 'imageUrls',
  PRICE = 'price',
  CATEGORY_IDS = 'categoryIds',
}

export interface AdvertFormProps {
  onCreate?: () => void
  isProductsPage?: boolean
}

export interface ImagePreviewListProps {
  images: (string | File)[]
  onRemove: (index: number) => void
}
