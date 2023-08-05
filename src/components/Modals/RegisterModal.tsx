"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import { Button, buttonVariants } from "../Inputs/Button";
import Input from "../Inputs/Input";
import Modal from "./Modal";

const RegisterModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [registerModal, loginModal]);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data: FieldValues) => {
      await axios.post("/api/register", data);
    },
    onSuccess: async () => {
      toggle();
      router.refresh();
      return reset();
    },
    onError: (error: AxiosError) => {
      let errorMessage: string = "Something went wrong";
      if (error?.response?.status === StatusCodes.CONFLICT) {
        errorMessage = "The user with this email already exists.";
      }
      toast.error(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    mutate(values);
  };

  const body = (
    <div className="flex flex-col gap-5">
      <Input
        id="name"
        label="Name"
        type="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        minLength={6}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        minLength={6}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col">
      <div className="flex w-full flex-row gap-2">
        <Button
          icon={FcGoogle}
          onClick={() => signIn("google")}
          className={buttonVariants({
            variant: "outline",
            className: "w-full p-7 text-lg",
          })}
        >
          Google
        </Button>
        <Button
          icon={AiFillGithub}
          onClick={() => signIn("github")}
          className={buttonVariants({
            variant: "outline",
            className: "w-full p-7 text-lg",
          })}
        >
          Github
        </Button>
      </div>
      <div className="p-8 text-center font-light text-zinc-300">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer font-medium text-zinc-400 hover:underline"
            onClick={toggle}
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      body={body}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
