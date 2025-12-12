import { GoHome, GoHomeFill, GoPerson, GoPersonFill } from 'react-icons/go';
import { IoChevronBack, IoSettingsOutline } from 'react-icons/io5';
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
  Copy: IoCopyOutline,
  Grid: IoGridOutline,
  Check: IoCheckmarkCircle,
  Capture: TbCapture,
};
