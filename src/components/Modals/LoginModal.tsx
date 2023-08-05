"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
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

const LoginModal = () => {
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
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (response?.status === StatusCodes.UNAUTHORIZED) {
        throw new Error("Invalid Email or Password");
      } else if (response?.status !== StatusCodes.OK) {
        throw new Error("Something went wrong");
      }
    },
    onSuccess: async () => {
      loginModal.onClose();
      router.refresh();
      return reset();
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    mutate(values);
  };

  const body = (
    <div className="flex flex-col gap-5">
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
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
          <div>Github</div>
        </Button>
      </div>
      <div className="p-8 text-center font-light text-zinc-300">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Don&apos;t have an account?</div>
          <div
            className="cursor-pointer font-medium text-zinc-400 hover:underline"
            onClick={toggle}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      isLoading={isLoading}
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footerContent}
    />
  );
};

export default LoginModal;
