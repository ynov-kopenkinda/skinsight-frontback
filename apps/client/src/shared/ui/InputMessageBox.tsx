import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSend } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api/react";

interface InputMessageBoxProps {
  chatId: number;
  userId: number;
  refetch: () => void;
}

const sendMessageSchema = z.object({
  data: z.string(),
});

type SendMessageFormParameters = z.infer<typeof sendMessageSchema>;

const InputMessageBox: React.FC<InputMessageBoxProps> = ({
  chatId,
  userId,
  refetch,
}: InputMessageBoxProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const query = useQueryClient();
  const { register, handleSubmit, reset } = useForm<SendMessageFormParameters>({
    mode: "onSubmit",
    resolver: zodResolver(sendMessageSchema),
  });
  const { mutateAsync } = api.chatEvent.createChatEvent.useMutation({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleSubmit(onSubmit, console.error)();
    }
  };

  const onSubmit = async (data: SendMessageFormParameters) => {
    setIsLoading(true);
    const result = await mutateAsync({
      chatId: Number(chatId),
      userId: Number(userId),
      data: data.data,
    });
    console.log(result);
    reset();
    setIsLoading(false);
    refetch();
    void query.invalidateQueries({ queryKey: ["chat"] });
  };

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        handleSubmit(onSubmit, console.error)(e).catch(console.error);
      }}
    >
      <div className="flex">
        <div className="relative w-full">
          <input
            type="text"
            {...register("data")}
            className="rounded-s-gray-100 rounded-s-2 border-gray focus:ring-primary z-20 block w-full rounded-lg border p-3 text-base transition-all focus:outline-none focus:ring-1"
            placeholder="Type your message..."
            required
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="border-primary border-primary bg-primary absolute end-0 top-0 h-full rounded-e-lg p-3 text-sm font-medium text-white"
          >
            <IconSend size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputMessageBox;
