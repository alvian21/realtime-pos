'use server';

import { deleteFile, uploadFile } from '@/actions/storage-actions';
import { createClient } from '@/lib/supabase/server';
import { MenuFormState } from '@/types/menu';
import { TableFormState } from '@/types/table.t';
import { menuSchema } from '@/validations/menu-validation';
import { tableSchema } from '@/validations/table-validation';


export async function createTable(prevState: TableFormState, formData: FormData) {
  let validatedFields = tableSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    capacity: parseInt(formData.get('capacity') as string),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('tables').insert({
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    capacity: validatedFields.data.capacity,
    status: validatedFields.data.status,
  });

  if (error) {
    return {
      status: 'error',
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: 'success',
  };
}


export async function updateTable(prevState: MenuFormState, formData: FormData) {
  let validatedFields = menuSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price') as string),
    discount: parseFloat(formData.get('discount') as string),
    category: formData.get('category'),
    image_url: formData.get('image_url'),
    is_available: formData.get('is_available') === 'true' ? true : false,
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  if (validatedFields.data.image_url instanceof File) {

    const oldImageUrl = formData.get('old_image_url') as string;

    const { errors, data } = await uploadFile(
      'images',
      'menus',
      validatedFields.data.image_url,
      oldImageUrl
    );
    if (errors) {
      return {
        status: 'error',
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    validatedFields = {
      ...validatedFields,
      data: {
        ...validatedFields.data,
        image_url: data.url,
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('menus').update({
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    price: validatedFields.data.price,
    discount: validatedFields.data.discount,
    category: validatedFields.data.category,
    image_url: validatedFields.data.image_url !== "null" || validatedFields.data.image_url !== null ? validatedFields.data.image_url : null,
    is_available: validatedFields.data.is_available,
  }).eq('id', formData.get('id'));

  if (error) {
    return {
      status: 'error',
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: 'success',
  };
}


export async function deleteTable(prevState: MenuFormState, formData: FormData | null) {

    const supabase = await createClient({ isAdmin: true });

    const image = formData?.get('image_url') as string;
    const { status, errors } = await deleteFile('images', image.split('/images/')[1]);

    if (status === 'error') {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [errors?._form?.[0] ?? 'Unknown error']
            }
        }
    }

    const { error } = await supabase.from('menus').delete().eq('id', formData?.get('id'));

    if (error) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [error.message]
            }
        }
    }

    return {
        status: 'success'
    }

}