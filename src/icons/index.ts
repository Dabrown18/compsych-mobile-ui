import { AtomIcon } from './AtomIcon';
import { BinocularsIcon } from './BinocularsIcon';
import { FileChartColumnIncreasingIcon } from './FileChartColumnIncreasingIcon';
import { FlagIcon } from './FlagIcon';
import { GlobeIcon } from './GlobeIcon';
import { GraduationCapIcon } from './GraduationCapIcon';
import { HandHeartIcon } from './HandHeartIcon';
import { HandshakeIcon } from './HandshakeIcon';
import { HazeIcon } from './HazeIcon';
import { HeartHandshakeIcon } from './HeartHandshakeIcon';
import { HourglassIcon } from './HourglassIcon';
import { IdCardIcon } from './IdCardIcon';
import { MessageCirclePlusIcon } from './MessageCirclePlusIcon';
import { MountainSnowIcon } from './MountainSnowIcon';
import { SnowflakeIcon } from './SnowflakeIcon';
import { StethoscopeIcon } from './StethoscopeIcon';
import { UserRoundIcon } from './UserRoundIcon';
import { WheatIcon } from './WheatIcon';
import type { IconName, IconProps } from './types';

export type { IconProps, IconSize, IconName } from './types';

export { UserRoundIcon } from './UserRoundIcon';
export { GlobeIcon } from './GlobeIcon';
export { HandshakeIcon } from './HandshakeIcon';
export { HeartHandshakeIcon } from './HeartHandshakeIcon';
export { AtomIcon } from './AtomIcon';
export { HazeIcon } from './HazeIcon';
export { HourglassIcon } from './HourglassIcon';
export { GraduationCapIcon } from './GraduationCapIcon';
export { HandHeartIcon } from './HandHeartIcon';
export { IdCardIcon } from './IdCardIcon';
export { MessageCirclePlusIcon } from './MessageCirclePlusIcon';
export { StethoscopeIcon } from './StethoscopeIcon';
export { BinocularsIcon } from './BinocularsIcon';
export { FlagIcon } from './FlagIcon';
export { MountainSnowIcon } from './MountainSnowIcon';
export { SnowflakeIcon } from './SnowflakeIcon';
export { FileChartColumnIncreasingIcon } from './FileChartColumnIncreasingIcon';
export { WheatIcon } from './WheatIcon';

type IconComponent = (props: IconProps) => React.JSX.Element;

export const ICON_MAP: Record<IconName, IconComponent> = {
  UserRoundIcon,
  GlobeIcon,
  HandshakeIcon,
  HeartHandshakeIcon,
  AtomIcon,
  HazeIcon,
  HourglassIcon,
  GraduationCapIcon,
  HandHeartIcon,
  IdCardIcon,
  MessageCirclePlusIcon,
  StethoscopeIcon,
  BinocularsIcon,
  FlagIcon,
  MountainSnowIcon,
  SnowflakeIcon,
  FileChartColumnIncreasingIcon,
  WheatIcon,
};
