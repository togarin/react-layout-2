import { useState } from "react";
import PageContent from "./PageContent";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "../styles/MenuStyles.css";

const Page = ({ data }) => {
  const [id, setId] = useState(data[0].id);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const currentItem = data.find((item) => item.id === id);
  const content = Boolean(currentItem) && currentItem.content;

  return (
    <div>
      <div className="MuneContainer">
        <span onClick={() => setMenuVisible(true)}>
          <MenuIcon />
        </span>
        <div
          className="Menu"
          style={{
            left: isMenuVisible ? 0 : -200,
            opacity: isMenuVisible ? 1 : 0,
          }}
        >
          <span onClick={() => setMenuVisible(false)}>
            <CloseIcon />
          </span>
          <ul>
            {data.map((item) => (
              <li
                className="MenuTitle"
                onClick={() => setId(item.id)}
                key={item.id}
              >
                <div className="MenuTitleText">
                  {item.id === id ? (
                    <span>{item.menu_title}</span>
                  ) : (
                    item.menu_title
                  )}
                  {!!item.menu_subtitle && (
                    <span className="SecondTitleText">
                      {item.menu_subtitle}
                    </span>
                  )}
                </div>
                <ArrowForwardIosIcon />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {content ? <PageContent content={content} /> : <div>No content</div>}
    </div>
  );
};

export default Page;
