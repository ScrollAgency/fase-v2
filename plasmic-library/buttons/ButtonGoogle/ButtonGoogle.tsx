import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createClient } from '@supabase/supabase-js';
import { cn } from "@/lib/utils";

interface ButtonActions {
    click: () => void;
}

interface ButtonProps {
    disabled?: boolean;
    className?: string;
    redirectTo?: string;
    children?: React.ReactNode;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const AuthButton = forwardRef<ButtonActions, ButtonProps>(
    (
        {
            disabled,
            className,
            redirectTo = "",
            children,
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
                    console.log("OAuth redirect initiated:", data);
                    // The user will be redirected to Google OAuth
                    // Session will be initialized on the redirect page using useAuthInit hook
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        return (
            <button
                ref={buttonRef}
                onClick={handleClick}
                disabled={disabled}
                className={cn(
                    "flex items-center justify-center gap-3 rounded transition-all outline-none",
                    "hover:opacity-90 active:opacity-80",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    className
                )}
                style={{
                    opacity: disabled ? 0.5 : 1
                }}
            >
                {children}
            </button>
        );
    }
);

AuthButton.displayName = "AuthButton";

export default AuthButton;