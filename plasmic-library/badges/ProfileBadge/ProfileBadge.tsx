import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import { Badge, Avatar } from "@heroui/react";
import Link from "next/link";
import styles from "./ProfileBadge.module.css";

export interface ProfileBadgeProps {
  name: string;
  className?: string;
  badgeContent?: string;
  badgeColor?: "primary" | "success" | "warning" | "danger";
  avatarUrl?: string;
  connexionLogo?: string;
  avatarRadius?: "none" | "sm" | "md" | "lg" | "full";
  isConnected?: boolean;
  showName?: boolean;
}

function ProfileBadge_(props: ProfileBadgeProps, ref: HTMLElementRefOf<"div">) {
  const {
    className,
    name,
    badgeContent = "1",
    badgeColor = "danger",
    avatarUrl = "https://i.pravatar.cc/150",
    connexionLogo = "",
    avatarRadius = "full",
    isConnected = false,
    showName = false,
  } = props;

  return (
    <div className={`${styles.profileBadge} ${className}`} ref={ref}>

      {isConnected && (
        <Badge color={badgeColor} content={badgeContent} shape="circle">
          <Avatar isBordered radius={avatarRadius} src={avatarUrl} />
        </Badge>
        )}
        {!isConnected && (
          <Link href="/login">
            <Avatar isBordered radius={avatarRadius} src={connexionLogo} />
          </Link>
        )}
        
      {showName && isConnected && (
        <div className={styles.text}>{name}</div>
      )}
    </div>
  );
}

const ProfileBadge = React.forwardRef(ProfileBadge_);
export default ProfileBadge;
