import { useState } from 'react';

export function Input(props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      placeholder="Search"
      className={`${
        isFocused ? 'w-72' : 'w-48'
      } transition-all duration-500 outline-none bg-transparent border-b h-10 px-2`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}
