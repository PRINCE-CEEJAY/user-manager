import { z } from 'zod';
export default function UserForm() {
   


  const userSchema = z.object({
    name: z.string().min(5, 'name must be longer than 5 characters'),
    email: z.email().min(8),

  })

  return <form></form>;
}
