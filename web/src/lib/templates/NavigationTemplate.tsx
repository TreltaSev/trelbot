import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import loginError from "@lib/method/loginError";
import orderedGet from "@lib/method/orderedGet";
import me from "@lib/types/me";
import SmallLogo from "@lib/svg/SmallLogo";
import styling from "@assets/styling.module.css";
import { MeContext } from "@components/Global";
import Text from "@lib/element/Text";
import Spacer from "@lib/element/Spacer";
import NavigationMenuItem from "@lib/element/NavigationMenuItem";
import UsernameGroup from "@lib/element/UsernameGroup";

interface NavigationTemplateProps {
  children?: ReactNode;
  classNames: string;
}

const NavigationTemplate: React.FC<NavigationTemplateProps> = ({ children, classNames }) => {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const [me, setMe] = useState<me>({
    attempted: false,
  });

  const DropdownToggle = () => {
    setDropdownToggled(!dropdownToggled);
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.style.display = dropdownToggled ? "none" : "flex";
    }
  };

  useEffect(() => {
    let session = Cookies.get("session");
    if (session === undefined) {
      loginError("error", "NLI", "1020", "/login");
      return;
    }

    orderedGet(setMe);

    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.style.display = "none";
    }
  }, []);

  return (
    <MeContext.Provider value={me}>
      <div style={{ overflowY: "scroll" }} className={`${styling.flex_col} ${styling.fill_height} ${styling.dark}`}>
        {/* NavBar */}
        <div
          style={{ height: 80, minHeight: 80, maxHeight: 80, paddingLeft: 40, paddingRight: 40 }}
          className={`${styling.border_box} ${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.fill_width} ${styling.dark}`}>
          {/* Top Left Corner */}
          <div style={{ gap: 16 }} className={`${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.border_box} ${styling.fill_height}`}>
            <SmallLogo />
            <Text size={30}>Trelbot</Text>
          </div>

          <Spacer />

          {/* Links */}
          <div style={{ gap: 10 }} className={`${styling.flex_row} ${styling.align_items_center} ${styling.justify_content_end} ${styling.border_box}`}>
            {/* Username Dropdown */}
            <div style={{ gap: 10, position: "relative" }} className={`${styling.flex_row} ${styling.align_items_center}`}>
              {/* Username Group */}
              <UsernameGroup me={me} />
              {me.user === undefined ? <></> : <div onClick={() => DropdownToggle()} style={{ width: 14, height: 14 }} ref={dropdownButtonRef} className={`${styling.main}`} />}

              {/* Actual Menu */}
              <div
                ref={dropdownMenuRef}
                style={{
                  padding: "5px 20px",
                  borderRadius: 5,
                  gap: 10,
                  position: "absolute",
                  top: 22,
                  right: 0,
                }}
                className={`${styling.flex_col} ${styling.justify_content_center} ${styling.darksub} ${styling.border_box}`}>
                <NavigationMenuItem name='Dashboard' href='/dashboard' />
                <NavigationMenuItem
                  name='Logout'
                  method={() => {
                    Cookies.remove("session");
                    localStorage.setItem("login_action?", "error");
                    localStorage.setItem("login_error_message?", "You have been logged out");
                    localStorage.setItem("login_error_code?", "1020");
                    window.location.href = "/login";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styling.fill_height} ${classNames}`}>{children}</div>
      </div>
    </MeContext.Provider>
  );
};

export default NavigationTemplate;
