import Heading from "@/components/common/heading";
import MyBreadcrumb from "@/components/common/breadcrumb";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Heading />
            <MyBreadcrumb />
            <div className="p-16">{children}</div>
        </>
    );
}
