import DashboardLayout from "@/components/DashboardLayout";
import DashboardMetrics from "@/components/DashboardMetrics";
import BatchUploadView from "@/components/BatchUploadView";
import WalletConnection from "@/components/WalletConnection";

export default function Home() {
  return (
    <DashboardLayout>
      <header className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="serif-heading font-headline-lg text-headline-lg">Stream Liquidity</h2>
            <p className="text-on-surface-variant font-body-md text-body-md">Automated USDC cross-asset payroll settlement via Stellar.</p>
          </div>
          <WalletConnection />
        </div>
      </header>
      
      <DashboardMetrics />
      
      <BatchUploadView />
    </DashboardLayout>
  );
}
