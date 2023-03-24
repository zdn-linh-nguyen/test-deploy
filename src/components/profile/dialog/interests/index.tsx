import profileAPI from "@/api/profileApi";
import { useAppDispatch } from "@/app/store";
import Button from "@/components/button/button";
import Dialog from "@/components/dialog";
import InputField from "@/components/forms/inputField/inputField";
import { updateProfileUser } from "@/reducers/userSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import styles from "./interests.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  interests: string[];
}

interface IFormData {
  interest: string;
}

export default function InterestsDiaLog({ isOpen, onClose, interests }: Props) {
  const [interest, setInterest] = useState<string[]>(interests || []);
  const [loading, setLoading] = useState(false);

  if (!interest) {
    setInterest([]);
  }

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({});

  const handleRemove = (i: number) => () => {
    const newInterests = [...interest];

    try {
      newInterests.splice(i, 1);
      profileAPI.updateProfile({ interests: newInterests });
      dispatch(updateProfileUser({ interests: newInterests }));
      setInterest(newInterests);

      toastSuccess("Cập nhật thông tin thành công!");
    } catch (err) {
      toastError("Cập nhật thông tin thất bại!");
    }
  };

  const submitHandle = async (data: IFormData) => {
    const newInterests = [...interest];

    try {
      newInterests.push(data.interest);
      profileAPI.updateProfile({ interests: newInterests });
      dispatch(updateProfileUser({ interests: newInterests }));
      setInterest(newInterests);
      reset();

      toastSuccess("Cập nhật thông tin thành công!");
    } catch (err) {
      toastError("Cập nhật thông tin thất bại!");
    }
  };

  const bg = [
    "#FFF0F0",
    "#EDF7FF",
    "#FFF5ED",
    "#E9FBF1",
    "#F3D6D6",
    "#F9EDFF",
    "#FFEDF6",
    "#EDDEFF",
    "#E4DAE4",
    "#FFDEFC",
  ];

  useEffect(() => {
    setInterest(interests);
  }, [interests]);

  return (
    <>
      <Dialog title="Sở thích" isOpen={isOpen} onClose={onClose}>
        <div className={styles.container}>
          {interest?.length ? (
            <div className={styles.container__have}>
              {interest.map((item, i) => {
                const random = Math.floor(Math.random() * 10);
                const randomBg = `${bg[random]}`;
                return (
                  <button
                    key={i}
                    style={{
                      backgroundColor: randomBg,
                    }}
                    className={styles.container__have__btn}
                    onClick={handleRemove(i)}
                  >
                    {item}
                    <IoMdClose />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className={styles.container__empty}>Trống</p>
          )}
        </div>
        <form className={styles.form} onSubmit={handleSubmit(submitHandle)}>
          <InputField
            label="Thêm sở thích"
            placeholder="Nhập sở thích"
            type="text"
            name="interest"
            register={register}
            option={{
              required: {
                value: true,
                message: "Vui lòng nhập sở thích",
              },
            }}
            error={errors.interest?.message}
          />
          <Button
            htmlType={"submit"}
            block
            title="Thêm"
            type="secondary"
            className={styles.form__btn}
          />
        </form>
      </Dialog>
    </>
  );
}
