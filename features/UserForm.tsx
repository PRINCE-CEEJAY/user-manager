'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export default function UserForm() {
  const userSchema = z.object({
    name: z
      .string()
      .min(5, 'Name must be longer than 5 chracters')
      .max(30, 'Name too long'),
    email: z.email('Invalid Email format').min(8, 'Email Too Short '),
    password: z.string().min(8, 'Password too short'),
    role: z
      .string()
      .max(20, 'Role is too too long')
      .min(5, 'Role is too Short'),
    salary: z
      .string()
      .min(3, 'Salary must be at least 3 digits')
      .max(12, 'Salary too big, Are you Dangote 😊'),
    bio: z.string().min(50, 'Bio is too short'),
  });

  type FormData = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: FormData) => {
    // TODO: implement submission
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='container'
    >
      <h1 className='fancy-text'>Create User below</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <div className='flex flex-col'>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            {...register('name')}
          />
          {errors.name && <p className='error'>{errors.name.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            {...register('email')}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            {...register('password')}
          />
          {errors.password && (
            <p className='error'> {errors.password.message}</p>
          )}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='role'>Role:</label>
          <input
            id='role'
            type='text'
            {...register('role')}
          />
          {errors.role && <p className='error'>{errors.role.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='bio'>Bio:</label>
          <textarea {...register('bio')}></textarea>
          {errors.bio && <p className='error'>{errors.bio.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='salary'>Salary:</label>
          <input
            id='salary'
            type='text'
            {...register('salary')}
          />
          {errors.salary && <p className='error'>{errors.salary.message}</p>}
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
}
