export const metadata = {
  title: "Login | UKLDUA",
  description: "UKL Paket 2",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <div>{children}</div>;
};

export default RootLayout;
