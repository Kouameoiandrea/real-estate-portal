export const size = {
  width: 32,
  height: 32
}

export const contentType = 'image/svg+xml'

export default function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
    >
      <rect width="32" height="32" rx="9" fill="#16301d" />
      <path
        d="M7 16.2L16 8l9 8.2V25a1 1 0 0 1-1 1h-5.8v-6.3h-4.4V26H8a1 1 0 0 1-1-1v-8.8Z"
        fill="#9f2f35"
      />
      <path
        d="M12.2 14.8h7.6v3.1h-7.6z"
        fill="#d4ecd0"
      />
    </svg>
  )
}
