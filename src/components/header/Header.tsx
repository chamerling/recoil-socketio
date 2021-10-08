import { useRecoilValue } from "recoil";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ChannelsSelector } from "../../recoil/Channels";
import Channel from "./Channel";

const Header = () => {
  const channels = useRecoilValue(ChannelsSelector);

  return (
    <div id="channels">
      <ButtonGroup size="small" aria-label="small button group">
        { channels.map((channel, index) => <Channel key={index} channel={channel}/> ) }
      </ButtonGroup>
    </div>
  );
};

export default Header;