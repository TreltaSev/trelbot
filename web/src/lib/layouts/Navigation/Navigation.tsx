import component from "@lib/types/component";
import React, { useEffect, useRef, useState } from "react";
import FlexColumn from "@lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import FlexRow from "@lib/component/FlexRow";
import Text from "@lib/component/Text";
import SmallLogo from "@lib/svg/SmallLogo";
import Spacer from "@lib/component/Spacer";
import AlternativeIf from "@lib/component/AlternativeIf";
import LoadingAnimated from "@lib/component/LoadingAnimated";
import UsernameGroup from "@lib/layouts/Navigation/UsernameGroup";
import Arrow from "@root/lib/svg/Arrow";
import NavigationMenuItem from "@lib/layouts/Navigation/NavigationMenuItem";
import Cookies from "js-cookie";
import mutgl from "@root/lib/vars/mutgl";

/**
 * A Navigation layout to be used whenever layouts are needed.
 * Contains the Navigation bar at the top of the screen and holds
 * room for childrne
 * @usedin : @any
 */
const NavigationLayout: React.FC<component> = ({ children, className }) => {
  const UsergroupDropdownRef = useRef<HTMLDivElement>(null);
  const MenuDropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const [user, setUser] = useState(undefined);

  const DropdownToggle = () => {
    setDropdownToggled(!dropdownToggled);
    if (UsergroupDropdownRef.current) {
      UsergroupDropdownRef.current.style.transform = `rotate(${dropdownToggled ? 0 : 180}deg)`;
    }

    if (MenuDropdownRef.current) {
      MenuDropdownRef.current.style.display = dropdownToggled ? "none" : "flex";
    }
  };

  /**
   * Just hide the dropdown on load
   */
  useEffect(() => {
    // Cache Data from @me
    mutgl.rc_user(false).then((v) => {
      console.log(v);
    });

    if (MenuDropdownRef.current) {
      MenuDropdownRef.current.style.display = "none";
    }
  });
  return (
    <FlexColumn style={{ overflowY: "scroll", height: "100%" }} className={`${styling.fill_height} ${styling.dark}`}>
      {/**
       * Navigation Bar
       */}
      <FlexRow style={{ height: 80, padding: "0 40px" }} className={`${styling.border_box} ${styling.justify_content_center} ${styling.align_items_center} ${styling.fill_width} ${styling.dark}`}>
        {/**
         * Top left image, contains logo and trelbot text
         */}
        <FlexRow style={{ gap: 16 }}>
          <SmallLogo />
          <Text preset='normal' style={{ fontSize: 30 }}>
            Trelbot
          </Text>
        </FlexRow>

        <Spacer />

        {/**
         * Links
         */}
        <FlexRow style={{ gap: 10 }} className={`${styling.align_items_center} ${styling.justify_content_center} ${styling.border_box}`}>
          {/**
           * Username Group
           */}
          <AlternativeIf input_value={user} to_check={undefined} alternative={<LoadingAnimated size={4} gap={2} heightoffset={3} />}>
            <FlexRow style={{ cursor: "pointer" }} onClick={() => DropdownToggle()}>
              <UsernameGroup user={user} />
              <div ref={UsergroupDropdownRef}>
                <Arrow style={{ minWidth: 14, minHeight: 14, width: 14, height: 14 }} />
              </div>
            </FlexRow>
          </AlternativeIf>

          {/**
           * Actual Menu
           */}
          <FlexColumn innerref={MenuDropdownRef} style={{ padding: "5px 20px", borderRadius: 5, gap: 10, position: "absolute", top: 22, right: 0 }} className={`${styling.justify_content_center} ${styling.darksub} ${styling.border_box}`}>
            <NavigationMenuItem name='Dashboard' href='/dashboard' />
            <NavigationMenuItem
              name='Logout'
              method={() => {
                Cookies.remove("session");
                window.location.href = "/login";
              }}
            />
          </FlexColumn>
        </FlexRow>
      </FlexRow>
      <div className={`${styling.fill_height} ${className}`}>{children}</div>
    </FlexColumn>
  );
};

export default NavigationLayout;
