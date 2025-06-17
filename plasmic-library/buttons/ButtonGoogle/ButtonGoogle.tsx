import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createClient } from '@supabase/supabase-js';
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Image from "next/image";

interface ButtonActions {
    click: () => void;
}

interface ButtonProps {
    label?: string;
    icon?: "none" | "left" | "right";
    destructive?: boolean;
    hierarchy?: "primary" | "secondary" | "tertiary";
    size?: "small" | "medium" | "large";
    state?: "default" | "hover" | "active" | "disabled";
    disabled?: boolean;
    iconImage?: string;
    className?: string;
    redirectTo?: string;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const AuthButton = forwardRef<ButtonActions, ButtonProps>(
    (
        {
            label = "Button",
            icon = "none",
            destructive = false,
            hierarchy = "primary",
            size = "large",
            state = "default",
            disabled,
            iconImage,
            className,
            redirectTo = "",
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        useImperativeHandle(ref, () => ({
            click() {
                buttonRef.current?.click();
            },
        }));

        const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            try {
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `${window.location.origin}/${redirectTo}`,
                        queryParams: {
                            access_type: 'offline',
                            prompt: 'consent',
                        },
                    },
                });

                if (error) {
                    console.error("Login error:", error.message);
                } else {
                    console.log("Login successful:", data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        const variants = cva(
            "flex items-center justify-center gap-3 rounded transition-all outline-none group",
            {
                variants: {
                    destructive: {
                        true: "bg-red-500 text-white",
                        false: "bg-blue-500 text-white",
                    },
                    hierarchy: {
                        primary: "bg-blue-500 text-white",
                        secondary: "bg-gray-300 text-black",
                        tertiary: "bg-transparent text-blue-500",
                    },
                    size: {
                        small: "py-2 px-4 text-sm",
                        medium: "py-2.5 px-5 text-base",
                        large: "py-3 px-6 text-lg",
                    },
                    state: {
                        default: "",
                        hover: "hover:opacity-90",
                        active: "active:opacity-80",
                        disabled: "opacity-50 cursor-not-allowed",
                    },
                },
                compoundVariants: [
                    {
                        destructive: true,
                        hierarchy: "primary",
                        className: "bg-red-500 text-white",
                    },
                    {
                        destructive: false,
                        hierarchy: "secondary",
                        className: "bg-gray-300 text-black",
                    },
                ],
            }
        );

        return (
            <button
                ref={buttonRef}
                onClick={handleClick}
                disabled={disabled || state === "disabled"}
                className={cn(variants({ destructive, hierarchy, size, state }), className)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: size === "small" ? "8px 16px" : size === "medium" ? "12px 24px" : "16px 32px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: disabled || state === "disabled" ? "not-allowed" : "pointer",
                    opacity: disabled || state === "disabled" ? 0.5 : 1,
                    backgroundColor: destructive 
                        ? "#DC2626" 
                        : hierarchy === "primary" 
                            ? "#2563EB" 
                            : hierarchy === "secondary" 
                                ? "#E5E7EB" 
                                : "transparent",
                    color: destructive 
                        ? "white" 
                        : hierarchy === "primary" 
                            ? "white" 
                            : hierarchy === "secondary" 
                                ? "#374151" 
                                : "#2563EB",
                    fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : "18px",
                    fontWeight: "500",
                    transition: "all 0.2s ease-in-out",
                    ...(state === "hover" && {
                        backgroundColor: destructive 
                            ? "#B91C1C" 
                            : hierarchy === "primary" 
                                ? "#1D4ED8" 
                                : hierarchy === "secondary" 
                                    ? "#D1D5DB" 
                                    : "#EFF6FF",
                    }),
                    ...(state === "active" && {
                        backgroundColor: destructive 
                            ? "#991B1B" 
                            : hierarchy === "primary" 
                                ? "#1E40AF" 
                                : hierarchy === "secondary" 
                                    ? "#9CA3AF" 
                                    : "#DBEAFE",
                    }),
                }}
            >
                {icon === "left" && iconImage && (
                    <img src={iconImage} alt="" style={{ width: "20px", height: "20px" }} />
                )}
                {label}
                {icon === "right" && iconImage && (
                    <img src={iconImage} alt="" style={{ width: "20px", height: "20px" }} />
                )}
            </button>
        );
    }
);

AuthButton.displayName = "AuthButton";

export default AuthButton;
