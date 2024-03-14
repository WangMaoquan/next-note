'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { State } from 'types/EditState';
import { stat, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import mime from 'mime';
import dayjs from 'dayjs';

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

export async function importNote(formData: FormData) {
  const file = formData.get('file') as File;
  // 空值判断
  if (!file) {
    return { error: 'File is required.' };
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`;
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return { error: 'Something went wrong.' };
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, '');
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type,
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString('utf-8'),
      }),
    );

    // 清除缓存
    revalidatePath('/', 'layout');

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res };
  } catch (e) {
    console.error(e);
    return { error: 'Something went wrong.' };
  }
}

export { deleteNote };
