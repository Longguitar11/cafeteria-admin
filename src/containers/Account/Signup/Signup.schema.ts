import { z } from 'zod';

const phoneRegex = new RegExp(
  /^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/
);

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const SignupSchema = z
  .object({
    email: z.string().email('Vui lòng nhập đúng định dạng email!'),
    contactNumber: z
      .string()
      .min(10, 'SĐT phải chứa 10 số!')
      .max(10, 'SĐT phải chứa 10 số!')
      .superRefine((val, ctx) => {
        if (!phoneRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Sai định dạng số điện thoại!',
          });
        }
      }),
    name: z
      .string()
      .min(4, { message: 'Tên phải có ít nhất 4 ký tự!' })
      .max(20, 'Độ dài tên tối đa là 20!'),
    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(20, 'Độ dài mật khẩu tối đa là 20!')
      .regex(passwordValidation, {
        message:
          'Mật khẩu phải bao gồm 1 ký tự hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt!',
      }),
    confirm: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(20, 'Độ dài mật khẩu tối đa là 20!'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Mật khẩu không trùng khớp với nhau!',
    path: ['confirm'],
  });

// SignupSchema.parse({phoneNumber: '0396714802'})

export type SignupForm = z.infer<typeof SignupSchema>;
