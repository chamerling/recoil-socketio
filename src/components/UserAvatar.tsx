import Avatar from "@mui/material/Avatar";
import Badge from '@mui/material/Badge';
import { useRecoilValue } from "recoil";
import { UserStatusSelectorFamily } from "../recoil/UserStatus";
import { User } from "../types/Message";

const UserAvatar = ({ user }: { user: User }) => {
  const isConnected = useRecoilValue(UserStatusSelectorFamily(user.id));

  return (
    <Badge
      color={isConnected ? "success" : "error"}
      badgeContent=" "
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar>{user.name[0]}</Avatar>
    </Badge>
  );
};

export default UserAvatar;