import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBlocker, useNavigate } from "react-router-dom";
import { TiDeleteOutline } from 'react-icons/ti';
import { z } from "zod";
import { useRef, useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { addNewTodoApi } from "../../api/todoApi";
import { useTodoStore } from "../../stores/useTodoStore";

const AddNewTodoModal = () => {
  const { user } = useAuthStore();
  const fetchTodo = useTodoStore((state) => state.fetchTodo);
  const navigator = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "HIGHEST", "URGENT"]);
  const statusEnum = z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "IN_DEPLOYMENT", "IN_TESTING", "DONE"])
  const schema = z.object({
    name: z.string().min(1, "name is required"),
    description: z.string().min(1, "desription is required"),
    assignee: z.string(),
    startDatePost: z.string().min(1, "Start Date is required"),
    endDatePost: z.string().min(1, "End Date is required"),
    priority: priorityEnum,
    status: statusEnum,
  })
    .refine((data) => new Date(data.endDatePost) > new Date(data.startDatePost), {
      message: "End date must be after start date",
      path: ["endDate"],
    });

  type AddTodoForm = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddTodoForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      assignee: user?.username,
    }
  })

  const dialogRef = useRef<HTMLDialogElement>(null);

  const blockDilogRef = useRef<HTMLDialogElement>(null);

  const blocker = useBlocker(isDirty);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  useEffect(() => {
    const blockDialog = blockDilogRef.current;
    if (!blockDialog) return;
    if (blocker.state === "blocked" && !blockDialog.open) {
      blockDialog.showModal();
    }
    if (blocker.state === "unblocked" && blockDialog.open) {
      blockDialog.close();
    }
  }, [blocker.state]);

  const handleBlockerProcess = () => {
    blockDilogRef.current?.close();
    blocker.proceed?.();
  }

  const handleBlockerReset = () => {
    blockDilogRef.current?.close();
    blocker.reset?.();
  }

  const handelOffModal = () => {
    navigator("/todo");
  }

  const onSubmit: SubmitHandler<AddTodoForm> = async (data) => {
    setIsDirty(false);
    try {
      const { startDatePost, endDatePost, ...dataToApi } = data;
      const now = new Date();
      const timeStr = now.toISOString().split("T")[1];
      const startDate = `${startDatePost}T${timeStr}`;
      const endDate = `${endDatePost}T${timeStr}`;
      const dataPost = { ...dataToApi, startDate, endDate }
      await addNewTodoApi(dataPost);
      fetchTodo();
      navigator("/todo")
    }
    catch (error: any) {
      console.error("Failed to add todo:", error);
      // Xử lý lỗi API (ví dụ: "Tên đã tồn tại")
      setError('root', {
        message: error.response?.data?.message || "An unexpected error occurred."
      });
    }
  }
  return (
    <>
      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault();
          handelOffModal();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            handelOffModal();
          }
        }}
        className="m-auto shadow-xl backdrop:bg-black/50 bg-white flex w-lg flex-col justify-center rounded-md"
      >
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              handelOffModal();
            }}
            className="p-2 hover:text-red-500 hover:cursor-pointer"
          >
            <TiDeleteOutline className="text-3xl" />
          </button>
        </div>
        <div className="flex justify-center w-full">
          <h1>Add New Todo</h1>
        </div>
        <form
          onChange={() => {
            setIsDirty(true)
          }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-8 w-full"
        >
          <label htmlFor="name" className="flex flex-col gap-2">
            Name
            <input
              id="name"
              type="text"
              {...register("name")}
              className="rounded-full border border-black p-2 pl-5"
              placeholder="enter name"
              autoComplete="name"
            />
            <div className="text-red-500 h-2">{errors.name?.message}</div>
          </label>
          <label htmlFor="startDate" className="flex flex-col gap-2">
            Start Date
            <input
              id="startDate"
              type="date"
              {...register("startDatePost")}
              className="rounded-full border border-black p-2 pl-5"
            />
            <div className="text-red-500 h-2">{errors.startDatePost?.message}</div>
          </label>
          <label htmlFor="endDate" className="flex flex-col gap-2">
            End Date
            <input
              id="endDate"
              type="date"
              {...register("endDatePost")}
              className="rounded-full border border-black p-2 pl-5"
            />
            <div className="text-red-500 h-2">{errors.endDatePost?.message}</div>
          </label>
          <label htmlFor="status" className="flex flex-col gap-2">
            Status
            <select
              id="status"
              {...register("status")}
              className="rounded-full border border-black p-2 pl-5 text-2xl"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="IN_DEPLOYMENT">In Deploy</option>
              <option value="IN_TESTING">In Testing</option>
              <option value="DONE">Done</option>
            </select>
            <div className="text-red-500 h-2">{errors.status?.message}</div>
          </label>
          <label htmlFor="priority" className="flex flex-col gap-2">
            Priority
            <select
              id="priority"
              {...register("priority")}
              className="rounded-full border border-black p-2 pl-5"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="HIGHEST">Highest</option>
              <option value="URGENT">Urgent</option>
            </select>
            <div className="text-red-500 h-2">{errors.priority?.message}</div>
          </label>
          <label htmlFor="description" className="flex flex-col gap-2">
            Descriptions
            <textarea
              id="description"
              {...register("description")}
              className="rounded-full border border-black p-2 pl-5 hide-scrollbar"
              placeholder="enter desciption" />
            <div className="text-red-500 h-2">{errors.description?.message}</div>
          </label>
          <label htmlFor="assignee" className="flex flex-col gap-2">
            Add by
            <input
              id="assignee"
              type="text"
              {...register("assignee")}
              className="rounded-full border border-black p-2 pl-5"
              readOnly
            />
          </label>
          <button
            disabled={isSubmitting}
            className="rounded-full border bg-cyan-400 px-4 py-2 text-white transition-colors duration-200 hover:bg-cyan-600"
          >
            {isSubmitting ? "Loading..." : "Add New Todo"}
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
  )
}

export default AddNewTodoModal;