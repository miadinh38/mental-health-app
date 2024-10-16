import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

const NicknameForm = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onNicknameSubmit = (data) => {
    onSubmit(data.nickname);
  };

  return (
    <div className="p-4">
      <div className="bold-20 mb-3">Pick a nickname</div>
      <div className="regular-12 text-gray-30 mb-5">
        This nickname will be visible to other users in the TeenVent Community. <br/>
        We highly recommend using a name that differs from your real name to
        help protect your privacy. This approach allows you to express yourself
        freely and engage with others in the TeenVent Community without the
        worry of personal identification.
      </div>

        <label>
          Nickname <span className="text-red-500">*</span>
          <input
            className="border border-gray-10 rounded-md bg-transparent p-1 focus:outline-none focus:bg-transparent"
            placeholder="Type here"
            {...register("nickname", {
              required: "Nickname is required",
              minLength: {
                value: 5,
                message: "Nickname must be at least 5 characters long",
              },
            })}
            onBlur={handleSubmit(onNicknameSubmit)} // Submit on blur
          />
        </label>
        {errors.nickname && (
          <p className="flex flexStart text-red-500 regular-12">
            <MdErrorOutline className="mr-1" /> {errors.nickname.message}
          </p>
        )}
    </div>
  );
};

export default NicknameForm;
