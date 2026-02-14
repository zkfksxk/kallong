import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FiTrash2 } from 'react-icons/fi';
import { GoHome, GoHomeFill, GoPerson, GoPersonFill } from 'react-icons/go';
import { IoIosMail } from 'react-icons/io';
import {
  IoChevronBack,
  IoChevronForward,
  IoSettingsOutline,
} from 'react-icons/io5';
import { IoCloseCircle } from 'react-icons/io5';
import { IoAddOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { IoCopyOutline } from 'react-icons/io5';
import { IoGridOutline } from 'react-icons/io5';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { TbCapture } from 'react-icons/tb';

export const ICONS = {
  Home: {
    Fill: GoHomeFill,
    Outline: GoHome,
  },
  Person: {
    Fill: GoPersonFill,
    Outline: GoPerson,
  },
  Alert: {
    Check: IoCheckmarkCircle,
    Close: IoCloseCircle,
  },
  Heart: {
    Fill: IoHeartSharp,
    Outline: IoHeartOutline,
  },
  Add: IoAddOutline,
  Delete: IoClose,
  Setting: IoSettingsOutline,
  Back: IoChevronBack,
  Forward: IoChevronForward,
  Copy: IoCopyOutline,
  Grid: IoGridOutline,
  Check: IoCheckmarkCircle,
  Capture: TbCapture,
  Trash: FiTrash2,
  Mail: IoIosMail,
  RightSquare: BsFillArrowRightSquareFill,
  Google: FcGoogle,
};
