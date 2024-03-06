import { useFormStatus } from 'react-dom';
import Image from 'next/image';

interface EditButtonProps {
  formAction: (formData: FormData) => void;
}

// useFormState 用于根据 form action 的结果更新表单状态

export default function EditButton({ formAction }: EditButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <Image
        src="/checkmark.svg"
        width="14"
        height="10"
        alt=""
        role="presentation"
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  );
}
