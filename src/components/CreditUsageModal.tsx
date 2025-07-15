import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const CreditUsageModal = ({ isOpen, onClose, credits }) => {
  if (!credits) return null;

  const { total_credits, used_credits } = credits;
  const remaining = total_credits - used_credits;
  const percentageUsed = (used_credits / total_credits) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credit Usage</DialogTitle>
          <DialogDescription>
            Here's a breakdown of your credit usage.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{remaining} Credits Remaining</span>
            <span className="text-sm text-muted-foreground">
              {used_credits} / {total_credits} Used
            </span>
          </div>
          <Progress value={percentageUsed} />
          <div className="text-xs text-muted-foreground">
            Last usage: {new Date(credits.updated_at).toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditUsageModal; 