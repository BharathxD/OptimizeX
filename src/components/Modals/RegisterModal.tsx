"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StatusCodes } from "http-status-codes";

import Modal from "./Modal";
import Input from "../Inputs/Input";
import { Button, buttonVariants } from "../Inputs/Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

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
          <div>Already have an account?</div>
          <div
            className="text-zinc-400 cursor-pointer hover:underline font-medium"
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
