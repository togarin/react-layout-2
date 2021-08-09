import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import "../styles/PageStyles.css";

const PageContent = ({
  content: { header, short_text, full_text, image_url, full_text_btn_title },
}) => {
  return (
    <div className="Container">
      <div className="Resolution">
        <div>
          <PhoneIphoneIcon />
        </div>
        <div>
          <TabletMacIcon />
        </div>
        <div>
          <DesktopMacIcon />
        </div>
      </div>
      <div className="Header">{header}</div>
      <div className="Main">
        <div className="ImageUrl">
          {!!image_url && <img src={image_url} alt="content_image" />}
        </div>
        <div className="MainText">
          <div className="ShortText">{short_text}</div>
          <div className="FullText">{full_text}</div>
          <div className="BtnTitle">{full_text_btn_title} </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
