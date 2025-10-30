import { useBlocker } from 'react-router-dom';
import type { TodoFormModalProps } from '../../type/todo';
import { useEffect, useRef, useState } from 'react';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../../stores/useAuthStore';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

const TodoFormModal: React.FC<TodoFormModalProps> = ({
  initialData,
  onSubmitApi,
  onSuccess,
}) => {
  const { user } = useAuthStore();
  const priorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'HIGHEST', 'URGENT']);
  const statusEnum = z.enum([
    'TODO',
    'IN_PROGRESS',
    'IN_REVIEW',
    'IN_DEPLOYMENT',
    'IN_TESTING',
    'DONE',
  ]);
  const schema = z
    .object({
      name: z.string().min(1, 'name is required'),
      description: z.string().min(1, 'desription is required'),
      assignee: z.string(),
      startDate: z.string().min(1, 'Start Date is required'),
      endDate: z.string().min(1, 'End Date is required'),
      priority: priorityEnum,
      status: statusEnum,
    })
    .refine(data => new Date(data.endDate) > new Date(data.startDate), {
      message: 'End date must be after start date',
      path: ['endDate'],
    });
  type TodoForm = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<TodoForm>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          startDate: initialData.startDate.split('T')[0],
          endDate: initialData.endDate.split('T')[0],
          status: initialData.status as TodoForm['status'],
          priority: initialData.priority as TodoForm['priority'],
          description: initialData.description,
          assignee: initialData.assignee ?? '',
        }
      : {
          assignee: user?.username,
        },
  });
  const dialogRef = useRef<HTMLDialogElement>(null);

  const blockDilogRef = useRef<HTMLDialogElement>(null);

  const [allowNavigation, setAllowNavigation] = useState(false);

  const blocker = useBlocker(isDirty && !allowNavigation);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  useEffect(() => {
    const blockDialog = blockDilogRef.current;
    if (!blockDialog) return;
    if (blocker.state === 'blocked' && !blockDialog.open) {
      blockDialog.showModal();
    }
    if (blocker.state === 'unblocked' && blockDialog.open) {
      blockDialog.close();
    }
  }, [blocker.state]);

  const handleBlockerProcess = () => {
    blockDilogRef.current?.close();
    blocker.proceed?.();
  };

  const handleBlockerReset = () => {
    blockDilogRef.current?.close();
    blocker.reset?.();
  };

  const handelOffModal = () => {
    onSuccess();
  };

  const internalOnSubmit: SubmitHandler<TodoForm> = async data => {
    try {
      const {
        startDate: startDatePost,
        endDate: endDatePost,
        ...dataToApi
      } = data;
      const now = new Date();
      const timeStr = now.toISOString().split('T')[1];
      const startDate = `${startDatePost}T${timeStr}`;
      const endDate = `${endDatePost}T${timeStr}`;
      const dataPost = { ...dataToApi, startDate, endDate };
      onSubmitApi(dataPost);
      setAllowNavigation(true);
      toast.success(
        initialData ? 'Update successfully!' : 'Add todo successfully!',
      );
      setTimeout(() => onSuccess(), 0);
    } catch (error) {
      console.error('Submit failed', error);
      toast.error(initialData ? 'Update failed!' : 'Add todo failed!');
    }
  };
  return (
    <>
      <dialog
        ref={dialogRef}
        onCancel={e => {
          e.preventDefault();
          handelOffModal();
        }}
        onClick={e => {
          if (e.target === dialogRef.current) {
            handelOffModal();
          }
        }}
        className="m-auto flex max-h-9/12 w-4/5 flex-col justify-center rounded-md bg-white shadow-xl backdrop:bg-black/50 md:w-lg 2xl:max-h-full"
      >
        <div className="flex w-full justify-end">
          <button
            onClick={() => {
              handelOffModal();
            }}
            className="p-2 hover:cursor-pointer hover:text-red-500"
          >
            <TiDeleteOutline className="text-3xl" />
          </button>
        </div>
        <div className="flex w-full justify-center">
          <h1>{initialData ? 'Update Todo' : 'Add New Todo'}</h1>
        </div>
        <form
          onSubmit={handleSubmit(internalOnSubmit)}
          className="flex w-full flex-col gap-3 overflow-y-auto p-8"
        >
          <label htmlFor="name" className="flex flex-col gap-2">
            Name
            <input
              id="name"
              type="text"
              {...register('name')}
              className="rounded-full border border-black p-2 pl-5"
              placeholder="enter name"
              autoComplete="name"
            />
            <div className="h-2 text-red-500">{errors.name?.message}</div>
          </label>
          <label htmlFor="startDate" className="flex flex-col gap-2">
            Start Date
            <input
              id="startDate"
              type="date"
              {...register('startDate')}
              className="rounded-full border border-black p-2 pl-5"
            />
            <div className="h-2 text-red-500">{errors.startDate?.message}</div>
          </label>
          <label htmlFor="endDate" className="flex flex-col gap-2">
            End Date
            <input
              id="endDate"
              type="date"
              {...register('endDate')}
              className="rounded-full border border-black p-2 pl-5"
            />
            <div className="h-2 text-red-500">{errors.endDate?.message}</div>
          </label>
          <label htmlFor="status" className="flex flex-col gap-2">
            Status
            <select
              id="status"
              {...register('status')}
              className="rounded-full border border-black p-2 pl-5 text-2xl"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="IN_DEPLOYMENT">In Deploy</option>
              <option value="IN_TESTING">In Testing</option>
              <option value="DONE">Done</option>
            </select>
            <div className="h-2 text-red-500">{errors.status?.message}</div>
          </label>
          <label htmlFor="priority" className="flex flex-col gap-2">
            Priority
            <select
              id="priority"
              {...register('priority')}
              className="rounded-full border border-black p-2 pl-5"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="HIGHEST">Highest</option>
              <option value="URGENT">Urgent</option>
            </select>
            <div className="h-2 text-red-500">{errors.priority?.message}</div>
          </label>
          <label htmlFor="description" className="flex flex-col gap-2">
            Descriptions
            <textarea
              id="description"
              {...register('description')}
              className="hide-scrollbar rounded-full border border-black p-2 pl-5"
              placeholder="enter desciption"
            />
            <div className="h-2 text-red-500">
              {errors.description?.message}
            </div>
          </label>
          <label htmlFor="assignee" className="flex flex-col gap-2">
            Add by
            <input
              id="assignee"
              type="text"
              {...register('assignee')}
              className="rounded-full border border-black p-2 pl-5"
              readOnly
            />
          </label>
          <button
            disabled={isSubmitting}
            className="rounded-full border bg-cyan-400 px-4 py-2 text-white transition-colors duration-200 hover:bg-cyan-600"
          >
            {isSubmitting
              ? 'Loading...'
              : initialData
                ? 'Update'
                : 'Add New Todo'}
          </button>
        </form>
      </dialog>
      <dialog
        ref={blockDilogRef}
        className="m-auto w-full max-w-sm rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
      >
        <p>You have unchanged saved. Do you want to leave?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => {
              handleBlockerProcess();
            }}
            className="rounded-full border bg-red-500 px-4 py-2 text-white"
          >
            Leave
          </button>
          <button
            onClick={() => {
              handleBlockerReset();
            }}
            className="rounded-full border border-gray-300 bg-gray-300 p-2"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};

export default TodoFormModal;
