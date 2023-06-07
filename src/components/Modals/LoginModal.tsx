"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/hooks/useLoginModal";
import { StatusCodes } from "http-status-codes";

import Modal from "./Modal";
import Input from "../Inputs/Input";
import { Button, buttonVariants } from "../Inputs/Button";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

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
      router.refresh();
      loginModal.onClose();
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
    <div className="flex flex-col mt-3">
      <div className="flex flex-row w-full gap-2">
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
      <div className="text-zinc-300 text-center font-light p-8">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Don&apos;t have an account?</div>
          <div
            className="text-zinc-400 cursor-pointer hover:underline font-medium"
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
