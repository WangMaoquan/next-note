import { useFormStatus } from 'react-dom';
import Image from 'next/image';

interface DeleteButtonProps {
  isDraft: boolean;
  formAction: (formData: FormData) => void;
}

// useFormStatus 用于在提交表单时显示待处理状态

export default function DeleteButton({
  isDraft,
  formAction,
}: DeleteButtonProps) {
  //使用 useFormStatus 的时候，建议将按钮抽离成单独的组件，在组件中使用 useFormStatus
  const { pending } = useFormStatus();
  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <Image
          src="/cross.svg"
          width="10"
          height="10"
          alt=""
          role="presentation"
        />
        Delete
      </button>
    )
  );
}
