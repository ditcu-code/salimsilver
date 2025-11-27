import nextConfig from "eslint-config-next"

const config = [
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...nextConfig,
  {
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default config
