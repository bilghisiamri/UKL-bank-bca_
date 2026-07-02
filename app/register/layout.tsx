export const metadata = {
  title: "register | UKL",
  description: "UKL Paket 2",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <div>{children}</div>;
};

export default RootLayout;
