import profileAPI from "@/api/profileApi";
import { useAppDispatch } from "@/app/store";
import Dialog from "@/components/dialog";
import { ChatOptionIcon, CupIcon, KissFaceIcon } from "@/components/icons";
import { updateProfileUser } from "@/reducers/userSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import styles from "./why-here.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
}

const WhyOptions = [
  {
    id: 1,
    label: "Muốn hẹn hò",
    value: "DATE",
    sub: "Tôi muốn tìm mấy em/anh ghệ.",
    Icon: <KissFaceIcon />,
  },
  {
    id: 2,
    label: "Muốn tâm sự",
    value: "CHAT",
    sub: "Tìm một người để trò chuyện.",
    Icon: <ChatOptionIcon />,
  },
  {
    id: 3,
    label: "Kết bạn bốn phương",
    value: "FRIEND",
    sub: "Tôi muốn kết thật nhiều bạn.",
    Icon: <CupIcon />,
  },
];

export default function WhyDialog({ isOpen, onClose, reason }: Props) {
  const [value, setValue] = useState<string>(reason || "");

  const dispatch = useAppDispatch();

  const handleChangeOption = ({ target: { value } }: RadioChangeEvent) => {
    const updatedFields = {
      reason: value,
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

  useEffect(() => {
    setValue(reason);
  }, [reason]);

  return (
    <>
      <Dialog
        title="Cho mọi người biết lý do bạn ở đây?"
        isOpen={isOpen}
        onClose={onClose}
      >
        <p className={styles.subDialog}>
          Chúng tôi sẽ chia sẻ điều này trên hồ sơ của bạn. Bạn có thể thay đổi
          bất kỳ lúc nào
        </p>
        <Radio.Group className="w-full" defaultValue={value}>
          {WhyOptions.map((item) => (
            <div key={item.id} className={styles.container}>
              <div className={styles.container__content}>
                <div>{item.Icon}</div>
                <div className={styles.container__content__title}>
                  <span className={styles.container__content__title__name}>
                    {item.label}
                  </span>
                  <span className={styles.container__content__title__sub}>
                    {item.sub}
                  </span>
                </div>
              </div>
              <Radio
                key={item.id}
                onChange={handleChangeOption}
                value={item.value}
                defaultChecked={item.value === value}
              ></Radio>
            </div>
          ))}
        </Radio.Group>
      </Dialog>
    </>
  );
}
