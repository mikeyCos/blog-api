interface Config {
  blogAPIBase: string;
}

const config: Config = {
  blogAPIBase: import.meta.env.VITE_BLOG_API_BASE,
};

export default config;
