import { forwardRef, useState } from 'react';

export const Input = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      ref={ref}
      type="text"
      placeholder="Search"
      className={`${
        isFocused ? 'w-36 min-[410px]:w-48 sm:w-72' : 'w-36 min-[410px]:w-48'
      } transition-all duration-500 outline-none bg-transparent border-b h-10 px-2`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
});
