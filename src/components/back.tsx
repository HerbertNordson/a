import { useRouter } from "next/navigation";

export const Back = () => {
  const router = useRouter();

  return (
    <button
      className="w-14 h-14 rounded-full bg-white absolute left-4 top-4 text-center z-20"
      onClick={() => {
        router.back();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 m-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </button>
  );
};
