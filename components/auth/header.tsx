import { Poppins } from "next/font/google";
import { cn } from '@/lib/utils'
const headerFont = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <h1 className={cn("text-3xl font-semibold", headerFont.className)}>🔒 Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
