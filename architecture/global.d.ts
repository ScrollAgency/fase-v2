declare const require: {
  resolve(pkg: string): unknown;
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys: () => string[];
    <T>(id: string): T;
  };
};

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}