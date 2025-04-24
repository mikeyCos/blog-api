interface Config {
  blog_api_base: string;
}

const config: Config = {
  blog_api_base: import.meta.env.VITE_BLOG_API_BASE,
};

export default config;
