import { CSSProperties } from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { Toaster, ToastProps } from '@class101/ui';
import { palette } from 'styles/Palette/Palette';

let AppToaster: Toaster | null = null;
const iconStyle: CSSProperties = {
  color: palette.white,
}

const showToast = async (props: ToastProps): Promise<void> => {
  if (!AppToaster) {
    AppToaster = await Toaster.create();
  }

  AppToaster.show(props);
}

class Toast {
  public static successToast(message: string): void {
    showToast({
      backgroundColor: palette.green,
      message,
      button: <MdClose style={iconStyle} />,
      icon: <BsCheckCircle style={iconStyle} />,
    });
  }
  
  public static infoToast(message: string): void {
    showToast({
      backgroundColor: palette.skyBlue,
      message,
      button: <MdClose style={iconStyle} />,
      icon: <BiErrorAlt style={iconStyle} />,
    });
  }
  
  public static errorToast(message: string): void {
    showToast({
      backgroundColor: palette.red,
      message,
      button: <MdClose style={iconStyle} />,
      icon: <BiErrorAlt style={iconStyle} />,
    });
  }
}

export default Toast;