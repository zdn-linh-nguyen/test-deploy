import profileAPI from "@/api/profileApi";
import { useAppDispatch } from "@/app/store";
import Button from "@/components/button/button";
import Dialog from "@/components/dialog";
import { updateProfileUser } from "@/reducers/userSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import { useState } from "react";
import styles from "./bio.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bio: string;
}

export default function BioDialog({ isOpen, onClose, bio }: Props) {
  const [value, setValue] = useState<string>(bio || "");
  const dispatch = useAppDispatch();

  const handleUpdateBio = () => {
    const updatedFields = {
      description: value,
    };

    try {
      profileAPI.updateProfile(updatedFields);
      dispatch(updateProfileUser(updatedFields));
      onClose();

      toastSuccess("Cập nhật thông tin thành công!");
    } catch (err) {
      toastError("Cập nhật thông tin thất bại!");
    }
  };

  return (
    <>
      <Dialog title="Giới thiệu bản thân" isOpen={isOpen} onClose={onClose}>
        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="Ví dụ: Quan trọng là important"
          maxLength={1000}
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <Button
          block
          title="Lưu"
          type="secondary"
          className={styles.btn}
          onClick={handleUpdateBio}
        />
      </Dialog>
    </>
  );
}
