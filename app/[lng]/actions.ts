'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { State } from 'types/EditState';

/**
 *
 * 有两种方法可以让路由缓存失效：
 * 在 Server Action 中
 * 通过 revalidatePath 或 revalidateTag 重新验证数据
 * 使用 cookies.set 或者 cookies.delete 会使路由缓存失效
 * 调用 router.refresh 会使路由缓存失效并发起一个重新获取当前路由的请求
 *
 * 所以在进行数据处理的时候，一定要记得重新验证数据，也就是 `revalidatePath` 和 `revalidateTag`
 */

export async function saveNote(prevState: State, formData: FormData) {
  const noteId = formData.get('noteId') as string;
  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  });
  let message = '';
  if (noteId) {
    updateNote(noteId, data);
    message = 'Edit';
    // 需要清除缓存
    revalidatePath('/', 'layout');
  } else {
    await addNote(data);
    message = 'Add';
    revalidatePath('/', 'layout');
  }
  return { message: `${message} Success!` };
}

const deleteNote = async (prevState: State, formData: FormData) => {
  delNote(formData.get('noteId') as string);
  revalidatePath('/', 'layout');
  redirect('/');
};

export { deleteNote };