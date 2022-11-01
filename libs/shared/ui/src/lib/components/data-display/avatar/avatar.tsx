import { PropsWithChildren, ComponentProps, FC } from 'react';

import { AvatarSizes, useThemeStore } from '@apps/store';

import { twMerge } from 'tailwind-merge';
export interface AvatarProps extends PropsWithChildren<ComponentProps<'img'>> {
  bordered?: boolean;
  rounded?: boolean;
  size?: keyof AvatarSizes;
}

export const Avatar: FC<AvatarProps> = ({
  bordered = false,
  rounded = true,
  size = 'md',
  alt,
  src,
}) => {
  const { avatar } = useThemeStore();

  return (
    <figure className={avatar.base}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            avatar.img.on,
            avatar.size[size],
            bordered && avatar.bordered,
            rounded && avatar.rounded
          )}
        />
      ) : (
        <div
          className={twMerge(
            avatar.img.off,
            avatar.size[size],
            bordered && avatar.bordered,
            rounded && avatar.rounded
          )}
        >
          <svg
            className="absolute w-auto h-auto text-slate-400 -bottom-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </figure>
  );
};
