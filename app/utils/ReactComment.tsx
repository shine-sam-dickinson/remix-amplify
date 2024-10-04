import { useEffect, useRef } from "react";

export const ReactComment = (props: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const node = document.createComment(props.text);
    ref.current.replaceWith(node);
    return () => {
      node.remove();
    };
  }, [props.text]);

  return (
    <div
      ref={ref}
      style={{
        display: "none",
      }}
    />
  );
};
