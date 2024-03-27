import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const DishSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên món!'),
  thumbnail: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `Kích cỡ ảnh tối đa là 5MB!`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      'Chỉ hỗ trợ những định dạng sau đây (.jpg, .jpeg, .png .webp).'
    ),
  categoryId: z.number({
    required_error: 'Vui lòng chọn loại!',
    invalid_type_error: 'Id loại phải là một chữ số!',
  }),
  price: z
    .number()
    .min(10000, 'Giá bán thấp nhất là 10.000đ!')
    .max(100000, 'Giá bán cao nhất là 100.000đ!'),
  description: z.string().min(1, 'Vui lòng nhập mô tả!'),
});

export type DishFormType = z.infer<typeof DishSchema>;
