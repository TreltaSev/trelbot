import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import user from "@lib/types/user";
import SmallLogo from "@lib/svg/SmallLogo";
import styling from "@assets/styling.module.css";
import Text from "@lib/element/Text";
import Spacer from "@lib/element/Spacer";
import NavigationMenuItem from "@lib/element/NavigationMenuItem";
import UsernameGroup from "@lib/element/UsernameGroup";
import Arrow from "@lib/svg/Arrow";
import cache_me from "@lib/method/cache@me";
import nli_transfer from "@lib/method/nli_transfer";
import loginAction from "@lib/method/loginAction";

interface NavigationTemplateProps {
  children?: ReactNode;
  classNames: string;
}

const NavigationTemplate: React.FC<NavigationTemplateProps> = ({ children, classNames }) => {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<user | undefined>(undefined);

  const DropdownToggle = () => {
    setDropdownToggled(!dropdownToggled);
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.style.transform = `rotate(${dropdownToggled ? 0 : 180}deg)`;
    }

    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.style.display = dropdownToggled ? "none" : "flex";
    }
  };

  useEffect(() => {
    nli_transfer(Cookies.get("session"));

    cache_me(setUser);

    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.style.display = "none";
    }
  }, []);

  return (
    <div style={{ overflowY: "scroll" }} className={`${styling.flex_col} ${styling.fill_height} ${styling.dark}`}>
      {/* NavBar */}
      <div style={{ height: 80, minHeight: 80, maxHeight: 80, paddingLeft: 40, paddingRight: 40 }} className={`${styling.border_box} ${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.fill_width} ${styling.dark}`}>
        {/* Top Left Corner */}
        <div style={{ gap: 16 }} className={`${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.border_box} ${styling.fill_height}`}>
          <SmallLogo />
          <Text preset='normal' style={{ fontSize: 30 }}>
            Trelbot
          </Text>
        </div>

        <Spacer />

        {/* Links */}
        <div style={{ gap: 10 }} className={`${styling.flex_row} ${styling.align_items_center} ${styling.justify_content_end} ${styling.border_box}`}>
          {/* Username Dropdown */}
          <div style={{ gap: 10, position: "relative" }} className={`${styling.flex_row} ${styling.align_items_center}`}>
            {/* Username Group */}

            {user === undefined ? (
              <></>
            ) : (
              <>
                <UsernameGroup user={user} />
                <div style={{ cursor: "pointer" }} onClick={() => DropdownToggle()} ref={dropdownButtonRef}>
                  <Arrow />
                </div>
              </>
            )}

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
                  new loginAction().setError("error", "You have been logged out", "1020", "/login");
                  window.location.href = "/login";
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styling.fill_height} ${classNames}`}>{children}</div>
    </div>
  );
};

export default NavigationTemplate;
