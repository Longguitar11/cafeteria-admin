import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1, 'Vui lòng nhập tên món!'),
  });
  
  export type CategoryForm = z.infer<typeof CategorySchema>;